@extends('layouts.app')

@section('title') configurações @endsection

@section('css')
@endsection

@section('content')

    @component('components.breadcrumb')
@section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
@endcomponent

<div id="crudTable">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <!-- Botoes -->
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <!-- Botões -->
                                <div class="col-12 col-md-6 pb-2">
                                    @if (\App\Facades\Permissoes::permissao([$ajaxPrefixPermissaoSubmodulo.'_create'], $userLoggedPermissoes))
                                        <x-button op="1" id="createNewRecord" />
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="ressarcimento_configuracoes.referencia">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_configuracoes.referencia', 'descricao' => 'Referência']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    @php
                        $colsNames = ['Referência', 'Diretor Geral de Finanças', 'Chefe da DGF/2 - Contabilidade'];
                        $colsFields = ['referencia', 'diretor_geral_financas', 'chefe_dgf2'];
                        $colActions = 'yes';
                    @endphp

                    <x-table-crud-ajax
                        :numCols="4"
                        :class="'table table-bordered dt-responsive table-striped w-100 class-datatable-1'"
                        :colsNames=$colsNames
                        :colsFields=$colsFields
                        :colActions=$colActions />
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('ressarcimento_configuracoes.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_configuracoes.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_configuracoes.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
