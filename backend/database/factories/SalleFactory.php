<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salle>
 */
class SalleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'batiment' => fake()->randomElement(['A', 'B', 'C', 'D']),
        'etage'    => fake()->numberBetween(0, 5),
        'nombre'   => fake()->numberBetween(20, 50),        ];
    }
}
