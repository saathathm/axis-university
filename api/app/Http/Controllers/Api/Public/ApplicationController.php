<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApplicationStoreRequest;
use App\Models\Application;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function store(ApplicationStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $program = Program::query()->findOrFail($validated['program_id']);
        $applicationUuid = (string) Str::uuid();

        $attachments = collect($request->file('attachments', []))
            ->map(function (UploadedFile $file) use ($applicationUuid): array {
                $storedPath = $file->storePublicly("applications/{$applicationUuid}", 'public');

                return [
                    'name' => $file->getClientOriginalName(),
                    'path' => $storedPath,
                    'url' => Storage::disk('public')->url($storedPath),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                ];
            })
            ->values()
            ->all();

        $application = Application::query()->create([
            'uuid' => $applicationUuid,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'passport_number' => $validated['passport_number'] ?? null,
            'date_of_birth' => $validated['date_of_birth'] ?? null,
            'contact_number' => $validated['contact_number'] ?? null,
            'street_address' => $validated['street_address'] ?? null,
            'town_city' => $validated['town_city'] ?? null,
            'country' => $validated['country'] ?? null,
            'postcode' => $validated['postcode'] ?? null,
            'email_address' => $validated['email_address'] ?? null,
            'program_id' => $program->id,
            'faculty_id' => $program->faculty_id,
            'attachments' => $attachments,
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Application submitted successfully.',
            'data' => $application,
        ], 201);
    }
}