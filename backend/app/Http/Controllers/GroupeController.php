<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use App\Http\Requests\StoreGroupeRequest;
use App\Http\Requests\UpdateGroupeRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class GroupeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $groupes = Groupe::with([
            'formateurs',
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
        return response()->json(Groupe::create($request->validated()), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Groupe $groupe)
    {
        //
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
    public function update(UpdateGroupeRequest $request, Groupe $groupe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Groupe $groupe)
    {
        //
    }
}
