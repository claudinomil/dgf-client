<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Str;
use Yajra\DataTables\Facades\DataTables;

class WebserviceController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    /*
     * Evento: 1
     * Buscar Militar por campo e valor
     */
    public function militar(Request $request, $field, $value)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'webservices/militar/'.$field.'/'.$value, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => $this->content]);
            }
        }
    }
}
