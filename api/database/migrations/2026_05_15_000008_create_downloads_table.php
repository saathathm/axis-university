<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('title');
            $table->string('path');
            $table->string('size')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('downloads');
    }
};