<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class RessarcimentoRelatorioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:ressarcimento_relatorios_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Lista de Registros
        $this->responseApi(1, 1, 'ressarcimento_relatorios', '', '', '');

        //Dados recebidos com sucesso
        if ($this->code == 2000) {
            $referencias = $this->content['referencias'];
            $primeira_referencia = $this->content['primeira_referencia'];
            $ultima_referencia = $this->content['ultima_referencia'];
            $orgaos = $this->content['orgaos'];
        } else {
            $referencias = [];
            $primeira_referencia = '';
            $ultima_referencia = '';
            $orgaos = [];
        }

        return view('ressarcimento_relatorios.index', [
            'referencias' => $referencias,
            'primeira_referencia' => $primeira_referencia,
            'ultima_referencia' => $ultima_referencia,
            'orgaos' => $orgaos
        ]);
    }

    public function acessos(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'ressarcimento_relatorios/acessos', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function executar_relatorio_6(Request $request, $referencia, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_relatorios/executar_relatorio_6/'.$referencia.'/'.$orgao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Gerar PDF
                $nome_pdf = 'rel_'.date('Ymdhis').'.pdf';
                $caminho_pdf = 'build/assets/pdfs/relatorios/'.$nome_pdf;
                $topo = 1;
                $rodape = 1;
                $relatorio_nome = $this->content['relatorio_nome'];
                $relatorio_data = date('Y-m-d');
                $relatorio_parametros = $this->content['relatorio_parametros'];
                $registros = $this->content['registros'];

                //Arrays para montar tabela de registros''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $colunas_quantidade = 5;

                $colunas_titulos = array();
                $colunas_titulos[] = 'ÓRGÃO';
                $colunas_titulos[] = 'MILITAR';
                $colunas_titulos[] = 'ID FUNC.';
                $colunas_titulos[] = 'POSTO/GRAD';
                $colunas_titulos[] = 'QUADRO';

                $colunas_campos = array();
                $colunas_campos[] = 'orgao_nome';
                $colunas_campos[] = 'militar_nome';
                $colunas_campos[] = 'militar_identidade_funcional';
                $colunas_campos[] = 'militar_posto_graduacao';
                $colunas_campos[] = 'militar_quadro';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '0';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Relatórios']);
            }
        }
    }

    public function executar_relatorio_7(Request $request, $referencia, $orgao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_relatorios/executar_relatorio_7/'.$referencia.'/'.$orgao_id, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Gerar PDF
                $nome_pdf = 'rel_'.date('Ymdhis').'.pdf';
                $caminho_pdf = 'build/assets/pdfs/relatorios/'.$nome_pdf;
                $topo = 1;
                $rodape = 1;
                $relatorio_nome = $this->content['relatorio_nome'];
                $relatorio_data = date('Y-m-d');
                $relatorio_parametros = $this->content['relatorio_parametros'];
                $registros = $this->content['registros'];

                //Arrays para montar tabela de registros''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $colunas_quantidade = 4;

                $colunas_titulos = array();
                $colunas_titulos[] = 'ÓRGÃO';
                $colunas_titulos[] = 'VENCIMENTOS BRUTOS';
                $colunas_titulos[] = 'ENCARGOS SOCIAIS E PATRONAIS';
                $colunas_titulos[] = 'RESSARCIMENTO';

                $colunas_campos = array();
                $colunas_campos[] = 'orgao_name';
                $colunas_campos[] = 'vencimentos_brutos';
                $colunas_campos[] = 'encargos_sociais_e_patronais';
                $colunas_campos[] = 'ressarcimento';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: right;';
                $colunas_styles[] = 'text-align: right;';
                $colunas_styles[] = 'text-align: right;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '1';
                $colunas_campos_formato[] = '1';
                $colunas_campos_formato[] = '1';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Relatórios']);
            }
        }
    }

    public function executar_relatorio_8(Request $request, $referencia, $orgao_id, $saldo)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'ressarcimento_relatorios/executar_relatorio_8/'.$referencia.'/'.$orgao_id.'/'.$saldo, '', '', '');

            //Dados recebidos com sucesso
            if ($this->code == 2000) {
                //Gerar PDF
                $nome_pdf = 'rel_'.date('Ymdhis').'.pdf';
                $caminho_pdf = 'build/assets/pdfs/relatorios/'.$nome_pdf;
                $topo = 1;
                $rodape = 1;
                $relatorio_nome = $this->content['relatorio_nome'];
                $relatorio_data = date('Y-m-d');
                $relatorio_parametros = $this->content['relatorio_parametros'];
                $registros = $this->content['registros'];

                //Arrays para montar tabela de registros''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $colunas_quantidade = 4;

                $colunas_titulos = array();
                $colunas_titulos[] = 'ÓRGÃO';
                $colunas_titulos[] = 'RESSARCIMENTO';
                $colunas_titulos[] = 'RECEBIMENTO';
                $colunas_titulos[] = 'SALDO';

                $colunas_campos = array();
                $colunas_campos[] = 'orgao_name';
                $colunas_campos[] = 'ressarcimento';
                $colunas_campos[] = 'recebimento';
                $colunas_campos[] = 'saldo';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: right;';
                $colunas_styles[] = 'text-align: right;';
                $colunas_styles[] = 'text-align: right;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '1';
                $colunas_campos_formato[] = '1';
                $colunas_campos_formato[] = '1';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Ressarcimento Relatórios']);
            }
        }
    }
}
