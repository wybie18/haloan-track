<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OauthController;
use App\Http\Controllers\Api\PondController;
use App\Http\Controllers\Api\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::get('/auth/{provider}/redirect', [OauthController::class, 'redirectToProvider']);
Route::get('/auth/{provider}/callback', [OauthController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/password', [AuthController::class, 'updatePassword']);

    // Ponds Management
    Route::name('api.')->group(function () {
        Route::apiResource('ponds', PondController::class);
    });

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);

    // Schedules
    Route::get('/schedules', [ScheduleController::class, 'index']);
});
