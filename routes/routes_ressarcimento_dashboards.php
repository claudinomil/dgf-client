<?php

use App\Http\Controllers\RessarcimentoDashboardController;

//Dashboards
Route::prefix('ressarcimento_dashboards')->group(function () {
    Route::get('', [RessarcimentoDashboardController::class, 'index'])->name('ressarcimento_dashboards.index');

    Route::get('acessos', [RessarcimentoDashboardController::class, 'acessos'])->name('ressarcimento_dashboards.acessos');

    Route::get('dashboard6/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard6'])->name('ressarcimento_dashboards.dashboard6');
    Route::get('dashboard7/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard7'])->name('ressarcimento_dashboards.dashboard7');
    Route::get('dashboard8/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard8'])->name('ressarcimento_dashboards.dashboard8');
    Route::get('dashboard9/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard9'])->name('ressarcimento_dashboards.dashboard9');
    Route::get('dashboard10/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard10'])->name('ressarcimento_dashboards.dashboard10');
    Route::get('dashboard11/{periodo1}/{periodo2}/{orgao_id}', [RessarcimentoDashboardController::class, 'dashboard11'])->name('ressarcimento_dashboards.dashboard11');
});
