<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFormateurRequest extends FormRequest
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
        'nom'         => 'sometimes|string|max:255',
        'prenom'      => 'sometimes|string|max:255',
        'division_id' => 'sometimes|exists:divisions,id',
        'groupe_id'   => 'sometimes|exists:groupes,id',
        'module_id'   => 'sometimes|exists:modules,id',
        'salle_id'    => 'sometimes|exists:salles,id',
        'ville_id'    => 'sometimes|exists:villes,id',
        'dateDebut'   => 'sometimes|date',
        'dateFin'     => 'sometimes|date|after:dateDebut',
        ];
    }
}
