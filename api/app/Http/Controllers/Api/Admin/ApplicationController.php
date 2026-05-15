<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Application::query()->with(['program', 'faculty']);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return response()->json(['data' => $query->latest()->paginate(20)]);
    }

    public function show(Application $application): JsonResponse
    {
        return response()->json(['data' => $application->load(['program', 'faculty'])]);
    }

    public function update(Request $request, Application $application): JsonResponse
    {
        $validated = $request->validate([
            'admin_note' => ['nullable', 'string'],
        ]);

        $application->update($validated);

        return response()->json(['message' => 'Application updated successfully.', 'data' => $application]);
    }

    public function approve(Request $request, Application $application): JsonResponse
    {
        $admin = $request->user();

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Only pending applications can be approved.'], 422);
        }

        $student = DB::transaction(function () use ($application, $admin) {
            $student = Student::query()->create([
                'student_number' => '',
                'application_id' => $application->id,
                'first_name' => $application->first_name,
                'last_name' => $application->last_name,
                'passport_number' => $application->passport_number,
                'date_of_birth' => $application->date_of_birth,
                'contact_number' => $application->contact_number,
                'street_address' => $application->street_address,
                'town_city' => $application->town_city,
                'country' => $application->country,
                'postcode' => $application->postcode,
                'email' => $application->email_address,
                'program_id' => $application->program_id,
                'enrolled_at' => now(),
                'status' => 'active',
            ]);

            $student->update([
                'student_number' => sprintf('AXIS-%s-%04d', now()->year, $student->id),
            ]);

            $application->update([
                'status' => 'approved',
                'processed_by' => $admin?->id,
                'processed_at' => now(),
            ]);

            return $student->fresh();
        });

        return response()->json([
            'message' => 'Application approved successfully.',
            'data' => [
                'application' => $application->fresh(),
                'student' => $student,
            ],
        ]);
    }

    public function reject(Request $request, Application $application): JsonResponse
    {
        $validated = $request->validate([
            'admin_note' => ['nullable', 'string'],
        ]);

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Only pending applications can be rejected.'], 422);
        }

        $application->update([
            'status' => 'rejected',
            'admin_note' => $validated['admin_note'] ?? $application->admin_note,
            'processed_by' => $request->user()?->id,
            'processed_at' => now(),
        ]);

        return response()->json(['message' => 'Application rejected successfully.', 'data' => $application->fresh()]);
    }

    public function destroy(Application $application): JsonResponse
    {
        $application->delete();

        return response()->json(['message' => 'Application deleted successfully.']);
    }
}