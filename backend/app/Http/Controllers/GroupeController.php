<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use App\Http\Requests\StoreGroupeRequest;
use App\Http\Requests\UpdateGroupeRequest;
use Illuminate\Http\JsonResponse;

class GroupeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $groupes = Groupe::with([
            'apprenants',
            'formations',
        ])->get();

        return response()->json($groupes);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(StoreGroupeRequest $request): JsonResponse
    {
        $validated = $request->validated();
        // Remove apprenants from validation since they're handled by frontend
        unset($validated['apprenants']);

        $groupe = Groupe::create($validated);

        $groupe->load('apprenants', 'formateurs', 'formations');

        return response()->json($groupe, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Groupe $groupe): JsonResponse
    {
        $groupe->load([
            'apprenants',
            'formateurs',
            'formations',
        ]);

        return response()->json($groupe);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Groupe $groupe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupeRequest $request, Groupe $groupe): JsonResponse
    {
        $validated = $request->validated();
        // Remove apprenants from validation since they're handled by frontend
        unset($validated['apprenants']);

        $groupe->update($validated);

        $groupe->load('apprenants', 'formateurs', 'formations');

        return response()->json($groupe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Groupe $groupe): JsonResponse
    {
        $groupe->delete();

        return response()->json(null, 204);
    }
}
