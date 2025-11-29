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
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'role' => 'user',
                    'password' => bcrypt(str()->random(16)),
                ]
            );

            // 3. Generate a Sanctum Token
            $token = $user->createToken('mobile-app')->plainTextToken;

            $userJson = $user->toJson(); 

            // 4. Redirect to the App
            // We need to know the app's scheme. 
            // In dev (Expo Go), this changes (e.g., exp://192.168.1.5:8081).
            // In prod, it is fixed (e.g., myapp://).
            
            // You can pass the scheme from the frontend in the first request 
            // and pass it through state, but for simplicity, let's assume a fixed dev URL 
            // or use a config/env variable.
            
            $appUrl = config('app.mobile_app_scheme', 'exp://192.168.1.5:8081'); 
            
            $queryParams = http_build_query([
                'token' => $token,
                'user' => $userJson,
                'status' => 'success',
                'message' => 'Authentication successful',
            ]);

            return redirect($appUrl . '/--/auth/callback?' . $queryParams);

        } catch (\Exception $e) {
            return redirect(config('app.mobile_app_scheme') . '/--/auth/callback?status=error&message=' . $e->getMessage());
        }
    }
}
