<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid','first_name','last_name','passport_number','date_of_birth','contact_number','street_address','town_city','country','postcode','email_address','program_id','faculty_id','attachments','status','admin_note','processed_by','submitted_at','processed_at'
    ];

    protected $casts = [
        'attachments' => 'array',
        'submitted_at' => 'datetime',
        'processed_at' => 'datetime',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
