@extends('layouts.app')

@section('title') Planos @endsection

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
                                        @if (\App\Facades\Permissoes::permissao(['create']))
                                            <x-button-crud op="1" onclick="crudCreate();" />
                                        @endif
                                    </div>

                                    <!-- Filtro no Banco -->
                                    <div class="col-12 col-md-6 float-end">
                                        @php
                                            $selectCampoPesquisar = [
                                                ['value' => 'alimentacao_planos.name', 'descricao' => 'Plano']
                                            ];
                                        @endphp

                                        <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tabela (Componente Blade) -->
                        <x-table-crud-ajax :numCols="2" :colsNames="['Nome', 'Ações']" />
                        <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                        <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                        <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                        <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                        <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="name,action">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    @include('alimentacao_planos.form')
@endsection

@section('script')
    <!-- scripts_alimentacao_planos.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_alimentacao_planos.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
