<?php

namespace App\Http\Controllers\Api;

use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;

class NewsletterSubscriptionController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $subscriptions = NewsletterSubscription::latest()->paginate(10);

        return $this->successResponse($subscriptions, 'Newsletter subscriptions fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $existingSubscription = NewsletterSubscription::where('email', $validated['email'])->first();

        if ($existingSubscription) {
            if (!$existingSubscription->status) {
                $existingSubscription->update([
                    'status' => true,
                    'subscribed_at' => now(),
                ]);

                return $this->successResponse($existingSubscription, 'Newsletter subscription activated successfully');
            }

            return $this->errorResponse('This email is already subscribed', 422);
        }

        $subscription = NewsletterSubscription::create([
            'email' => $validated['email'],
            'status' => true,
            'subscribed_at' => now(),
        ]);

        return $this->successResponse($subscription, 'Newsletter subscribed successfully', 201);
    }

    public function show(NewsletterSubscription $newsletterSubscription)
    {
        return $this->successResponse($newsletterSubscription, 'Newsletter subscription fetched successfully');
    }

    public function update(Request $request, NewsletterSubscription $newsletterSubscription)
    {
        $validated = $request->validate([
            'status' => ['required', 'boolean'],
        ]);

        $newsletterSubscription->update([
            'status' => $validated['status'],
        ]);

        return $this->successResponse($newsletterSubscription, 'Newsletter subscription updated successfully');
    }

    public function destroy(NewsletterSubscription $newsletterSubscription)
    {
        $newsletterSubscription->delete();

        return $this->successResponse(null, 'Newsletter subscription deleted successfully');
    }
}
