<?php

use App\Http\Controllers\SadMilitaresInformacoesController;

Route::prefix('sad_militares_informacoes')->group(function () {
    Route::get('', [SadMilitaresInformacoesController::class, 'index'])->name('sad_militares_informacoes.index');
    Route::get('/create', [SadMilitaresInformacoesController::class, 'create'])->name('sad_militares_informacoes.create');
    Route::post('', [SadMilitaresInformacoesController::class, 'store'])->name('sad_militares_informacoes.store');
    Route::get('/{id}', [SadMilitaresInformacoesController::class, 'show'])->name('sad_militares_informacoes.show');
    Route::get('/{id}/edit', [SadMilitaresInformacoesController::class, 'edit'])->name('sad_militares_informacoes.edit');
    Route::post('/{id}', [SadMilitaresInformacoesController::class, 'update'])->name('sad_militares_informacoes.update');
    Route::delete('/{id}', [SadMilitaresInformacoesController::class, 'destroy'])->name('sad_militares_informacoes.destroy');
    Route::get('/filter/{array_dados}', [SadMilitaresInformacoesController::class, 'filter'])->name('sad_militares_informacoes.filter');

    Route::post('/upload/foto', [SadMilitaresInformacoesController::class, 'uploadFoto'])->name('sad_militares_informacoes.uploadfoto');
    Route::post('/edit/password', [SadMilitaresInformacoesController::class, 'editpassword'])->name('sad_militares_informacoes.editpassword');
    Route::post('/edit/email', [SadMilitaresInformacoesController::class, 'editemail'])->name('sad_militares_informacoes.editemail');

    Route::post('/edit/modestyle/{mode}/{style}/{id}', [SadMilitaresInformacoesController::class, 'editmodestyle'])->name('sad_militares_informacoes.editmodestyle');
});

Route::get('/profiledata', [SadMilitaresInformacoesController::class, 'profiledata']);
