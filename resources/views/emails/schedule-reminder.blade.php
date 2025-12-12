<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule Reminder</title>
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
            background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
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
            color: #cffafe;
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
            margin-bottom: 20px;
        }
        .reminder-box {
            background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
            border: 2px solid #06b6d4;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        .reminder-title {
            font-size: 20px;
            font-weight: 700;
            color: #0891b2;
            margin-bottom: 10px;
        }
        .reminder-message {
            color: #334155;
            font-size: 15px;
            margin-bottom: 15px;
        }
        .reminder-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .detail-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: #475569;
        }
        .detail-label {
            font-weight: 600;
            color: #0891b2;
            min-width: 80px;
        }
        .pond-badge {
            display: inline-block;
            background-color: #06b6d4;
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        .action-note {
            background-color: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 20px 0;
        }
        .action-note p {
            margin: 0;
            color: #166534;
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
            color: #0891b2;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 Schedule Reminder</h1>
            <p>Haloan Track Notification</p>
        </div>
        <div class="content">
            <p class="greeting">Hello!</p>
            <p class="message">
                You have a scheduled task that requires your attention. Here are the details:
            </p>
            
            <div class="reminder-box">
                <div class="reminder-title">{{ $title }}</div>
                <div class="reminder-message">{{ $message }}</div>
                <div class="reminder-details">
                    @if($pondName)
                    <div class="detail-item">
                        <span class="detail-label">🐟 Pond:</span>
                        <span class="pond-badge">{{ $pondName }}</span>
                    </div>
                    @endif
                    <div class="detail-item">
                        <span class="detail-label">📅 Time:</span>
                        <span>{{ $scheduledAt }}</span>
                    </div>
                </div>
            </div>
            
            <div class="action-note">
                <p>✅ <strong>Action Required:</strong> Please complete this task for your pond's health and productivity.</p>
            </div>
            
            <p class="message">
                Open the Haloan Track app to view more details.
            </p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Haloan Track. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>
