<?php

namespace App\Http\Controllers;

use App\Models\word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(word::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $word = new word();
        $word->$word = $request->word;
        $word->save();

        return response()->json($word);
    }

    /**
     * Display the specified resource.
     */
    public function show(word $word)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, word $word)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $word = word::find($id);
        $word->delete();
        return response()->json("Palabra borrada = ",$word);
    }
}
