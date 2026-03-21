<?php

namespace Database\Factories;

use App\Models\Groupe;
use App\Models\Module;
use App\Models\Salle;
use App\Models\Ville;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formation>
 */
class FormationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
            $dateDebut = fake()->dateTimeBetween('-1 year', 'now');
    $dateFin   = fake()->dateTimeBetween($dateDebut, '+1 year');
        return [
            'dateDebut' => $dateDebut,
        'dateFin'   => $dateFin,
        'ville_id'  => Ville::inRandomOrder()->first()->id,
        'groupe_id' => Groupe::inRandomOrder()->first()->id,
        'salle_id'  => Salle::inRandomOrder()->first()->id,
        'module_id' => Module::inRandomOrder()->first()->id,       ];
    }
}
