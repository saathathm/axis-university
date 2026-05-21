<?php

namespace App\Http\Controllers\Api;

use App\Models\Recognition;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Helpers\FileUploadHelper;
use App\Http\Controllers\Controller;

class RecognitionController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $recognitions = Recognition::latest()->paginate(10);

        return $this->successResponse($recognitions, 'Recognitions fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'organizationName' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'issueDate' => ['nullable', 'date'],
            'status' => ['nullable', 'boolean'],
        ]);

        $photo = null;

        if ($request->hasFile('photo')) {
            $photo = FileUploadHelper::uploadImage($request->file('photo'), 'recognitions');
        }

        $recognition = Recognition::create([
            'title' => $validated['title'],
            'organization_name' => $validated['organizationName'] ?? null,
            'description' => $validated['description'] ?? null,
            'photo' => $photo,
            'issue_date' => $validated['issueDate'] ?? null,
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($recognition, 'Recognition created successfully', 201);
    }

    public function show(Recognition $recognition)
    {
        return $this->successResponse($recognition, 'Recognition fetched successfully');
    }

    public function update(Request $request, Recognition $recognition)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'organizationName' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'issueDate' => ['nullable', 'date'],
            'status' => ['nullable', 'boolean'],
        ]);

        $photo = $recognition->photo;

        if ($request->hasFile('photo')) {
            FileUploadHelper::deleteFile($recognition->photo);
            $photo = FileUploadHelper::uploadImage($request->file('photo'), 'recognitions');
        }

        $recognition->update([
            'title' => $validated['title'],
            'organization_name' => $validated['organizationName'] ?? null,
            'description' => $validated['description'] ?? null,
            'photo' => $photo,
            'issue_date' => $validated['issueDate'] ?? null,
            'status' => $validated['status'] ?? $recognition->status,
        ]);

        return $this->successResponse($recognition, 'Recognition updated successfully');
    }

    public function destroy(Recognition $recognition)
    {
        FileUploadHelper::deleteFile($recognition->photo);

        $recognition->delete();

        return $this->successResponse(null, 'Recognition deleted successfully');
    }
}