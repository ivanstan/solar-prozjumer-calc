<?php
/**
 * SiteGround mail endpoint for Solarni kalkulator.
 *
 * Deploy this folder to SiteGround (e.g. public_html/solar-mail/).
 * Copy config.example.php → config.php and fill in SMTP credentials.
 *
 * Frontend POST JSON to: https://prozjumer.rs/send-mail.php
 * Same contract as former /sr/solar/email on sumeiklima VPS.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Missing config.php — copy config.example.php']);
    exit;
}

/** @var array $config */
$config = require $configFile;

cors($config);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!empty($config['api_token'])) {
    $token = $_SERVER['HTTP_X_API_TOKEN'] ?? '';
    if (!hash_equals((string) $config['api_token'], (string) $token)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON body']);
    exit;
}

$to = trim((string) ($data['to'] ?? ''));
$subject = trim((string) ($data['subject'] ?? 'SOLARNI KALKULATOR - Izveštaj za vašu solarnu elektranu'));
$body = (string) ($data['body'] ?? '');
$newsletter = !empty($data['newsletter']);

if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid "to" email']);
    exit;
}

if ($body === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing "body"']);
    exit;
}

try {
    smtpSend($config, [
        'to' => [$to],
        'bcc' => $config['bcc'] ?? [],
        'subject' => $subject,
        'html' => $body,
    ]);

    if ($newsletter) {
        smtpSend($config, [
            'to' => [$config['newsletter_to'] ?? 'office@cuzs.org.rs'],
            'bcc' => [],
            'subject' => 'SOLARNI KALKULATOR - Registracija na newsletter',
            'html' => 'Korisnik ' . htmlspecialchars($to, ENT_QUOTES, 'UTF-8') . ' se prijavio na newsletter.',
        ]);
    }

    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'Send failed',
        'detail' => !empty($config['debug']) ? $e->getMessage() : null,
    ]);
}

function cors(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = $config['cors_origins'] ?? ['*'];

    if (in_array('*', $allowed, true)) {
        header('Access-Control-Allow-Origin: *');
    } elseif ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Api-Token');
    header('Access-Control-Max-Age: 86400');
}

/**
 * @param array{to: string[], bcc?: string[], subject: string, html: string} $mail
 */
function smtpSend(array $config, array $mail): void
{
    $host = $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $encryption = strtolower((string) $config['smtp_encryption']); // ssl | tls
    $username = $config['smtp_username'];
    $password = $config['smtp_password'];
    $from = $config['from_email'];
    $fromName = $config['from_name'] ?? 'Solarni kalkulator';

    $remote = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $errno = 0;
    $errstr = '';
    $socket = @stream_socket_client($remote, $errno, $errstr, 30, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        throw new RuntimeException("SMTP connect failed: $errstr ($errno)");
    }
    stream_set_timeout($socket, 30);

    expect($socket, [220]);

    $ehloHost = $_SERVER['SERVER_NAME'] ?? 'localhost';
    command($socket, 'EHLO ' . $ehloHost, [250]);

    if ($encryption === 'tls') {
        command($socket, 'STARTTLS', [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('STARTTLS failed');
        }
        command($socket, 'EHLO ' . $ehloHost, [250]);
    }

    command($socket, 'AUTH LOGIN', [334]);
    command($socket, base64_encode($username), [334]);
    command($socket, base64_encode($password), [235]);

    command($socket, 'MAIL FROM:<' . $from . '>', [250]);

    $recipients = array_values(array_unique(array_merge($mail['to'], $mail['bcc'] ?? [])));
    foreach ($recipients as $address) {
        command($socket, 'RCPT TO:<' . $address . '>', [250, 251]);
    }

    command($socket, 'DATA', [354]);

    $headers = [
        'Date: ' . date('r'),
        'From: ' . encodeAddress($from, $fromName),
        'To: ' . implode(', ', $mail['to']),
        'Subject: ' . encodeHeader($mail['subject']),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: siteground-mail/solar-kalkulator',
    ];

    if (!empty($mail['bcc'])) {
        // BCC only in envelope, not in headers
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n" . normalizeBody($mail['html']) . "\r\n.";
    fwrite($socket, $message . "\r\n");
    expect($socket, [250]);

    command($socket, 'QUIT', [221]);
    fclose($socket);
}

function command($socket, string $cmd, array $okCodes): void
{
    fwrite($socket, $cmd . "\r\n");
    expect($socket, $okCodes);
}

function expect($socket, array $okCodes): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        throw new RuntimeException('SMTP unexpected reply: ' . trim($response));
    }

    return $response;
}

function encodeAddress(string $email, string $name): string
{
    if ($name === '') {
        return $email;
    }

    return encodeHeader($name) . ' <' . $email . '>';
}

function encodeHeader(string $value): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $value)) {
        return $value;
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function normalizeBody(string $html): string
{
    // Dot-stuffing for SMTP DATA
    $html = str_replace(["\r\n", "\r"], "\n", $html);
    $html = str_replace("\n", "\r\n", $html);
    $html = preg_replace('/^\./m', '..', $html) ?? $html;

    return $html;
}
