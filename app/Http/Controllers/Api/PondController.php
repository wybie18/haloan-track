<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pond;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PondController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user  = Auth::user();
        $ponds = $user->ponds()->with('fishType')->latest()->get();

        return response()->json($ponds);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'fish_count'   => 'required|integer|min:0',
            'status'       => 'nullable|in:active,inactive',
            'fish_type_id' => 'required|exists:fish_types,id',
        ]);

        $validated['registered_at'] = now();

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pond = $user->ponds()->create($validated);

        return response()->json($pond, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pond $pond)
    {
        if ($pond->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($pond);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pond $pond)
    {
        if ($pond->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'fish_count'   => 'sometimes|integer|min:0',
            'status'       => 'nullable|in:active,inactive',
            'fish_type_id' => 'sometimes|exists:fish_types,id',
        ]);

        $pond->update($validated);

        return response()->json($pond);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pond $pond)
    {
        if ($pond->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $pond->delete();

        return response()->json(['message' => 'Pond deleted successfully']);
    }
}
