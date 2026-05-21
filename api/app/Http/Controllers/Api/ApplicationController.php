<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use App\Models\Enrollment;
use App\Models\Application;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    use ApiResponse;

    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'passportNumber' => ['required', 'string', 'max:255'],
            'dateOfBirth' => ['required', 'date'],
            'contactNumber' => ['required', 'string', 'max:255'],
            'streetAddress' => ['required', 'string', 'max:255'],
            'townCity' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'postcode' => ['required', 'string', 'max:255'],
            'emailAddress' => ['required', 'email', 'max:255'],
            'courseId' => ['required', 'exists:courses,id'],
        ]);

        $application = Application::create([
            'application_number' => 'APP-' . now()->format('Y') . '-' . str_pad(Application::count() + 1, 5, '0', STR_PAD_LEFT),
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'passport_number' => $validated['passportNumber'],
            'date_of_birth' => $validated['dateOfBirth'],
            'contact_number' => $validated['contactNumber'],
            'street_address' => $validated['streetAddress'],
            'town_city' => $validated['townCity'],
            'country' => $validated['country'],
            'postcode' => $validated['postcode'],
            'email_address' => $validated['emailAddress'],
            'course_id' => $validated['courseId'],
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        return $this->successResponse($application, 'Application submitted successfully', 201);
    }

    public function index()
    {
        $applications = Application::with('course.faculty')
            ->latest()
            ->paginate(10);

        return $this->successResponse($applications, 'Applications fetched successfully');
    }

    public function show(Application $application)
    {
        $application->load('course.faculty', 'enrollment');

        return $this->successResponse($application, 'Application fetched successfully');
    }

    public function approve(Application $application)
    {
        if ($application->status !== 'pending') {
            return $this->errorResponse('Only pending applications can be approved', 422);
        }

        try {
            DB::beginTransaction();

            $student = Student::firstOrCreate(
                ['email_address' => $application->email_address],
                [
                    'student_number' => 'STU-' . now()->format('Y') . '-' . str_pad(Student::count() + 1, 5, '0', STR_PAD_LEFT),
                    'first_name' => $application->first_name,
                    'last_name' => $application->last_name,
                    'contact_number' => $application->contact_number,
                    'passport_number' => $application->passport_number,
                    'date_of_birth' => $application->date_of_birth,
                    'street_address' => $application->street_address,
                    'town_city' => $application->town_city,
                    'country' => $application->country,
                    'postcode' => $application->postcode,
                    'status' => 'active',
                ]
            );

            $alreadyEnrolled = Enrollment::where('student_id', $student->id)
                ->where('course_id', $application->course_id)
                ->exists();

            if ($alreadyEnrolled) {
                DB::rollBack();

                return $this->errorResponse('Student is already enrolled in this course', 422);
            }

            $enrollment = Enrollment::create([
                'enrollment_number' => 'ENR-' . now()->format('Y') . '-' . str_pad(Enrollment::count() + 1, 5, '0', STR_PAD_LEFT),
                'student_id' => $student->id,
                'course_id' => $application->course_id,
                'application_id' => $application->id,
                'enrollment_date' => now()->toDateString(),
                'status' => 'active',
            ]);

            $application->update([
                'status' => 'enrolled',
                'reviewed_at' => now(),
            ]);

            DB::commit();

            return $this->successResponse([
                'student' => $student,
                'enrollment' => $enrollment,
                'application' => $application,
            ], 'Application approved and enrollment created successfully');

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function reject(Request $request, Application $application)
    {
        if ($application->status !== 'pending') {
            return $this->errorResponse('Only pending applications can be rejected', 422);
        }

        $request->validate([
            'adminNote' => ['nullable', 'string'],
        ]);

        $application->update([
            'status' => 'rejected',
            'admin_note' => $request->adminNote,
            'reviewed_at' => now(),
        ]);

        return $this->successResponse($application, 'Application rejected successfully');
    }
}