<?php

namespace App\Services;

use App\Facades\Permissoes;

class Menu
{
    public function getMenu($tp)
    {
        $menu = '';

        //Módulos e Submódulos
        $modulos = session('se_userLoggedMenuModulos');
        $submodulos = session('se_userLoggedMenuSubmodulos');

        //Pegar Id do Modulo Ativo
        $moduloIdActive = 0;
        foreach ($submodulos as $dado) {
            if ($dado['menu_route'] . '.index' == session('breadcrumbCurrentPageRoute')) {
                $moduloIdActive = $dado['modulo_id'];
            }
        }

        //Menu Verticarl
        if ($tp == 1) {
            $menu .= "<ul class='metismenu list-unstyled' id='side-menu'>";
        }

        //Menu Horizontal
        if ($tp == 2) {
            $menu .= "<ul class='navbar-nav'>";
        }

        //varrer Módulos
        foreach ($modulos as $modulo) {
            $modOk = 1;

            //Menu Setor
            $menu_setor = $modulo['setor_name'];
            $menu_setor_icon = $modulo['setor_menu_icon'];

            //Varrer Submódulos
            foreach ($submodulos as $submodulo) {
                if ($modulo['id'] == $submodulo['modulo_id']) {
                    $permitido = Permissoes::permissao([$submodulo['prefix_permissao'] . '_list']);

                    //negar alguns submodulos para fim de desenvolvimento
                    //if ($submodulo['id'] == 27) {$permitido = false;}
                    //'''''''''''''''''''''''''''''''''''''''''''''''''''

                    if ($permitido) {
                        if ($modOk == 1) {
                            $modOk = 0;

                            //li_active
                            $li_active = '';
                            if ($modulo['id'] == $moduloIdActive) {
                                $li_active = 'mm-active';
                            }

                            //Menu Verticarl
                            if ($tp == 1) {
                                if ($menu_setor != '') {
                                    $menu .= "<li>
                                                <a href='javascript: void(0);' class='has-arrow waves-effect'>
                                                    <i class='" . $menu_setor_icon . "' style='font-size:16px;'></i><span>" . $menu_setor . "</span>
                                                </a>
                                                <ul class='sub-menu' aria-expanded='true'>";
                                }

                                $menu .= "<li class='" . $li_active . "'>
                                        <a href='javascript: void(0);' class='has-arrow waves-effect'>
                                            <i class='" . $modulo['menu_icon'] . "' style='font-size:16px;'></i><span key='t-" . $modulo['menu_route'] . "'>" . $modulo['menu_text'] . "</span>
                                        </a>
                                        <ul class='sub-menu' aria-expanded='true'>";
                            }

                            //Menu Horizontal
                            if ($tp == 2) {
                                $menu .= "<li class='nav-item dropdown " . $li_active . "'>
                                            <a class='nav-link dropdown-toggle arrow-none' href='#' id='topnav-layout' role='button'>
                                                <i class='" . $modulo['menu_icon'] . " me-2'></i><span key='t-" . $modulo['menu_route'] . "'>" . $modulo['menu_text'] . "</span> <div class='arrow-down'></div>
                                            </a>
                                            <div class='dropdown-menu' aria-labelledby='topnav-layout'>
                                                <div class='dropdown'>";
                            }
                        }

                        //Menu Verticarl
                        if ($tp == 1) {
                            $active = '';

                            if ($submodulo['menu_route'] . '.index' == session('breadcrumbCurrentPageRoute')) {
                                $active = 'active';
                            }

                            $menu .= "<li><a href='" . route($submodulo['menu_route'] . '.index') . "' class='" . $active . "' key='t-" . $submodulo['menu_route'] . "'><i class='" . $submodulo['menu_icon'] . " font-size-10'></i>" . $submodulo['menu_text'] . "</a></li>";
                        }

                        //Menu Horizontal
                        if ($tp == 2) {
                            $menu .= "<a href='" . route($submodulo['menu_route'] . '.index') . "' class='dropdown-item' key='t-" . $submodulo['menu_route'] . "'><i class='" . $submodulo['menu_icon'] . " me-1'></i>" . $submodulo['menu_text'] . "</a>";
                        }
                    }
                }
            }

            if ($modOk == 0) {
                //Menu Verticarl
                if ($tp == 1) {
                    $menu .= "</ul></li>";

                    if ($menu_setor != '') {
                        $menu .= "</ul></li>";
                    }
                }

                //Menu Horizontal
                if ($tp == 2) {
                    $menu .= "</div></div></li>";

                    if ($menu_setor != '') {
                        $menu .= "</ul></li>";
                    }
                }
            }
        }

        //Menu Verticarl
        if ($tp == 1) {
            $menu .= "</ul>";
        }

        //Menu Horizontal
        if ($tp == 2) {
            $menu .= "</ul>";
        }

        return $menu;
    }
}
