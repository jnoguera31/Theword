<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('records')->insert([
            [
                'nombre' => 'Usuario1',
                'palabra' => 'Palabra1',
                'nivel' => 1,
                'tiempo' => '00:05:00',
                'intentos' => 3,
                'puntos' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Usuario2',
                'palabra' => 'Palabra2',
                'nivel' => 2,
                'tiempo' => '00:04:30',
                'intentos' => 2,
                'puntos' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
