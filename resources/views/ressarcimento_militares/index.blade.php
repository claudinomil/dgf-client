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
                                    @if (\App\Facades\Permissoes::permissao(['create']))
                                        <!-- Botão Importar Militares -->
                                        <x-button-crud op="99" model="3" bgColor="success" textColor="write" class="waves-effect btn-label waves-light" image="fa fa-file-import label-icon" label="Importar Militares" id="btnModalImportarMilitar" />
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_militares.nome', 'descricao' => 'Nome'],
                                        ['value' => 'ressarcimento_militares.rg', 'descricao' => 'RG'],
                                        ['value' => 'ressarcimento_militares.referencia', 'descricao' => 'Referência'],
                                        ['value' => 'ressarcimento_militares.identidade_funcional', 'descricao' => 'Identidade Funcional'],
                                        ['value' => 'ressarcimento_militares.posto_graduacao', 'descricao' => 'Posto/Graduação'],
                                        ['value' => 'ressarcimento_militares.quadro_qbmp', 'descricao' => 'Quadro/QBMP'],
                                        ['value' => 'ressarcimento_militares.lotacao', 'descricao' => 'Lotação'],
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="2" :colsNames="['Referência', 'Militar', 'Lotação', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="referencia,militar,lotacao,action">
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
