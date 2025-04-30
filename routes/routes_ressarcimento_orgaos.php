<?php

use App\Http\Controllers\RessarcimentoOrgaoController;

//Órgãos
Route::prefix('ressarcimento_orgaos')->group(function () {
    Route::get('', [RessarcimentoOrgaoController::class, 'index'])->name('ressarcimento_orgaos.index');
    Route::get('/create', [RessarcimentoOrgaoController::class, 'create'])->name('ressarcimento_orgaos.create');
    Route::post('', [RessarcimentoOrgaoController::class, 'store'])->name('ressarcimento_orgaos.store');
    Route::get('/{id}', [RessarcimentoOrgaoController::class, 'show'])->name('ressarcimento_orgaos.show');
    Route::get('/{id}/edit', [RessarcimentoOrgaoController::class, 'edit'])->name('ressarcimento_orgaos.edit');
    Route::post('/{id}', [RessarcimentoOrgaoController::class, 'update'])->name('ressarcimento_orgaos.update');
    Route::delete('/{id}', [RessarcimentoOrgaoController::class, 'destroy'])->name('ressarcimento_orgaos.destroy');
    Route::get('/filter/{array_dados}', [RessarcimentoOrgaoController::class, 'filter'])->name('ressarcimento_orgaos.filter');
});
