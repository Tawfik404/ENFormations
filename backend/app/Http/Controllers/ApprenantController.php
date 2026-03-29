<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use App\Http\Requests\StoreApprenantRequest;
use App\Http\Requests\UpdateApprenantRequest;
use Illuminate\Http\JsonResponse;

class ApprenantController extends Controller
{
    public function index(): JsonResponse
    {
        $apprenants = Apprenant::with(['division', 'groupe.formation.ville', 'groupe', 'formation', 'ville'])
            ->get()
            ->map(function ($apprenant) {
                $formation = $apprenant->formation ?? $apprenant->groupe?->formation;
                $ville = $apprenant->ville ?? $formation?->ville;

                return array_merge($apprenant->toArray(), [
                    'division' => $apprenant->division?->titre ?? $apprenant->division,
                    'groupe' => $apprenant->groupe?->nom ?? $apprenant->groupe,
                    'formation' => $formation ? ['id' => $formation->id, 'titre' => $formation->titre] : null,
                    'ville' => $ville ? ['id' => $ville->id, 'nom' => $ville->nom] : null,
                ]);
            });

        return response()->json($apprenants);
    }

    public function create()
    {
        // Not used in API context
    }

    public function store(StoreApprenantRequest $request): JsonResponse
    {
        return response()->json(Apprenant::create($request->validated()), 201);
    }

    public function show(Apprenant $apprenant): JsonResponse
    {
        return response()->json($apprenant);
    }

    public function edit(Apprenant $apprenant)
    {
        // Not used in API context
    }

    public function update(UpdateApprenantRequest $request, Apprenant $apprenant): JsonResponse
    {
        $apprenant->update($request->validated());
        return response()->json($apprenant->fresh());
    }

    public function destroy(Apprenant $apprenant): JsonResponse
    {
        $apprenant->delete();
        return response()->json(null, 204);
    }
}
