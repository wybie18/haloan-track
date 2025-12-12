<?php

namespace App\Console\Commands;

use App\Models\Notification;
use App\Models\Pond;
use App\Models\Schedule;
use App\Notifications\ScheduleNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CheckSchedules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedules:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for due schedules and send notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $currentTime = $now->format('H:i:00'); // Match minute precision

        $schedules = Schedule::with('operationType')->where('is_active', true)->get();

        foreach ($schedules as $schedule) {
            if ($this->isDue($schedule, $now)) {
                $this->info("Processing schedule: {$schedule->name}");
                $this->dispatchNotifications($schedule);
            }
        }
    }

    protected function isDue(Schedule $schedule, Carbon $now)
    {
        // Check time of day (ignoring seconds for robustness)
        $scheduleTime = Carbon::parse($schedule->time_of_day)->format('H:i');
        $currentTime = $now->format('H:i');

        if ($scheduleTime !== $currentTime) {
            return false;
        }

        // Check frequency
        switch ($schedule->frequency) {
            case 'daily':
                return true;
            
            case 'weekly':
                // Assuming base_offset_days 0 = Sunday, 1 = Monday, etc.
                // Or we can just check if it matches the day of week created_at + interval?
                // For simplicity, let's assume we run it every day if daily.
                // For weekly, let's assume it runs on the same day of week as created_at or just Monday?
                // Let's use base_offset_days as day of week (0-6)
                return $now->dayOfWeek === ($schedule->base_offset_days % 7);

            case 'monthly':
                // Run on the 1st of the month + base_offset_days
                return $now->day === (1 + $schedule->base_offset_days);

            case 'once':
                // This would need a 'last_run_at' or similar to track. 
                // For now, skipping 'once' to avoid spamming.
                return false;

            default:
                return false;
        }
    }

    protected function dispatchNotifications(Schedule $schedule)
    {
        // Get all active ponds
        $ponds = Pond::where('status', 'active')->with('user')->get();

        foreach ($ponds as $pond) {
            // Create Notification Record
            $notification = Notification::create([
                'user_id' => $pond->user_id,
                'pond_id' => $pond->id,
                'schedule_id' => $schedule->id,
                'title' => $schedule->name,
                'message' => $schedule->description ?? "Scheduled task: {$schedule->name}",
                'notify_at' => now(),
                'status' => 'pending',
            ]);

            // Send Broadcast Notification
            if ($pond->user) {
                $pond->user->notify(new ScheduleNotification($notification));
                Log::info("Notification sent to user {$pond->user_id} for pond {$pond->id} and schedule {$schedule->id}.");
            }

            // Automatically set pond to inactive if the schedule is for Harvesting
            if ($schedule->operationType && $schedule->operationType->name === 'Harvesting') {
                $pond->update(['status' => 'inactive']);
                Log::info("Pond {$pond->id} set to inactive due to Harvesting schedule.");
            }
        }
    }
}
