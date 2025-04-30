<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Yajra\DataTables\Facades\DataTables;

class RessarcimentoPagamentoController extends Controller
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
        $this->middleware('check-permissao:ressarcimento_pagamentos_list', ['only' => ['index', 'filter']]);
        $this->middleware('check-permissao:ressarcimento_pagamentos_create', ['only' => ['importar']]);
        $this->middleware('check-permissao:ressarcimento_pagamentos_show', ['only' => ['show']]);
        $this->middleware('check-permissao:ressarcimento_pagamentos_destroy', ['only' => ['destroy']]);
    }

    public function index(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Lista de Registros
            $this->responseApi(1, 1, 'ressarcimento_pagamentos', '', '', '');

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
                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('valores', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap pb-1"><span class="text-black">(+) Bruto: </span>R$ '.$row['bruto'].'</div>';
                        $retorno .= '<div class="col-12 text-nowrap pb-1"><span class="text-danger">(-) Desconto: </span>R$ '.$row['desconto'].'</div>';
                        $retorno .= '<div class="col-12 text-nowrap"><span class="text-success">(=) Líquido: </span>R$ '.$row['liquido'].'</div>';

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
                abort(500, 'Erro Interno Pagamento');
            }
        } else {
            //Buscando dados Api_Data() - Auxiliary Tables (Combobox)
            $this->responseApi(2, 10, 'ressarcimento_militares/auxiliary/tables', '', '', '');

            //chamar view
            return view('ressarcimento_pagamentos.index', [
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
            $this->responseApi(1, 2, 'ressarcimento_pagamentos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Pagamento');
            }
        }
    }

    public function edit(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Registro pelo id
            $this->responseApi(1, 2, 'ressarcimento_pagamentos', $id, '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error_not_found' => $this->message]);
            } else {
                abort(500, 'Erro Interno Pagamento');
            }
        }
    }

    public function update(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Alterar Registro
            $this->responseApi(1, 5, 'ressarcimento_pagamentos', $id, '', $request->all());

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
                abort(500, 'Erro Interno Pagamento');
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        //Verificando Origem enviada pelo Fetch
        if ($_SERVER['HTTP_REQUEST_ORIGIN'] == 'fetch') {
            //Buscando dados Api_Data() - Deletar Registro
            $this->responseApi(1, 6, 'ressarcimento_pagamentos', $id, '', '');

            //Registro deletado com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->message]);
            } else if ($this->code == 2040) { //Registro não excluído - pertence a relacionamento com outra(s) tabela(s)
                return response()->json(['error' => $this->message]);
            } else if ($this->code == 4040) { //Registro não encontrado
                return response()->json(['error' => $this->message]);
            } else {
                abort(500, 'Erro Interno Pagamento');
            }
        }
    }

    public function filter(Request $request, $array_dados)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Pesquisar Registros
            $this->responseApi(1, 3, 'ressarcimento_pagamentos', '', $array_dados, '');

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
                        $retorno .= '<div class="col-12">'.$row['posto_graduacao'].'</div>';
                        $retorno .= '<div class="col-12">'.$row['identidade_funcional'].' ## '.$row['rg'].'</div>';

                        return $retorno;
                    })
                    ->editColumn('valores', function ($row) {
                        $retorno = '<div class="col-12 text-nowrap pb-1"><span class="text-black">(+) Bruto: </span>R$ '.$row['bruto'].'</div>';
                        $retorno .= '<div class="col-12 text-nowrap pb-1"><span class="text-danger">(-) Desconto: </span>R$ '.$row['desconto'].'</div>';
                        $retorno .= '<div class="col-12 text-nowrap"><span class="text-success">(=) Líquido: </span>R$ '.$row['liquido'].'</div>';

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
                abort(500, 'Erro Interno Pagamento');
            }
        } else {
            return view('ressarcimento_pagamentos.index');
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
                if ($request->hasFile('ressarcimento_pagamento_file')) {
                    //Detalhes do arquivo (Crítica)
                    $extensao = "csv";
                    $tamanho_maximo = 10000000;
                    $tamanho_maximo_extenso = '10MB';

                    //Buscando arquivo
                    $file = $request->file('ressarcimento_pagamento_file');

                    $arquivoExtensao = $file->getClientOriginalExtension();
                    $arquivoTamanho = $file->getSize();

                    //Verifique a extensão do arquivo
                    if ($arquivoExtensao == $extensao) {
                        //Verifique o tamanho do arquivo
                        if ($arquivoTamanho <= $tamanho_maximo) {
                            //Configurações do PHP INI (Alterando temporariamente)
                            ini_set('max_execution_time', 2400);
                            ini_set('memory_limit', '1024M');

                            //Lendo arquivo
                            $excelData = IOFactory::load($file)->getActiveSheet()->toArray();

                            //Ctrl
                            $linha = 0;
                            $registros_importados = 0;
                            $registros_erros = array();
                            $registros_importados_anteriormente = array();
                            $planilha_error = array();
                            $referencia_militares_existe = true;
                            $referencia_militares_ids_func = array();

                            //Varrer o arquivo Excel
                            foreach ($excelData as $registro) {
                                //Linha Cabeçalho
                                if ($linha == 0) {
                                    $cabecalho = $registro;
                                }

                                //Verificar se é a planilha correta (nome das colunas comparado com cabecalho)
                                if ($linha == 0) { //fazer uma única vez
                                    $colunas_planilha_correta = ['ID_FUNCIONAL', 'VINCULO', 'RG', 'COD_CARGO', 'NOME_CARGO', 'POSTO_GRAD', 'NIVEL', 'NOME_COMPLETO', 'SITPAG', 'DT_INGRESSO', 'DT_NASCIM', 'DT_APOSENT', 'SEXO', 'COD_UA', 'UA', 'CPF', 'PASEP', 'BANCO', 'AGENCIA', 'CC', 'DEPEND', 'IR_DEPENDENTE', 'COTISTA', 'BRUTO', 'DESCONTO', 'LIQUIDO', 'SOLDO', 'HOSPITAL10', 'RIOPREVID_22', 'ET_FERIAS', 'ET_DEST', 'AJ_FARD', 'HABILIT_PROFISS', 'GRET', 'AUX_MORADIA', 'GPE', 'GEE_CAPACITA', 'DEC_14407', 'FERIAS', 'RAIOX', 'TRIENIO', 'AUX_INVALID', 'TEMPO_CERTO', 'FDO_SAUDE', 'ABONO_PERMANENCIA', 'DED_IR', 'IR_VALOR', 'AUX_TRANSPORTE', 'GRAM', 'AUX_FARD', 'CIDADE'];

                                    foreach ($colunas_planilha_correta as $coluna) {
                                        $coluna_ok = false;

                                        foreach ($cabecalho as $cabecalho_coluna) {
                                            if ($cabecalho_coluna == $coluna) {$coluna_ok = true;}
                                        }

                                        if ($coluna_ok === false) {$planilha_error[] = 'Não existe coluna "'.$coluna.'".';}
                                    }

                                    if (count($planilha_error) > 0) {break;}
                                }

                                //Buscar ID Funcional dos Militares para essa referência (para verificar e copiar do Pagamento somente esses Militares)
                                if ($linha == 0) { //fazer uma única vez
                                    $referencia_militares_ids_func = Http::get(env('API_URL') . 'api/ressarcimento_pagamentos/referencia_militares_ids_func/'.$request['ressarcimento_pagamento_referencia']);
                                    $referencia_militares_ids_func = $referencia_militares_ids_func->json('content');

                                    if (count($referencia_militares_ids_func) == 0) {
                                        $referencia_militares_existe = false;
                                        break;
                                    }
                                }

                                //Linhas de dados
                                if ($linha > 0) {
                                    //Colocando títulos no Array
                                    $linhaDados = array_combine($cabecalho, $registro);

                                    //Verificar se é para importar esse Registro (Trazendo o id do registro do ressarcimento_militar)
                                    $importar_registro = false;

                                    foreach ($referencia_militares_ids_func as $id) {
                                        if (str_pad($linhaDados['ID_FUNCIONAL'], 10, '0', STR_PAD_LEFT) == $id['identidade_funcional']) {
                                            $importar_registro = true;
                                            $ressarcimento_militar_id = $id['id'];
                                            break;
                                        }
                                    }

                                    //API
                                    if ($importar_registro === true) {
                                        $response = Http::post(env('API_URL') . 'api/ressarcimento_pagamentos/importar/dados',
                                            [
                                                'ressarcimento_militar_id' => $ressarcimento_militar_id,
                                                'referencia' => $request['ressarcimento_pagamento_referencia'],
                                                'identidade_funcional' => $linhaDados['ID_FUNCIONAL'],
                                                'vinculo' => $linhaDados['VINCULO'],
                                                'rg' => $linhaDados['RG'],
                                                'codigo_cargo' => $linhaDados['COD_CARGO'],
                                                'nome_cargo' => utf8_encode($linhaDados['NOME_CARGO']),
                                                'posto_graduacao' => utf8_encode($linhaDados['POSTO_GRAD']),
                                                'nivel' => $linhaDados['NIVEL'],
                                                'nome' => $linhaDados['NOME_COMPLETO'],
                                                'situacao_pagamento' => $linhaDados['SITPAG'],
                                                'data_ingresso' => $linhaDados['DT_INGRESSO'],
                                                'data_nascimento' => $linhaDados['DT_NASCIM'],
                                                'data_aposentadoria' => $linhaDados['DT_APOSENT'],
                                                'genero' => $linhaDados['SEXO'],
                                                'codigo_ua' => $linhaDados['COD_UA'],
                                                'ua' => $linhaDados['UA'],
                                                'cpf' => $linhaDados['CPF'],
                                                'pasep' => $linhaDados['PASEP'],
                                                'banco' => $linhaDados['BANCO'],
                                                'agencia' => $linhaDados['AGENCIA'],
                                                'conta_corrente' => $linhaDados['CC'],
                                                'numero_dependentes' => $linhaDados['DEPEND'],
                                                'ir_dependente' => $linhaDados['IR_DEPENDENTE'],
                                                'cotista' => $linhaDados['COTISTA'],
                                                'bruto' => $linhaDados['BRUTO'],
                                                'desconto' => $linhaDados['DESCONTO'],
                                                'liquido' => $linhaDados['LIQUIDO'],
                                                'soldo' => $linhaDados['SOLDO'],
                                                'hospital10' => $linhaDados['HOSPITAL10'],
                                                'rioprevidencia22' => $linhaDados['RIOPREVID_22'],
                                                'etapa_ferias' => $linhaDados['ET_FERIAS'],
                                                'etapa_destacado' => $linhaDados['ET_DEST'],
                                                'ajuda_fardamento' => $linhaDados['AJ_FARD'],
                                                'habilitacao_profissional' => $linhaDados['HABILIT_PROFISS'],
                                                'gret' => $linhaDados['GRET'],
                                                'auxilio_moradia' => $linhaDados['AUX_MORADIA'],
                                                'gpe' => $linhaDados['GPE'],
                                                'gee_capacitacao' => $linhaDados['GEE_CAPACITA'],
                                                'decreto14407' => $linhaDados['DEC_14407'],
                                                'ferias' => $linhaDados['FERIAS'],
                                                'raio_x' => $linhaDados['RAIOX'],
                                                'trienio' => $linhaDados['TRIENIO'],
                                                'auxilio_invalidez' => $linhaDados['AUX_INVALID'],
                                                'tempo_certo' => $linhaDados['TEMPO_CERTO'],
                                                'fundo_saude' => $linhaDados['FDO_SAUDE'],
                                                'abono_permanencia' => $linhaDados['ABONO_PERMANENCIA'],
                                                'deducao_ir' => $linhaDados['DED_IR'],
                                                'ir_valor' => $linhaDados['IR_VALOR'],
                                                'auxilio_transporte' => $linhaDados['AUX_TRANSPORTE'],
                                                'gram' => $linhaDados['GRAM'],
                                                'auxilio_fardamento' => $linhaDados['AUX_FARD'],
                                                'cidade' => $linhaDados['CIDADE']
                                            ]
                                        );

                                        //Registro incluído
                                        if ($response->json('code') == 2000) {
                                            $registros_importados++;
                                        }

                                        //Registro não incluído por error
                                        if ($response->json('code') == 2005) {
                                            $registros_erros[] = $linhaDados['NOME_COMPLETO'];
                                        }

                                        //Registro não incluído por já constar na tabela para a referência
                                        if ($response->json('code') == 2006) {
                                            $registros_importados_anteriormente[] = $linhaDados['NOME_COMPLETO'];
                                        }

                                        //Cobrança Fechada
                                        if ($response->json('code') == 2040) {
                                            return response()->json(['error' => $response->json('message')]);
                                        }
                                    }
                                }

                                $linha++;
                            }

                            //Buscando dados Api_Data() - Incluir Registro de Transação'''''''''''''''''''''''''''''''''''''
                            $transacao = Array();
                            $transacao['operacao_id'] = 1;
                            $transacao['submodulo'] = 'ressarcimento_pagamentos';

                            //Montando Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                            $dados = '<b>Importação de Pagamentos</b>'.'<br>';
                            $dados .= '<b class="text-success">'.SuporteFacade::getReferencia(1, $request['ressarcimento_pagamento_referencia']).'</b>'.'<br><br>';
                            $dados .= 'Pagamentos Importadas: ' . $registros_importados.'<br>';

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
                                    'planilha_error' => $planilha_error,
                                    'referencia_militares_existe' => $referencia_militares_existe
                                ]
                            ]);
                        } else {
                            return response()->json(['error' => 'Arquivo muito grande. O arquivo deve ter menos de '.$tamanho_maximo_extenso.'.']);
                        }
                    } else {
                        return response()->json(['error' => 'Extensão de arquivo inválida, não é CSV.']);
                    }
                } else {
                    return response()->json(['error' => 'Arquivo CSV não encontrado.']);
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
