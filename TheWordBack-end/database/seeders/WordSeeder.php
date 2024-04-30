<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $palabras = ['Mango', 'Tigre', 'Luzca', 'Carta', 'Pezon', 'Cable', 'Rinon', 'Lente', 'Piano', 'Cebra'];

        foreach ($palabras as $palabra) {
            DB::table('words')->insert([
                'word' => $palabra,
            ]);
        }
    }
}

