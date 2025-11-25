<?php

namespace App\Notifications;

use App\Models\Notification as NotificationModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class ScheduleNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $notification;

    /**
     * Create a new notification instance.
     */
    public function __construct(NotificationModel $notification)
    {
        $this->notification = $notification;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast'];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'id' => $this->notification->id,
            'title' => $this->notification->title,
            'message' => $this->notification->message,
            'pond_id' => $this->notification->pond_id,
            'pond_name' => $this->notification->pond ? $this->notification->pond->name : null,
            'schedule_id' => $this->notification->schedule_id,
            'created_at' => $this->notification->created_at,
        ]);
    }
}
