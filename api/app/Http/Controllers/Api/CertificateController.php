<?php

namespace App\Http\Controllers\Api;

use App\Models\Certificate;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CertificateController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $certificates = Certificate::with('enrollment.student', 'enrollment.course')
            ->latest()
            ->paginate(10);

        return $this->successResponse($certificates, 'Certificates fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollmentId' => ['required', 'exists:enrollments,id', 'unique:certificates,enrollment_id'],
            'issueDate' => ['required', 'date'],
            'expiryDate' => ['nullable', 'date', 'after_or_equal:issueDate'],
            'grade' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:valid,revoked,expired'],
        ]);

        $certificate = Certificate::create([
            'certificate_number' => $this->generateCertificateNumber(),
            'enrollment_id' => $validated['enrollmentId'],
            'issue_date' => $validated['issueDate'],
            'expiry_date' => $validated['expiryDate'] ?? null,
            'grade' => $validated['grade'] ?? null,
            'status' => $validated['status'] ?? 'valid',
        ]);

        return $this->successResponse($certificate, 'Certificate created successfully', 201);
    }

    public function show(Certificate $certificate)
    {
        $certificate->load('enrollment.student', 'enrollment.course.faculty');

        return $this->successResponse($certificate, 'Certificate fetched successfully');
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'enrollmentId' => ['required', 'exists:enrollments,id', 'unique:certificates,enrollment_id,' . $certificate->id],
            'issueDate' => ['required', 'date'],
            'expiryDate' => ['nullable', 'date', 'after_or_equal:issueDate'],
            'grade' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:valid,revoked,expired'],
        ]);

        $certificate->update([
            'enrollment_id' => $validated['enrollmentId'],
            'issue_date' => $validated['issueDate'],
            'expiry_date' => $validated['expiryDate'] ?? null,
            'grade' => $validated['grade'] ?? null,
            'status' => $validated['status'] ?? $certificate->status,
        ]);

        return $this->successResponse($certificate, 'Certificate updated successfully');
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return $this->successResponse(null, 'Certificate deleted successfully');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'certificateNumber' => ['required', 'string'],
        ]);

        $certificate = Certificate::with('enrollment.student', 'enrollment.course')
            ->where('certificate_number', $request->certificateNumber)
            ->first();

        if (!$certificate) {
            return $this->errorResponse('Certificate not found', 404);
        }

        return $this->successResponse($certificate, 'Certificate verified successfully');
    }

    private function generateCertificateNumber()
    {
        return 'CERT-' . now()->format('Y') . '-' . str_pad(Certificate::count() + 1, 5, '0', STR_PAD_LEFT);
    }
}