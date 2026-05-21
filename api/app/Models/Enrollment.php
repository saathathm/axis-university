<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'enrollment_number',
        'student_id',
        'course_id',
        'application_id',
        'enrollment_date',
        'start_date',
        'end_date',
        'completion_date',
        'status',
        'grade',
        'admin_note',
    ];

    protected $casts = [
        'enrollment_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'completion_date' => 'date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function certificate()
    {
        return $this->hasOne(Certificate::class);
    }
}