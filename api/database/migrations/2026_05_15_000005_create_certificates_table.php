<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('cert_id')->unique();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->string('year')->nullable();
            $table->timestamp('issued_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->index('cert_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('certificates');
    }
};
