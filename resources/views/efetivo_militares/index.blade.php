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
                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'dbu_efetivo.nome', 'descricao' => 'Nome'],
                                        ['value' => 'dbu_efetivo.rg', 'descricao' => 'RG'],
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
                    <x-table-crud-ajax :numCols="2" :colsNames="['RG', 'Nome', 'Posto/Graduação', 'Unidade', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="rg,nome,graduacao,unidade,action">
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
