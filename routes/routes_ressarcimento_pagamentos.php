<?php

use App\Http\Controllers\RessarcimentoPagamentoController;

//Pagamentos
Route::prefix('ressarcimento_pagamentos')->group(function () {
    Route::get('', [RessarcimentoPagamentoController::class, 'index'])->name('ressarcimento_pagamentos.index');
    Route::get('/{id}', [RessarcimentoPagamentoController::class, 'show'])->name('ressarcimento_pagamentos.show');
    Route::get('/{id}/edit', [RessarcimentoPagamentoController::class, 'edit'])->name('ressarcimento_pagamentos.edit');
    Route::post('/{id}', [RessarcimentoPagamentoController::class, 'update'])->name('ressarcimento_pagamentos.update');
    Route::delete('/{id}', [RessarcimentoPagamentoController::class, 'destroy'])->name('ressarcimento_pagamentos.destroy');
    Route::get('/filter/{array_dados}', [RessarcimentoPagamentoController::class, 'filter'])->name('ressarcimento_pagamentos.filter');

    Route::post('/importar/dados', [RessarcimentoPagamentoController::class, 'importar'])->name('ressarcimento_pagamentos.importar');
});
