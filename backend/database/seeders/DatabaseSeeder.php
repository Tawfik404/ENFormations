<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    $this->call([
        VilleSeeder::class,
        DivisionSeeder::class,
        SalleSeeder::class,
        ModuleSeeder::class,
        GroupeSeeder::class,
        AdminSeeder::class,
        ApprenantSeeder::class,
        FormateurSeeder::class,
        FormationSeeder::class,
    ]);

    }
}
