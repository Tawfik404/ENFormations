<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Module>
 */
class ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'titre' => fake()->randomElement([
            'Développement Web', 'Base de données', 'Réseaux',
            'Algorithmique', 'Systèmes', 'Gestion de projet'
        ]),        ];
    }
}
