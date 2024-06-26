<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre', 'palabra', 'nivel', 'tiempo', 'intentos', 'puntos', 'foto',
    ];
    

}
