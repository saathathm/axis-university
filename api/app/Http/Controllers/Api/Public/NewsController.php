<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => News::query()
                ->select(['id', 'title', 'excerpt', 'body', 'date'])
                ->latest('date')
                ->latest()
                ->limit(12)
                ->get(),
        ]);
    }
}
