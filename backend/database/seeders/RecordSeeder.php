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
                'foto' => 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
                
            ],
            [
                'nombre' => 'Usuario2',
                'palabra' => 'Palabra2',
                'nivel' => 2,
                'tiempo' => '00:04:30',
                'intentos' => 2,
                'puntos' => 200,
                'foto' => 'https://www.fichajes.com/build/images/player-covers/cristiano-ronaldo.352c95f5.jpg',
            ]
        ]);
    }
}
