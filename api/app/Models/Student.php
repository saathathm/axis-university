<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['student_number','application_id','first_name','last_name','passport_number','date_of_birth','contact_number','street_address','town_city','country','postcode','email','program_id','enrolled_at','status'];

    protected $casts = [
        'enrolled_at' => 'datetime',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
