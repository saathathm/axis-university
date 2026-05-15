<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => News::query()->latest('date')->latest()->paginate(20)]);
    }

    public function show(News $news): JsonResponse
    {
        return response()->json(['data' => $news]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['required', 'string'],
            'date' => ['required', 'date'],
        ]);

        $news = News::query()->create($validated);

        return response()->json(['message' => 'News item created successfully.', 'data' => $news], 201);
    }

    public function update(Request $request, News $news): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['required', 'string'],
            'date' => ['required', 'date'],
        ]);

        $news->update($validated);

        return response()->json(['message' => 'News item updated successfully.', 'data' => $news]);
    }

    public function destroy(News $news): JsonResponse
    {
        $news->delete();

        return response()->json(['message' => 'News item deleted successfully.']);
    }
}