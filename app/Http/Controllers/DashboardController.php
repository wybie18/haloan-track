<?php

namespace App\Http\Controllers;

use App\Models\OperationType;
use App\Models\Pond;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'total_ponds' => Pond::where('status', 'active')->count(),
            'total_fish' => Pond::where('status', 'active')->sum('fish_count'),
            'active_schedules' => Schedule::where('is_active', true)->count(),
        ];

        // Data for graphs
        $pondsByStatus = Pond::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        $schedulesByType = OperationType::withCount('schedules')
            ->get()
            ->map(function ($type) {
                return [
                    'name' => $type->name,
                    'count' => $type->schedules_count,
                ];
            })
            ->filter(function ($item) {
                return $item['count'] > 0;
            })
            ->values();

        $recentPonds = Pond::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'pondsByStatus' => $pondsByStatus,
            'schedulesByType' => $schedulesByType,
            'recentPonds' => $recentPonds,
        ]);
    }
}
