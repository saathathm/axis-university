<?php

namespace App\Http\Controllers\Api;

use App\Models\Faculty;
use App\Traits\ApiResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Helpers\FileUploadHelper;
use App\Http\Controllers\Controller;

class FacultyController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $faculties = Faculty::latest()->paginate(10);

        return $this->successResponse($faculties, 'Faculties fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'shortDescription' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'status' => ['nullable', 'boolean'],
        ]);

        $image = null;

        if ($request->hasFile('image')) {
            $image = FileUploadHelper::uploadImage($request->file('image'), 'faculties');
        }

        $faculty = Faculty::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'short_description' => $validated['shortDescription'] ?? null,
            'description' => $validated['description'] ?? null,
            'image' => $image,
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($faculty, 'Faculty created successfully', 201);
    }

    public function show(Faculty $faculty)
    {
        $faculty->load('courses');

        return $this->successResponse($faculty, 'Faculty fetched successfully');
    }

    public function update(Request $request, Faculty $faculty)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'shortDescription' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'status' => ['nullable', 'boolean'],
        ]);

        $image = $faculty->image;

        if ($request->hasFile('image')) {
            FileUploadHelper::deleteFile($faculty->image);
            $image = FileUploadHelper::uploadImage($request->file('image'), 'faculties');
        }

        $faculty->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'short_description' => $validated['shortDescription'] ?? null,
            'description' => $validated['description'] ?? null,
            'image' => $image,
            'status' => $validated['status'] ?? $faculty->status,
        ]);

        return $this->successResponse($faculty, 'Faculty updated successfully');
    }

    public function destroy(Faculty $faculty)
    {
        FileUploadHelper::deleteFile($faculty->image);

        $faculty->delete();

        return $this->successResponse(null, 'Faculty deleted successfully');
    }
}