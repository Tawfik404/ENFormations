<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    /** @use HasFactory<\Database\Factories\GroupeFactory> */
    use HasFactory;

    protected $fillable = ['nom'];

    public function apprenants()
    {
        return $this->hasMany(Apprenant::class);
    }

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }

    public function formation()
    {
        return $this->hasOne(Formation::class)->latestOfMany();
    }
}
