<?php

namespace App\Providers;

use App\Services\SuporteService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //Facade SuporteFacade
        $this->app->bind('facade-suporte', function () {
            return new SuporteService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
