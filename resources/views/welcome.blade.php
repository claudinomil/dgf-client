<!doctype html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8" />
        <title> {{env('APP_NAME')}} | @yield('page_title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- CSRF-TOKEN -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <!-- App favicon -->
        <link rel="shortcut icon" href="{{ asset('build/assets/images/image_favicon.png') }}">

        <!-- CSS Files -->
        <link href="{{ Vite::asset('resources/assets_template/css/bootstrap.css') }}" rel="stylesheet">
        <link href="{{ Vite::asset('resources/assets_template/libs/aos/aos.css') }}" rel="stylesheet">
        <link href="{{ Vite::asset('resources/assets_template/libs/glightbox/css/glightbox.css') }}" rel="stylesheet">
        <link href="{{ Vite::asset('resources/assets_template/libs/swiper/swiper-bundle.min.css') }}" rel="stylesheet">
        <link href="{{asset('build/assets/icons.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />

        <!-- Template Main CSS File -->
        <link href="{{ Vite::asset('resources/assets_template/css/welcome_styles.css') }}" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <header id="header" class="fixed-top ">
            <div class="container d-flex align-items-center">
                <div class="logo me-auto"><img src="{{ asset('build/assets/images/welcome_logo_topo.png') }}" alt="" class="img-fluid"></div>

                <!-- Navbar -->
                <nav id="navbar" class="navbar">
                    <ul>
                        <li><a class="nav-link scrollto active" href="#section_home" id="menuHome">Home</a></li>

                        @if($usuarioLogado == 1)
                            <li class="dropdown">
                                <a class="scrollto" href="#section_dashboard" id="menuDashboard"><span>Dashboard</span> <i class="bx bx-chevron-down"></i></a>
                                <ul>
                                    @foreach ($agrupamentos as $agrupamento)
                                        <li><a class="nav-link scrollto linkDashboard" href="#section_dashboard" onclick="atualizarDashboardsAgrupamentos({{$agrupamento['id']}});">{{$agrupamento['name']}}</a></li>
                                    @endforeach
                                </ul>
                            </li>
                        @endif

                        <li class="dropdown">
                            <a class="scrollto" href="#section_login">
                                <span>
                                    @if($usuarioLogado == 1)
                                        <img class="rounded-circle header-profile-user" width="25px" src="{{session('se_userLoggedData.avatar')}}">
                                        &nbsp;&nbsp;{{ucwords(strtolower(session('se_userLoggedData.name')))}}
                                    @else
                                        Usuário
                                    @endif
                                </span> <i class="bx bx-chevron-down"></i>
                            </a>
                            <ul>
                                @if($usuarioLogado == 0)
                                    <li><a class="nav-link scrollto" href="#section_login">Login</a></li>
                                @elseif($usuarioLogado == 1)
                                    <li><a class="nav-link scrollto" href="#section_home" onclick="document.getElementById('frm_logout').submit();" id="menuLogout">Logout</a></li>
                                @endif
                            </ul>
                        </li>
                    </ul>
                    <i class="bx bx-list-ul mobile-nav-toggle"></i>
                </nav>
            </div>
        </header>

        <!-- Home -->
        <section id="section_home" class="d-flex align-items-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                        <h1>Sistema e Dashboard</h1>
                        <h2>Entre no Sistema SAC ou visualize o Dashboard para Administração e Controle da Diretoria Geral de Finanças</h2>
                        <div class="d-flex justify-content-center justify-content-lg-start">
                            @if($usuarioLogado == 0)
                                <a href="#section_login" class="btn-watch-video scrollto"><i class="bx bx-user"></i><span>Faça seu Login</span></a>
                            @elseif($usuarioLogado == 1)
                                <a href="{{route('dashboards.index')}}" class="btn-watch-video scrollto"><i class="bx bx-layout"></i><span>Sistema</span></a>
                                <a href="#section_dashboard" class="btn-watch-video scrollto"><i class="bx bxs-dashboard"></i><span>Dashboard</span></a>
                            @endif
                        </div>
                    </div>
                    <div class="col-lg-6 order-1 order-lg-2 home-img" data-aos="zoom-in" data-aos-delay="200">
                        <img src="{{ asset('build/assets/images/welcome_home_branco.png') }}" class="img-fluid animated" alt="">
                    </div>
                </div>
            </div>
        </section>

        <main id="main">
            <!-- Dashboard Section -->
            @if($usuarioLogado == 1)
                <section id="section_dashboard" class="dashboard section-bg">
                    <div data-aos="fade-up">
                        <div class="section-title" style="padding-bottom: 0px;">
                            <h2>Dashboard</h2>
                        </div>

                        @if($usuarioLogado == 1)
                            <div class="mt-5" id="loadingDashboard" style="display: none;">
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="col-12 text-center pt-2">Lendo Dados do Dashboard</div>
                            </div>

                            <div class="row">
                                @foreach ($agrupamentos as $agrupamento)
                                    <div class="row justify-content-center">
                                        <div class="row divDashboardsAgrupamento" id="divDashboardsAgrupamentoId_{{$agrupamento['id']}}"></div>
                                    </div>
                                @endforeach
                            </div>

                            <!-- Dashboards Modal Filtro 1 -->
                            <div class="modal fade" tabindex="-1" aria-hidden="true" id="dashboards_modal_filtro_1">
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
                            <div class="modal fade" tabindex="-1" aria-hidden="true" id="dashboards_modal_filtro_2">
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
                        @endif
                    </div>
                </section>
            @endif

            <!-- Login -->
            @if($usuarioLogado == 0)
                <section id="section_login" class="login  section-bg">
                    <div class="container" data-aos="fade-up">
                        <div class="section-title">
                            <h2>Login</h2>
                            <p>Está é a sessão para fazer login e poder visualizar Dashboard ou entrar no Sistema SAC da Diretoria Geral de Finanças.</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-7 d-flex align-items-stretch">
                                <form method="post" class="form_login small" action="{{ url('login') }}">
                                    @csrf

                                    <div class="row">
                                        @if(isset($error))
                                            @if($error !== '')
                                                <div class="col-12  alert alert-danger mt-1">{{$error}}</div>
                                            @endif
                                        @endif

                                        @if (Session::has('message'))
                                            <div class="col-12 alert alert-success" role="alert">{{Session::get('message')}}</div>
                                        @endif

                                        <div class="form-group col-12 col-md-12">
                                            <label>Qual o seu E-mail</label>
                                            <input type="email" class="form-control" name="email" id="email" required>
                                        </div>
                                        <div class="form-group col-12 col-md-12">
                                            <label>Qual é a sua senha</label>
                                            <input type="password" class="form-control" name="password" id="password" required>
                                        </div>

                                        <input type="hidden" name="ctrl_welcome" id="ctrl_welcome" value="welcome">
                                    </div>
                                    <div class="text-center pt-3">
                                        <button type="submit" class="btn btn-primary col-12">Fazer Login</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-5 text-center" data-aos="fade-right" data-aos-delay="100">
                                <img src="{{ asset('build/assets/images/welcome_login.png') }}" class="img-fluid" width="80%" alt="">
                            </div>
                        </div>
                    </div>
                </section>
            @endif
        </main>

        <!-- Form Logout -->
        <form action="{{route('logout')}}" method="post" id="frm_logout" style="display: none;">@csrf</form>

        <!-- Footer -->
        <footer id="footer">
            <div class="container footer-bottom clearfix">
                <div class="copyright">&copy; Copyright <strong><span>CBMERJ - DGF</span></strong>. All Rights Reserved</div>
                <div class="credits">Developed by <a href="https://claudinomil.com.br/">Claudino Mil</a></div>
            </div>
        </footer>

        <div id="preloader"></div>
        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="fa fa-arrow-up"></i></a>

        <!-- JS Files -->
        <script src="{{ Vite::asset('resources/assets_template/libs/aos/aos.js') }}"></script>
        <script src="{{ Vite::asset('resources/assets_template/libs/glightbox/js/glightbox.js') }}"></script>
        <script src="{{ Vite::asset('resources/assets_template/libs/swiper/swiper-bundle.min.js') }}"></script>

        {{--<script src="{{ Vite::asset('resources/assets_template/libs/welcome/assets/js/form_login.js') }}"></script>--}}

        <!-- Functions JS File -->
        {{--<script src="{{ Vite::asset('resources/assets_template/libs/welcome/assets/js/functions.js') }}"></script>--}}

        <!-- Template Main JS File -->
        <script src="{{ Vite::asset('resources/assets_template/js/welcome_main.js') }}"></script>

        @if(isset($error))
            @if($error !== '')
                <script>document.getElementById('menuLogin').click();</script>
            @endif
        @endif

        @if($usuarioLogado == 1)
            <!-- libs -->
            <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jquery/jquery.min.js') }}"></script>
            <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/bootstrap/bootstrap.min.js') }}"></script>
            <!-- functions.js -->
            <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/js/functions.js') }}"></script>
            <!-- scripts_welcome.js -->
            <script src="{{ Vite::asset('resources/assets_template/js/scripts_welcome.js')}}"></script>
            <!-- apexcharts -->
            <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            <!-- functions_graficos -->
            <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/js/functions_graficos.js') }}"></script>
        @endif

    </body>
</html>
