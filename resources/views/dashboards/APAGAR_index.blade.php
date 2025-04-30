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
                    <div class="card-body">
                        <!-- Botão Configurações -->
                        <div class="row">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12 col-md-6 pb-2" id="divBtnDashboards">

{{--                                        <button type="button" class="btn btn-warning text-white waves-effect btn-label waves-light" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDashboardsViews" aria-controls="offcanvasDashboardsViews" id="btnDashboardsViews"><i class="bx bxs-dashboard label-icon"></i>Dashboards</button>--}}


                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab panes (Um Tab para Cada Agrupamento -->
                        <ul class="nav nav-tabs nav-tabs-custom justify-content-center pt-2" role="tablist">
                            @php($active = 'active')
                            @foreach ($agrupamentos as $agrupamento)
                                <li class="nav-item">
                                    <a class="nav-link {{$active}}" data-bs-toggle="tab" href="#tabAgrupamento{{$agrupamento['id']}}" role="tab">{{$agrupamento['name']}}</a>
                                </li>

                                @php($active = '')
                            @endforeach
                        </ul>
                        <div class="tab-content pt-1">
                            @php($active = 'active')
                            @foreach ($agrupamentos as $agrupamento)
                                <div class="tab-pane {{$active}}" id="tabAgrupamento{{$agrupamento['id']}}" role="tabpanel">
                                    <div>
                                        <div class="row justify-content-center">
                                            <!-- Dashboards -->
                                            <div class="row" id="divDashboardsAgrupamentoId_{{$agrupamento['id']}}"></div>
                                        </div>
                                    </div>
                                </div>

                                @php($active = '')
                            @endforeach
                        </div>

                        <!-- Dashboards Modal Filtro 1 -->
                        <div class="modal fade dashboards_modal_filtro_1" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Filtrar</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Período 1</label>
                                                <select class="form-select" name="dashboards_modal_filtro_1_periodo1" id="dashboards_modal_filtro_1_periodo1">
                                                    @foreach ($dashboards_modal_filtro_1_referencias as $dashboards_modal_filtro_1_referencia)
                                                        <option value="{{ $dashboards_modal_filtro_1_referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $dashboards_modal_filtro_1_referencia['referencia']) }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Período 2</label>
                                                <select class="form-select" name="dashboards_modal_filtro_1_periodo2" id="dashboards_modal_filtro_1_periodo2">
                                                    @foreach ($dashboards_modal_filtro_1_referencias as $dashboards_modal_filtro_1_referencia)
                                                        <option value="{{ $dashboards_modal_filtro_1_referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $dashboards_modal_filtro_1_referencia['referencia']) }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-12 pb-3">
                                                <label class="form-label">Órgão(s)</label>
                                                <select class="form-select" name="dashboards_modal_filtro_1_orgao_id" id="dashboards_modal_filtro_1_orgao_id">
                                                    <option value="0">Todos os Órgãos</option>

                                                    @foreach ($dashboards_modal_filtro_1_orgaos as $dashboards_modal_filtro_1_orgao)
                                                        <option value="{{ $dashboards_modal_filtro_1_orgao['id'] }}">{{ $dashboards_modal_filtro_1_orgao['name'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="col-12 text-end" id="dashboards_modal_filtro_1-footer-1">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-primary" id="btnDashboardsModalFiltro1Executar">Filtrar</button>
                                        </div>
                                        <div class="col-12 text-center" id="dashboards_modal_filtro_1-footer-2" style="display: none;">
                                            <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Dashboards Modal Filtro 2 -->
                        <div class="modal fade dashboards_modal_filtro_2" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Filtrar</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Data 1</label>
                                                <input type="date" class="form-control" name="dashboards_modal_filtro_2_data1" id="dashboards_modal_filtro_2_data1" value="{{date('Y-m-d', strtotime('-1 year'))}}">
                                            </div>
                                            <div class="form-group col-12 col-md-6 pb-3">
                                                <label class="form-label">Data 2</label>
                                                <input type="date" class="form-control" name="dashboards_modal_filtro_2_data2" id="dashboards_modal_filtro_2_data2" value="{{date('Y-m-d')}}">
                                            </div>
                                            <div class="form-group col-12 col-md-12 pb-3">
                                                <label class="form-label">Subconta(s)</label>
                                                <select class="form-select" name="dashboards_modal_filtro_2_subconta_id" id="dashboards_modal_filtro_2_subconta_id">
                                                    <option value="0">Todos as Subcontas</option>

                                                    @foreach ($dashboards_modal_filtro_2_subcontas as $dashboards_modal_filtro_2_subconta)
                                                        <option value="{{ $dashboards_modal_filtro_2_subconta['id'] }}">{{ $dashboards_modal_filtro_2_subconta['subconta'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="col-12 text-end" id="dashboards_modal_filtro_2-footer-1">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-primary" id="btnDashboardsModalFiltro2Executar">Filtrar</button>
                                        </div>
                                        <div class="col-12 text-center" id="dashboards_modal_filtro_2-footer-2" style="display: none;">
                                            <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Offcanvas com Dashboards -->
                        <div class="float-end">
                            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDashboardsViews" aria-labelledby="offcanvasDashboardsViewsLabel">
                                <div class="offcanvas-header">
                                    <h5 id="offcanvasDashboardsViewsLabel">Dashboards Views</h5>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="btnDashboardsViewsClose"></button>
                                </div>
                                <div class="offcanvas-body" id="offcanvasDashboardsViewsBody"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <!-- scripts_dashboards.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_dashboards.js')}}"></script>

    <!-- apexcharts -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    <!-- functions_graficos -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/js/functions_graficos.js') }}"></script>
@endsection
