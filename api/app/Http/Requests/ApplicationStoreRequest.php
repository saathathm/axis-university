<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'min:2', 'max:100'],
            'last_name' => ['required', 'string', 'min:2', 'max:100'],
            'passport_number' => ['required', 'string', 'max:40'],
            'date_of_birth' => ['required', 'date'],
            'contact_number' => ['required', 'string', 'max:30'],
            'street_address' => ['required', 'string', 'max:200'],
            'town_city' => ['required', 'string', 'max:120'],
            'country' => ['required', 'string', 'max:100'],
            'postcode' => ['required', 'string', 'max:20'],
            'email_address' => ['required', 'email', 'max:255'],
            'program_id' => ['required', 'exists:programs,id'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240', 'mimes:pdf,jpg,jpeg,png,doc,docx'],
        ];
    }
}