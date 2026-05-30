<?php

namespace App\Http\Controllers\Api;

use App\Models\Download;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Helpers\FileUploadHelper;
use App\Http\Controllers\Controller;

class DownloadController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $downloads = Download::with('course')
            ->latest()
            ->paginate(10);

        return $this->successResponse($downloads, 'Downloads fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'courseId' => [
                'required',
                'exists:courses,id',
                Rule::unique('downloads', 'course_id'),
            ],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['nullable', 'boolean'],
        ]);

        $file = FileUploadHelper::uploadFile($request->file('file'), 'downloads');

        $download = Download::create([
            'course_id' => $validated['courseId'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file' => $file,
            'file_type' => $request->file('file')->getClientOriginalExtension(),
            'status' => $validated['status'] ?? true,
        ]);

        return $this->successResponse($download, 'Download created successfully', 201);
    }

    public function show(Download $download)
    {
        $download->load('course');

        return $this->successResponse($download, 'Download fetched successfully');
    }

    public function editData(Download $download)
    {
        $download->load('course');

        $courses = \App\Models\Course::with('download')
            ->latest()
            ->get();

        $availableCourses = $courses->filter(function ($course) use ($download) {
            return (int) $course->id === (int) $download->course_id || !$course->download;
        })->values();

        return $this->successResponse([
            'download' => $download,
            'courses' => $courses,
            'availableCourses' => $availableCourses,
        ], 'Download edit data fetched successfully');
    }

    public function update(Request $request, Download $download)
    {
        $validated = $request->validate([
            'courseId' => [
                'required',
                'exists:courses,id',
                Rule::unique('downloads', 'course_id')
                    ->ignore($download->id)
                    ->where(fn ($query) => $query->where('course_id', $request->courseId)),
            ],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['nullable', 'boolean'],
        ]);

        $file = $download->file;
        $fileType = $download->file_type;

        if ($request->hasFile('file')) {
            FileUploadHelper::deleteFile($download->file);
            $file = FileUploadHelper::uploadFile($request->file('file'), 'downloads');
            $fileType = $request->file('file')->getClientOriginalExtension();
        }

        $download->update([
            'course_id' => $validated['courseId'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file' => $file,
            'file_type' => $fileType,
            'status' => $validated['status'] ?? $download->status,
        ]);

        return $this->successResponse($download, 'Download updated successfully');
    }

    public function destroy(Download $download)
    {
        FileUploadHelper::deleteFile($download->file);

        $download->delete();

        return $this->successResponse(null, 'Download deleted successfully');
    }
}