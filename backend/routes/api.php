<?php

use App\Http\Controllers\DivisionController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ApprenantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//API routes
Route::apiResources([
    'apprenant' => ApprenantController::class,
    'division' => DivisionController::class,
    'formateur' => FormateurController::class,
    'formation' => FormationController::class,
    'salle' => SalleController::class,
    'module' => ModuleController::class,
]);


