<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class RelatorioController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function __construct()
    {
        $this->middleware('check-permissao:relatorios_list', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        //Buscando dados Api_Data() - Lista de Registros
        $this->responseApi(1, 1, 'relatorios', '', '', '');

        //Dados recebidos com sucesso
        if ($this->code == 2000) {
            $grupos = $this->content['grupos'];
            $situacoes = $this->content['situacoes'];
            $users = $this->content['users'];
            $submodulos = $this->content['submodulos'];
            $operacoes = $this->content['operacoes'];
        } else {
            $grupos = [];
            $situacoes = [];
            $users = [];
            $submodulos = [];
            $operacoes = [];
        }

        return view('relatorios.index', [
            'grupos' => $grupos,
            'situacoes' => $situacoes,
            'users' => $users,
            'submodulos' => $submodulos,
            'operacoes' => $operacoes
        ]);
    }

    public function acessos(Request $request)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data()
            $this->responseApi(1, 10, 'relatorios/acessos', '', '', '');

            //Registro recebido com sucesso
            if ($this->code == 2000) {
                return response()->json(['success' => $this->content]);
            } else {
                return response()->json(['success' => []]);
            }
        }
    }

    public function executar_relatorio_1(Request $request, $grupo_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/executar_relatorio_1/'.$grupo_id, '', '', '');

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
                $colunas_quantidade = 1;

                $colunas_titulos = array();
                $colunas_titulos[] = 'GRUPO';

                $colunas_campos = array();
                $colunas_campos[] = 'name';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '5';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function executar_relatorio_2(Request $request, $grupo_id, $situacao_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/executar_relatorio_2/'.$grupo_id.'/'.$situacao_id, '', '', '');

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
                $colunas_titulos[] = 'USUÀRIO';
                $colunas_titulos[] = 'E-MAIL';
                $colunas_titulos[] = 'MILITAR';
                $colunas_titulos[] = 'GRUPO';
                $colunas_titulos[] = 'SITUAÇÃO';

                $colunas_campos = array();
                $colunas_campos[] = 'name';
                $colunas_campos[] = 'email';
                $colunas_campos[] = [['formato' => 0, 'campo' => 'militar_rg'], ['formato' => 5, 'campo' => 'militar_posto_graduacao']];
                $colunas_campos[] = 'grupo';
                $colunas_campos[] = 'situacao';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '4';
                $colunas_campos_formato[] = '2';
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '5';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function executar_relatorio_3(Request $request, $data, $user_id, $submodulo_id, $operacao_id, $dado)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Acertar dados
            //if ($data != '') {$data = Carbon::createFromFormat('d/m/Y', $data)->format('Y-m-d');}

            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/executar_relatorio_3/'.$data.'/'.$user_id.'/'.$submodulo_id.'/'.$operacao_id.'/'.$dado, '', '', '');

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
                $colunas_titulos[] = 'DATA';
                $colunas_titulos[] = 'USUÁRIO';
                $colunas_titulos[] = 'SUBMÓDULO';
                $colunas_titulos[] = 'OPERAÇÃO';
                $colunas_titulos[] = 'DADOS';

                $colunas_campos = array();
                $colunas_campos[] = 'date';
                $colunas_campos[] = 'user';
                $colunas_campos[] = 'submodulo';
                $colunas_campos[] = 'operacao';
                $colunas_campos[] = 'dados';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '7';
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '6';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function executar_relatorio_4(Request $request, $data, $title, $notificacao, $user_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/executar_relatorio_4/'.$data.'/'.$title.'/'.$notificacao.'/'.$user_id, '', '', '');

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
                $colunas_titulos[] = 'DATA';
                $colunas_titulos[] = 'HORA';
                $colunas_titulos[] = 'TÍTULO';
                $colunas_titulos[] = 'NOTIFICAÇÃO';
                $colunas_titulos[] = 'USUÁRIO';

                $colunas_campos = array();
                $colunas_campos[] = 'date';
                $colunas_campos[] = 'time';
                $colunas_campos[] = 'title';
                $colunas_campos[] = 'notificacao';
                $colunas_campos[] = 'user';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '7';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '5';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }

    public function executar_relatorio_5(Request $request, $name, $descricao, $url, $user_id)
    {
        //Requisição Ajax
        if ($request->ajax()) {
            //Buscando dados Api_Data() - Dados
            $this->responseApi(1, 10, 'relatorios/executar_relatorio_5/'.$name.'/'.$descricao.'/'.$url.'/'.$user_id, '', '', '');

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
                $colunas_titulos[] = 'NOME';
                $colunas_titulos[] = 'DESCRIÇÃO';
                $colunas_titulos[] = 'URL';
                $colunas_titulos[] = 'USUÁRIO';

                $colunas_campos = array();
                $colunas_campos[] = 'name';
                $colunas_campos[] = 'descricao';
                $colunas_campos[] = 'url';
                $colunas_campos[] = 'user';

                $colunas_styles = array();
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';
                $colunas_styles[] = 'text-align: left;';

                $colunas_campos_formato = array();
                $colunas_campos_formato[] = '5';
                $colunas_campos_formato[] = '0';
                $colunas_campos_formato[] = '4';
                $colunas_campos_formato[] = '5';
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                $pdf = Pdf::loadView('pdfs_modelos.pdf_relatorio_tabela', compact('topo', 'rodape', 'relatorio_nome', 'relatorio_data', 'relatorio_parametros', 'colunas_quantidade', 'colunas_titulos', 'colunas_campos', 'colunas_styles', 'colunas_campos_formato', 'registros'))->setPaper('a4', 'portrait');
                $pdf->save($caminho_pdf);

                return response()->json(['success' => 'Pdf Gerado com sucesso', 'caminho_pdf' => $caminho_pdf]);
            } else {
                return response()->json(['error' => 'Erro Interno Relatórios']);
            }
        }
    }
}
