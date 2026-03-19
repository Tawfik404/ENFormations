<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Models\Formation;
use App\Http\Requests\StoreFormateurRequest;
use App\Http\Requests\UpdateFormateurRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Formateur::with(['groupe', 'division'])->get());
    }

    public function create()
    {
        // Not used in API context
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nom'        => 'required|string|max:255',
            'prenom'     => 'required|string|max:255',
            'groupe_id'  => 'required|exists:groupes,id',
            'division_id'=> 'required|exists:divisions,id',
            'module_id'  => 'required|exists:modules,id',
            'salle_id'   => 'required|exists:salles,id',
            'ville_id'   => 'required|exists:villes,id',
            'dateDebut'  => 'required|date',
            'dateFin'    => 'required|date|after:dateDebut',
        ]);

        $formateur = Formateur::create([
            'nom'         => $request->nom,
            'prenom'      => $request->prenom,
            'groupe_id'   => $request->groupe_id,
            'division_id' => $request->division_id,
        ]);

        $formation = Formation::create([
            'dateDebut' => $request->dateDebut,
            'dateFin'   => $request->dateFin,
            'ville_id'  => $request->ville_id,
            'groupe_id' => $request->groupe_id,
            'salle_id'  => $request->salle_id,
            'module_id' => $request->module_id,
        ]);

        return response()->json([
            'formateur' => $formateur->load(['groupe', 'division']),
            'formation' => $formation->load(['ville', 'groupe', 'salle', 'module']),
        ], 201);
    }

    public function show(Formateur $formateur): JsonResponse
    {
        return response()->json($formateur->load(['groupe', 'division']));
    }

    public function edit(Formateur $formateur)
    {
        // Not used in API context
    }

    public function update(UpdateFormateurRequest $request, Formateur $formateur): JsonResponse
    {
        $formateur->update($request->validated());
        return response()->json($formateur->fresh()->load(['groupe', 'division']));
    }

    public function destroy(Formateur $formateur): JsonResponse
    {
        $formateur->delete();
        return response()->json(null, 204);
    }
}