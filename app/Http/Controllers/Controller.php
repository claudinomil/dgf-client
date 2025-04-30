<?php

namespace App\Http\Controllers;

use App\Facades\ApiData;
use App\Facades\Permissoes;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Route;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /*
     * Função para ir na API e retornar informações
     */

    public function responseApi($op, $type, $uri, $id, $array_dados_filtro, $request)
    {
        //Buscando dados Api_Data()
        $response = ApiData::getData($type, $uri, $id, $array_dados_filtro, $request);
        //dd($response->json());   //TRAZER ERRO NA DEPURAÇÃO

        //Verificar error
        if (!isset($response['code']) or $response['code'] == 5000) {
            abort(500, 'Erro Interno => '.Route::currentRouteName().'##'.$response['message']);
        }

        //Dados de Retorno
        if ($op == 1) {
            $this->message = $response['message'];
            $this->code = $response['code'];
            $this->validation = $response['validation'];
            $this->content = $response['content'];
        }

        //Dados de Retorno (Auxiliares/Combobox)
        if ($op == 2) {
            if (isset($response['content']['grupos'])) {$this->grupos = $response['content']['grupos'];}
            if (isset($response['content']['groupo_permissoes'])) {$this->groupo_permissoes = $response['content']['groupo_permissoes'];}
            if (isset($response['content']['modulos'])) {$this->modulos = $response['content']['modulos'];}
            if (isset($response['content']['submodulos'])) {$this->submodulos = $response['content']['submodulos'];}
            if (isset($response['content']['notificacoes'])) {$this->notificacoes = $response['content']['notificacoes'];}
            if (isset($response['content']['notificacoes_lidas'])) {$this->notificacoes_lidas = $response['content']['notificacoes_lidas'];}
            if (isset($response['content']['operacoes'])) {$this->operacoes = $response['content']['operacoes'];}
            if (isset($response['content']['permissoes'])) {$this->permissoes = $response['content']['permissoes'];}
            if (isset($response['content']['situacoes'])) {$this->situacoes = $response['content']['situacoes'];}
            if (isset($response['content']['ferramentas'])) {$this->ferramentas = $response['content']['ferramentas'];}
            if (isset($response['content']['transacoes'])) {$this->transacoes = $response['content']['transacoes'];}
            if (isset($response['content']['users'])) {$this->users = $response['content']['users'];}
            if (isset($response['content']['esferas'])) {$this->esferas = $response['content']['esferas'];}
            if (isset($response['content']['poderes'])) {$this->poderes = $response['content']['poderes'];}
            if (isset($response['content']['tratamentos'])) {$this->tratamentos = $response['content']['tratamentos'];}
            if (isset($response['content']['vocativos'])) {$this->vocativos = $response['content']['vocativos'];}
            if (isset($response['content']['setores'])) {$this->setores = $response['content']['setores'];}
            if (isset($response['content']['funcoes'])) {$this->funcoes = $response['content']['funcoes'];}
            if (isset($response['content']['lotacoes'])) {$this->lotacoes = $response['content']['lotacoes'];}
            if (isset($response['content']['referencias'])) {$this->referencias = $response['content']['referencias'];}
            if (isset($response['content']['dashboards'])) {$this->dashboards = $response['content']['dashboards'];}
            if (isset($response['content']['relatorios'])) {$this->relatorios = $response['content']['relatorios'];}
        }
    }

    public function columnAction(string $id, $botoes=7)
    {
        //PARAN: $botoes
        //0: Nenhum Botão
        //1: Somente Visualização
        //2: Somente Alteração
        //3: Somente Exclusão
        //4: Visualização e Alteração
        //5: Visualização e Exclusão
        //6: Alteração e Exclusão
        //7: Visualização, Alteração e Exclusão

        //Montando Coluna Ação
        $btn = '<td class="text-center" style="vertical-align:top; white-space:nowrap;"><div class="row">';

        if ($botoes == 1 or $botoes == 4 or $botoes == 5 or $botoes == 7 or $botoes == 8) {
            if (Permissoes::permissao(['show'])) {
                $btn .= '<div class="col-4"><button type="button" class="btn btn-outline-info text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Registro" onclick="crudView('.$id.');"><i class="fa fa-eye font-size-18"></i></button></div>';
            }
        }

        if ($botoes == 2 or $botoes == 4 or $botoes == 6 or $botoes == 7) {
            if (Permissoes::permissao(['edit'])) {
                $btn .= '<div class="col-4"><button type="button" class="btn btn-outline-primary text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar Registro" onclick="crudEdit('.$id.');"><i class="fas fa-pencil-alt font-size-18"></i></button></div>';
            }
        }

        if ($botoes == 3 or $botoes == 5 or $botoes == 6 or $botoes == 7) {
            if (Permissoes::permissao(['destroy'])) {
                $btn .= '<div class="col-4"><button type="button" class="btn btn-outline-danger text-center btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir Registro" onclick="crudDelete('.$id.');"><i class="fa fa-trash-alt font-size-18"></i></button></div>';
            }
        }

        $btn .= '</div></td>';

        return $btn;
    }
}
