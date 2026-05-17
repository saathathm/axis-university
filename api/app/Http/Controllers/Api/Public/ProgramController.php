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
        $query = Program::query()
            ->select([
                'id',
                'faculty_id',
                'code',
                'title',
                'level',
                'duration',
                'overview',
                'description',
                'curriculum',
                'requirements',
                'intake',
            ])
            ->with('faculty:id,name,slug');

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
            'data' => $query->latest()->simplePaginate(12),
        ]);
    }

    public function show(string $program): JsonResponse
    {
        $query = Program::query()
            ->select([
                'id',
                'faculty_id',
                'code',
                'title',
                'level',
                'duration',
                'overview',
                'description',
                'curriculum',
                'requirements',
                'intake',
            ])
            ->with('faculty:id,name,slug');

        $record = ctype_digit($program)
            ? $query->whereKey((int) $program)->firstOrFail()
            : $query->where('code', mb_strtoupper($program))->firstOrFail();

        return response()->json([
            'data' => $record,
        ]);
    }
}
