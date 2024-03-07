<?php

use App\Http\Controllers\RessarcimentoRecebimentoController;

//Tools
Route::prefix('ressarcimento_recebimentos')->group(function () {
    Route::get('', [RessarcimentoRecebimentoController::class, 'index'])->name('ressarcimento_recebimentos.index');
    Route::get('/{id}', [RessarcimentoRecebimentoController::class, 'show'])->name('ressarcimento_recebimentos.show');
    Route::get('/{id}/edit', [RessarcimentoRecebimentoController::class, 'edit'])->name('ressarcimento_recebimentos.edit');
    Route::post('', [RessarcimentoRecebimentoController::class, 'update'])->name('ressarcimento_recebimentos.update');
    Route::get('/filter/{array_dados}', [RessarcimentoRecebimentoController::class, 'filter'])->name('ressarcimento_recebimentos.filter');
    Route::get('/dados/modal/{referencia}', [RessarcimentoRecebimentoController::class, 'dados_modal'])->name('ressarcimento_recebimentos.dados_modal');
    Route::get('/registros_alterar/{referencia}/{orgao_id}', [RessarcimentoRecebimentoController::class, 'registros_alterar'])->name('ressarcimento_recebimentos.registros_alterar');
});
