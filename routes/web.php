<?php

use Illuminate\Support\Facades\Route;

//Rota inicial
Route::get('/', function () {
    return view('welcome');
});

//Rotas de auth
require __DIR__.'/routes_auth.php';

//Rotas Language Translation
require __DIR__ . '/routes_translation.php';

//Webservices
require __DIR__ . '/routes_webservices.php';

//Tools
require __DIR__ . '/routes_ferramentas.php';

//Notificacoes
require __DIR__ . '/routes_notificacoes.php';

//Transacoes
require __DIR__ . '/routes_transacoes.php';

//Groups
require __DIR__ . '/routes_grupos.php';

//Users
require __DIR__ . '/routes_users.php';

//Emails
require __DIR__ . '/routes_emails.php';

//Dashboards
require __DIR__ . '/routes_dashboards.php';

//Ressarcimento Referências
require __DIR__ . '/routes_ressarcimento_referencias.php';

//Ressarcimento Configurações
require __DIR__ . '/routes_ressarcimento_configuracoes.php';

//Ressarcimento Orgaos
require __DIR__ . '/routes_ressarcimento_orgaos.php';

//Ressarcimento Militares
require __DIR__ . '/routes_ressarcimento_militares.php';

//Ressarcimento Pagamentos
require __DIR__ . '/routes_ressarcimento_pagamentos.php';

//Ressarcimento Dashboard
require __DIR__ . '/routes_ressarcimento_cobrancas.php';

//Ressarcimento Recebimentos
require __DIR__ . '/routes_ressarcimento_recebimentos.php';

//Ressarcimento Relatorios
require __DIR__ . '/routes_ressarcimento_relatorios.php';

//Efetivo Militares
require __DIR__ . '/routes_efetivo_militares.php';

//Relatorios
require __DIR__ . '/routes_relatorios.php';

//Limpar Caches via Navegador - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Route::get('/clear-all-cache', function() {
    $retorno = '';

    //Limpar cache do aplicativo:
    Artisan::call('cache:clear');
    $retorno .= 'cache:clear'.'<br>';

    //Limpar cache de rota:
    Artisan::call('route:cache');
    $retorno .= 'route:cache'.'<br>';

    //Limpar cache de configuração:
    Artisan::call('config:cache');
    $retorno .= 'config:cache'.'<br>';

    //Clear view cache:
    Artisan::call('view:clear');
    $retorno .= 'view:clear'.'<br>';

    //Limpe todo o aplicativo de todos os tipos de cache:
    Artisan::call('optimize:clear');
    $retorno .= 'optimize:clear'.'<br>';

    echo $retorno;
});
//Limpar Caches via Navegador - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
