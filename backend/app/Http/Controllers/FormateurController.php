<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Http\Requests\StoreFormateurRequest;
use App\Http\Requests\UpdateFormateurRequest;
use Illuminate\Http\JsonResponse;

class FormateurController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Formateur::all());
    }

    public function create()
    {
        // Not used in API context
    }

    public function store(StoreFormateurRequest $request): JsonResponse
    {
        return response()->json(Formateur::create($request->validated()), 201);
    }

    public function show(Formateur $formateur): JsonResponse
    {
        return response()->json($formateur);
    }

    public function edit(Formateur $formateur)
    {
        // Not used in API context
    }

    public function update(UpdateFormateurRequest $request, Formateur $formateur): JsonResponse
    {
        $formateur->update($request->validated());
        return response()->json($formateur->fresh());
    }

    public function destroy(Formateur $formateur): JsonResponse
    {
        $formateur->delete();
        return response()->json(null, 204);
    }
}