<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Program::query()->with('faculty')->latest()->paginate(20)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'faculty_id' => ['required', 'exists:faculties,id'],
            'code' => ['nullable', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'level' => ['required', 'string', 'max:50'],
            'duration' => ['nullable', 'string', 'max:100'],
            'overview' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'curriculum' => ['nullable', 'array'],
            'requirements' => ['nullable', 'array'],
            'intake' => ['nullable', 'integer', 'min:0'],
        ]);

        $program = Program::query()->create($validated);

        return response()->json(['message' => 'Program created successfully.', 'data' => $program], 201);
    }

    public function show(Program $program): JsonResponse
    {
        return response()->json(['data' => $program->load('faculty')]);
    }

    public function update(Request $request, Program $program): JsonResponse
    {
        $validated = $request->validate([
            'faculty_id' => ['required', 'exists:faculties,id'],
            'code' => ['nullable', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'level' => ['required', 'string', 'max:50'],
            'duration' => ['nullable', 'string', 'max:100'],
            'overview' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'curriculum' => ['nullable', 'array'],
            'requirements' => ['nullable', 'array'],
            'intake' => ['nullable', 'integer', 'min:0'],
        ]);

        $program->update($validated);

        return response()->json(['message' => 'Program updated successfully.', 'data' => $program]);
    }

    public function destroy(Program $program): JsonResponse
    {
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully.']);
    }
}