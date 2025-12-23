<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pond extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'fish_type_id',
        'name',
        'fish_count',
        'registered_at',
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
            'registered_at' => 'datetime',
            'fish_count' => 'integer',
        ];
    }

    /**
     * Get the user that owns the pond.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the fish type of the pond.
     */
    public function fishType()
    {
        return $this->belongsTo(FishType::class);
    }

    /**
     * Get the notifications for the pond.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
