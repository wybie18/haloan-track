<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishType;
use Illuminate\Http\Request;

class FishTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(FishType::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:fish_types',
            'description' => 'nullable|string',
        ]);

        $fishType = FishType::create($validated);

        return response()->json($fishType, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(FishType $fishType)
    {
        return response()->json($fishType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FishType $fishType)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:fish_types,name,' . $fishType->id,
            'description' => 'nullable|string',
        ]);

        $fishType->update($validated);

        return response()->json($fishType);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FishType $fishType)
    {
        $fishType->delete();

        return response()->json(['message' => 'Fish type deleted successfully']);
    }
}
