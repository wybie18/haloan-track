<?php

namespace App\Http\Controllers;

use App\Models\FishType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FishTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fishTypes = FishType::get();
        return Inertia::render('FishTypes/Index', [
            'fishTypes' => $fishTypes,
        ]);
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

        FishType::create($validated);

        return redirect()->route('fish-types.index');
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

        return redirect()->route('fish-types.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FishType $fishType)
    {
        $fishType->delete();

        return redirect()->route('fish-types.index');
    }
}
