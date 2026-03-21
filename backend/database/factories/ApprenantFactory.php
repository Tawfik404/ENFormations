<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Groupe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Apprenant>
 */
class ApprenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'nom'         => fake()->lastName(),
        'prenom'      => fake()->firstName(),
        'genre'       => fake()->randomElement(['M', 'F']),
        'division_id' => Division::inRandomOrder()->first()->id,
        'groupe_id'   => Groupe::inRandomOrder()->first()->id,
        ];
    }
}
