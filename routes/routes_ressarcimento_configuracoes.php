<?php

use App\Http\Controllers\RessarcimentoConfiguracaoController;

//Configurações
Route::prefix('ressarcimento_configuracoes')->group(function () {
    Route::get('', [RessarcimentoConfiguracaoController::class, 'index'])->name('ressarcimento_configuracoes.index');
    Route::get('/{id}', [RessarcimentoConfiguracaoController::class, 'show'])->name('ressarcimento_configuracoes.show');
    Route::get('/{id}/edit', [RessarcimentoConfiguracaoController::class, 'edit'])->name('ressarcimento_configuracoes.edit');
    Route::post('/{id}', [RessarcimentoConfiguracaoController::class, 'update'])->name('ressarcimento_configuracoes.update');
    Route::get('/filter/{array_dados}', [RessarcimentoConfiguracaoController::class, 'filter'])->name('ressarcimento_configuracoes.filter');
});
