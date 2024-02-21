@extends('layouts.app')

@section('title') Dashboards @endsection

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
                    <div class="card-body" style="min-height: 400px;">
                        <!-- Menu Relatórios -->
                        <div class="col-12 col-sm-12">
                            <div class="dropdown">
                                <button class="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="bx bx-list-ol align-middle me-1 font-size-20"></i> Escolha o Relatório aqui...
                                </button>
                                <div class="dropdown-menu dropdown-menu-start" id="dropdown-menu_itens"></div>
                            </div>
                        </div>

                        <!-- Filtro Relatórios -->
                        <div class="col-12 col-sm-12" id="filtro_relatorios">

                            <!-- Filtro Relatório id=6 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_6">
                                <div class="card" id="filtro_relatorio_6_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_6_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Referência</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_6_referencia" id="filtro_relatorio_6_referencia">
                                                    @foreach ($referencias as $referencia)
                                                        <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-8 pb-3">
                                                <label class="form-label">Órgão</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_6_orgao_id" id="filtro_relatorio_6_orgao_id">
                                                    <option value="0">Todos os Órgãos</option>

                                                    @foreach ($orgaos as $orgao)
                                                        <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_6_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_6_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_6_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12" id="filtro_relatorio_7">
                                <div class="card" id="filtro_relatorio_7_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_7_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Referência</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_7_referencia" id="filtro_relatorio_7_referencia">
                                                    @foreach ($referencias as $referencia)
                                                        <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-8 pb-3">
                                                <label class="form-label">Órgão</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_7_orgao_id" id="filtro_relatorio_7_orgao_id">
                                                    <option value="0">Todos os Órgãos</option>

                                                    @foreach ($orgaos as $orgao)
                                                        <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_7_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_7_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_7_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12" id="filtro_relatorio_8">
                                <div class="card" id="filtro_relatorio_8_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-3" style="font-size: 14px !important;" id="filtro_relatorio_8_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Referência</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_8_referencia" id="filtro_relatorio_8_referencia">
                                                    @foreach ($referencias as $referencia)
                                                        <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Órgão</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_8_orgao_id" id="filtro_relatorio_8_orgao_id">
                                                    <option value="0">Todos os Órgãos</option>

                                                    @foreach ($orgaos as $orgao)
                                                        <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-3 pb-3">
                                                <label class="form-label">Saldo</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_8_saldo" id="filtro_relatorio_8_saldo">
                                                    <option value="0">Qualquer Saldo</option>
                                                    <option value="1">Saldo igual a 0(zero)</option>
                                                    <option value="2">Saldo menor que 0(zero)</option>
                                                    <option value="3">Saldo maior que 0(zero)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_8_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_8_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_8_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12" id="filtro_relatorio_9">Filtro Relatório 9</div>
                            <div class="col-12 col-sm-12" id="filtro_relatorio_10">Filtro Relatório 10</div>
                        </div>

                        <!-- Visualizar Relatórios -->
                        <div class="col-12 col-sm-12" id="visualizar_relatorios">
                            <div class="col-12 col-sm-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="visualizar_relatorio_titulo"></h5>
                                        <div class="col-12">
                                            <iframe src="" width="100%" height="780" id="visualizar_relatorio_iframe_pdf"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <!-- scripts_ressarcimento_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_relatorios.js')}}"></script>
@endsection
