<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('welcome-permissao', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        if ($request['usuarioLogado'] == 1) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'dashboards', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Agrupamentos
                $agrupamentos = $this->content['agrupamentos'];

                //dashboards_modal_filtro_1
                $dashboards_modal_filtro_1_referencias = $this->content['ressarcimento_referencias'];
                $dashboards_modal_filtro_1_orgaos = $this->content['ressarcimento_orgaos'];

                //dashboards_modal_filtro_2
                $dashboards_modal_filtro_2_subcontas = $this->content['subcontas'];
            } else {
                //Agrupamentos
                $agrupamentos = [];

                //dashboards_modal_filtro_1
                $dashboards_modal_filtro_1_referencias = [];
                $dashboards_modal_filtro_1_orgaos = [];

                //dashboards_modal_filtro_2
                $dashboards_modal_filtro_2_subcontas = [];
            }

            return view('welcome', [
                'agrupamentos' => $agrupamentos,
                'dashboards_modal_filtro_1_referencias' => $dashboards_modal_filtro_1_referencias,
                'dashboards_modal_filtro_1_orgaos' => $dashboards_modal_filtro_1_orgaos,
                'dashboards_modal_filtro_2_subcontas' => $dashboards_modal_filtro_2_subcontas,
            ]);
        } else {
            return view('welcome');
        }
    }
}
