<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Salle;
use App\Http\Requests\StoreFormationRequest;
use App\Http\Requests\UpdateFormationRequest;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Formation::with(['ville', 'groupe', 'salle', 'module'])->get());
    }

    public function create()
    {
        // Not used in API context
    }

    public function store(StoreFormationRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if ($request->filled('salle_batiment') || $request->filled('salle_etage') || $request->filled('salle_nombre')) {
            $salle = Salle::create([
                'batiment' => $request->input('salle_batiment'),
                'etage'    => $request->input('salle_etage'),
                'nombre'   => $request->input('salle_nombre'),
            ]);

            $validated['salle_id'] = $salle->id;
        }

        $formation = Formation::create($validated);

        return response()->json($formation, 201);
    }

    public function show(Formation $formation): JsonResponse
    {
                $formation = Formation::leftJoin('villes', 'formations.ville_id', '=', 'villes.id')
            ->leftJoin('groupes', 'formations.groupe_id', '=', 'groupes.id')
            ->leftJoin('salles', 'formations.salle_id', '=', 'salles.id')
            ->leftJoin('modules', 'formations.module_id', '=', 'modules.id')
            ->where('formations.id', $formation->id)
            ->select(
                'formations.*',
                'villes.nom as ville_nom',
                'groupes.nom as groupe_nom',
                'salles.batiment as salle_batiment',
                'salles.etage as salle_etage',
                'salles.nombre as salle_nombre',
                'modules.titre as module_titre'
            )
            ->first();
        
        return response()->json($formation);
    }

    public function edit(Formation $formation)
    {
        // Not used in API context
    }

    public function update(UpdateFormationRequest $request, Formation $formation): JsonResponse
    {
        $formation->update($request->validated());
        return response()->json($formation->fresh());
    }

    public function destroy(Formation $formation): JsonResponse
    {
        $formation->delete();
        return response()->json(null, 204);
    }
}