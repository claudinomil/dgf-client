<?php

use App\Http\Controllers\AlimentacaoQuantitativoController;

//Configurações
Route::prefix('alimentacao_quantitativos')->group(function () {
    Route::get('', [AlimentacaoQuantitativoController::class, 'index'])->name('alimentacao_quantitativos.index');
    Route::get('/create', [AlimentacaoQuantitativoController::class, 'create'])->name('alimentacao_quantitativos.create');
    Route::post('', [AlimentacaoQuantitativoController::class, 'store'])->name('alimentacao_quantitativos.store');
    Route::get('/{id}', [AlimentacaoQuantitativoController::class, 'show'])->name('alimentacao_quantitativos.show');
    Route::get('/{id}/edit', [AlimentacaoQuantitativoController::class, 'edit'])->name('alimentacao_quantitativos.edit');
    Route::post('/{id}', [AlimentacaoQuantitativoController::class, 'update'])->name('alimentacao_quantitativos.update');
    Route::delete('/{id}', [AlimentacaoQuantitativoController::class, 'destroy'])->name('alimentacao_quantitativos.destroy');
    Route::get('/filter/{array_dados}', [AlimentacaoQuantitativoController::class, 'filter'])->name('alimentacao_quantitativos.filter');
});
