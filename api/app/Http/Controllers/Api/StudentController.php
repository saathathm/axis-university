<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use App\Models\Enrollment;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $students = Student::with('enrollments.course')
            ->latest()
            ->paginate(10);

        return $this->successResponse($students, 'Students fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'emailAddress' => ['required', 'email', 'max:255', 'unique:students,email_address'],
            'contactNumber' => ['required', 'string', 'max:255'],
            'passportNumber' => ['nullable', 'string', 'max:255'],
            'dateOfBirth' => ['nullable', 'date'],
            'streetAddress' => ['nullable', 'string', 'max:255'],
            'townCity' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'postcode' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:active,inactive,suspended'],
            'courseId' => ['nullable', 'exists:courses,id'],
        ]);

        try {
            DB::beginTransaction();

            $student = Student::create([
                'student_number' => $this->generateStudentNumber(),
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email_address' => $validated['emailAddress'],
                'contact_number' => $validated['contactNumber'],
                'passport_number' => $validated['passportNumber'] ?? null,
                'date_of_birth' => $validated['dateOfBirth'] ?? null,
                'street_address' => $validated['streetAddress'] ?? null,
                'town_city' => $validated['townCity'] ?? null,
                'country' => $validated['country'] ?? null,
                'postcode' => $validated['postcode'] ?? null,
                'status' => $validated['status'] ?? 'active',
            ]);

            $enrollment = null;

            if (!empty($validated['courseId'])) {
                $enrollment = Enrollment::create([
                    'enrollment_number' => $this->generateEnrollmentNumber(),
                    'student_id' => $student->id,
                    'course_id' => $validated['courseId'],
                    'enrollment_date' => now()->toDateString(),
                    'status' => 'active',
                ]);
            }

            DB::commit();

            return $this->successResponse([
                'student' => $student,
                'enrollment' => $enrollment,
            ], 'Student created successfully', 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function show(Student $student)
    {
        $student->load('enrollments.course.faculty', 'enrollments.certificate');

        return $this->successResponse($student, 'Student fetched successfully');
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'emailAddress' => ['required', 'email', 'max:255', 'unique:students,email_address,' . $student->id],
            'contactNumber' => ['required', 'string', 'max:255'],
            'passportNumber' => ['nullable', 'string', 'max:255'],
            'dateOfBirth' => ['nullable', 'date'],
            'streetAddress' => ['nullable', 'string', 'max:255'],
            'townCity' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'postcode' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:active,inactive,suspended'],
        ]);

        $student->update([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'email_address' => $validated['emailAddress'],
            'contact_number' => $validated['contactNumber'],
            'passport_number' => $validated['passportNumber'] ?? null,
            'date_of_birth' => $validated['dateOfBirth'] ?? null,
            'street_address' => $validated['streetAddress'] ?? null,
            'town_city' => $validated['townCity'] ?? null,
            'country' => $validated['country'] ?? null,
            'postcode' => $validated['postcode'] ?? null,
            'status' => $validated['status'] ?? $student->status,
        ]);

        return $this->successResponse($student, 'Student updated successfully');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return $this->successResponse(null, 'Student deleted successfully');
    }

    private function generateStudentNumber()
    {
        return 'STU-' . now()->format('ymd') . '-' . strtoupper(Str::random(4));
    }

    private function generateEnrollmentNumber()
    {
        return 'ENR-' . now()->format('ymd') . '-' . strtoupper(Str::random(4));
    }
}
