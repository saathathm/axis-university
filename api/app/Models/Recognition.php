<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recognition extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'organization_name',
        'description',
        'photo',
        'issue_date',
        'status',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'status' => 'boolean',
    ];
}