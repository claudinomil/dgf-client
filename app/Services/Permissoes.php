<?php

namespace App\Services;

class Permissoes
{
    /*
     * Função para saber se o usuário logado tem acesso
     * @param $permissoesNecessarias : Permissões necessárias para ter acesso
     */
    public function permissao($permissoesNecessarias)
    {
        $userPermissoes = session('se_userLoggedPermissoes');
        $se_prefixPermissaoSubmodulo = session('se_prefixPermissaoSubmodulo');

        foreach ($userPermissoes as $userPermissao) {
            foreach ($permissoesNecessarias as $permissaoNecessaria) {
                //Verificar se $permissaoNecessaria está sendo recebido com prefix_permissao ou somente o evento
                if ($permissaoNecessaria == 'list' or $permissaoNecessaria == 'create' or $permissaoNecessaria == 'show' or $permissaoNecessaria == 'edit' or $permissaoNecessaria == 'destroy') {
                    $permissaoNecessaria = $se_prefixPermissaoSubmodulo . '_' . $permissaoNecessaria;
                }

                //Verificação
                if ($userPermissao['permissao'] == $permissaoNecessaria) {
                    return true;
                }
            }
        }

        return false;
    }
}
