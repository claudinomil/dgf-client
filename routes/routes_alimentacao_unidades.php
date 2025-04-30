<?php

use App\Http\Controllers\AlimentacaoUnidadeController;

//Configurações
Route::prefix('alimentacao_unidades')->group(function () {
    Route::get('', [AlimentacaoUnidadeController::class, 'index'])->name('alimentacao_unidades.index');
    Route::get('/create', [AlimentacaoUnidadeController::class, 'create'])->name('alimentacao_unidades.create');
    Route::post('', [AlimentacaoUnidadeController::class, 'store'])->name('alimentacao_unidades.store');
    Route::get('/{id}', [AlimentacaoUnidadeController::class, 'show'])->name('alimentacao_unidades.show');
    Route::get('/{id}/edit', [AlimentacaoUnidadeController::class, 'edit'])->name('alimentacao_unidades.edit');
    Route::post('/{id}', [AlimentacaoUnidadeController::class, 'update'])->name('alimentacao_unidades.update');
    Route::delete('/{id}', [AlimentacaoUnidadeController::class, 'destroy'])->name('alimentacao_unidades.destroy');
    Route::get('/filter/{array_dados}', [AlimentacaoUnidadeController::class, 'filter'])->name('alimentacao_unidades.filter');
});
