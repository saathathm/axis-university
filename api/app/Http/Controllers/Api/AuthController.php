<?php

namespace App\Http\Controllers\Api;

use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return $this->errorResponse('Invalid email or password', 401);
        }

        if (!Auth::guard('api')->user()->is_active) {
            Auth::guard('api')->logout();

            return $this->errorResponse('Your account is inactive', 403);
        }

        return $this->successResponse([
            'user' => Auth::guard('api')->user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
        ], 'Login successful');
    }

    public function me()
    {
        return $this->successResponse(Auth::guard('api')->user(), 'User profile fetched');
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return $this->successResponse(null, 'Logout successful');
    }
}
