<!doctype html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8" />
        <title>Sistema DGF</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                        <li><a class="nav-link scrollto" href="#section_dashboards" id="menuDashboards">Dashboards</a></li>
                        <li><a class="nav-link scrollto" href="#section_relatorios" id="menuRelatorios">Relatórios</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="menuUsuario" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuário</a>
                            <ul class="dropdown-menu" aria-labelledby="menuUsuario">
                                <li><a class="dropdown-item scrollto text-success" href="#section_login" id="menuLogin">Login</a></li>
                                <li><hr class="dropdown-divider" id="menuDivider"></li>
                                <li><a class="dropdown-item scrollto text-danger" href="#section_home" id="menuLogout">Logout</a></li>
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
                        <h1>Cadastros, Dashboards e Relatórios</h1>
                        <h2>Cadastros, Gráficos, Relatórios e Listagens para Administração e Controle da Diretoria Geral de Finanças</h2>
                        <div class="d-flex justify-content-center justify-content-lg-start">
                            <a href="#section_dashboards" class="btn-watch-video scrollto"><i class="bx bxs-dashboard"></i><span>Dashboards</span></a>
                            <a href="#section_relatorios" class="btn-watch-video scrollto"><i class="bx bxs-report"></i><span>Relatórios</span></a>
                        </div>
                    </div>
                    <div class="col-lg-6 order-1 order-lg-2 home-img" data-aos="zoom-in" data-aos-delay="200">
                        <img src="{{ asset('build/assets/images/welcome_home_branco.png') }}" class="img-fluid animated" alt="">
                    </div>
                </div>
            </div>
        </section>

        <main id="main">
            <!-- Dashboards Section -->
            <section id="section_dashboards" class="dashboards section-bg">
                <div class="container" data-aos="fade-up">
                    <div class="section-title">
                        <h2>Dashboards</h2>
                        <p>Um relatório é um conjunto de informações utilizado para reportar resultados parciais ou totais de uma determinada atividade, experimento, projeto, ação, pesquisa, ou outro evento que esteja acabado ou em andamento.</p>
                    </div>

                    <div class="row" id="dashboardsModelos"></div>

                    <div class="row p-1 mt-2" id="dashboardsVisualisar" style="display: none;"></div>

                    <div class="col-12 col-md-12 p-1 mt-2" id="dashboardsLoading" style="display: none;">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Relatórios Section -->
            <section id="section_relatorios" class="relatorios section-bg">
                <div class="container" data-aos="fade-up">
                    <div class="section-title">
                        <h2>Relatórios</h2>
                        <p>Um relatório é um conjunto de informações utilizado para reportar resultados parciais ou totais de uma determinada atividade, experimento, projeto, ação, pesquisa, ou outro evento que esteja acabado ou em andamento.</p>
                    </div>

                    <div class="row" id="relatoriosModelos"></div>

                    <div class="row p-1 mt-2" id="relatoriosVisualisar" style="display: none;"></div>

                    <div class="col-12 col-md-12 p-1 mt-2" id="relatoriosLoading" style="display: none;">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Login -->
            <section id="section_login" class="login  section-bg">
                <div class="container" data-aos="fade-up">
                    <div class="section-title">
                        <h2>Login</h2>
                        <p>Está é a sessão para fazer login e poder visualizar os relatórios disponíveis. Você precisa ter uma conta e usar as credenciais do Sistema SAC da Diretoria Geral de Finanças.</p>
                    </div>
                    <div class="row">
                        <div class="col-lg-7 d-flex align-items-stretch">
                            <form method="post" class="form_login small" id="form_login">
                                <div class="row">
                                    <div class="form-group col-12 col-md-12">
                                        <label>Quem é você</label>
                                        <select class="form-select" name="relatorio_usuario_id" id="relatorio_usuario_id" required>
                                            <option value="">Claudino Mil Homens de Moraes</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-12">
                                        <label>Qual o seu E-mail</label>
                                        <input type="email" class="form-control" name="email" id="email" required>
                                    </div>
                                    <div class="form-group col-12 col-md-6">
                                        <label>Qual o seu RG</label>
                                        <input type="text" class="form-control" name="rg" id="rg" required>
                                    </div>
                                    <div class="form-group col-12 col-md-6">
                                        <label>Qual é a sua senha</label>
                                        <input type="password" class="form-control" name="senha" id="senha" required>
                                    </div>
                                </div>
                                <div class="text-center pt-3">
                                    <button type="button" class="btn btn-primary col-12" id="btnFazerLogin">Fazer Login</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-5 text-center" data-aos="fade-right" data-aos-delay="100">
                            <img src="{{ asset('build/assets/images/welcome_login.png') }}" class="img-fluid" width="80%" alt="">
                        </div>
                    </div>
                </div>
            </section>
        </main>

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

        <!-- Index JS -->
        {{--<script src="{{ Vite::asset('resources/assets_template/libs/welcome/assets/js/relatorios.js') }}"></script>--}}
    </body>
</html>
