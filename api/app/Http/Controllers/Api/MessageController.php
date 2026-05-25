<?php

namespace App\Http\Controllers\Api;

use App\Models\Message;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $messages = Message::latest()->paginate(10);

        return $this->successResponse($messages, 'Messages fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $message = Message::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'unread',
        ]);

        return $this->successResponse($message, 'Message sent successfully', 201);
    }

    public function show(Message $message)
    {
        if ($message->status === 'unread') {
            $message->update([
                'status' => 'read',
                'read_at' => now(),
            ]);
        }

        return $this->successResponse($message, 'Message fetched successfully');
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:unread,read,replied'],
        ]);

        $message->update([
            'status' => $validated['status'],
            'read_at' => $validated['status'] === 'read' ? now() : $message->read_at,
        ]);

        return $this->successResponse($message, 'Message updated successfully');
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return $this->successResponse(null, 'Message deleted successfully');
    }
}
