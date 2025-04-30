<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class RessarcimentoRecebimentoController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_recebimentos_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:ressarcimento_recebimentos_show', ['only' => ['show']]);
        $this->middleware('check-permissao:ressarcimento_recebimentos_edit', ['only' => ['edit', 'update']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'ressarcimento_recebimentos', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(2, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('valor', function ($row) {
                        $retorno = number_format($row['valor'], 2, ",", ".");
                        $retorno = '<div class="text-end">'.$retorno.'</div>';

                        return $retorno;
                    })
                    ->editColumn('valor_recebido', function ($row) {
                        if ($row['valor_recebido'] === null) {$valor_recebido = 0;} else {$valor_recebido = $row['valor_recebido'];}

                        $retorno = number_format($valor_recebido, 2, ",", ".");
                        $retorno = '<div class="text-end">'.$retorno.'</div>';

                        return $retorno;
                    })
                    ->editColumn('saldo_restante', function ($row) {
                        if ($row['saldo_restante'] === null) {$saldo_restante = 0;} else {$saldo_restante = $row['saldo_restante'];}

                        $retorno = number_format($saldo_restante, 2, ",", ".");
                        $retorno = '<div class="text-end">'.$retorno.'</div>';

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id'], 0);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Tool');
            }
        } else {
            return view('ressarcimento_recebimentos.index');
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_recebimentos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Tool');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_recebimentos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Tool');
            }
        }
    }

    public function update(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 11, 'ressarcimento_recebimentos', '', '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Tool');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'ressarcimento_recebimentos', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(2, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('valor', function ($row) {
                        $retorno = number_format($row['valor'], 2, ",", ".");

                        return $retorno;
                    })
                    ->editColumn('valor_recebido', function ($row) {
                        if ($row['valor_recebido'] === null) {$valor_recebido = 0;} else {$valor_recebido = $row['valor_recebido'];}

                        $retorno = number_format($valor_recebido, 2, ",", ".");

                        return $retorno;
                    })
                    ->editColumn('saldo_restante', function ($row) {
                        if ($row['saldo_restante'] === null) {$saldo_restante = 0;} else {$saldo_restante = $row['saldo_restante'];}

                        $retorno = number_format($saldo_restante, 2, ",", ".");

                        return $retorno;
                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id'], 0);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Ressarcimento Recebimento');
            }
        } else {
            return view('ressarcimento_recebimentos.index');
        }
    }

    public function dados_modal(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'ressarcimento_recebimentos/dados_modal/'.$referencia, '', '', '');

            //Registros recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro nos dados']);
            }
        }
    }

    public function registros_alterar(Request $request, $referencia, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'ressarcimento_recebimentos/registros_alterar/'.$referencia.'/'.$orgao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Registros não encontrados']);
            }
        }
    }
}
