@extends('layouts.app')

@section('title') Ressarcimento Recebimentos @endsection

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
                                    @if (\App\Facades\Permissoes::permissao(['edit']))
                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar Registros" id="re_btn_alterar_registros"><i class="bx bx-edit label-icon"></i> Alterar Registros</button>
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    @php
                                        $selectCampoPesquisar = [
                                        ['value' => 'ressarcimento_cobrancas_dados.militar_nome', 'descricao' => 'Nome'],
                                        ['value' => 'ressarcimento_cobrancas_dados.militar_posto_graduacao', 'descricao' => 'Posto/Grad'],
                                        ['value' => 'ressarcimento_cobrancas_dados.militar_rg', 'descricao' => 'RG'],
                                        ['value' => 'ressarcimento_cobrancas_dados.orgao_name', 'descricao' => 'Órgão'],
                                        ['value' => 'ressarcimento_cobrancas_dados.referencia', 'descricao' => 'Referência']
                                        ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="2" :colsNames="['Referência', 'Posto/Grad', 'Nome', 'RG', 'Órgão', 'Valor(R$)', 'Recebido(R$)', 'Saldo(R$)', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="referencia,posto_graduacao,nome,rg,orgao,valor,valor_recebido,saldo_restante,action">
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Confirmação: Alterar Registros -->
    <div class="modal fade confirmacaoAlterarRegistrosModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmação: Alterar Registros</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Referência</label>
                            <select class="form-select" name="ar_referencia" id="ar_referencia"></select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Órgão</label>
                            <select class="form-select" name="ar_orgao" id="ar_orgao"></select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-center confirmacaoAlterarRegistrosModal_loading" style="display: none;">Executando serviço</div>
                    <div class="col-12 text-center spinner-chase confirmacaoAlterarRegistrosModal_loading" style="display: none;">
                        <div class="spinner-chase">
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-secondary confirmacaoAlterarRegistrosModal_botoes" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-success confirmacaoAlterarRegistrosModal_botoes" id="re_btn_alterar_registros_confirmar">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('ressarcimento_recebimentos.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_recebimentos.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_recebimentos.js')}}"></script>
@endsection
