<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Certificate::query()->with('student')->latest()->paginate(20)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cert_id' => ['required', 'string', 'max:255', 'unique:certificates,cert_id'],
            'student_id' => ['required', 'exists:students,id'],
            'program_id' => ['nullable', 'exists:programs,id'],
            'year' => ['nullable', 'string', 'max:20'],
            'issued_at' => ['nullable', 'date'],
            'meta' => ['nullable', 'array'],
        ]);

        $certificate = Certificate::query()->create($validated);

        return response()->json(['message' => 'Certificate created successfully.', 'data' => $certificate], 201);
    }

    public function show(Certificate $certificate): JsonResponse
    {
        return response()->json(['data' => $certificate->load('student')]);
    }

    public function update(Request $request, Certificate $certificate): JsonResponse
    {
        $validated = $request->validate([
            'cert_id' => ['required', 'string', 'max:255', 'unique:certificates,cert_id,'.$certificate->id],
            'student_id' => ['required', 'exists:students,id'],
            'program_id' => ['nullable', 'exists:programs,id'],
            'year' => ['nullable', 'string', 'max:20'],
            'issued_at' => ['nullable', 'date'],
            'meta' => ['nullable', 'array'],
        ]);

        $certificate->update($validated);

        return response()->json(['message' => 'Certificate updated successfully.', 'data' => $certificate]);
    }

    public function destroy(Certificate $certificate): JsonResponse
    {
        $certificate->delete();

        return response()->json(['message' => 'Certificate deleted successfully.']);
    }
}