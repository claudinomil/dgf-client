<?php

use App\Http\Controllers\DashboardController;

//Dashboards
Route::prefix('dashboards')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('dashboards.index');

    Route::get('acessos', [DashboardController::class, 'acessos'])->name('dashboards.acessos');

    Route::get('dashboard1', [DashboardController::class, 'dashboard1'])->name('dashboards.dashboard1');
    Route::get('dashboard2', [DashboardController::class, 'dashboard2'])->name('dashboards.dashboard2');
    Route::get('dashboard3', [DashboardController::class, 'dashboard3'])->name('dashboards.dashboard3');
    Route::get('dashboard4', [DashboardController::class, 'dashboard4'])->name('dashboards.dashboard4');
    Route::get('dashboard5', [DashboardController::class, 'dashboard5'])->name('dashboards.dashboard5');
});
