<?php

namespace Database\Seeders;

use App\Models\Ville;
use Illuminate\Database\Seeder;

class VilleSeeder extends Seeder
{
    public function run(): void
    {
        $villes = [
            'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
            'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan',
            'Safi', 'El Jadida', 'Béni Mellal', 'Nador', 'Mohammédia',
            'Khouribga', 'Settat', 'Berrechid', 'Ksar El Kébir', 'Larache',
            'Khémisset', 'Guelmim', 'Berkane', 'Taourirt', 'Taza',
            'Errachidia', 'Ouarzazate', 'Ifrane', 'Azrou', 'Tiznit',
            'Laâyoune', 'Dakhla', 'Smara', 'Tan-Tan', 'Taroudant',
            'Chefchaouen', 'Al Hoceima', 'Essaouira', 'Sidi Kacem',
            'Sidi Slimane', 'Souk El Arbaa', 'Midelt', 'Figuig',
            'Zagora', 'Tinghir', 'Azilal', 'Khenifra', 'Youssoufia',
            'Sidi Bennour', 'El Kelaa des Sraghna', 'Ben Guerir',
            'Rehamna', 'Boujdour', 'Es-Semara', 'Assa', 'Zag',
            'Tarfaya', 'Aït Melloul', 'Inezgane', 'Dcheira El Jihadia',
            'Temara', 'Salé', 'Skhirate', 'Benslimane', 'Médiouna',
            'Nouaceur', 'Fnideq', 'Martil', 'Mdiq',
        ];

        foreach ($villes as $ville) {
            Ville::create(['nom' => $ville]);
        }
    }
}