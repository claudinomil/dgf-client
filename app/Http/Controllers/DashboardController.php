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

        return view('dashboards.index');
    }

    public function acessos(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/acessos', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
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
}
