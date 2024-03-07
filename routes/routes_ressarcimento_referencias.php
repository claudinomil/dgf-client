<?php

use App\Http\Controllers\RessarcimentoReferenciaController;

//Configurações
Route::prefix('ressarcimento_referencias')->group(function () {
    Route::get('', [RessarcimentoReferenciaController::class, 'index'])->name('ressarcimento_referencias.index');
    Route::get('/create', [RessarcimentoReferenciaController::class, 'create'])->name('ressarcimento_referencias.create');
    Route::post('', [RessarcimentoReferenciaController::class, 'store'])->name('ressarcimento_referencias.store');
    Route::get('/{id}', [RessarcimentoReferenciaController::class, 'show'])->name('ressarcimento_referencias.show');
    Route::get('/{id}/edit', [RessarcimentoReferenciaController::class, 'edit'])->name('ressarcimento_referencias.edit');
    Route::post('/{id}', [RessarcimentoReferenciaController::class, 'update'])->name('ressarcimento_referencias.update');
    Route::delete('/{id}', [RessarcimentoReferenciaController::class, 'destroy'])->name('ressarcimento_referencias.destroy');
    Route::get('/filter/{array_dados}', [RessarcimentoReferenciaController::class, 'filter'])->name('ressarcimento_referencias.filter');
});
