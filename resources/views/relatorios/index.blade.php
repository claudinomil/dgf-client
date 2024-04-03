@extends('layouts.app')

@section('title') Relatorios @endsection

@section('css')
@endsection

@section('content')
    @component('components.breadcrumb')
@section('page_title') {{ \App\Facades\Breadcrumb::getCurrentPageTitle() }} @endsection
@endcomponent

<div>
    <div class="row">
        <div class="row pt-3" id="divRelatorios"></div>
    </div>

    <!-- Modal Relatorio 1 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio1" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio1_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Grupo</label>
                            <select class="form-select" name="modal_relatorio1_grupo_id" id="modal_relatorio1_grupo_id">
                                <option value="0">Todos os Grupos</option>
                                @foreach ($grupos as $grupo)
                                    <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio1_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio1_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio1(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio1_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 2 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio2" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio2_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Grupo</label>
                            <select class="form-select" name="modal_relatorio2_grupo_id" id="modal_relatorio2_grupo_id">
                                <option value="0">Todos os Grupos</option>
                                @foreach ($grupos as $grupo)
                                    <option value="{{$grupo['id']}}">{{$grupo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Situação</label>
                            <select class="form-select" name="modal_relatorio2_situacao_id" id="modal_relatorio2_situacao_id">
                                <option value="0">Todos as Situações</option>
                                @foreach ($situacoes as $situacao)
                                    <option value="{{$situacao['id']}}">{{$situacao['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio2_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio2_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio2(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio2_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 3 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio3" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio3_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Data</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio3_data" id="modal_relatorio3_data">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio3_user_id" id="modal_relatorio3_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Submódulo</label>
                            <select class="form-select" name="modal_relatorio3_submodulo_id" id="modal_relatorio3_submodulo_id">
                                <option value="0">Todos os Submódulos</option>
                                @foreach ($submodulos as $submodulo)
                                    <option value="{{$submodulo['id']}}">{{$submodulo['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Operação</label>
                            <select class="form-select" name="modal_relatorio3_operacao_id" id="modal_relatorio3_operacao_id">
                                <option value="0">Todos as Operações</option>
                                @foreach ($operacoes as $operacao)
                                    <option value="{{$operacao['id']}}">{{$operacao['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Dado</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio3_dado" id="modal_relatorio3_dado">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio3_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio3_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio3(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio3_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 4 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio4" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio4_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Data</label>
                            <input type="text" class="form-control form-control-sm mask_date" name="modal_relatorio4_data" id="modal_relatorio4_data">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Título</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio4_title" id="modal_relatorio4_title">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Notificação</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio4_notificacao" id="modal_relatorio4_notificacao">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio4_user_id" id="modal_relatorio4_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio4_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio4_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio4(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio4_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 5 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio5" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio5_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Nome</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_name" id="modal_relatorio5_name">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Descrição</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_descricao" id="modal_relatorio5_descricao">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">URL</label>
                            <input type="text" class="form-control form-control-sm" name="modal_relatorio5_url" id="modal_relatorio5_url">
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Usuário</label>
                            <select class="form-select" name="modal_relatorio5_user_id" id="modal_relatorio5_user_id">
                                <option value="0">Todos os Usuários</option>
                                @foreach ($users as $user)
                                    <option value="{{$user['id']}}">{{$user['name']}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio5_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio5_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio5(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio5_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 6 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio6" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio6_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Referência</label>
                            <select class="form-select" name="modal_relatorio6_referencia" id="modal_relatorio6_referencia">
                                @foreach ($referencias as $referencia)
                                    <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Órgão</label>
                            <select class="form-select" name="modal_relatorio6_orgao_id" id="modal_relatorio6_orgao_id">
                                <option value="0">Todos os Órgãos</option>
                                @foreach ($orgaos as $orgao)
                                    <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio6_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio6_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio6(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio6_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 7 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio7" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio7_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Referência</label>
                            <select class="form-select" name="modal_relatorio7_referencia" id="modal_relatorio7_referencia">
                                @foreach ($referencias as $referencia)
                                    <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Órgão</label>
                            <select class="form-select" name="modal_relatorio7_orgao_id" id="modal_relatorio7_orgao_id">
                                <option value="0">Todos os Órgãos</option>
                                @foreach ($orgaos as $orgao)
                                    <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio7_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio7_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio7(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio7_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-17 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Relatorio 8 -->
    <div class="modal fade bs-example-modal-sm" id="modal_relatorio8" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_relatorio8_titulo">Xxxxxxxxxxxx</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Referência</label>
                            <select class="form-select" name="modal_relatorio8_referencia" id="modal_relatorio8_referencia">
                                @foreach ($referencias as $referencia)
                                    <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Órgão</label>
                            <select class="form-select" name="modal_relatorio8_orgao_id" id="modal_relatorio8_orgao_id">
                                <option value="0">Todos os Órgãos</option>
                                @foreach ($orgaos as $orgao)
                                    <option value="{{ $orgao['id'] }}">{{ $orgao['name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-12 pb-3">
                            <label class="form-label">Saldo</label>
                            <select class="form-select" name="modal_relatorio8_saldo" id="modal_relatorio8_saldo">
                                <option value="0">Qualquer Saldo</option>
                                <option value="1">Saldo igual a 0(zero)</option>
                                <option value="2">Saldo menor que 0(zero)</option>
                                <option value="3">Saldo maior que 0(zero)</option>
                                <option value="0">Todos os Órgãos</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-end" id="modal_relatorio8_footer_1">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_relatorio8_cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="relatorio8(2)">Gerar</button>
                    </div>
                    <div class="col-12 text-center" id="modal_relatorio8_footer_2" style="display: none;">
                        <i class="bx bx-loader bx-spin font-size-17 align-middle me-2"></i> Processando...
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
    <!-- jsPDF e AutoTable -->
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf.js') }}"></script>
    <script type="text/javascript" src="{{ Vite::asset('resources/assets_template/libs/jspdf/jspdf_autotable.js') }}"></script>

    <!-- scripts_relatorios.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_relatorios.js')}}"></script>
@endsection
