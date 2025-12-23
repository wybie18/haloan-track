<?php

namespace App\Http\Controllers;

use App\Models\Pond;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PondController extends Controller
{
    function index(Request $request)
    {
        $ponds = Pond::orderBy('name')
            ->with('user', 'fishType')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Ponds/Index', [
            'ponds' => $ponds,
        ]);
    }
}
