<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Yajra\DataTables\Facades\DataTables;

class RessarcimentoConfiguracaoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $esferas;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_configuracoes_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:ressarcimento_configuracoes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:ressarcimento_configuracoes_edit', ['only' => ['edit', 'update']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'ressarcimento_configuracoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(1, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('diretor_geral_financas', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['diretor_nome'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-primary">'.$row['diretor_posto'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'ID: '.$row['diretor_identidade_funcional'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'RG: '.$row['diretor_rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('chefe_dgf2', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['dgf2_nome'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-primary">'.$row['dgf2_posto'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'ID: '.$row['dgf2_identidade_funcional'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'RG: '.$row['dgf2_rg'].'</div>';

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Configurações');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'ressarcimento_configuracoes/auxiliary/tables', '', '', '');

            //chamar view
            return view('ressarcimento_configuracoes.index', [
                'evento' => 'index',
                'esferas' => $this->esferas
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_configuracoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Configurações');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_configuracoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Configurações');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'ressarcimento_configuracoes', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 2040) { //Erro de Lógica
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Configurações');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'ressarcimento_configuracoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(1, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('diretor_geral_financas', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['diretor_nome'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-primary">'.$row['diretor_posto'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'ID: '.$row['diretor_identidade_funcional'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'RG: '.$row['diretor_rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('chefe_dgf2', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['dgf2_nome'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-primary">'.$row['dgf2_posto'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'ID: '.$row['dgf2_identidade_funcional'].'</div>';
                        $retorno .= '<div class="col-12 font-size-11 text-success">'.'RG: '.$row['dgf2_rg'].'</div>';

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Configuração');
            }
        } else {
            return view('ressarcimento_configuracoes.index');
        }
    }
}
