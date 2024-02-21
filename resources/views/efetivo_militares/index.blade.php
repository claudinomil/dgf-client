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
                                <div class="col-12 col-md-6 pb-2">&nbsp;</div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    <input type="hidden" id="filter-crud-filter_crud_tipo_condicao" value="1">
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="efetivo_militares.rg">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'dbu_efetivo.rg', 'descricao' => 'RG'],
                                        ['value' => 'dbu_efetivo.nome', 'descricao' => 'Nome'],
                                        ['value' => 'dbu_situacoes.situacao', 'descricao' => 'Situação'],
                                        ['value' => 'dbu_graduacoes.graduacao', 'descricao' => 'Posto/Graduação'],
                                        ['value' => 'dbu_quadros.quadro', 'descricao' => 'Quadro'],
                                        ['value' => 'dbu_unidades.unidade', 'descricao' => 'Unidade'],

                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    @php
                        $colsNames = ['RG', 'Nome', 'Posto/Graduação', 'Unidade'];
                        $colsFields = ['rg', 'nome', 'graduacao', 'unidade'];
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
@include('efetivo_militares.form')
@endsection

@section('script')
    <!-- scripts_efetivo_militares.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_efetivo_militares.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
