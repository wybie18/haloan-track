<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'pond_id',
        'schedule_id',
        'title',
        'message',
        'notify_at',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'notify_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the notification.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the pond associated with the notification.
     */
    public function pond()
    {
        return $this->belongsTo(Pond::class);
    }

    /**
     * Get the schedule associated with the notification.
     */
    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
