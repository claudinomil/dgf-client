<?php

use App\Http\Controllers\RessarcimentoCobrancaController;

//Dashboard
Route::prefix('ressarcimento_cobrancas')->group(function () {
    Route::get('', [RessarcimentoCobrancaController::class, 'index'])->name('ressarcimento_cobrancas.index');

    Route::get('/dados_ressarcimento/{referencia}', [RessarcimentoCobrancaController::class, 'dados_ressarcimento'])->name('ressarcimento_cobrancas.dados_ressarcimento');
    Route::get('/gerar_cobrancas/{referencia}', [RessarcimentoCobrancaController::class, 'gerar_cobrancas'])->name('ressarcimento_cobrancas.gerar_cobrancas');
    Route::get('/gerar_pdfs/{referencia}', [RessarcimentoCobrancaController::class, 'gerar_pdfs'])->name('ressarcimento_cobrancas.gerar_pdfs');
    Route::get('/verificar_existe_zip/{referencia}', [RessarcimentoCobrancaController::class, 'verificar_existe_zip'])->name('ressarcimento_cobrancas.verificar_existe_zip');

    Route::get('/deletar_pdfs_gerados/{referencia}', [RessarcimentoCobrancaController::class, 'deletar_pdfs_gerados'])->name('ressarcimento_cobrancas.deletar_pdfs_gerados');
});
