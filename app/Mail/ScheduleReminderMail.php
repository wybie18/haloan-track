<?php

namespace App\Mail;

use App\Models\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ScheduleReminderMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The notification instance.
     */
    protected Notification $notificationModel;

    /**
     * The total number of ponds for this user.
     */
    protected int $pondCount;

    /**
     * Create a new message instance.
     */
    public function __construct(Notification $notification, int $pondCount = 1)
    {
        $this->notificationModel = $notification;
        $this->pondCount = $pondCount;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->notificationModel->title . ' - Haloan Track Reminder',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.schedule-reminder',
            with: [
                'title' => $this->notificationModel->title,
                'message' => $this->notificationModel->message,
                'pondName' => $this->notificationModel->pond ? $this->notificationModel->pond->name : null,
                'pondCount' => $this->pondCount,
                'scheduledAt' => $this->notificationModel->notify_at->format('F j, Y - g:i A'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
