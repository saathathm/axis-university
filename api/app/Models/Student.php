<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_number',
        'first_name',
        'last_name',
        'email_address',
        'contact_number',
        'passport_number',
        'date_of_birth',
        'street_address',
        'town_city',
        'country',
        'postcode',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'enrollments')
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

    public function certificates()
    {
        return $this->hasManyThrough(
            Certificate::class,
            Enrollment::class,
            'student_id',
            'enrollment_id',
            'id',
            'id'
        );
    }
}