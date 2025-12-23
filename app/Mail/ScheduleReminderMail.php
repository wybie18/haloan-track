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
     * Create a new message instance.
     */
    public function __construct(Notification $notification)
    {
        $this->notificationModel = $notification;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->notificationModel->title . ' - Mudfish Track Reminder',
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
