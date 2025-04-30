<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Yajra\DataTables\Facades\DataTables;

class RessarcimentoMilitarController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    //Dados Auxiliares
    public $referencias;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_militares_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:ressarcimento_militares_create', ['only' => ['importar']]);
        $this->middleware('check-permissao:ressarcimento_militares_show', ['only' => ['show']]);
        $this->middleware('check-permissao:ressarcimento_militares_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'ressarcimento_militares', '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(1, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('militar', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['nome'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].' ## '.$row['quadro_qbmp'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('lotacao', function ($row) {
                        $retorno = $row['lotacao'].'<br>'.$row['boletim'];
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
                abort(500, 'Erro Interno Militar');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'ressarcimento_militares/auxiliary/tables', '', '', '');

            //chamar view
            return view('ressarcimento_militares.index', [
                'evento' => 'index',
                'referencias' => $this->referencias
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_militares', $id, '', '');

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

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'ressarcimento_militares', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
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
            $this->responseApi(1, 3, 'ressarcimento_militares', '', $array_dados, '');
//dd($this->content);
            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                $allData = DataTables::of($this->content)
                    ->addIndexColumn()
                    ->editColumn('referencia', function ($row) {
                        $retorno = '<div class="text-nowrap">'.SuporteFacade::getReferencia(1, $row['referencia']).'</div>';

                        return $retorno;
                    })
                    ->editColumn('militar', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap">'.$row['nome'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].' ## '.$row['quadro_qbmp'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('lotacao', function ($row) {
                        $retorno = $row['lotacao'].'<br>'.$row['boletim'];
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
                abort(500, 'Erro Interno Militar');
            }
        } else {
            return view('ressarcimento_militares.index');
        }
    }

    /*
     * Importar dados
     * Transformar arquivo do "Excel" em "CSV UTF-8 (Delimitado por Vírgula)"
     * Colocar primeira linha com o nome das colunas
     */
    public function importar(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            try {
                //Verificando se campo existe
                if ($request->hasFile('ressarcimento_militar_file')) {
                    //Detalhes do arquivo (Crítica)
                    $extensao = "csv";
                    $tamanho_maximo = 60000000000000;
                    $tamanho_maximo_extenso = '12MB';

                    //Buscando arquivo
                    $file = $request->file('ressarcimento_militar_file');

                    $arquivoExtensao = $file->getClientOriginalExtension();
                    $arquivoTamanho = $file->getSize();


                    //return response()->json(['eduardo' => $arquivoExtensao.' ## '.$arquivoTamanho]);


                    //Verifique a extensão do arquivo
                    if ($arquivoExtensao == $extensao) {
                        //Verifique o tamanho do arquivo
                        if ($arquivoTamanho <= $tamanho_maximo) {
                            //Configurações do PHP INI (Alterando temporariamente)
                            ini_set('max_execution_time', 2400);
                            ini_set('memory_limit', '1024M');

                            //Verificar a quantidade de orgaos antes da Importação
                            $this->responseApi(1, 10, 'ressarcimento_orgaos/quantidade_registros', '', '', '');
                            $qtd_orgaos_antes = $this->content;

                            //Verificar a quantidade de configuracoes antes da Importação
                            $this->responseApi(1, 10, 'ressarcimento_configuracoes/quantidade_registros', '', '', '');
                            $qtd_configuracoes_antes = $this->content;

                            //Lendo arquivo
                            $excelData = IOFactory::load($file)->getActiveSheet()->toArray();

                            //Ctrl
                            $linha = 0;
                            $registros_importados = 0;
                            $registros_erros = array();
                            $registros_importados_anteriormente = array();
                            $planilha_error = array();

                            //Varrer o arquivo Excel
                            foreach ($excelData as $registro) {
                                //Linha Cabeçalho
                                if ($linha == 0) {
                                    $cabecalho = $registro;
                                }

                                //Verificar se é a planilha correta (nome das colunas comparado com cabecalho)
                                if ($linha == 0) { //fazer uma única vez
                                    $colunas_planilha_correta = ['ID FUNC', 'RG', 'NOME', 'POSTO/GRAD', 'QUADRO/QBM', 'BOLETIM', 'ID LOT', 'LOTACAO'];

                                    foreach ($colunas_planilha_correta as $coluna) {
                                        $coluna_ok = false;

                                        foreach ($cabecalho as $cabecalho_coluna) {
                                            if ($cabecalho_coluna == $coluna) {$coluna_ok = true;}
                                        }

                                        if ($coluna_ok === false) {$planilha_error[] = 'Não existe coluna "'.$coluna.'".';}
                                    }

                                    if (count($planilha_error) > 0) {break;}
                                }

                                //Linhas de dados
                                if ($linha > 0) {
                                    //Colocando títulos no Array
                                    $linhaDados = array_combine($cabecalho, $registro);

                                    //Verificar se é Oficial ou Praça
                                    $oficial_praca = 2;
                                    $pos_gra = mb_strtolower(utf8_encode($linhaDados['POSTO/GRAD']));

                                    if ($pos_gra == 'cel' or $pos_gra == 'coronel') {$oficial_praca = 1;}
                                    if ($pos_gra == 'ten cel' or $pos_gra == 'tenente coronel') {$oficial_praca = 1;}
                                    if ($pos_gra == 'maj' or $pos_gra == 'major') {$oficial_praca = 1;}
                                    if ($pos_gra == 'cap' or $pos_gra == 'capitão') {$oficial_praca = 1;}
                                    if ($pos_gra == '1º ten' or $pos_gra == '1º tenente') {$oficial_praca = 1;}
                                    if ($pos_gra == '2º ten' or $pos_gra == '2º tenente') {$oficial_praca = 1;}

                                    //API
                                    $response = Http::post(env('API_URL') . 'api/ressarcimento_militares/importar',
                                        [
                                            'referencia' => $request['ressarcimento_militar_referencia'],
                                            'identidade_funcional' => $linhaDados['ID FUNC'],
                                            'rg' => $linhaDados['RG'],
                                            'nome' => utf8_encode($linhaDados['NOME']),
                                            'oficial_praca' => $oficial_praca,
                                            'posto_graduacao' => utf8_encode($linhaDados['POSTO/GRAD']),
                                            'quadro_qbmp' => utf8_encode($linhaDados['QUADRO/QBM']),
                                            'boletim' => $linhaDados['BOLETIM'],
                                            'lotacao_id' => utf8_encode($linhaDados['ID LOT']),
                                            'lotacao' => utf8_encode($linhaDados['LOTACAO'])
                                        ]
                                    );

                                    //Registro incluído
                                    if ($response->json('code') == 2000) {
                                        $registros_importados++;
                                    }

                                    //Registro não incluído por error
                                    if ($response->json('code') == 2005) {
                                        $registros_erros[] = $linhaDados['NOME'];
                                    }

                                    //Registro não incluído por já constar na tabela para a referência
                                    if ($response->json('code') == 2006) {
                                        $registros_importados_anteriormente[] = $linhaDados['NOME'];
                                    }

                                    //Cobrança Fechada
                                    if ($response->json('code') == 2040) {
                                        return response()->json(['error' => $response->json('message')]);
                                    }
                                }

                                $linha++;
                            }

                            //Buscando dados Api_Data() - Incluir Registro de Transação'''''''''''''''''''''''''''''''''''''
                            $transacao = Array();
                            $transacao['operacao_id'] = 1;
                            $transacao['submodulo'] = 'ressarcimento_militares';

                            //Montando Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                            $dados = '<b>Importação de Militares, Órgãos e Configurações</b>'.'<br>';
                            $dados .= '<b class="text-success">'.SuporteFacade::getReferencia(1, $request['ressarcimento_militar_referencia']).'</b>'.'<br><br>';

                            $dados .= 'Militares Importados: ' . $registros_importados.'<br>';

                            //Verificar a quantidade de orgaos depois da Importação
                            $this->responseApi(1, 10, 'ressarcimento_orgaos/quantidade_registros', '', '', '');
                            $qtd_orgaos_depois = $this->content;

                            $dados .= 'Órgãos Importados: ' . $qtd_orgaos_depois - $qtd_orgaos_antes.'<br>';

                            //Verificar a quantidade de configuracoes depois da Importação
                            $this->responseApi(1, 10, 'ressarcimento_configuracoes/quantidade_registros', '', '', '');
                            $qtd_configuracoes_depois = $this->content;

                            $dados .= 'Configurações Importadas: ' . $qtd_configuracoes_depois - $qtd_configuracoes_antes;

                            $transacao['dados'] = $dados;
                            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                            $this->responseApi(1, 4, 'transacoes', '', '', $transacao);
                            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                            //Retorno
                            return response()->json(['success' =>
                                [
                                    'registros_importados' => $registros_importados,
                                    'registros_erros' => $registros_erros,
                                    'registros_importados_anteriormente' => $registros_importados_anteriormente,
                                    'planilha_error' => $planilha_error
                                ]
                            ]);
                        } else {
                            return response()->json(['error' => 'Arquivo muito grande. O arquivo deve ter menos de '.$tamanho_maximo_extenso.'.']);
                        }
                    } else {
                        return response()->json(['error' => 'Extensão de arquivo inválida, não é CSV.']);
                    }
                } else {
                    return response()->json(['error' => 'Selecione um  arquivo CSV.']);
                }
            } catch (\Exception $e) {
                if (config('app.debug')) {
                    return response()->json(['error' => $e->getMessage()]);
                }

                return response()->json(['error' => 'Erro Interno.']);
            }
        }
    }
}
