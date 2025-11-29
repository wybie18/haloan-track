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
                    'name' => $socialUser->getName(),
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'role' => 'user',
                    'password' => bcrypt(str()->random(16)),
                ]
            );

            $token = $user->createToken('mobile-app')->plainTextToken;
            $userJson = $user->toJson(); 

            $scheme = config('app.mobile_app_scheme', 'exp://127.0.0.1:19000');
            
            $cleanScheme = str_replace('://', '', $scheme);
            $cleanScheme = rtrim($cleanScheme, '/');

            $appUrl = $cleanScheme . '://--/auth/callback';

            $queryParams = http_build_query([
                'token' => $token,
                'user' => $userJson,
                'status' => 'success',
                'message' => 'Authentication successful',
            ]);

            $fullUrl = $appUrl . '?' . $queryParams;

            header("Location: " . $fullUrl);
            exit();

        } catch (\Exception $e) {
             $scheme = config('app.mobile_app_scheme', 'exp://127.0.0.1:19000');
             $cleanScheme = str_replace('://', '', $scheme);
             
             $errorUrl = $cleanScheme . '://--/auth/callback?status=error&message=' . urlencode($e->getMessage());
             header("Location: " . $errorUrl);
             exit();
        }
    }
}
