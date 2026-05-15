<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = ['faculty_id','code','title','level','duration','overview','description','curriculum','requirements','intake'];

    protected $casts = [
        'curriculum' => 'array',
        'requirements' => 'array',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
