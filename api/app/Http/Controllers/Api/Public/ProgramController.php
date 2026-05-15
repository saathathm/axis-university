<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Program::query()->with('faculty');

        if ($request->filled('faculty')) {
            $query->whereHas('faculty', fn ($facultyQuery) => $facultyQuery->where('slug', $request->string('faculty')));
        }

        if ($request->filled('level')) {
            $query->where('level', $request->string('level'));
        }

        if ($request->filled('q')) {
            $search = $request->string('q');
            $query->where('title', 'like', "%{$search}%");
        }

        return response()->json([
            'data' => $query->paginate(12),
        ]);
    }

    public function show(string $program): JsonResponse
    {
        $record = Program::query()->with('faculty')
            ->where('id', $program)
            ->orWhereRaw('LOWER(code) = ?', [mb_strtolower($program)])
            ->firstOrFail();

        return response()->json([
            'data' => $record,
        ]);
    }
}