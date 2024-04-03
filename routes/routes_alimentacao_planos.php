<?php

use App\Http\Controllers\AlimentacaoPlanoController;

//Configurações
Route::prefix('alimentacao_planos')->group(function () {
    Route::get('', [AlimentacaoPlanoController::class, 'index'])->name('alimentacao_planos.index');
    Route::get('/create', [AlimentacaoPlanoController::class, 'create'])->name('alimentacao_planos.create');
    Route::post('', [AlimentacaoPlanoController::class, 'store'])->name('alimentacao_planos.store');
    Route::get('/{id}', [AlimentacaoPlanoController::class, 'show'])->name('alimentacao_planos.show');
    Route::get('/{id}/edit', [AlimentacaoPlanoController::class, 'edit'])->name('alimentacao_planos.edit');
    Route::post('/{id}', [AlimentacaoPlanoController::class, 'update'])->name('alimentacao_planos.update');
    Route::delete('/{id}', [AlimentacaoPlanoController::class, 'destroy'])->name('alimentacao_planos.destroy');
    Route::get('/filter/{array_dados}', [AlimentacaoPlanoController::class, 'filter'])->name('alimentacao_planos.filter');
});
