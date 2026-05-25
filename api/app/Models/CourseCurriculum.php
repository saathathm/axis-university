<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseCurriculum extends Model
{
    use HasFactory;

    protected $table = 'course_curriculums';

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'duration',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
