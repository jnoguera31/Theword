<?php

use App\Http\Controllers\Wordcontroller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WordcontrollerRoute;



Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('words', Wordcontroller::class);