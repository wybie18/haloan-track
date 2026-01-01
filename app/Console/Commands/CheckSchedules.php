<?php

namespace App\Console\Commands;

use App\Mail\ScheduleReminderMail;
use App\Models\Notification;
use App\Models\Pond;
use App\Models\Schedule;
use App\Notifications\ScheduleNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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

        $schedules = Schedule::with('operationType')->where('is_active', true)->get();
        $ponds = Pond::where('status', 'active')->with('user')->get();

        foreach ($schedules as $schedule) {
            // Check if the time of day matches first
            $scheduleTime = Carbon::parse($schedule->time_of_day)->format('H:i');
            $currentTime = $now->format('H:i');

            if ($scheduleTime !== $currentTime) {
                continue;
            }

            $this->info("Checking schedule: {$schedule->name}");

            // For daily schedules, they apply to all ponds universally
            if ($schedule->frequency === 'daily') {
                $this->info("Processing daily schedule: {$schedule->name}");
                $this->dispatchNotificationsForPonds($schedule, $ponds);
                continue;
            }

            // For weekly/monthly schedules, check each pond individually based on their registration date
            foreach ($ponds as $pond) {
                if ($this->isDueForPond($schedule, $pond, $now)) {
                    $this->info("Processing schedule: {$schedule->name} for pond: {$pond->name}");
                    $this->dispatchNotificationForPond($schedule, $pond);
                }
            }
        }
    }

    /**
     * Check if a schedule is due for a specific pond based on its registration date.
     */
    protected function isDueForPond(Schedule $schedule, Pond $pond, Carbon $now): bool
    {
        // Calculate the target start date based on pond registration + base_offset_days
        $pondRegisteredAt = Carbon::parse($pond->registered_at);
        $targetStartDate = $pondRegisteredAt->copy()->addDays($schedule->base_offset_days ?? 0);

        $interval = $schedule->interval ?? 1;

        switch ($schedule->frequency) {
            case 'weekly':
                // Check if today is the same day of week as target start date
                // And if we're on the correct week interval
                if ($now->dayOfWeek !== $targetStartDate->dayOfWeek) {
                    return false;
                }

                // Calculate weeks since target start date
                $weeksSinceStart = $targetStartDate->diffInWeeks($now);
                return $weeksSinceStart >= 0 && ($weeksSinceStart % $interval === 0);

            case 'monthly':
                // Check if today is the correct day of the month
                $targetDay = min($targetStartDate->day, $now->daysInMonth);
                
                if ($now->day !== $targetDay) {
                    return false;
                }

                // Calculate months since target start date
                $monthsSinceStart = $targetStartDate->diffInMonths($now);
                
                // Ensure we're not before the target start date
                if ($now->lt($targetStartDate)) {
                    return false;
                }

                // Check if we're on the correct month interval
                return $monthsSinceStart % $interval === 0;

            case 'once':
                // Check if today matches the exact target date (and hasn't been triggered before)
                return $now->isSameDay($targetStartDate);

            default:
                return false;
        }
    }

    /**
     * Dispatch notifications for all provided ponds (used for daily schedules).
     */
    protected function dispatchNotificationsForPonds(Schedule $schedule, $ponds)
    {
        foreach ($ponds as $pond) {
            $this->dispatchNotificationForPond($schedule, $pond);
        }
    }

    /**
     * Dispatch notification for a specific pond.
     */
    protected function dispatchNotificationForPond(Schedule $schedule, Pond $pond)
    {
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

        // Send Broadcast Notification and Email
        if ($pond->user) {
            $pond->user->notify(new ScheduleNotification($notification));
            Mail::to($pond->user->email)->send(new ScheduleReminderMail($notification));
            Log::info("Notification and email sent to user {$pond->user_id} for pond {$pond->id} and schedule {$schedule->id}.");
        }

        // Automatically set pond to inactive if the schedule is for Harvesting
        if ($schedule->operationType && $schedule->operationType->name === 'Harvesting') {
            $pond->update(['status' => 'inactive']);
            Log::info("Pond {$pond->id} set to inactive due to Harvesting schedule.");
        }
    }
}
