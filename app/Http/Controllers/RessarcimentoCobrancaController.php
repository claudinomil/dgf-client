<?php

namespace App\Http\Controllers;

use App\Facades\SuporteFacade;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class RessarcimentoCobrancaController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_cobrancas_list', ['only' => ['index', 'dados_ressarcimento']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Index
        $this->responseApi(1, 10, 'ressarcimento_cobrancas/index/'.session('se_prefixPermissaoSubmodulo'), '', '', '');

        //Dados recebidos com sucesso
        if ($this->code == 2000) {
            //chamar view
            return view('ressarcimento_cobrancas.index', [
                'prefix_permissao' => session('se_prefixPermissaoSubmodulo'),
                'icone' => $this->content['icone'],
                'referencias' => $this->content['referencias']
            ]);
        } else {
            abort(500, 'Erro Interno Ressarcimento Cobrança');
        }
    }

    public function dados_ressarcimento(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_cobrancas/dados_ressarcimento/'.$referencia, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Verificar se tem os 3(três) arquivos pdf de cobrança''''''''''''''''''''''''''''''''''''''''''''''''''

                //Padrão dos arquivos
                //Listagem: cobranca_referencia_listagem_orgao id => cobranca_20231001_listagem_1
                //Nota: cobranca_referencia_nota_orgao id => cobranca_20231001_nota_1
                //Ofício: cobranca_referencia_oficio_orgao id => cobranca_20231001_oficio_1

                //Variaveis
                $arqListagemQtd = 0;
                $arqNotaQtd = 0;
                $arqOficioQtd = 0;

                //varrer orgãos procurando arquivos
                foreach ($this->content['re_orgaos'] as $orgao) {
                    $arqListagemNome = 'cobranca_'.$referencia.'_listagem_'.$orgao['id'].'.pdf';
                    $arqNotaNome = 'cobranca_'.$referencia.'_nota_'.$orgao['id'].'.pdf';
                    $arqOficioNome = 'cobranca_'.$referencia.'_oficio_'.$orgao['id'].'.pdf';

                    if (file_exists('build/assets/pdfs/cobrancas/'.$arqListagemNome)) {$arqListagemQtd++;}
                    if (file_exists('build/assets/pdfs/cobrancas/'.$arqNotaNome)) {$arqNotaQtd++;}
                    if (file_exists('build/assets/pdfs/cobrancas/'.$arqOficioNome)) {$arqOficioQtd++;}
                }

                //Variáveis de Controle''''''''
                $re_status_documentos = $this->content['re_status_documentos'];
                $re_status_documentos_texto = $this->content['re_status_documentos_texto'];

                //Verificação de status: Listagens
                if ($arqListagemQtd == count($this->content['re_orgaos'])) {
                    $listagem_status_cor = 'success';
                    $listagem_status = 'Quantidade de PDFs Listagens Ok';
                } else {
                    //Variáveis de Controle''''''''
                    $re_status_documentos = 0;
                    $re_status_documentos_texto = 'Documentos Falhou.';
                    //'''''''''''''''''''''''''''''

                    if ($arqListagemQtd == 0) {
                        $listagem_status_cor = 'danger';
                        $listagem_status = 'Não existem arquivos de PDFs Listagens';
                    } else {
                        $listagem_status_cor = 'danger';
                        $listagem_status = 'Quantidade de arquivos PDFs de Listagens';
                    }
                }

                //Verificação de status: Notas
                if ($arqNotaQtd == count($this->content['re_orgaos'])) {
                    $nota_status_cor = 'success';
                    $nota_status = 'Quantidade de PDFs Notas Ok';
                } else {
                    //Variáveis de Controle''''''''
                    $re_status_documentos = 0;
                    $re_status_documentos_texto = 'Documentos Falhou.';
                    //'''''''''''''''''''''''''''''

                    if ($arqNotaQtd == 0) {
                        $nota_status_cor = 'danger';
                        $nota_status = 'Não existem arquivos de PDFs Notas';
                    } else {
                        $nota_status_cor = 'danger';
                        $nota_status = 'Quantidade de arquivos PDFs de Notas';
                    }
                }

                //Verificação de status: Ofícios
                if ($arqOficioQtd == count($this->content['re_orgaos'])) {
                    $oficio_status_cor = 'success';
                    $oficio_status = 'Quantidade de PDFs Ofícios Ok';
                } else {
                    //Variáveis de Controle''''''''
                    $re_status_documentos = 0;
                    $re_status_documentos_texto = 'Documentos Falhou.';
                    //'''''''''''''''''''''''''''''

                    if ($arqOficioQtd == 0) {
                        $oficio_status_cor = 'danger';
                        $oficio_status = 'Não existem arquivos de PDFs Ofícios';
                    } else {
                        $oficio_status_cor = 'danger';
                        $oficio_status = 'Quantidade de arquivos PDFs de Ofícios';
                    }
                }

                //Variáveis de Controle''''''''
                if ($re_status_documentos == 0) {
                    $this->content['re_status_documentos'] = $re_status_documentos;
                    $this->content['re_status_documentos_texto'] = $re_status_documentos_texto;
                }

                //colocando Status no array para mostrar na View
                $this->content['re_registros_grade_status_documentos'][] = [
                    'status_cor' => $listagem_status_cor,
                    'status' => $listagem_status,
                    'detalhes' => ''
                ];

                $this->content['re_registros_grade_status_documentos'][] = [
                    'status_cor' => $nota_status_cor,
                    'status' => $nota_status,
                    'detalhes' => ''
                ];

                $this->content['re_registros_grade_status_documentos'][] = [
                    'status_cor' => $oficio_status_cor,
                    'status' => $oficio_status,
                    'detalhes' => ''
                ];
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Cobrança']);
            }
        }
    }

    public function gerar_cobrancas(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_cobrancas/gerar_cobrancas/'.$referencia, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Incluir Registro de Transação'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $transacao = Array();
                $transacao['operacao_id'] = 1;
                $transacao['submodulo'] = 'ressarcimento_cobrancas';

                //Montando Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $dados = '<b>Gerar Cobranças</b>'.'<br>';
                $dados .= '<b class="text-success">'.SuporteFacade::getReferencia(1, $referencia).'</b>'.'<br><br>';

                $transacoesDados = $this->content['transacoes'];
                foreach ($transacoesDados as $transacoesDado) {
                    $dados .= $transacoesDado.'<br>';
                }

                $transacao['dados'] = $dados;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $this->responseApi(1, 4, 'transacoes', '', '', $transacao);
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->message]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Cobrança']);
            }
        }
    }

    public function gerar_pdfs(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_cobrancas/gerar_pdfs/'.$referencia, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Variaveis para Gravação da Transação
                $total_pdfs_listagens = 0;
                $total_pdfs_notas = 0;
                $total_pdfs_oficios = 0;
                $total_pdfs_zipados = 0;

                //Gerar PDF Listagem
                $listagens = $this->content['cobranca_pdfs_listagens'];
                $listagens_dados = $this->content['cobranca_pdfs_listagens_dados'];
                foreach ($listagens as $listagem) {
                    $listagem = $listagem;
                    $pdf = Pdf::loadView('ressarcimento_cobrancas.pdf_listagem', compact('listagem', 'listagens_dados'))->setPaper('a4', 'portrait');
                    $pdf->save('build/assets/pdfs/cobrancas/cobranca_' . $referencia . '_listagem_' . $listagem['ressarcimento_orgao_id'] . '.pdf');

                    $total_pdfs_listagens++;
                }

                //Gerar PDF Notas
                $notas = $this->content['cobranca_pdfs_notas'];
                foreach ($notas as $nota) {
                    $dados = $nota;
                    $pdf = Pdf::loadView('ressarcimento_cobrancas.pdf_nota', compact('dados'))->setPaper('a4', 'portrait');
                    $pdf->save('build/assets/pdfs/cobrancas/cobranca_' . $referencia . '_nota_' . $nota['ressarcimento_orgao_id'] . '.pdf');

                    $total_pdfs_notas++;
                }

                //Gerar PDF Ofícios
                $oficios = $this->content['cobranca_pdfs_oficios'];
                foreach ($oficios as $oficio) {
                    $dados = $oficio;
                    $pdf = Pdf::loadView('ressarcimento_cobrancas.pdf_oficio', compact('dados'))->setPaper('a4', 'portrait');
                    $pdf->save('build/assets/pdfs/cobrancas/cobranca_' . $referencia . '_oficio_' . $oficio['ressarcimento_orgao_id'] . '.pdf');

                    $total_pdfs_oficios++;
                }

                //Gerar ZIP
                $pasta = 'build/assets/pdfs/cobrancas/';
                $arquivos = glob($pasta . '*_'.$referencia.'*.pdf');

                if (count($arquivos) > 0) {
                    $zip = new ZipArchive();
                    $nomeZip = $pasta . 'cobranca_' . $referencia . '.zip';

                    if ($zip->open($nomeZip, ZipArchive::CREATE) === TRUE) {
                        foreach ($arquivos as $arquivo) {
                            $nomeArquivo = basename($arquivo);
                            $zip->addFile($arquivo, $nomeArquivo);
                        }

                        $zip->close();

                        $total_pdfs_zipados++;
                    }
                }

                //Incluir Registro de Transação'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $transacao = Array();
                $transacao['operacao_id'] = 1;
                $transacao['submodulo'] = 'ressarcimento_cobrancas';

                //Montando Dados''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $dados = '<b>Gerar PDFs de Cobranças</b>'.'<br>';
                $dados .= '<b class="text-success">'.SuporteFacade::getReferencia(1, $referencia).'</b>'.'<br><br>';
                $dados .= 'Apagado PDFs para a referência.'.'<br>';
                $dados .= 'Gerado '.$total_pdfs_listagens.' PDFs de Listagens.'.'<br>';
                $dados .= 'Gerado '.$total_pdfs_oficios.' PDFs de Ofícios.'.'<br>';
                $dados .= 'Gerado '.$total_pdfs_notas.' PDFs de Notas.'.'<br>';
                $dados .= 'Gerado '.$total_pdfs_zipados.' Arquivo Zipado com PDFs.'.'<br>';
                $transacao['dados'] = $dados;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $this->responseApi(1, 4, 'transacoes', '', '', $transacao);
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                return response()->json(['success' => $this->message]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Cobrança']);
            }
        }
    }

    public function verificar_existe_zip(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            if (file_exists('build/assets/pdfs/cobrancas/cobranca_' . $referencia . '.zip')) {
                return response()->json(['success' => 'Arquivo encontrado.']);
            } else {
                return response()->json(['error' => 'Arquivo não encontrado.']);
            }
        }
    }

    public function deletar_pdfs_gerados(Request $request, $referencia)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Apagando listagem
            array_map('unlink', glob('build/assets/pdfs/cobrancas/cobranca_'.$referencia.'_listagem_*.pdf'));

            //Apagando Notas
            array_map('unlink', glob('build/assets/pdfs/cobrancas/cobranca_'.$referencia.'_nota_*.pdf'));

            //Apagando Ofícios
            array_map('unlink', glob('build/assets/pdfs/cobrancas/cobranca_'.$referencia.'_oficio_*.pdf'));

            //Apagando ZIP
            array_map('unlink', glob('build/assets/pdfs/cobrancas/cobranca_'.$referencia.'.zip'));
        }
    }
}
