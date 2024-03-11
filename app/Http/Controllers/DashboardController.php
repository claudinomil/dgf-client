<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:dashboards_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Lista de Registros
        $this->responseApi(1, 1, 'dashboards', '', '', '');

        //Dados recebidos com sucesso
        if ($this->code == 2000) {
            $ressarcimento_referencias = $this->content['ressarcimento_referencias'];
            $ressarcimento_periodo1 = $this->content['ressarcimento_periodo1'];
            $ressarcimento_periodo2 = $this->content['ressarcimento_periodo2'];
            $ressarcimento_orgaos = $this->content['ressarcimento_orgaos'];
        } else {
            $ressarcimento_referencias = [];
            $ressarcimento_periodo1 = '';
            $ressarcimento_periodo2 = '';
            $ressarcimento_orgaos = [];
        }

        return view('dashboards.index', [
            'ressarcimento_referencias' => $ressarcimento_referencias,
            'ressarcimento_periodo1' => $ressarcimento_periodo1,
            'ressarcimento_periodo2' => $ressarcimento_periodo2,
            'ressarcimento_orgaos' => $ressarcimento_orgaos
        ]);
    }

    public function dashboard1(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard1', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard2(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard2', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard3(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard3', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard4(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard4', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard5(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard5', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard6(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard6/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard7(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard7/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard8(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard8/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard9(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard9/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard10(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard10/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard11(Request $request, $periodo1, $periodo2, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard11/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboards_views(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboards_views', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboards_views_salvar(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 12, 'dashboards/dashboards_views_salvar', '', '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else {
                return response()->json(['error' => 'Erro Interno']);
            }
        }
    }
}
