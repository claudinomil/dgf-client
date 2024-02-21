<?php

use App\Http\Controllers\RessarcimentoRelatorioController;

//Dashboard
Route::prefix('ressarcimento_relatorios')->group(function () {
    Route::get('', [RessarcimentoRelatorioController::class, 'index'])->name('ressarcimento_relatorios.index');

    Route::get('acessos', [RessarcimentoRelatorioController::class, 'acessos'])->name('ressarcimento_relatorios.acessos');

    Route::get('executar_relatorio_6/{referencia}/{orgao_id}', [RessarcimentoRelatorioController::class, 'executar_relatorio_6'])->name('ressarcimento_relatorios.executar_relatorio_6');
    Route::get('executar_relatorio_7/{referencia}/{orgao_id}', [RessarcimentoRelatorioController::class, 'executar_relatorio_7'])->name('ressarcimento_relatorios.executar_relatorio_7');
    Route::get('executar_relatorio_8/{referencia}/{orgao_id}/{saldo}', [RessarcimentoRelatorioController::class, 'executar_relatorio_8'])->name('ressarcimento_relatorios.executar_relatorio_8');
});
