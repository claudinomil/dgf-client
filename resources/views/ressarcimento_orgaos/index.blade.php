@extends('layouts.app')

@section('title') Órgãos @endsection

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
                                    <input type="hidden" id="filter-crud-filter_crud_campo_pesquisar" value="ressarcimento_orgaos.destinatario_pequeno">
                                    <input type="hidden" id="filter-crud-filter_crud_operacao_realizar" value="1">

                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_orgaos.name', 'descricao' => 'Nome'],
                                        ['value' => 'ressarcimento_orgaos.cnpj', 'descricao' => 'CNPJ'],
                                        ['value' => 'ressarcimento_orgaos.ug', 'descricao' => 'UG'],
                                        ['value' => 'ressarcimento_orgaos.destinatario_pequeno', 'descricao' => 'Destinatário Pequeno'],
                                        ['value' => 'ressarcimento_orgaos.destinatario_grande', 'descricao' => 'Destinatário Grande'],
                                        ['value' => 'ressarcimento_orgaos.responsavel', 'descricao' => 'Responsável'],
                                        ['value' => 'esferas.name', 'descricao' => 'Esfera'],
                                        ['value' => 'poderes.name', 'descricao' => 'Poder'],
                                        ['value' => 'tratamentos.name', 'descricao' => 'Tratamento'],
                                        ['value' => 'vocativos.name', 'descricao' => 'Vocativo'],
                                        ['value' => 'funcoes.name', 'descricao' => 'Função'],
                                        ['value' => 'ressarcimento_orgaos.lotacao', 'descricao' => 'Lotação']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    @php
                        $colsNames = ['Nome', 'Responsável', 'Destinatário'];
                        $colsFields = ['name', 'responsavel', 'destinatario_pequeno'];
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
@include('ressarcimento_orgaos.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_orgaos.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_orgaos.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
