<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apprenant extends Model
{
    /** @use HasFactory<\Database\Factories\ApprenantFactory> */
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'genre', 'division_id', 'groupe_id'];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function groupe()
    {
        return $this->belongsTo(Groupe::class);
    }

    public function formation()
    {
        // a stagiaire's formation is the current formation of their groupe
        return $this->hasOneThrough(
            Formation::class,
            Groupe::class,
            'id',         // Foreign key on groupe table
            'groupe_id',  // Foreign key on formations table
            'groupe_id',  // Local key on apprenants table
            'id'          // Local key on groupes table
        );
    }

    public function ville()
    {
        // a stagiaire's city comes from the linked formation
        return $this->hasOneThrough(
            Ville::class,
            Formation::class,
            'groupe_id',  // Foreign key on formations table
            'id',         // Foreign key on villes table
            'groupe_id',  // Local key on apprenants table
            'ville_id'    // Local key on formations table
        );
    }
}
