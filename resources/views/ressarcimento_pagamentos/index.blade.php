@extends('layouts.app')

@section('title') Pagamentos @endsection

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
                                        <!-- Botão Importar Pagamento -->
                                        <x-button-crud op="99" model="3" bgColor="success" textColor="write" class="waves-effect btn-label waves-light" image="fa fa-file-import label-icon" label="Importar Pagamento" id="btnModalImportarPagamento" />
                                    @endif
                                </div>

                                <!-- Filtro no Banco -->
                                <div class="col-12 col-md-6 float-end">
                                    @php
                                    $selectCampoPesquisar = [
                                    ['value' => 'ressarcimento_pagamentos.nome', 'descricao' => 'Nome'],
                                    ['value' => 'ressarcimento_pagamentos.rg', 'descricao' => 'RG'],
                                    ['value' => 'ressarcimento_pagamentos.referencia', 'descricao' => 'Referência'],
                                    ['value' => 'ressarcimento_pagamentos.identidade_funcional', 'descricao' => 'Identidade Funcional'],
                                    ['value' => 'ressarcimento_pagamentos.vinculo', 'descricao' => 'Vínculo'],
                                    ['value' => 'ressarcimento_pagamentos.codigo_cargo', 'descricao' => 'Código Cargo'],
                                    ['value' => 'ressarcimento_pagamentos.nome_cargo', 'descricao' => 'Nome Cargo'],
                                    ['value' => 'ressarcimento_pagamentos.posto_graduacao', 'descricao' => 'Posto/Graduação'],
                                    ['value' => 'ressarcimento_pagamentos.nivel', 'descricao' => 'Nível'],
                                    ['value' => 'ressarcimento_pagamentos.situacao_pagamento', 'descricao' => 'Situação Pagamento'],
                                    ['value' => 'ressarcimento_pagamentos.data_ingresso', 'descricao' => 'Data Ingresso'],
                                    ['value' => 'ressarcimento_pagamentos.data_nascimento', 'descricao' => 'Data Nascimento'],
                                    ['value' => 'ressarcimento_pagamentos.data_aposentadoria', 'descricao' => 'Data Aposentadoria'],
                                    ['value' => 'ressarcimento_pagamentos.genero', 'descricao' => 'Gênero'],
                                    ['value' => 'ressarcimento_pagamentos.codigo_ua', 'descricao' => 'Código UA'],
                                    ['value' => 'ressarcimento_pagamentos.ua', 'descricao' => 'UA'],
                                    ['value' => 'ressarcimento_pagamentos.cpf', 'descricao' => 'CPF'],
                                    ['value' => 'ressarcimento_pagamentos.pasep', 'descricao' => 'PASEP'],
                                    ['value' => 'ressarcimento_pagamentos.banco', 'descricao' => 'Banco'],
                                    ['value' => 'ressarcimento_pagamentos.agencia', 'descricao' => 'Agência'],
                                    ['value' => 'ressarcimento_pagamentos.conta_corrente', 'descricao' => 'Conta Corrente'],
                                    ['value' => 'ressarcimento_pagamentos.numero_dependentes', 'descricao' => 'Número Dependentes'],
                                    ['value' => 'ressarcimento_pagamentos.ir_dependente', 'descricao' => 'IR Dependentes'],
                                    ['value' => 'ressarcimento_pagamentos.cotista', 'descricao' => 'Cotista'],
                                    ['value' => 'ressarcimento_pagamentos.bruto', 'descricao' => 'Bruto'],
                                    ['value' => 'ressarcimento_pagamentos.desconto', 'descricao' => 'Desconto'],
                                    ['value' => 'ressarcimento_pagamentos.liquido', 'descricao' => 'Líquido'],
                                    ['value' => 'ressarcimento_pagamentos.soldo', 'descricao' => 'Soldo'],
                                    ['value' => 'ressarcimento_pagamentos.hospital10', 'descricao' => 'Hospital 10'],
                                    ['value' => 'ressarcimento_pagamentos.rioprevidencia22', 'descricao' => 'Rioprevidência 22'],
                                    ['value' => 'ressarcimento_pagamentos.etapa_ferias', 'descricao' => 'Etapa Férias'],
                                    ['value' => 'ressarcimento_pagamentos.etapa_destacado', 'descricao' => 'Etapa Destacado'],
                                    ['value' => 'ressarcimento_pagamentos.ajuda_fardamento', 'descricao' => 'Ajuda Fardamento'],
                                    ['value' => 'ressarcimento_pagamentos.habilitacao_profissional', 'descricao' => 'Habilitação Profissional'],
                                    ['value' => 'ressarcimento_pagamentos.gret', 'descricao' => 'GRET'],
                                    ['value' => 'ressarcimento_pagamentos.auxilio_moradia', 'descricao' => 'Auxílio Moradia'],
                                    ['value' => 'ressarcimento_pagamentos.gpe', 'descricao' => 'GPE'],
                                    ['value' => 'ressarcimento_pagamentos.gee_capacitacao', 'descricao' => 'GEE Capacitação'],
                                    ['value' => 'ressarcimento_pagamentos.decreto14407', 'descricao' => 'Decreto 14407'],
                                    ['value' => 'ressarcimento_pagamentos.ferias', 'descricao' => 'Férias'],
                                    ['value' => 'ressarcimento_pagamentos.raio_x', 'descricao' => 'Raio X'],
                                    ['value' => 'ressarcimento_pagamentos.trienio', 'descricao' => 'Triênio'],
                                    ['value' => 'ressarcimento_pagamentos.auxilio_invalidez', 'descricao' => 'Auxílio Invalidez'],
                                    ['value' => 'ressarcimento_pagamentos.tempo_certo', 'descricao' => 'Tempo Certo'],
                                    ['value' => 'ressarcimento_pagamentos.fundo_saude', 'descricao' => 'Fundo Saúde'],
                                    ['value' => 'ressarcimento_pagamentos.abono_permanencia', 'descricao' => 'Abono Permanência'],
                                    ['value' => 'ressarcimento_pagamentos.deducao_ir', 'descricao' => 'Dedução IR'],
                                    ['value' => 'ressarcimento_pagamentos.ir_valor', 'descricao' => 'IR Valor'],
                                    ['value' => 'ressarcimento_pagamentos.auxilio_transporte', 'descricao' => 'Auxílio Transporte'],
                                    ['value' => 'ressarcimento_pagamentos.gram', 'descricao' => 'GRAM'],
                                    ['value' => 'ressarcimento_pagamentos.auxilio_fardamento', 'descricao' => 'Auxílio Fardamento'],
                                    ['value' => 'ressarcimento_pagamentos.cidade', 'descricao' => 'Cidade']
                                    ];
                                    @endphp

                                    <x-filter-crud :selectCampoPesquisar=$selectCampoPesquisar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela (Componente Blade) -->
                    <x-table-crud-ajax :numCols="2" :colsNames="['Referência', 'Militar', 'Lotação', 'Valores', 'Ações']" />
                    <input type="hidden" id="crudPrefixPermissaoSubmodulo" name="crudPrefixPermissaoSubmodulo" value="{{$se_prefixPermissaoSubmodulo}}">
                    <input type="hidden" id="crudNameSubmodulo" name="crudNameSubmodulo" value="{{$se_nameSubmodulo}}">
                    <input type="hidden" id="crudNameFormSubmodulo" name="crudNameFormSubmodulo" value="{{$se_nameFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsFormSubmodulo" name="crudFieldsFormSubmodulo" value="{{$crudFieldsFormSubmodulo}}">
                    <input type="hidden" id="crudFieldsColumnsTable" name="crudFieldsColumnsTable" value="referencia,militar,lotacao,valores,action">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
@include('ressarcimento_pagamentos.form')
@endsection

@section('script')
    <!-- scripts_ressarcimento_pagamentos.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_pagamentos.js')}}"></script>
@endsection

@section('script-bottom')
@endsection
