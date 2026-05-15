<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $token = JWTAuth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ]);

        if (! $token) {
            return response()->json(['message' => 'Invalid credentials.'], 422);
        }

        $user = Auth::user();

        if (! $user || ! method_exists($user, 'isAdmin') || ! $user->isAdmin()) {
            JWTAuth::setToken($token)->invalidate();

            return response()->json(['message' => 'Admin access required.'], 403);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => $user,
        ]);
    }

    public function logout(): JsonResponse
    {
        JWTAuth::parseToken()->invalidate();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    public function refresh(): JsonResponse
    {
        return response()->json([
            'access_token' => JWTAuth::parseToken()->refresh(),
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }

    public function profile(): JsonResponse
    {
        return response()->json([
            'user' => Auth::user(),
        ]);
    }
}