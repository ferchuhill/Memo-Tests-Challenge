<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemoTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\MemoTest::factory()->create([
            'name' => 'Ibera Birds',
        ]);

        \App\Models\MemoTest::factory()->create([
            'name' => 'Iguazu Birds',
        ]);
    }
}
