<?php

use App\Http\Controllers\DashboardController;

//Dashboards
Route::prefix('dashboards')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('dashboards.index');

    Route::get('dashboard1', [DashboardController::class, 'dashboard1'])->name('dashboards.dashboard1');
    Route::get('dashboard2', [DashboardController::class, 'dashboard2'])->name('dashboards.dashboard2');
    Route::get('dashboard3', [DashboardController::class, 'dashboard3'])->name('dashboards.dashboard3');
    Route::get('dashboard4', [DashboardController::class, 'dashboard4'])->name('dashboards.dashboard4');
    Route::get('dashboard5', [DashboardController::class, 'dashboard5'])->name('dashboards.dashboard5');

    Route::get('dashboard6/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard6'])->name('dashboards.dashboard6');
    Route::get('dashboard7/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard7'])->name('dashboards.dashboard7');
    Route::get('dashboard8/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard8'])->name('dashboards.dashboard8');
    Route::get('dashboard9/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard9'])->name('dashboards.dashboard9');
    Route::get('dashboard10/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard10'])->name('dashboards.dashboard10');
    Route::get('dashboard11/{periodo1}/{periodo2}/{orgao_id}', [DashboardController::class, 'dashboard11'])->name('dashboards.dashboard11');

    Route::get('dashboard12/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard12'])->name('dashboards.dashboard12');
    Route::get('dashboard13/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard13'])->name('dashboards.dashboard13');
    Route::get('dashboard14/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard14'])->name('dashboards.dashboard14');
    Route::get('dashboard15/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard15'])->name('dashboards.dashboard15');
    Route::get('dashboard16/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard16'])->name('dashboards.dashboard16');
    Route::get('dashboard17/{data1}/{data2}/{subconta_id}', [DashboardController::class, 'dashboard17'])->name('dashboards.dashboard17');

    Route::get('dashboards_ids/{agrupamento_id}', [DashboardController::class, 'dashboards_ids'])->name('dashboards.dashboards_ids');
    Route::get('dashboards_views', [DashboardController::class, 'dashboards_views'])->name('dashboards.dashboards_views');
    Route::post('dashboards_views_salvar', [DashboardController::class, 'dashboards_views_salvar'])->name('grupos.dashboards_views_salvar');
});
