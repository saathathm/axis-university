<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Testimonial::query()->where('approved', true)->latest()->get(),
        ]);
    }
}