<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Yajra\DataTables\Facades\DataTables;

class SadMilitaresInformacoesController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $setores;
    public $funcoes;

    public function __construct()
    {
        $this->middleware('check-permissao:sad_militares_informacoes_list', ['only' => ['index', 'filter', 'profiledata']]);
        $this->middleware('check-permissao:sad_militares_informacoes_create', ['only' => ['create', 'store']]);
        $this->middleware('check-permissao:sad_militares_informacoes_show', ['only' => ['show']]);
        $this->middleware('check-permissao:sad_militares_informacoes_edit', ['only' => ['edit', 'update', 'uploadFoto']]);
        $this->middleware('check-permissao:sad_militares_informacoes_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'sad_militares_informacoes', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='".asset($row['foto'])."' alt='' class='img-thumbnail rounded-circle avatar-sm'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' data-bs-toggle='modal' data-bs-target='.modal-profile' onclick='sadMilitaresInformacoesProfileData(1, ".$row['id'].");'><span class='bg-success badge'><i class='bx bx-user font-size-16 align-middle me-1'></i>Perfil</span></a>";
                        $retorno .= "</div>";

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
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'sad_militares_informacoes/auxiliary/tables', '', '', '');

            //dd($this->content);
            //die();

            return view('sad_militares_informacoes.index', [
                'setores' => $this->setores,
                'funcoes' => $this->funcoes
            ]);
        }
    }

    public function create(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            return response()->json(['success' => true]);
        }
    }

    public function store(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Incluir Registro
            $this->responseApi(1, 4, 'sad_militares_informacoes', '', '', $request->all());

            //Registro criado com sucesso
            if ($this->code == 2010) {
                return response()->json(['success' => $this->message, 'content' => $this->content]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else {
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'sad_militares_informacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'sad_militares_informacoes', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'sad_militares_informacoes', $id, '', $request->all());

            //Registro alterado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2020) { //Falha na validação dos dados
                return response()->json(['error_validation' => $this->validation]);
            } else if ($this->code == 2040) { //Registro não alterado - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'sad_militares_informacoes', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'sad_militares_informacoes', '', $array_dados, '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('foto', function ($row) {
                        $retorno = "<div class='text-center'>";
                        $retorno .= "<img src='".asset($row['foto'])."' alt='' class='img-thumbnail rounded-circle avatar-sm'>";
                        $retorno .= "<br>";
                        $retorno .= "<a href='#' data-bs-toggle='modal' data-bs-target='.modal-profile' onclick='sadMilitaresInformacoesProfileData(1, ".$row['id'].");'><span class='bg-success badge'><i class='bx bx-user font-size-16 align-middle me-1'></i>Perfil</span></a>";
                        $retorno .= "</div>";

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
                abort(500, 'Erro Interno SAD Militares Informações');
            }
        } else {
            return view('sad_militares_informacoes.index');
        }
    }

    public function profiledata(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            $id = $_GET['id'];

            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 10, 'sad_militares_informacoes/profiledata/' . $id, '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return json_encode($this->content);
            } else if ($this->code == 4040) { //Registro não encontrado
                echo 'Registro não encontrado.';
            } else {
                echo 'Erro Interno SAD Militares Informações.';
            }
        }
    }

    public function uploadFoto(Request $request)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Variavel controle
            $error = false;

            //Foto padrão do Sistema
            $foto = "build/assets/images/sad_militares_informacoes/foto-0.png";

            //Verificando e fazendo Upload do Foto novo
            if ($request->hasFile('foto_file')) {
                //sad_militares_informacoes_id
                $id = $request['upload_foto_sad_militares_informacoes_id'];

                //buscar dados formulario
                $arquivo_tmp = $_FILES["foto_file"]["tmp_name"];
                $arquivo_real = $_FILES["foto_file"]["name"];
                $arquivo_real = utf8_decode($arquivo_real);
                $arquivo_type = $_FILES["foto_file"]["type"];
                $arquivo_size = $_FILES['foto_file']['size'];

                if ($arquivo_type == 'image/jpg' or $arquivo_type == 'image/jpeg' or $arquivo_type == 'image/png') {
                    if (copy($arquivo_tmp, "build/assets/images/sad_militares_informacoes/$arquivo_real")) {
                        if (file_exists("build/assets/images/sad_militares_informacoes/" . $arquivo_real)) {
                            //apagar foto no diretorio
                            if (file_exists('build/assets/images/sad_militares_informacoes/foto-' . $id . '.png')) {
                                unlink('build/assets/images/sad_militares_informacoes/foto-' . $id . '.png');
                            }
                            if (file_exists('build/assets/images/sad_militares_informacoes/foto-' . $id . '.jpg')) {
                                unlink('build/assets/images/sad_militares_informacoes/foto-' . $id . '.jpg');
                            }
                            if (file_exists('build/assets/images/sad_militares_informacoes/foto-' . $id . '.jpeg')) {
                                unlink('build/assets/images/sad_militares_informacoes/foto-' . $id . '.jpeg');
                            }

                            //Gravar novo
                            $foto = "build/assets/images/sad_militares_informacoes/foto-" . $id . '.' . pathinfo($arquivo_real, PATHINFO_EXTENSION);
                            $de = "build/assets/images/sad_militares_informacoes/$arquivo_real";
                            $pa = $foto;

                            try {
                                rename($de, $pa);
                            } catch (\Exception $e) {
                                $error = true;
                            }
                        }
                    }
                }
            }

            if (!$error) {
                //Buscando dados Api_Data() - Alterar Registro
                $data = array();
                $data['foto'] = $foto;
                $this->responseApi(1, 11, 'sad_militares_informacoes/update/foto/' . $id, '', '', $data);

                echo $this->message;
            } else {
                echo 'Imagem (Nome, Tamanho ou Tipo) inválida.';
            }
        }
    }
}
