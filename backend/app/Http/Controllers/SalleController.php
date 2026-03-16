<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Http\Requests\StoreSalleRequest;
use App\Http\Requests\UpdateSalleRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
                return response()->json(Salle::all());

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
    public function store(StoreSalleRequest $request): JsonResponse
    {
        return response()->json(Salle::create($request->validated()), 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Salle $salle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Salle $salle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalleRequest $request, Salle $salle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salle $salle)
    {
        //
    }
}
