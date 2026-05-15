<?php

use App\Http\Controllers\Api\Admin\ApplicationController as AdminApplicationController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Api\Admin\FacultyController as AdminFacultyController;
use App\Http\Controllers\Api\Admin\DownloadController as AdminDownloadController;
use App\Http\Controllers\Api\Public\DownloadController;
use App\Http\Controllers\Api\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Api\Public\NewsController;
use App\Http\Controllers\Api\Public\RecognitionController;
use App\Http\Controllers\Api\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\Api\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\Public\ApplicationController;
use App\Http\Controllers\Api\Public\CertificateController;
use App\Http\Controllers\Api\Public\FacultyController;
use App\Http\Controllers\Api\Public\ProgramController;
use App\Http\Controllers\Api\Public\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/faculties', [FacultyController::class, 'index']);
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/{program}', [ProgramController::class, 'show']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/downloads', [DownloadController::class, 'index']);
    Route::get('/recognitions', [RecognitionController::class, 'index']);
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::get('/certificates/verify', [CertificateController::class, 'verify']);

    Route::prefix('admin')->group(function (): void {
        Route::post('/login', [AuthController::class, 'login']);

        Route::middleware(['auth:api', 'admin'])->group(function (): void {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
            Route::get('/profile', [AuthController::class, 'profile']);

            Route::apiResource('faculties', AdminFacultyController::class);
            Route::apiResource('programs', AdminProgramController::class);
            Route::apiResource('applications', AdminApplicationController::class)->except(['store']);
            Route::post('/applications/{application}/approve', [AdminApplicationController::class, 'approve']);
            Route::post('/applications/{application}/reject', [AdminApplicationController::class, 'reject']);
            Route::apiResource('students', AdminStudentController::class);
            Route::apiResource('certificates', AdminCertificateController::class);
            Route::apiResource('testimonials', AdminTestimonialController::class);
            Route::apiResource('news', AdminNewsController::class);
            Route::apiResource('downloads', AdminDownloadController::class);
        });
    });
});
