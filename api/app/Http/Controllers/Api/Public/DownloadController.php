<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function index(): JsonResponse
    {
        $downloads = Download::query()
            ->select(['id', 'category', 'title', 'path', 'size'])
            ->where('published', true)
            ->latest()
            ->get()
            ->map(function (Download $download): array {
                $url = $download->path;

                if ($download->path && ! str_starts_with($download->path, 'http')) {
                    $url = Storage::disk('public')->url($download->path);
                }

                return array_merge($download->toArray(), ['url' => $url]);
            });

        return response()->json([
            'data' => $downloads,
        ]);
    }
}
