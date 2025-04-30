<?php

namespace App\Http\Middleware;

use App\Facades\ApiData;
use App\Facades\Breadcrumb;
use App\Facades\Permissoes;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class CheckPermissao
{
    /*
     * Checa se o usuário tem as permissões necessárias para o método
     * Grava os dados do Usuário logado
     * Aproveitando e grava os dados para Breadcrumb
     */
    public function handle(Request $request, Closure $next, $permissoes)
    {
        //Os dados serão buscados somente em alguns eventos
        if ($request->route()->getActionMethod() === 'index') {
            //Buscando dados do Usuário e Permissões de acesso para todo o Sistema''''''''''''''''''''''''''''''''''''''
            //Submodulo (Usado para comparação na busca na API do Submódulo que o Usuário entrou)
            $searchSubmodulo = substr($request->route()->getPrefix(), 1);

            //Se $searchSubmodulo for vazio buscamos o último submodulo que entrou pelo Breadcrumb
            //Pode ser vazio por alguma rota ajax. Ex.: profiledata
            if ($searchSubmodulo == '') {
                $ultSubmodulo = Breadcrumb::getPreviousPageRoute();
                $ultSubmodulo = explode('.', $ultSubmodulo);
                $searchSubmodulo = $ultSubmodulo[0];
            }

            //Buscando dados Usuario/Permissões/Configurações/Ajax CRUD
            $response = ApiData::getData(0, $searchSubmodulo, '', '', '');
            //dd($response->json());   //TRAZER ERRO NA DEPURAÇÃO

            if (isset($response['content'])) {
                session(['se_userLoggedData' => $response['content']['userData']]); //Dados do Usuário Logado
                session(['se_userLoggedPermissoes' => $response['content']['userPermissoes']]); //Permissões do Usuário Logado
                session(['se_userLoggedMenuModulos' => $response['content']['menuModulos']]); //Módulos Menu
                session(['se_userLoggedMenuSubmodulos' => $response['content']['menuSubmodulos']]); //Submódulos Menu
                session(['se_userLoggedFerramentas' => $response['content']['ferramentas']]); //Ferramentas
                session(['se_userLoggedUnreadNotificacoes' => $response['content']['notificacoes']]); //Notificações não lidas pelo Usuário logado
                session(['se_prefixPermissaoSubmodulo' => $response['content']['prefixPermissaoSubmodulo'][0]['prefix_permissao']]); //Variavel prefix_permissao do Submodulo
                session(['se_nameSubmodulo' => $response['content']['nameSubmodulo'][0]['name']]); //Variavel name do Submodulo
                session(['se_nameFormSubmodulo' => 'frm_' . session('se_prefixPermissaoSubmodulo')]); //Variavel name do Formulário
                session(['se_namesFieldsSubmodulo' => $response['content']['namesFieldsSubmodulo']]); //Array com os nomes dos campos da tabela
                session(['se_layouts_modes' => $response['content']['layouts_modes']]); //Layouts Modes
                session(['se_layouts_styles' => $response['content']['layouts_styles']]); //Layouts Styles
            } else {
                if ($request->ajax()) {
                    return response()->json(['error_permissao' => 'Permissão Negada']);
                } else {
                    abort(403, 'Permissão Negada');
                }
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Criar um array simples com os campos da tabela do submodulo (Ser usado nos CRUDS)'''''''''''''''''''''''''
            $fieldsFormSubmodulo = session('se_namesFieldsSubmodulo');
            $crudFieldsFormSubmodulo = '';
            foreach ($fieldsFormSubmodulo as $field) {
                if ($crudFieldsFormSubmodulo != '') {
                    $crudFieldsFormSubmodulo .= ',';
                }
                $crudFieldsFormSubmodulo .= $field;
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Alguns submódulos precisam refazer a variavel $crudFieldsFormSubmodulo''''''''''''''''''''''''''''''''''''
            //É preciso colocar os dados que vão ficar no formulário em um array simples
            if (session('se_prefixPermissaoSubmodulo') == 'efetivo_militares') {
                $crudFieldsFormSubmodulo = 'rg,identidade_funcional,vinculo,nome,nome_guerra,situacao,boletim_situacao,quadro,boletim_quadro,graduacao,boletim_graduacao,data_ingresso,boletim_ingresso,unidade,boletim_movimentacao,unidade_prestando_servico,boletim_prestando_servico,data_nascimento,estado_civil,comportamento,sexo,tipo_sanguineo,fator_rh,nacionalidade,naturalidade,banco,agencia,conta_corrente,cpf,pasep,titulo_eleitoral,titulo_eleitoral_zona,titulo_eleitoral_secao,pai,mae';
            }
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Retornar dados para o Request e View''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            //Passando variaveis para todas as views
            View::share([
                'se_prefixPermissaoSubmodulo' => session('se_prefixPermissaoSubmodulo'),
                'se_nameSubmodulo' => session('se_nameSubmodulo'),
                'se_nameFormSubmodulo' => session('se_nameFormSubmodulo'),
                'se_layouts_modes' => session('se_layouts_modes'),
                'se_layouts_styles' => session('se_layouts_styles'),
                'crudFieldsFormSubmodulo' => $crudFieldsFormSubmodulo
            ]);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        }

        //Verificar Permissao'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        //Permissoes que são necessarias para acesso
        $permissoes = explode('|', $permissoes);

        //Monta array com permissões
        $arrayPermissoes = array();
        foreach ($permissoes as $permissao) {
            $arrayPermissoes[] = $permissao;
        }

        //Permissão
        if (!Permissoes::permissao($arrayPermissoes)) {
            if ($request->ajax()) {
                return response()->json(['error_permissao' => 'Permissão Negada']);
            } else {
                abort(403, 'Permissão Negada');
            }
        }
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Gravar as Sessões de Breadcrumb'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        Breadcrumb::sessionsBreadcrumb();
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Retornando
        return $next($request);
    }
}
