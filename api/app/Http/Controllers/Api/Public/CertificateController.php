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
            ->with('student')
            ->where('cert_id', $validated['cert_id'])
            ->first();

        if (! $certificate || ! $certificate->student) {
            return response()->json(['status' => 'not_found'], 404);
        }

        $fullName = trim($certificate->student->first_name.' '.$certificate->student->last_name);

        if (mb_strtolower($fullName) !== mb_strtolower($validated['full_name'])) {
            return response()->json(['status' => 'not_found'], 404);
        }

        return response()->json([
            'status' => 'verified',
            'data' => $certificate,
        ]);
    }
}