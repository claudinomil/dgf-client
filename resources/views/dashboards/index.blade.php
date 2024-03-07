@extends('layouts.app')

@section('title') Dashboards @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
        @section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
    @endcomponent

{{--<div id="crudTable">--}}
{{--    <div class="row">--}}
{{--        <div class="col-12">--}}
{{--            <div class="card">--}}
{{--                <div class="card-body">--}}
{{--                    <!-- Offcanvas com Dashboards -->--}}
{{--                    <div class="row">--}}
{{--                        <div class="col-12 pb-3">--}}
{{--                            <div class="float-end">--}}
{{--                                <button type="button" class="btn btn-light" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bx bxs-dashboard me-1"></i> <span class="d-none d-sm-inline-block">Dashboards <i class="mdi mdi-chevron-down"></i></span></button>--}}
{{--                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">--}}
{{--                                    <div class="offcanvas-header">--}}
{{--                                        <h5 id="offcanvasRightLabel">Dashboards</h5>--}}
{{--                                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>--}}
{{--                                    </div>--}}
{{--                                    <div class="offcanvas-body">--}}
{{--                                        <form class="py-1">--}}
{{--                                            @foreach(session('se_userLoggedDashboards') as $dashboard)--}}
{{--                                                <div class="row pe-3 pb-2">--}}
{{--                                                    <div class="col-10">--}}
{{--                                                        <div class="form-check custom-checkbox">--}}
{{--                                                            <input type="checkbox" class="form-check-input" id="dashboard_checkbox_{{$dashboard['id']}}" name="dashboard_checkbox_{{$dashboard['id']}}">--}}
{{--                                                            <label class="form-check-label" for="dashboard_checkbox_{{$dashboard['id']}}">{{$dashboard['name']}}</label>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="col-2 px-0 py-0">--}}
{{--                                                        <input type="text" class="form-control form-control-sm text-center" maxlength="2" id="dashboard_ordem_{{$dashboard['id']}}" name="dashboard_ordem_{{$dashboard['id']}}">--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                            @endforeach--}}
{{--                                        </form>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}

{{--                    <!-- Dashboards -->--}}
{{--                    <div class="row">--}}
{{--                        <div class="col-12 col-md-2 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-2</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-12 col-md-4 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-4</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-12 col-md-6 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-6</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-12 col-md-8 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-8</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-12 col-md-10 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-10</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-12 col-md-12 px-1 py-1">--}}
{{--                            <div class="col-12" style="border: 10px solid #f8f8fb !important; height: 220px;">--}}
{{--                                <div class="bg-white px-4 py-4">col-12 col-md-12</div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</div>--}}



<div id="crudTable">
    <div class="row" id="divDashboards"></div>
    <div class="row pt-5" id="divDashboardsModelos" style="display: none;"><span class="h1 text-center">Modelos</span></div>
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
