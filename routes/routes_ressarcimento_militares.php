<?php

use App\Http\Controllers\RessarcimentoMilitarController;

//Militares
Route::prefix('ressarcimento_militares')->group(function () {
    Route::get('', [RessarcimentoMilitarController::class, 'index'])->name('ressarcimento_militares.index');
    Route::get('/{id}', [RessarcimentoMilitarController::class, 'show'])->name('ressarcimento_militares.show');
    Route::delete('/{id}', [RessarcimentoMilitarController::class, 'destroy'])->name('ressarcimento_militares.destroy');
    Route::get('/filter/{array_dados}', [RessarcimentoMilitarController::class, 'filter'])->name('ressarcimento_militares.filter');

    Route::post('/importar', [RessarcimentoMilitarController::class, 'importar'])->name('ressarcimento_militares.importar');
});
