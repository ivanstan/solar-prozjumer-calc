# SiteGround mail relay (Solarni kalkulator)
#
# Upload to SiteGround public_html (current deploy):
#   public_html/send-mail.php
#   public_html/config.php
#
# Setup:
#   1. Copy config.example.php → config.php
#   2. Set smtp_password (and optionally api_token)
#   3. Frontend POSTs to:
#      https://prozjumer.rs/send-mail.php
#
# Request (same as old /sr/solar/email):
#   POST JSON { "to", "subject?", "body", "newsletter?" }
#   Header (optional): X-Api-Token: <api_token>
#
# Response:
#   { "ok": true } or { "ok": false, "error": "..." }
