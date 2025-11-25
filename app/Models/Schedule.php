<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'operation_type_id',
        'name',
        'description',
        'frequency',
        'interval',
        'base_offset_days',
        'time_of_day',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'interval' => 'integer',
        'base_offset_days' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Get the operation type that owns the schedule.
     */
    public function operationType()
    {
        return $this->belongsTo(OperationType::class);
    }

    /**
     * Get the notifications for the schedule.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
