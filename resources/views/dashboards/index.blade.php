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
                <button type="button" class="btn btn-light" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDashboardsViews" aria-controls="offcanvasDashboardsViews" id="btnDashboardsViews"><i class="bx bxs-dashboard me-1"></i> <span class="d-none d-sm-inline-block">Dashboards <i class="mdi mdi-chevron-down"></i></span></button>

                <!-- Ressarcimento - Hiddens -->
                <input type="hidden" id="ressarcimento_periodo1" name="ressarcimento_periodo1" value="{{$ressarcimento_periodo1}}">
                <input type="hidden" id="ressarcimento_periodo2" name="ressarcimento_periodo2" value="{{$ressarcimento_periodo2}}">
                <input type="hidden" id="ressarcimento_orgao_id" name="ressarcimento_orgao_id" value="0">

                <!-- Dashboards -->
                <div class="row pt-3" id="divDashboards"></div>
                <div class="row pt-5" id="divDashboardsModelos" style="display: none;"><span class="h1 text-center">Modelos</span></div>

                <!-- Ressarcimento - Modal filtro -->
                <div class="modal fade ressarcimento-modal-filtro" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Filtrar Períodos/Órgãos</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Período 1</label>
                                        <select class="form-select" name="ressarcimento-modal-filtro_periodo1" id="ressarcimento-modal-filtro_periodo1">
                                            @foreach ($ressarcimento_referencias as $ressarcimento_referencia)
                                                <option value="{{ $ressarcimento_referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $ressarcimento_referencia['referencia']) }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-6 pb-3">
                                        <label class="form-label">Período 2</label>
                                        <select class="form-select" name="ressarcimento-modal-filtro_periodo2" id="ressarcimento-modal-filtro_periodo2">
                                            @foreach ($ressarcimento_referencias as $ressarcimento_referencia)
                                                <option value="{{ $ressarcimento_referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $ressarcimento_referencia['referencia']) }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-12 pb-3">
                                        <label class="form-label">Órgão(s)</label>
                                        <select class="form-select" name="ressarcimento-modal-filtro_orgao" id="ressarcimento-modal-filtro_orgao">
                                            <option value="0">Todos os Órgãos</option>

                                            @foreach ($ressarcimento_orgaos as $ressarcimento_orgao)
                                                <option value="{{ $ressarcimento_orgao['id'] }}">{{ $ressarcimento_orgao['name'] }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="col-12 text-end" id="ressarcimento-modal-filtro-footer-1">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" id="btnFiltrarPeriodosOrgaos">Filtrar</button>
                                </div>
                                <div class="col-12 text-center" id="ressarcimento-modal-filtro-footer-2" style="display: none;">
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
@endsection

@section('script')
    <!-- scripts_dashboards.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_dashboards.js')}}"></script>

    <!-- MOSTRAR MODELOS DE DASHBOARDS -->
    @if(1==2)
        <!-- scripts_dashboards2.js -->
        <script src="{{ Vite::asset('resources/assets_template/js/scripts_dashboards2.js')}}"></script>
    @endif

    <!-- apexcharts -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/apexcharts/apexcharts.min.js') }}"></script>

    <!-- functions_graficos -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/js/functions_graficos.js') }}"></script>
@endsection
