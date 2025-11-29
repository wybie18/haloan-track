<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;

class OauthController extends Controller
{
    public function redirectToProvider(Request $request, $provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();

            $user = User::updateOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name'        => $socialUser->getName(),
                    'provider'    => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar'      => $socialUser->getAvatar(),
                    'role'        => 'user',
                    'password'    => bcrypt(str()->random(16)),
                    'email_verified_at' => now(),
                ]
            );

            $token = $user->createToken('mobile-app')->plainTextToken;

            $userJson = $user->toJson();

            $scheme = config('app.mobile_app_scheme', 'exp://127.0.0.1:19000');

            $cleanScheme = str_replace('://', '', $scheme);
            $cleanScheme = rtrim($cleanScheme, '/');

            $isExpoGo = str_starts_with($scheme, 'exp://');

            if ($isExpoGo) {
                $appUrl = $cleanScheme . '://--/auth/callback';
            } else {
                $appUrl = $cleanScheme . '://auth/callback';
            }

            $queryParams = http_build_query([
                'token'   => $token,
                'user'    => $userJson,
                'status'  => 'success',
                'message' => 'Authentication successful',
            ]);

            $fullUrl = $appUrl . '?' . $queryParams;

            return redirect()->away($fullUrl);

        } catch (\Exception $e) {
            $scheme      = config('app.mobile_app_scheme', 'exp://127.0.0.1:19000');
            $cleanScheme = str_replace('://', '', $scheme);
            $baseUrl     = rtrim($cleanScheme, '/') . '://';

            return redirect()->away($baseUrl . '--/auth/callback?status=error&message=' . urlencode($e->getMessage()));
        }
    }
}
