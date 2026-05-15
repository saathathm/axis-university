<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@axisuniversity.edu'],
            [
                'name' => 'Axis Admin',
                'password' => bcrypt('Password123!'),
                'role' => 'admin',
            ]
        );
    }
}