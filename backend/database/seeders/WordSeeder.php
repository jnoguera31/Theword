<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $words = ['lunas', 'casas', 'david', 'freno', 'patos'];

        foreach ($words as $word) {
            DB::table('words')->insert([
                'word' => $word,
            ]);
        }
    }
}
