<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RessarcimentoDashboardController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_dashboards_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Lista de Registros
        $this->responseApi(1, 1, 'ressarcimento_dashboards', '', '', '');

        //Dados recebidos com sucesso
        if ($this->code == 2000) {
            $referencias = $this->content['referencias'];
            $periodo1 = $this->content['periodo1'];
            $periodo2 = $this->content['periodo2'];
            $orgaos = $this->content['orgaos'];
        } else {
            $referencias = [];
            $periodo1 = '';
            $periodo2 = '';
            $orgaos = [];
        }

        return view('ressarcimento_dashboards.index', [
            'referencias' => $referencias,
            'periodo1' => $periodo1,
            'periodo2' => $periodo2,
            'orgaos' => $orgaos
        ]);
    }

    public function acessos(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'ressarcimento_dashboards/acessos', '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard6/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard7/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard8/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard9/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard10/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

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
            $this->responseApi(1, 10, 'ressarcimento_dashboards/dashboard11/'.$periodo1.'/'.$periodo2.'/'.$orgao_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }
}
