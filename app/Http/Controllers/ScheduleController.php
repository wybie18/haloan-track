<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schedule;
use App\Models\OperationType;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = Schedule::with('operationType')->orderBy('name')->paginate(12);

        return Inertia::render('Schedules/Index', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $operationTypes = OperationType::orderBy('name')->get();

        return Inertia::render('Schedules/Create', [
            'operationTypes' => $operationTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'operation_type_id' => ['required', Rule::exists('operation_types', 'id')],
            'name' => ['required', 'string', 'max:191'],
            'description' => ['nullable', 'string'],
            'frequency' => ['required', 'string', 'max:50'],
            'interval' => ['nullable', 'integer', 'min:1'],
            'base_offset_days' => ['nullable', 'integer'],
            'time_of_day' => ['nullable', 'date_format:H:i'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $schedule = Schedule::create(array_merge($validated, [
            'is_active' => $validated['is_active'] ?? false,
        ]));

        return Redirect::route('schedules.index')->with('success', 'Schedule created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $schedule = Schedule::with('operationType')->findOrFail($id);

        return Inertia::render('Schedules/Show', [
            'schedule' => $schedule,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $schedule = Schedule::findOrFail($id);
        $operationTypes = OperationType::orderBy('name')->get();

        return Inertia::render('Schedules/Edit', [
            'schedule' => $schedule,
            'operationTypes' => $operationTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $schedule = Schedule::findOrFail($id);

        $validated = $request->validate([
            'operation_type_id' => ['required', Rule::exists('operation_types', 'id')],
            'name' => ['required', 'string', 'max:191'],
            'description' => ['nullable', 'string'],
            'frequency' => ['required', 'string', 'max:50'],
            'interval' => ['nullable', 'integer', 'min:1'],
            'base_offset_days' => ['nullable', 'integer'],
            'time_of_day' => ['nullable', 'date_format:H:i'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $schedule->update(array_merge($validated, [
            'is_active' => $validated['is_active'] ?? false,
        ]));

        return Redirect::route('schedules.index')->with('success', 'Schedule updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return Redirect::route('schedules.index')->with('success', 'Schedule deleted.');
    }
}
