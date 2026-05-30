<?php

namespace App\Http\Controllers\Api;

use App\Models\Application;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Download;
use App\Models\Message;
use App\Models\NewsletterSubscription;
use App\Traits\ApiResponse;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $data = [
            'courses' => Course::count(),
            'applications' => [
                'total' => Application::count(),
                'pending' => Application::where('status', 'pending')->count(),
                'enrolled' => Application::where('status', 'enrolled')->count(),
            ],
            'certificates' => [
                'total' => Certificate::count(),
                'valid' => Certificate::where('status', 'valid')->count(),
            ],
            'downloads' => Download::count(),
            'messages' => [
                'total' => Message::count(),
                'unread' => Message::where('status', 'unread')->count(),
            ],
            'newsletterSubscriptions' => NewsletterSubscription::count(),
            'recentApplications' => Application::with('course')
                ->latest('submitted_at')
                ->limit(5)
                ->get(),
            'recentMessages' => Message::latest()->limit(5)->get(),
        ];

        return $this->successResponse($data, 'Dashboard data fetched successfully');
    }
}
