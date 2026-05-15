<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculties')->onDelete('cascade');
            $table->string('code')->nullable();
            $table->string('title');
            $table->string('level')->nullable();
            $table->string('duration')->nullable();
            $table->text('overview')->nullable();
            $table->text('description')->nullable();
            $table->json('curriculum')->nullable();
            $table->json('requirements')->nullable();
            $table->integer('intake')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('programs');
    }
};
