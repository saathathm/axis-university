<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Student::query()->with('program')->latest()->paginate(20)]);
    }

    public function show(Student $student): JsonResponse
    {
        return response()->json(['data' => $student->load('program', 'application')]);
    }

    public function update(Request $request, Student $student): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'street_address' => ['nullable', 'string', 'max:200'],
            'town_city' => ['nullable', 'string', 'max:120'],
            'country' => ['nullable', 'string', 'max:100'],
            'postcode' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'program_id' => ['nullable', 'exists:programs,id'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $student->update($validated);

        return response()->json(['message' => 'Student updated successfully.', 'data' => $student]);
    }

    public function destroy(Student $student): JsonResponse
    {
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully.']);
    }
}