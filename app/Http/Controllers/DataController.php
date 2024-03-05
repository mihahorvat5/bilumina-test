<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DataController extends Controller
{
    public function getData()
    {
        $path = public_path('json/data.json');
        $jsonData = file_get_contents($path);
        $data = json_decode($jsonData, true);

        return response()->json($data);
    }


    public function getItems()
    {
        $path = public_path('json/data.json');
        $jsonData = file_get_contents($path);
        $data = json_decode($jsonData, true);

        if (isset($data['items'])) {
            return response()->json($data['items']);
        } else {
            return response()->json([], 404);
        }
    }
}