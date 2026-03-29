<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AjouteFormController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ApprenantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\GroupeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//API routes
Route::post('login', [AuthController::class,'login']);

Route::apiResources([
    'apprenant' => ApprenantController::class,
    'groupe' => GroupeController::class,
    'division' => DivisionController::class,
    'formateur' => FormateurController::class,
    'formation' => FormationController::class,
    'salle' => SalleController::class,
    'module' => ModuleController::class,
    'ville' => VilleController::class,
]);

