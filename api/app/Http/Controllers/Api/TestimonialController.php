<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Helpers\FileUploadHelper;
use App\Http\Controllers\Controller;

class TestimonialController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $testimonials = Testimonial::latest()->paginate(10);

        return $this->successResponse($testimonials, 'Testimonials fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'course' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'status' => ['nullable', 'boolean'],
        ]);

        $photo = null;

        if ($request->hasFile('photo')) {
            $photo = FileUploadHelper::uploadImage($request->file('photo'), 'testimonials');
        }

        $testimonial = Testimonial::create([
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'course' => $validated['course'],
            'message' => $validated['message'],
            'photo' => $photo,
            'rating' => $validated['rating'] ?? null,
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($testimonial, 'Testimonial created successfully', 201);
    }

    public function show(Testimonial $testimonial)
    {
        return $this->successResponse($testimonial, 'Testimonial fetched successfully');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'course' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'status' => ['nullable', 'boolean'],
        ]);

        $photo = $testimonial->photo;

        if ($request->hasFile('photo')) {
            FileUploadHelper::deleteFile($testimonial->photo);
            $photo = FileUploadHelper::uploadImage($request->file('photo'), 'testimonials');
        }

        $testimonial->update([
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'course' => $validated['course'],
            'message' => $validated['message'],
            'photo' => $photo,
            'rating' => $validated['rating'] ?? null,
            'status' => $validated['status'] ?? $testimonial->status,
        ]);

        return $this->successResponse($testimonial, 'Testimonial updated successfully');
    }

    public function destroy(Testimonial $testimonial)
    {
        FileUploadHelper::deleteFile($testimonial->photo);

        $testimonial->delete();

        return $this->successResponse(null, 'Testimonial deleted successfully');
    }
}