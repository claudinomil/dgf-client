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

                            <!-- Filtro Relatório id=1 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_1">
                                <div class="card" id="filtro_relatorio_1_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_1_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Grupo</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_1_grupo_id" id="filtro_relatorio_1_grupo_id">
                                                    <option value="0">Todos os Grupos</option>
                                                    @foreach ($grupos as $grupo)
                                                        <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_1_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_1_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_1_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtro Relatório id=2 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_2">
                                <div class="card" id="filtro_relatorio_2_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_2_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Grupo</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_2_grupo_id" id="filtro_relatorio_2_grupo_id">
                                                    <option value="0">Todos os Grupos</option>
                                                    @foreach ($grupos as $grupo)
                                                        <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-4 pb-3">
                                                <label class="form-label">Situação</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_2_situacao_id" id="filtro_relatorio_2_situacao_id">
                                                    <option value="0">Todos as Situações</option>
                                                    @foreach ($situacoes as $situacao)
                                                        <option value="{{$situacao['id']}}">{{$situacao['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_2_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_2_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_2_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtro Relatório id=3 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_3">
                                <div class="card" id="filtro_relatorio_3_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_3_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Data</label>
                                                <input type="text" class="form-control form-control-sm mask_date" name="filtro_relatorio_3_data" id="filtro_relatorio_3_data">
                                            </div>
                                            <div class="form-group col-12 col-md-3 pb-3">
                                                <label class="form-label">Usuário</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_3_user_id" id="filtro_relatorio_3_user_id">
                                                    <option value="0">Todos os Usuários</option>
                                                    @foreach ($users as $user)
                                                        <option value="{{$user['id']}}">{{$user['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-3 pb-3">
                                                <label class="form-label">Submódulo</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_3_submodulo_id" id="filtro_relatorio_3_submodulo_id">
                                                    <option value="0">Todos os Submódulos</option>
                                                    @foreach ($submodulos as $submodulo)
                                                        <option value="{{$submodulo['id']}}">{{$submodulo['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Operação</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_3_operacao_id" id="filtro_relatorio_3_operacao_id">
                                                    <option value="0">Todos as Operações</option>
                                                    @foreach ($operacoes as $operacao)
                                                        <option value="{{$operacao['id']}}">{{$operacao['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Dado</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_3_dado" id="filtro_relatorio_3_dado">
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_3_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_3_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_3_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtro Relatório id=4 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_4">
                                <div class="card" id="filtro_relatorio_4_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_4_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Data</label>
                                                <input type="text" class="form-control form-control-sm mask_date" name="filtro_relatorio_4_data" id="filtro_relatorio_4_data">
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Título</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_4_title" id="filtro_relatorio_4_title">
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Notificação</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_4_notificacao" id="filtro_relatorio_4_notificacao">
                                            </div>
                                            <div class="form-group col-12 col-md-3 pb-3">
                                                <label class="form-label">Usuário</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_4_user_id" id="filtro_relatorio_4_user_id">
                                                    <option value="0">Todos os Usuários</option>
                                                    @foreach ($users as $user)
                                                        <option value="{{$user['id']}}">{{$user['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_4_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_4_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_4_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtro Relatório id=5 -->
                            <div class="col-12 col-sm-12" id="filtro_relatorio_5">
                                <div class="card" id="filtro_relatorio_5_card">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary mb-4" style="font-size: 14px !important;" id="filtro_relatorio_5_titulo"></h5>
                                        <div class="row">
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Nome</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_5_name" id="filtro_relatorio_5_name">
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">Descrição</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_5_descricao" id="filtro_relatorio_5_descricao">
                                            </div>
                                            <div class="form-group col-12 col-md-2 pb-3">
                                                <label class="form-label">URL</label>
                                                <input type="text" class="form-control form-control-sm" name="filtro_relatorio_5_url" id="filtro_relatorio_5_url">
                                            </div>
                                            <div class="form-group col-12 col-md-3 pb-3">
                                                <label class="form-label">Usuário</label>
                                                <select class="form-select form-select-sm" name="filtro_relatorio_5_user_id" id="filtro_relatorio_5_user_id">
                                                    <option value="0">Todos os Usuários</option>
                                                    @foreach ($users as $user)
                                                        <option value="{{$user['id']}}">{{$user['name']}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-auto">
                                            <div class="col-12 text-end" id="filtro_relatorio_5_footer_1">
                                                <button type="button" class="btn btn-sm btn-secondary" onclick="configurar_relatorios();">Fechar</button>
                                                <button type="button" class="btn btn-sm btn-primary" id="filtro_relatorio_5_executar">Executar</button>
                                            </div>
                                            <div class="col-12 text-end" id="filtro_relatorio_5_footer_2" style="display: none;">
                                                <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    <!-- scripts_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_relatorios.js')}}"></script>
@endsection
