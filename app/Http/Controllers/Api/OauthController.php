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

            return response('
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Redirecting...</title>
                    <script>
                        window.onload = function() {
                            window.location.href = "' . $fullUrl . '";
                        };
                    </script>
                </head>
                <body style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; flex-direction:column;">
                    <p>Redirecting to HaloanTrack...</p>
                    <a href="' . $fullUrl . '" style="padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Click here if not redirected</a>
                </body>
                </html>
            ');

        } catch (\Exception $e) {
             $scheme = config('app.mobile_app_scheme', 'exp://127.0.0.1:19000');
             $cleanScheme = str_replace('://', '', $scheme);
             
             $errorUrl = $cleanScheme . '://--/auth/callback?status=error&message=' . urlencode($e->getMessage());
             
             return response('
                <!DOCTYPE html>
                <html>
                <script>
                    window.location.href = "' . $errorUrl . '";
                </script>
                <body>
                    <p>Redirecting with error...</p>
                    <a href="' . $errorUrl . '">Click here</a>
                </body>
                </html>
            ');
        }
    }
}
