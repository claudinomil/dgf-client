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

        return view('dashboards.index', [
            'agrupamentos' => $agrupamentos,
            'dashboards_modal_filtro_1_referencias' => $dashboards_modal_filtro_1_referencias,
            'dashboards_modal_filtro_1_orgaos' => $dashboards_modal_filtro_1_orgaos,
            'dashboards_modal_filtro_2_subcontas' => $dashboards_modal_filtro_2_subcontas,
        ]);
    }

    public function dashboard1(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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

    public function dashboard12(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard12/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard13(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard13/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');
            //dd($this->content);
            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard14(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard14/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard15(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard15/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard16(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard16/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboard17(Request $request, $data1, $data2, $subconta_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboard17/'.$data1.'/'.$data2.'/'.$subconta_id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function dashboards_ids(Request $request, $agrupamento_id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'dashboards/dashboards_ids/'.$agrupamento_id, '', '', '');

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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
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
