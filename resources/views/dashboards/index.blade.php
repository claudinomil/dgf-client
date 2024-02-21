@extends('layouts.app')

@section('title') Dashboards @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
        @section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
    @endcomponent

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
