<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApprenantRequest extends FormRequest
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
        'nom'         => 'required|string|max:255',
        'prenom'      => 'required|string|max:255',
        'genre'       => 'required|in:M,F',
        'division_id' => 'required|exists:divisions,id',
        'groupe_id'   => 'required|exists:groupes,id',        ];
    }
}
