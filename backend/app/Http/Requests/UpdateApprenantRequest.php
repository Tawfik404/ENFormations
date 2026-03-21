<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApprenantRequest extends FormRequest
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
        'genre'       => 'sometimes|in:M,F',
        'division_id' => 'sometimes|exists:divisions,id',
        'groupe_id'   => 'sometimes|exists:groupes,id',        ];
    }
}
