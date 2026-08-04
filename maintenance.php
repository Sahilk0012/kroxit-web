<?php
// Sets the 503 status and Retry-After header directly, rather than relying on
// mod_rewrite's R= flag (unreliable across Apache/LiteSpeed for non-3xx codes).
header('HTTP/1.1 503 Service Unavailable');
header('Status: 503 Service Unavailable');
header('Retry-After: 86400');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <title>KroxIT Solutions — Back Shortly</title>
    <link rel="icon" type="image/png" href="assets/logo-icon.png">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            height: 100%;
            font-family: -apple-system, "Segoe UI", Inter, sans-serif;
            background: linear-gradient(155deg, #2b303b 0%, #23272f 45%, #191c22 100%);
            color: #fff;
            display: flex; align-items: center; justify-content: center;
            text-align: center;
        }
        .wrap { max-width: 440px; padding: 32px; }
        .logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 34px; font-weight: 800; font-size: 1.3rem; }
        .logo img { height: 34px; width: 34px; border-radius: 10px; }
        h1 { font-size: clamp(1.5rem, 5vw, 2.1rem); font-weight: 800; margin-bottom: 14px; }
        p { color: rgba(255,255,255,0.6); font-size: 0.98rem; line-height: 1.6; margin-bottom: 26px; }
        a { color: #6f95d1; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="logo"><img src="assets/logo-icon.png" alt="KroxIT"><span>KroxIT.</span></div>
        <h1>We'll be right back</h1>
        <p>We're doing some quick maintenance on the site. Everything will be back to normal shortly — thanks for your patience.</p>
        <a href="mailto:hello@kroxit.com">hello@kroxit.com</a>
    </div>
</body>
</html>
