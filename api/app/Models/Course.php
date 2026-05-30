<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'name',
        'slug',
        'code',
        'level',
        'duration',
        'study_mode',
        'students_intake',
        'short_description',
        'description',
        'entry_requirements',
        'status',
    ];

    protected $casts = [
        'students_intake' => 'integer',
        'status' => 'boolean',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    public function curriculums()
    {
        return $this->hasMany(CourseCurriculum::class)->orderBy('sort_order');
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'enrollments')
            ->withPivot([
                'enrollment_number',
                'application_id',
                'enrollment_date',
                'start_date',
                'end_date',
                'completion_date',
                'status',
                'grade',
                'admin_note',
            ])
            ->withTimestamps();
    }
}
