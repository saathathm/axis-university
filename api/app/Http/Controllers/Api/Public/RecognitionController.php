<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Recognition;
use Illuminate\Http\JsonResponse;

class RecognitionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Recognition::query()
                ->where('published', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        ]);
    }
}
