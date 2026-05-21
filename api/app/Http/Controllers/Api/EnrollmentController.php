<?php

namespace App\Http\Controllers\Api;

use App\Models\Enrollment;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EnrollmentController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $enrollments = Enrollment::with('student', 'course.faculty', 'application', 'certificate')
            ->latest()
            ->paginate(10);

        return $this->successResponse($enrollments, 'Enrollments fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'studentId' => ['required', 'exists:students,id'],
            'courseId' => ['required', 'exists:courses,id'],
            'applicationId' => ['nullable', 'exists:applications,id'],
            'enrollmentDate' => ['required', 'date'],
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date'],
            'completionDate' => ['nullable', 'date'],
            'status' => ['nullable', 'in:active,completed,suspended,withdrawn'],
            'grade' => ['nullable', 'string', 'max:255'],
            'adminNote' => ['nullable', 'string'],
        ]);

        $exists = Enrollment::where('student_id', $validated['studentId'])
            ->where('course_id', $validated['courseId'])
            ->exists();

        if ($exists) {
            return $this->errorResponse('Student is already enrolled in this course', 422);
        }

        $enrollment = Enrollment::create([
            'enrollment_number' => $this->generateEnrollmentNumber(),
            'student_id' => $validated['studentId'],
            'course_id' => $validated['courseId'],
            'application_id' => $validated['applicationId'] ?? null,
            'enrollment_date' => $validated['enrollmentDate'],
            'start_date' => $validated['startDate'] ?? null,
            'end_date' => $validated['endDate'] ?? null,
            'completion_date' => $validated['completionDate'] ?? null,
            'status' => $validated['status'] ?? 'active',
            'grade' => $validated['grade'] ?? null,
            'admin_note' => $validated['adminNote'] ?? null,
        ]);

        return $this->successResponse($enrollment, 'Enrollment created successfully', 201);
    }

    public function show(Enrollment $enrollment)
    {
        $enrollment->load('student', 'course.faculty', 'application', 'certificate');

        return $this->successResponse($enrollment, 'Enrollment fetched successfully');
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'studentId' => ['required', 'exists:students,id'],
            'courseId' => ['required', 'exists:courses,id'],
            'applicationId' => ['nullable', 'exists:applications,id'],
            'enrollmentDate' => ['required', 'date'],
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date'],
            'completionDate' => ['nullable', 'date'],
            'status' => ['nullable', 'in:active,completed,suspended,withdrawn'],
            'grade' => ['nullable', 'string', 'max:255'],
            'adminNote' => ['nullable', 'string'],
        ]);

        $exists = Enrollment::where('student_id', $validated['studentId'])
            ->where('course_id', $validated['courseId'])
            ->where('id', '!=', $enrollment->id)
            ->exists();

        if ($exists) {
            return $this->errorResponse('Student is already enrolled in this course', 422);
        }

        $enrollment->update([
            'student_id' => $validated['studentId'],
            'course_id' => $validated['courseId'],
            'application_id' => $validated['applicationId'] ?? null,
            'enrollment_date' => $validated['enrollmentDate'],
            'start_date' => $validated['startDate'] ?? null,
            'end_date' => $validated['endDate'] ?? null,
            'completion_date' => $validated['completionDate'] ?? null,
            'status' => $validated['status'] ?? $enrollment->status,
            'grade' => $validated['grade'] ?? null,
            'admin_note' => $validated['adminNote'] ?? null,
        ]);

        return $this->successResponse($enrollment, 'Enrollment updated successfully');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return $this->successResponse(null, 'Enrollment deleted successfully');
    }

    private function generateEnrollmentNumber()
    {
        return 'ENR-' . now()->format('Y') . '-' . str_pad(Enrollment::count() + 1, 5, '0', STR_PAD_LEFT);
    }
}