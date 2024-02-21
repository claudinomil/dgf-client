<?php

use App\Http\Controllers\RelatorioController;

//Dashboard
Route::prefix('relatorios')->group(function () {
    Route::get('', [RelatorioController::class, 'index'])->name('relatorios.index');

    Route::get('acessos', [RelatorioController::class, 'acessos'])->name('relatorios.acessos');

    Route::get('executar_relatorio_1/{grupo_id}', [RelatorioController::class, 'executar_relatorio_1'])->name('relatorios.executar_relatorio_1');
    Route::get('executar_relatorio_2/{grupo_id}/{situacao_id}', [RelatorioController::class, 'executar_relatorio_2'])->name('relatorios.executar_relatorio_2');
    Route::get('executar_relatorio_3/{data}/{user_id}/{submodulo_id}/{operacao_id}/{dado}', [RelatorioController::class, 'executar_relatorio_3'])->name('relatorios.executar_relatorio_3');
    Route::get('executar_relatorio_4/{date}/{title}/{notificacao}/{user_id}', [RelatorioController::class, 'executar_relatorio_4'])->name('relatorios.executar_relatorio_4');
    Route::get('executar_relatorio_5/{name}/{descricao}/{url}/{user_id}', [RelatorioController::class, 'executar_relatorio_5'])->name('relatorios.executar_relatorio_5');
});
