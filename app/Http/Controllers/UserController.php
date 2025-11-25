<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of non-admin users.
     */
    public function index(Request $request)
    {

        $users = User::where('role', '!=', 'admin')
            ->orderBy('name')
            ->select('id', 'name', 'email', 'created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }
}
