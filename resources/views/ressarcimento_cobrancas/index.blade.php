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
                        <div class="row">
                            <!-- Campo hidden para controle -->
                            <input type="hidden" id="ctrl_referencia" name="ctrl_referencia">

                            <div class="col-12 col-sm-4">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-3">
                                        <i class="{{$icone}} text-center text-primary px-2 py-2 avatar-md rounded-circle img-thumbnail" style="font-size: 50px;"></i>
                                    </div>
                                    <div class="flex-grow-1 align-self-center">
                                        <div class="text-muted">
                                            <p class="mb-2"><b>RESSARCIMENTO</b></p>
                                            <h6 class="mb-1" id="re_referencia"></h6>
                                            <p class="mb-1" id="re_status_dados"></p>
                                            <p class="mb-0" id="re_status_documentos"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-6 align-self-center">
                                <div class="text-lg-center mt-4 mt-lg-0">
                                    <div class="row">
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Órgãos</p>
                                                <h5 class="mb-0" id="re_quantidade_orgaos">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Militares</p>
                                                <h5 class="mb-0" id="re_quantidade_militares">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Pagamento</p>
                                                <h5 class="mb-0" id="re_quantidade_pagamentos">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Configuração</p>
                                                <h5 class="mb-0" id="re_quantidade_configuracoes">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Cobrança</p>
                                                <h5 class="mb-0" id="re_quantidade_cobranca">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Listagem</p>
                                                <h5 class="mb-0" id="re_quantidade_listagens">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Notas</p>
                                                <h5 class="mb-0" id="re_quantidade_notas">0</h5>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>
                                                <p class="text-muted text-truncate mb-2">Ofícios</p>
                                                <h5 class="mb-0" id="re_quantidade_oficios">0</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-2 d-lg-block">
                                <div class="clearfix mt-4 mt-lg-0">
                                    <div class="dropdown float-end">
                                        <button class="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="bx bx-calendar align-middle me-1 font-size-16"></i> Referências
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            @foreach($referencias as $referencia)
                                                <a class="dropdown-item re_btn_referencia" href="#" data-referencia="{{$referencia['referencia']}}">{{\App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia'])}}</a>
                                            @endforeach
                                        </div>
                                    </div>
                                    <div class="dropdown float-end pt-3" id="div_botao_cobrancas" style="display: none;">
                                        <button class="btn btn-success" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-file-invoice-dollar align-middle me-1 font-size-16"></i> Cobranças
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="#" id="re_btn_gerar_cobranca">Gerar Cobrança</a>
                                            <a class="dropdown-item" href="#" id="re_btn_gerar_pdfs">Gerar PDF's</a>
                                            <a class="dropdown-item" href="#" id="re_btn_baixar_pdfs">Baixar PDF's</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-12 col-md-6" id="re_registros_grade_status_dados"></div>
                            <div class="col-12 col-md-6" id="re_registros_grade_status_documentos"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Grade de Registros-->
        <div class="modal fade gradeRegistrosModal" tabindex="-1" role="dialog" aria-labelledby=gradeRegistrosModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="gradeRegistrosModalLabel">Detalhes</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para Confirmação: Gerar Cobrança -->
        <div class="modal fade confirmacaoGerarCobrancaModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmação: Gerar Cobrança</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 alert alert-primary mb-1">
                                <div class="col-12 text-center"><h6>Vencimento</h6></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_data_vencimento"></span></div>
                            </div>
                            <div class="col-12 alert alert-primary mb-1">
                                <div class="col-12 text-center"><h6><span id="confirmacaoGerarCobrancaModal_diretor_linha_0"></span></h6></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_diretor_linha_1"></span></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_diretor_linha_2"></span></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_diretor_linha_3"></span></div>
                            </div>
                            <div class="col-12 alert alert-primary mb-1">
                                <div class="col-12 text-center"><h6><span id="confirmacaoGerarCobrancaModal_dgf2_linha_0"></span></h6></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_dgf2_linha_1"></span></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_dgf2_linha_2"></span></div>
                                <div class="col-12 text-center font-size-11"><span id="confirmacaoGerarCobrancaModal_dgf2_linha_3"></span></div>
                            </div>
                            <div class="col-12 alert alert-danger mb-1">
                                <div class="col-12 text-center"><h6 class="text-danger">Aviso</h6></div>
                                <div class="col-12 text-center text-danger font-size-11">Remover dados de Cobrança já gerados para a referência</div>
                                <div class="col-12 text-center text-danger font-size-11">Excluir arquivos PDFs já criados para a referência</div>
                                <div class="col-12 text-center text-danger font-size-11">Gerar dados de Cobrança para a referência</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-12 text-center confirmacaoGerarCobrancaModal_loading" style="display: none;">Executando serviço</div>
                        <div class="col-12 text-center spinner-chase confirmacaoGerarCobrancaModal_loading" style="display: none;">
                            <div class="spinner-chase">
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-secondary confirmacaoGerarCobrancaModal_botoes" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-success confirmacaoGerarCobrancaModal_botoes" id="re_btn_gerar_cobranca_confirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para Confirmação: Gerar PDF's -->
        <div class="modal fade confirmacaoGerarPdfsModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmação: Gerar PDFs</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 alert alert-danger mb-1">
                                <div class="col-12 text-center"><h6 class="text-danger">Aviso</h6></div>
                                <div class="col-12 text-center text-danger font-size-11">Excluir arquivos PDFs já criados para a referência</div>
                                <div class="col-12 text-center text-danger font-size-11">Criar arquivos PDFs para a referência</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-12 text-center confirmacaoGerarPdfsModal_loading" style="display: none;">Executando serviço</div>
                        <div class="col-12 text-center spinner-chase confirmacaoGerarPdfsModal_loading" style="display: none;">
                            <div class="spinner-chase">
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                                <div class="chase-dot"></div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-secondary confirmacaoGerarPdfsModal_botoes" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-success confirmacaoGerarPdfsModal_botoes" id="re_btn_gerar_pdfs_confirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection

@section('script')
    <!-- scripts_ressarcimento_cobrancas.js -->
    <script src="{{ Vite::asset('resources/assets_template/js/scripts_ressarcimento_cobrancas.js')}}"></script>
@endsection
