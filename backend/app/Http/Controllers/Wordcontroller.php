<?php

namespace App\Http\Controllers;

use App\Models\words;
use Illuminate\Http\Request;

class Wordcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(words::all());
    } 

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $word = new words();
        $word->$word = $request->word;
        $word->save();

        return response()->json($word);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, words $word)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)

    {
        $word = words::find($id);
        $word->delete();
        return response()->json("Palabra borrada = ",$word);
    }
}
