<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Faculty::query()->latest()->paginate(20)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:faculties,slug'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:50'],
        ]);

        $faculty = Faculty::query()->create($validated);

        return response()->json(['message' => 'Faculty created successfully.', 'data' => $faculty], 201);
    }

    public function show(Faculty $faculty): JsonResponse
    {
        return response()->json(['data' => $faculty]);
    }

    public function update(Request $request, Faculty $faculty): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:faculties,slug,'.$faculty->id],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:50'],
        ]);

        $faculty->update($validated);

        return response()->json(['message' => 'Faculty updated successfully.', 'data' => $faculty]);
    }

    public function destroy(Faculty $faculty): JsonResponse
    {
        $faculty->delete();

        return response()->json(['message' => 'Faculty deleted successfully.']);
    }
}