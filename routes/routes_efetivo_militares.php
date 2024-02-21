<?php

use App\Http\Controllers\EfetivoMilitarController;

//Militares
Route::prefix('efetivo_militares')->group(function () {
    Route::get('', [EfetivoMilitarController::class, 'index'])->name('efetivo_militares.index');
    Route::get('/{id}', [EfetivoMilitarController::class, 'show'])->name('efetivo_militares.show');
    Route::get('/filter/{array_dados}', [EfetivoMilitarController::class, 'filter'])->name('efetivo_militares.filter');
});
