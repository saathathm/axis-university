<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Testimonial::query()->latest()->paginate(20)]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'program' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'approved' => ['boolean'],
        ]);

        $testimonial = Testimonial::query()->create($validated);

        return response()->json(['message' => 'Testimonial created successfully.', 'data' => $testimonial], 201);
    }

    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json(['data' => $testimonial]);
    }

    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'program' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'approved' => ['boolean'],
        ]);

        $testimonial->update($validated);

        return response()->json(['message' => 'Testimonial updated successfully.', 'data' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted successfully.']);
    }
}