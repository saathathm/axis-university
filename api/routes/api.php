<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DownloadController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\RecognitionController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NewsletterSubscriptionController;
use App\Http\Controllers\Api\CourseCurriculumController;
use App\Http\Controllers\Api\DashboardController;

Route::post('/login', [AuthController::class, 'login']);

// Public application submit
Route::post('/applications', [ApplicationController::class, 'store']);

// Public newsletter subscription submit
Route::post('/newsletter-subscriptions', [NewsletterSubscriptionController::class, 'store']);

// Public contact message submit
Route::post('/messages', [MessageController::class, 'store']);

// Public readable routes
Route::get('/faculties', [FacultyController::class, 'index']);
Route::get('/faculties/{faculty}', [FacultyController::class, 'show']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}/curriculums', [CourseCurriculumController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);

// Certificate verify route must come before /certificates/{certificate}
Route::get('/certificates/verify/{certificateNumber}', [CertificateController::class, 'verify']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/certificates/{certificate}', [CertificateController::class, 'show']);

Route::get('/downloads', [DownloadController::class, 'index']);
Route::get('/downloads/{download}', [DownloadController::class, 'show']);
Route::get('/downloads/{download}/edit-data', [DownloadController::class, 'editData']);

Route::get('/recognitions', [RecognitionController::class, 'index']);
Route::get('/recognitions/{recognition}', [RecognitionController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);

Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('can:manage-admin-data')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Admin create/update/delete only
        Route::apiResource('/faculties', FacultyController::class)->except(['index', 'show']);
        Route::apiResource('/courses', CourseController::class)->except(['index', 'show']);
        Route::apiResource('/certificates', CertificateController::class)->except(['index', 'show']);
        Route::apiResource('/downloads', DownloadController::class)->except(['index', 'show']);
        Route::apiResource('/recognitions', RecognitionController::class)->except(['index', 'show']);
        Route::apiResource('/testimonials', TestimonialController::class)->except(['index', 'show']);

        // Admin course curriculum management
        Route::post('/courses/{course}/curriculums', [CourseCurriculumController::class, 'store']);
        Route::get('/course-curriculums/{courseCurriculum}', [CourseCurriculumController::class, 'show']);
        Route::put('/course-curriculums/{courseCurriculum}', [CourseCurriculumController::class, 'update']);
        Route::patch('/course-curriculums/{courseCurriculum}', [CourseCurriculumController::class, 'update']);
        Route::delete('/course-curriculums/{courseCurriculum}', [CourseCurriculumController::class, 'destroy']);

        // Admin only
        Route::apiResource('/students', StudentController::class);
        Route::get('/enrollments/{enrollment}/edit-data', [EnrollmentController::class, 'editData']);
        Route::apiResource('/enrollments', EnrollmentController::class);

        // Admin newsletter subscription management
        Route::apiResource('/newsletter-subscriptions', NewsletterSubscriptionController::class)->except(['store']);

        // Admin message management
        Route::apiResource('/messages', MessageController::class)->except(['store']);

        // Admin application management
        Route::get('/applications', [ApplicationController::class, 'index']);
        Route::get('/applications/{application}', [ApplicationController::class, 'show']);
        Route::patch('/applications/{application}/approve', [ApplicationController::class, 'approve']);
        Route::patch('/applications/{application}/reject', [ApplicationController::class, 'reject']);
    });
});
