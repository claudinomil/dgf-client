<?php

use App\Http\Controllers\AlimentacaoRemanejamentoController;

//Configurações
Route::prefix('alimentacao_remanejamentos')->group(function () {
    Route::get('', [AlimentacaoRemanejamentoController::class, 'index'])->name('alimentacao_remanejamentos.index');
    Route::get('/create', [AlimentacaoRemanejamentoController::class, 'create'])->name('alimentacao_remanejamentos.create');
    Route::post('', [AlimentacaoRemanejamentoController::class, 'store'])->name('alimentacao_remanejamentos.store');
    Route::get('/{id}', [AlimentacaoRemanejamentoController::class, 'show'])->name('alimentacao_remanejamentos.show');
    Route::get('/{id}/edit', [AlimentacaoRemanejamentoController::class, 'edit'])->name('alimentacao_remanejamentos.edit');
    Route::post('/{id}', [AlimentacaoRemanejamentoController::class, 'update'])->name('alimentacao_remanejamentos.update');
    Route::delete('/{id}', [AlimentacaoRemanejamentoController::class, 'destroy'])->name('alimentacao_remanejamentos.destroy');
    Route::get('/filter/{array_dados}', [AlimentacaoRemanejamentoController::class, 'filter'])->name('alimentacao_remanejamentos.filter');
});
