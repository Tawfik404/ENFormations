<?php

namespace App\Http\Controllers;

use App\Models\Formation;
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
        return response()->json(Formation::create($request->validated()), 201);
    }

    public function show(Formation $formation): JsonResponse
    {
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