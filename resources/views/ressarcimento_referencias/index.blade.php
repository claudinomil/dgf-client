@extends('layouts.app')

@section('title') Referências @endsection

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
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="ressarcimento_referencias.referencia">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_referencias.referencia', 'descricao' => 'Referência'],
                                        ['value' => 'ressarcimento_referencias.ano', 'descricao' => 'Ano'],
                                        ['value' => 'ressarcimento_referencias.mes', 'descricao' => 'Mês']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    @php
                        $colsNames = ['Referência', 'Ano', 'Mês', 'Parte'];
                        $colsFields = ['referencia', 'ano', 'mes', 'parte'];
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
@include('ressarcimento_referencias.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_referencias.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_referencias.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
