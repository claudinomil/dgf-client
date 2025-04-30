<?php

namespace App\Http\Middleware;

use App\Facades\ApiData;
use App\Facades\Breadcrumb;
use App\Facades\Permissoes;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class WelcomePermissao
{
    public function handle(Request $request, Closure $next)
    {
        //Buscando dados Welcome/Permissão
        $response = ApiData::getData(100, '', '', '', '');
        //dd($response->json());   //TRAZER ERRO NA DEPURAÇÃO

        if (isset($response['content'])) {
            session(['se_userLoggedData' => $response['content']['userData']]);
            $usuarioLogado = 1;
        } else {
            $usuarioLogado = 0;
        }

        //Alterar Request
        $request['usuarioLogado'] = $usuarioLogado;

        //Retornar dados para o Request e View
        View::share([
            'usuarioLogado' => $usuarioLogado
        ]);

        //Retornando
        return $next($request);
    }
}
