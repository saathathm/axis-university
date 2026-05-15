<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_number')->unique();
            $table->foreignId('application_id')->nullable()->constrained('applications')->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('passport_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('street_address')->nullable();
            $table->string('town_city')->nullable();
            $table->string('country')->nullable();
            $table->string('postcode')->nullable();
            $table->string('email')->nullable();
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->timestamp('enrolled_at')->nullable();
            $table->enum('status', ['active','inactive'])->default('active');
            $table->timestamps();
            $table->index('student_number');
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
};
