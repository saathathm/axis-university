<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\JsonResponse;

class FacultyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Faculty::query()
                ->select(['id', 'name', 'slug', 'description', 'icon', 'color'])
                ->orderBy('name')
                ->get(),
        ]);
    }
}
