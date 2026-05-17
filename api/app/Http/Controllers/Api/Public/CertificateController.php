<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cert_id' => ['required', 'string'],
            'full_name' => ['required', 'string'],
        ]);

        $certificate = Certificate::query()
            ->select(['id', 'cert_id', 'student_id', 'program_id', 'year', 'issued_at'])
            ->with([
                'student:id,first_name,last_name',
                'program:id,title',
            ])
            ->where('cert_id', $validated['cert_id'])
            ->first();

        if (! $certificate || ! $certificate->student) {
            return response()->json(['status' => 'not_found']);
        }

        $fullName = trim($certificate->student->first_name.' '.$certificate->student->last_name);

        if (mb_strtolower($fullName) !== mb_strtolower($validated['full_name'])) {
            return response()->json(['status' => 'not_found']);
        }

        return response()->json([
            'status' => 'verified',
            'data' => [
                'cert_id' => $certificate->cert_id,
                'name' => $fullName,
                'program' => $certificate->program?->title,
                'year' => $certificate->year,
                'issued_at' => $certificate->issued_at,
            ],
        ]);
    }
}
