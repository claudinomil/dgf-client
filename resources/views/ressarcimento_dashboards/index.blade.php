@extends('layouts.app')

@section('title') Dashboards @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
        @section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
    @endcomponent

    <div id="crudTable">
        <input type="hidden" id="periodo1" name="periodo1" value="{{$periodo1}}">
        <input type="hidden" id="periodo2" name="periodo2" value="{{$periodo2}}">
        <input type="hidden" id="orgao_id" name="orgao_id" value="0">

        <div class="row" id="divDashboards"></div>
        <div class="row pt-5" id="divDashboardsModelos" style="display: none;"><span class="h1 text-center">Modelos</span></div>
    </div>

    <!-- Modal filtro -->
    <div class="modal fade modal-filtro" tabindex="-1" aria-hidden="true">
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
                            <select class="form-select" name="modal-filtro_periodo1" id="modal-filtro_periodo1">
                                @foreach ($referencias as $referencia)
                                    <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 col-md-6 pb-3">
                            <label class="form-label">Período 2</label>
                            <select class="form-select" name="modal-filtro_periodo2" id="modal-filtro_periodo2">
                                @foreach ($referencias as $referencia)
                                    <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 col-md-12 pb-3">
                            <label class="form-label">Órgão(s)</label>
                            <select class="form-select" name="modal-filtro_orgao" id="modal-filtro_orgao">
                                <option value="0">Todos os Órgãos</option>

                                @foreach ($orgaos as $orgao)
                                    <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal-filtro-footer-1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnFiltrarPeriodosOrgaos">Filtrar</button>
                    </div>
                    <div class="col-12 text-center" id="modal-filtro-footer-2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <!-- scripts_ressarcimento_dashboards.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_dashboards.js')}}"></script>

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
