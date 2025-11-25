<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'role' => 'admin',
            'password' => bcrypt('qwe1234!'),
        ]);

        DB::table('operation_types')->insert([
            ['name' => 'Cleaning the Pond', 'description' => 'Regular pond cleaning and maintenance', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Feeding', 'description' => 'Fish feeding schedule', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Harvesting', 'description' => 'Fish harvesting activities', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Fish Monitoring', 'description' => 'Health and growth monitoring', 'created_at' => now(), 'updated_at' => now()],
        ]);

    }
}
