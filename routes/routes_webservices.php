<?php

use App\Http\Controllers\WebserviceController;

//Webservices
Route::prefix('webservices')->group(function () {
    Route::get('/militar/{field}/{value}', [WebserviceController::class, 'militar'])->name('webservices.militar');
});
