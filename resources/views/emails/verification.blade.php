<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f1f5f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            color: #d1fae5;
            margin: 10px 0 0;
            font-size: 14px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
        }
        .message {
            color: #64748b;
            margin-bottom: 30px;
        }
        .otp-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 2px dashed #10b981;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #059669;
            margin-bottom: 10px;
        }
        .otp-code {
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #059669;
            font-family: 'Courier New', monospace;
        }
        .expiry {
            font-size: 13px;
            color: #94a3b8;
            margin-top: 15px;
        }
        .warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 20px 0;
        }
        .warning p {
            margin: 0;
            color: #92400e;
            font-size: 14px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 0;
            color: #94a3b8;
            font-size: 13px;
        }
        .footer a {
            color: #059669;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐟 Mudfish Track</h1>
            <p>Mudfish Pond Management System</p>
        </div>
        <div class="content">
            <p class="greeting">Hello!</p>
            <p class="message">
                Thank you for registering with Mudfish Track. To complete your registration and verify your email address, please use the following OTP code:
            </p>
            
            <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">{{ $otp }}</div>
                <div class="expiry">Valid until {{ $expiresAt }}</div>
            </div>
            
            <div class="warning">
                <p>⚠️ <strong>Important:</strong> This code will expire in 15 minutes. Do not share this code with anyone.</p>
            </div>
            
            <p class="message">
                If you did not create an account with Mudfish Track, please ignore this email.
            </p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Mudfish Track. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>
