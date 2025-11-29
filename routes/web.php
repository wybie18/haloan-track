<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PondController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome');
    });
});

Route::middleware('auth', 'verified', 'admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::resource('schedules', ScheduleController::class);
    Route::get('/ponds/index', [PondController::class, 'index'])->name('ponds.index');
});

Route::get('/download-app', function () {
    $filepath = storage_path('app/apk/app-release.apk');

    if (!file_exists($filepath)) {
        abort(404);
    }

    return response()->download($filepath, 'haloan-track.apk');
})->name('app.download');

require __DIR__ . '/auth.php';
