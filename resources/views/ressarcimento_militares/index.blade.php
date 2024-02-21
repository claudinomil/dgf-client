@extends('layouts.app')

@section('title') Militares @endsection

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
                                        <!-- Botão Importar Militares -->
                                        <x-button op="23" id="btnModalImportarMilitar" />
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="ressarcimento_militares.rg">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_militares.rg', 'descricao' => 'RG'],
                                        ['value' => 'ressarcimento_militares.referencia', 'descricao' => 'Referência'],
                                        ['value' => 'ressarcimento_militares.identidade_funcional', 'descricao' => 'Identidade Funcional'],
                                        ['value' => 'ressarcimento_militares.posto_graduacao', 'descricao' => 'Posto/Graduação'],
                                        ['value' => 'ressarcimento_militares.quadro_qbmp', 'descricao' => 'Quadro/QBMP'],
                                        ['value' => 'ressarcimento_militares.nome', 'descricao' => 'Nome']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    @php
                        $colsNames = ['Referência', 'Militar', 'Lotação'];
                        $colsFields = ['referencia', 'militar', 'lotacao'];
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
@include('ressarcimento_militares.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_militares.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_militares.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
