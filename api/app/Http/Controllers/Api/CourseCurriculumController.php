<?php

namespace App\Http\Controllers\Api;

use App\Models\Course;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Models\CourseCurriculum;
use App\Http\Controllers\Controller;

class CourseCurriculumController extends Controller
{
    use ApiResponse;

    public function index(Course $course)
    {
        $curriculums = $course->curriculums()
            ->where('status', true)
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($curriculums, 'Course curriculums fetched successfully');
    }

    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration' => ['nullable', 'string', 'max:255'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        $curriculum = CourseCurriculum::create([
            'course_id' => $course->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'sort_order' => $validated['sortOrder'] ?? 0,
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($curriculum, 'Course curriculum created successfully', 201);
    }

    public function show(CourseCurriculum $courseCurriculum)
    {
        $courseCurriculum->load('course');

        return $this->successResponse($courseCurriculum, 'Course curriculum fetched successfully');
    }

    public function update(Request $request, CourseCurriculum $courseCurriculum)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration' => ['nullable', 'string', 'max:255'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        $courseCurriculum->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'sort_order' => $validated['sortOrder'] ?? $courseCurriculum->sort_order,
            'status' => $validated['status'] ?? $courseCurriculum->status,
        ]);

        return $this->successResponse($courseCurriculum, 'Course curriculum updated successfully');
    }

    public function destroy(CourseCurriculum $courseCurriculum)
    {
        $courseCurriculum->delete();

        return $this->successResponse(null, 'Course curriculum deleted successfully');
    }
}