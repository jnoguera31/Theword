<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Codec\TimestampFirstCombCodec;

class words extends Model
{
    use HasFactory;
    public $timestamp=false;
}
