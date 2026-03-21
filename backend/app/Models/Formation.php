<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    /** @use HasFactory<\Database\Factories\FormationFactory> */
    use HasFactory;
    protected $fillable = ['dateDebut', 'dateFin', 'presence', 'ville_id', 'groupe_id', 'salle_id', 'module_id'];

}
