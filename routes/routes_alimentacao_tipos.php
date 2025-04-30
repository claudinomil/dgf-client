<?php

use App\Http\Controllers\AlimentacaoTipoController;

//Configurações
Route::prefix('alimentacao_tipos')->group(function () {
    Route::get('', [AlimentacaoTipoController::class, 'index'])->name('alimentacao_tipos.index');
    Route::get('/create', [AlimentacaoTipoController::class, 'create'])->name('alimentacao_tipos.create');
    Route::post('', [AlimentacaoTipoController::class, 'store'])->name('alimentacao_tipos.store');
    Route::get('/{id}', [AlimentacaoTipoController::class, 'show'])->name('alimentacao_tipos.show');
    Route::get('/{id}/edit', [AlimentacaoTipoController::class, 'edit'])->name('alimentacao_tipos.edit');
    Route::post('/{id}', [AlimentacaoTipoController::class, 'update'])->name('alimentacao_tipos.update');
    Route::delete('/{id}', [AlimentacaoTipoController::class, 'destroy'])->name('alimentacao_tipos.destroy');
    Route::get('/filter/{array_dados}', [AlimentacaoTipoController::class, 'filter'])->name('alimentacao_tipos.filter');
});
