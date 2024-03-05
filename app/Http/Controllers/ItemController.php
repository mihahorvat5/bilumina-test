<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    public function getItem($id)
    {
        // Construct the path to the JSON file based on the provided id
        $path = public_path("json/produkti/{$id}.json");

        // Check if the file exists
        if (file_exists($path)) {
            // Read the JSON file
            $jsonData = file_get_contents($path);
            $data = json_decode($jsonData, true);

            // Return the data
            return response()->json($data);
        } else {
            // If the file does not exist, return an error response
            return response()->json(['error' => 'Item not found'], 404);
        }
    }
}
