<?php

namespace App\Http\Controllers\Api;

use App\Models\Course;
use App\Traits\ApiResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CourseController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $courses = Course::with('faculty')
            ->latest()
            ->paginate(10);

        return $this->successResponse($courses, 'Courses fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facultyId' => ['required', 'exists:faculties,id'],
            'name' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:255', 'unique:courses,code'],
            'level' => ['nullable', 'string', 'max:255'],
            'duration' => ['nullable', 'string', 'max:255'],
            'studyMode' => ['required', 'in:online,physical,hybrid'],
            'fee' => ['nullable', 'numeric', 'min:0'],
            'shortDescription' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'entryRequirements' => ['nullable', 'string'],
            'status' => ['nullable', 'boolean'],
        ]);

        $course = Course::create([
            'faculty_id' => $validated['facultyId'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'code' => $validated['code'] ?? null,
            'level' => $validated['level'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'study_mode' => $validated['studyMode'],
            'fee' => $validated['fee'] ?? null,
            'short_description' => $validated['shortDescription'] ?? null,
            'description' => $validated['description'] ?? null,
            'entry_requirements' => $validated['entryRequirements'] ?? null,
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($course, 'Course created successfully', 201);
    }

    public function show(Course $course)
    {
        $course->load('faculty', 'downloads', 'applications', 'enrollments.student');

        return $this->successResponse($course, 'Course fetched successfully');
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'facultyId' => ['required', 'exists:faculties,id'],
            'name' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:255', 'unique:courses,code,' . $course->id],
            'level' => ['nullable', 'string', 'max:255'],
            'duration' => ['nullable', 'string', 'max:255'],
            'studyMode' => ['required', 'in:online,physical,hybrid'],
            'fee' => ['nullable', 'numeric', 'min:0'],
            'shortDescription' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'entryRequirements' => ['nullable', 'string'],
            'status' => ['nullable', 'boolean'],
        ]);

        $course->update([
            'faculty_id' => $validated['facultyId'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'code' => $validated['code'] ?? null,
            'level' => $validated['level'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'study_mode' => $validated['studyMode'],
            'fee' => $validated['fee'] ?? null,
            'short_description' => $validated['shortDescription'] ?? null,
            'description' => $validated['description'] ?? null,
            'entry_requirements' => $validated['entryRequirements'] ?? null,
            'status' => $validated['status'] ?? $course->status,
        ]);

        return $this->successResponse($course, 'Course updated successfully');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return $this->successResponse(null, 'Course deleted successfully');
    }
}