<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'otp',
        'type',
        'expires_at',
        'is_used',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'is_used' => 'boolean',
        ];
    }

    /**
     * Get the user that owns the OTP.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if OTP is valid (not expired and not used).
     */
    public function isValid(): bool
    {
        return !$this->is_used && $this->expires_at->isFuture();
    }

    /**
     * Mark OTP as used.
     */
    public function markAsUsed(): void
    {
        $this->update(['is_used' => true]);
    }

    /**
     * Generate a random 6-digit OTP.
     */
    public static function generateOtp(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Create a new OTP for a user.
     */
    public static function createForUser(int $userId, string $type): self
    {
        // Invalidate any existing OTPs of the same type for this user
        self::where('user_id', $userId)
            ->where('type', $type)
            ->where('is_used', false)
            ->update(['is_used' => true]);

        return self::create([
            'user_id' => $userId,
            'otp' => self::generateOtp(),
            'type' => $type,
            'expires_at' => now()->addMinutes(15), // OTP valid for 15 minutes
        ]);
    }
}
