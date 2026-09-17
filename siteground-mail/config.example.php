<?php
/**
 * Copy this file to config.php on SiteGround and fill in real values.
 * Do NOT commit config.php with production passwords.
 */
return [
    // SiteGround SMTP (from Site Tools → Email → Mail Configuration)
    'smtp_host' => 'mail.prozjumer.rs',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl', // ssl (465) or tls (587)
    'smtp_username' => 'kalkulator.ustede@prozjumer.rs',
    'smtp_password' => 'CHANGE_ME',

    'from_email' => 'kalkulator.ustede@prozjumer.rs',
    'from_name' => 'Solarni kalkulator',

    // Always BCC a copy (same as old Symfony endpoint)
    'bcc' => [
        'kalkulator.ustede@prozjumer.rs',
        'solar.report@prozjumer.rs',
        'vladan@cuzs.org.rs',
    ],

    'newsletter_to' => 'office@cuzs.org.rs',

    // Optional shared secret — frontend must send header: X-Api-Token
    // Leave empty to disable.
    'api_token' => '',

    // Origins allowed to call this endpoint from the browser
    'cors_origins' => [
        'https://solar.sumeiklima.org',
        'https://prozjumer.rs',
        'https://www.prozjumer.rs',
    ],

    // Set true temporarily to see SMTP error detail in JSON response
    'debug' => false,
];
