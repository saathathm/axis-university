<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    use HasFactory;

    protected $fillable = ['category', 'title', 'path', 'size', 'published'];

    protected $casts = [
        'published' => 'boolean',
    ];
}