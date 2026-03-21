<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apprenant extends Model
{
    /** @use HasFactory<\Database\Factories\ApprenantFactory> */
    use HasFactory;
protected $fillable = ['nom', 'prenom', 'genre', 'division_id', 'groupe_id'];
}
