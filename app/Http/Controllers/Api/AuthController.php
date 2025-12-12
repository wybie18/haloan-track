<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerificationMail;
use App\Mail\PasswordResetMail;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration (mobile app).
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // Default role for mobile users
        ]);

        event(new Registered($user));

        // Create and send OTP for email verification
        $otp = Otp::createForUser($user->id, 'email_verification');
        Mail::to($user->email)->send(new EmailVerificationMail($otp));

        return response()->json([
            'message' => 'Registration successful. Please verify your email with the OTP sent.',
            'email' => $user->email,
            'requires_verification' => true,
        ], 201);
    }

    /**
     * Handle user login (mobile app).
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check if email is verified
        if (!$user->email_verified_at) {
            // Resend verification OTP
            $otp = Otp::createForUser($user->id, 'email_verification');
            Mail::to($user->email)->send(new EmailVerificationMail($otp));

            return response()->json([
                'message' => 'Please verify your email first. A new OTP has been sent to your email.',
                'requires_verification' => true,
                'email' => $user->email,
            ], 403);
        }

        $token = $user->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Handle user logout (mobile app).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    /**
     * Get authenticated user.
     */
    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Handle password reset request.
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Return success even if user not found (security best practice)
            return response()->json([
                'message' => 'If your email exists in our system, you will receive a password reset OTP.',
            ]);
        }

        // Create and send OTP for password reset
        $otp = Otp::createForUser($user->id, 'password_reset');
        Mail::to($user->email)->send(new PasswordResetMail($otp));

        return response()->json([
            'message' => 'Password reset OTP sent to your email.',
        ]);
    }

    /**
     * Verify email with OTP.
     */
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('type', 'email_verification')
            ->where('otp', $request->otp)
            ->where('is_used', false)
            ->first();

        if (!$otp || !$otp->isValid()) {
            throw ValidationException::withMessages([
                'otp' => ['Invalid or expired OTP.'],
            ]);
        }

        $otp->markAsUsed();
        $user->email_verified_at = now();
        $user->save();

        return response()->json([
            'message' => 'Email verified successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Resend email verification OTP.
     */
    public function resendVerificationOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Email already verified.',
            ]);
        }

        $otp = Otp::createForUser($user->id, 'email_verification');
        Mail::to($user->email)->send(new EmailVerificationMail($otp));

        return response()->json([
            'message' => 'Verification OTP sent to your email.',
        ]);
    }

    /**
     * Verify password reset OTP.
     */
    public function verifyResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('type', 'password_reset')
            ->where('otp', $request->otp)
            ->where('is_used', false)
            ->first();

        if (!$otp || !$otp->isValid()) {
            throw ValidationException::withMessages([
                'otp' => ['Invalid or expired OTP.'],
            ]);
        }

        return response()->json([
            'message' => 'OTP verified successfully.',
            'reset_token' => base64_encode($user->id . '|' . $otp->id . '|' . now()->timestamp),
        ]);
    }

    /**
     * Reset password with verified OTP.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('type', 'password_reset')
            ->where('otp', $request->otp)
            ->where('is_used', false)
            ->first();

        if (!$otp || !$otp->isValid()) {
            throw ValidationException::withMessages([
                'otp' => ['Invalid or expired OTP.'],
            ]);
        }

        $otp->markAsUsed();
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password reset successfully. You can now login with your new password.',
        ]);
    }

    /**
     * Update user profile information.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->fill($validated);
        
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Handle password update.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match your current password.'],
            ]);
        }

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }
}
