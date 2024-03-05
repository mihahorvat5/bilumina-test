<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes();

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/item/{id}', function ($id) {
    return view('item');
})->name('item');


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/get-item/{id}', [ItemController::class, 'getItem']);

Route::get('/get-data', [DataController::class, 'getData']);
Route::get('/get-items', [DataController::class, 'getItems']);
Route::get('/get-first', [DataController::class, 'getItemsInFirstId']);












Route::get('/templates', function () {
    return view('templates');
})->name('templates');

Route::get('/template-menu', function () {
    return view('template-menu');
})->name('template-menu');

Route::get('/template-home', function () {
    return view('template-home');
})->name('template-home');

Route::get('/template-triple', function () {
    return view('template-triple');
})->name('template-triple');

Route::get('/template-hexa', function () {
    return view('template-hexa');
})->name('template-hexa');

Route::get('/buttons', function () {
    return view('buttons');
})->name('buttons');