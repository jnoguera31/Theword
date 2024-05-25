<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Record::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $record = Record::create($request->all());
        return response()->json($record, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $record = Record::find($id);

        if ($record) {
            return response()->json($record, 200);
        } else {
            return response()->json(['message' => 'Record not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $record = Record::find($id);

        if ($record) {
            $record->update($request->all());
            return response()->json($record, 200);
        } else {
            return response()->json(['message' => 'Record not found'], 404);
        }
    }

    public function destroy($id)
    {
        $record = Record::find($id);

        if ($record) {
            $record->delete();
            return response()->json(['message' => 'Record deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Record not found'], 404);
        }
    }
}
