<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class EfetivoMilitarController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares

    public function __construct()
    {
        $this->middleware('check-permissao:efetivo_militares_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:efetivo_militares_show', ['only' => ['show']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 10, 'efetivo_militares/index', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
//                    ->editColumn('militar', function ($row) {
//                        $retorno = '<div class="col-12 text-nowrap">'.$row['nome'].'</div>';
//                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].' ## '.$row['quadro_qbmp'].'</div>';
//                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';
//
//                        return $retorno;
//                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Militar');
            }
        } else {
            //chamar view
            return view('efetivo_militares.index');
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 2, 'efetivo_militares', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Militar');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'efetivo_militares', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
//                    ->editColumn('militar', function ($row) {
//                        $retorno = '<div class="col-12 text-nowrap">'.$row['nome'].'</div>';
//                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].' ## '.$row['quadro_qbmp'].'</div>';
//                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';
//
//                        return $retorno;
//                    })
                    ->addColumn('action', function ($row, Request $request) {
                        return $this->columnAction($row['id']);
                    })
                    ->rawColumns(['action'])
                    ->escapeColumns([])
                    ->make(true);

                return $allData;
            } else {
                abort(500, 'Erro Interno Militar');
            }
        } else {
            return view('efetivo_militares.index');
        }
    }
}
