<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('memo_test_id')->constrained()->references('id')->on('memo_tests')->onDelete('cascade');
            $table->string('user_token');
            $table->string('user_name');
            $table->integer('retries')->default(0);
            $table->integer('numbe_of_pairs')->default(0);
            $table->double('score')->default(0);
            $table->enum('state', [ 'Started', 'Finished'])->default('Started');
            $table->timestamps();
        });

        Schema::create('pairs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_sessions_id')->constrained()->references('id')->on('game_sessions')->onDelete('cascade');
            $table->foreignId('image_id')->constrained()->references('id')->on('images')->onDelete('cascade');
            $table->enum('state', [ 'Hidden', 'Paired'])->default('Hidden');
            $table->integer('position_a')->default(0);
            $table->integer('position_b')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pairs');
        Schema::dropIfExists('game_session');
    }
};
