<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Download::query()->latest()->paginate(20)]);
    }

    public function show(Download $download): JsonResponse
    {
        return response()->json(['data' => $download]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'path' => ['nullable', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'max:51200'],
            'size' => ['nullable', 'string', 'max:50'],
            'published' => ['nullable', 'boolean'],
        ]);

        $path = $validated['path'] ?? null;
        $size = $validated['size'] ?? null;

        if ($request->hasFile('file')) {
            /** @var UploadedFile $file */
            $file = $request->file('file');
            $path = $file->storePublicly('downloads', 'public');
            $size = (string) $file->getSize();
        }

        $download = Download::query()->create([
            'category' => $validated['category'],
            'title' => $validated['title'],
            'path' => $path,
            'size' => $size,
            'published' => $validated['published'] ?? false,
        ]);

        return response()->json(['message' => 'Download created successfully.', 'data' => $download], 201);
    }

    public function update(Request $request, Download $download): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'path' => ['nullable', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'max:51200'],
            'size' => ['nullable', 'string', 'max:50'],
            'published' => ['nullable', 'boolean'],
        ]);

        $path = $validated['path'] ?? $download->path;
        $size = $validated['size'] ?? $download->size;

        if ($request->hasFile('file')) {
            /** @var UploadedFile $file */
            $file = $request->file('file');
            $path = $file->storePublicly('downloads', 'public');
            $size = (string) $file->getSize();
        }

        $download->update([
            'category' => $validated['category'],
            'title' => $validated['title'],
            'path' => $path,
            'size' => $size,
            'published' => $validated['published'] ?? $download->published,
        ]);

        return response()->json(['message' => 'Download updated successfully.', 'data' => $download]);
    }

    public function destroy(Download $download): JsonResponse
    {
        $download->delete();

        return response()->json(['message' => 'Download deleted successfully.']);
    }
}