<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre'          => 'required|string|max:255',
            'dateDebut'      => 'required|date',
            'dateFin'        => 'required|date|after:dateDebut',
            'ville_id'       => 'sometimes|exists:villes,id',
            'groupe_id'      => 'sometimes|exists:groupes,id',
            'salle_id'       => 'sometimes|exists:salles,id',
            'module_id'      => 'sometimes|exists:modules,id',
            'salle_batiment' => 'sometimes|required_with:salle_etage,salle_nombre|string|max:255',
            'salle_etage'    => 'sometimes|required_with:salle_batiment,salle_nombre|integer',
            'salle_nombre'   => 'sometimes|required_with:salle_batiment,salle_etage|integer',
        ];
    }
}
