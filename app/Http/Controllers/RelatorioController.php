<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class RelatorioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:relatorios_list', ['only' => ['index', 'relatorios', 'relatorio1']]);
    }

    public function index()
    {
        //Buscando dados Api_Data()
        $this->responseApi(1, 1, 'relatorios', '', '', '');

        if ($this->code == 2000) {
            $grupos = $this->content['grupos'];
            $situacoes = $this->content['situacoes'];
            $users = $this->content['users'];
            $submodulos = $this->content['submodulos'];
            $operacoes = $this->content['operacoes'];
            $referencias = $this->content['referencias'];
            $orgaos = $this->content['orgaos'];
        } else {
            $grupos = [];
            $situacoes = [];
            $users = [];
            $submodulos = [];
            $operacoes = [];
            $referencias = [];
            $orgaos = [];
        }

        return view('relatorios.index', [
            'grupos' => $grupos,
            'situacoes' => $situacoes,
            'users' => $users,
            'submodulos' => $submodulos,
            'operacoes' => $operacoes,
            'referencias' => $referencias,
            'orgaos' => $orgaos
        ]);
    }

    public function relatorios()
    {
        //Buscando dados Api_Data()
        $this->responseApi(1, 10, 'relatorios/relatorios', '', '', '');

        if ($this->code == 2000) {
            return response()->json(['success' => $this->content]);
        } else {
            return response()->json(['success' => []]);
        }
    }

    public function relatorio1(Request $request, $grupo_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio1/' . $grupo_id, '', '', '');

            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio2(Request $request, $grupo_id, $situacao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio2/' . $grupo_id . '/' . $situacao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio3(Request $request, $data, $user_id, $submodulo_id, $operacao_id, $dado)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio3/' . $data . '/' . $user_id . '/' . $submodulo_id . '/' . $operacao_id . '/' . $dado, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio4(Request $request, $data, $title, $notificacao, $user_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio4/' . $data . '/' . $title . '/' . $notificacao . '/' . $user_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio5(Request $request, $name, $descricao, $url, $user_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio5/' . $name . '/' . $descricao . '/' . $url . '/' . $user_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio6(Request $request, $referencia, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio6/' . $referencia . '/' . $orgao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio7(Request $request, $referencia, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio7/' . $referencia . '/' . $orgao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function relatorio8(Request $request, $referencia, $orgao_id, $saldo)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/relatorio8/' . $referencia . '/' . $orgao_id . '/' . $saldo, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }
}
