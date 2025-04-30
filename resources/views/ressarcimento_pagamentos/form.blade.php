<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Confirnar Operação -->
                            <x-button-crud op="5" onclick="crudConfirmOperation();" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- delete -->
                        @if(\App\Facades\Permissoes::permissao(['destroy']))
                            <!-- Botão Excluir Registro -->
                                <x-button-crud op="3" onclick="crudDelete(0);" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-loading" id="crudFormAjaxLoading" style="display: none;">
                        <div class="spinner-chase">
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                            <div class="chase-dot"></div>
                        </div>
                    </div>

                    <!-- Formulário - Form -->
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}" enctype="multipart/form-data">
                        <input type="hidden" id="frm_operacao" name="frm_operacao">
                        <input type="hidden" id="registro_id" name="registro_id">

                        <div class="row mt-4">
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informações Gerais</h5>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Identidade Funcional</label>
                                    <input type="text" class="form-control text-uppercase" id="identidade_funcional" name="identidade_funcional">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Vínculo</label>
                                    <input type="text" class="form-control text-uppercase" id="vinculo" name="vinculo">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">RG</label>
                                    <input type="text" class="form-control text-uppercase" id="rg" name="rg">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Código Cargo</label>
                                    <input type="text" class="form-control text-uppercase" id="codigo_cargo" name="codigo_cargo">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nome Cargo</label>
                                    <input type="text" class="form-control text-uppercase" id="nome_cargo" name="nome_cargo">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Posto Graduação</label>
                                    <input type="text" class="form-control text-uppercase" id="posto_graduacao" name="posto_graduacao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nível</label>
                                    <input type="text" class="form-control text-uppercase" id="nivel" name="nivel">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control text-uppercase" id="nome" name="nome">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Situação Pagamento</label>
                                    <input type="text" class="form-control text-uppercase" id="situacao_pagamento" name="situacao_pagamento">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">DataIngresso</label>
                                    <input type="text" class="form-control text-uppercase" id="data_ingresso" name="data_ingresso">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Data Nascimento</label>
                                    <input type="text" class="form-control text-uppercase" id="data_nascimento" name="data_nascimento">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Data Aposentadoria</label>
                                    <input type="text" class="form-control text-uppercase" id="data_aposentadoria" name="data_aposentadoria">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Gênero</label>
                                    <input type="text" class="form-control text-uppercase" id="genero" name="genero">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Código UA</label>
                                    <input type="text" class="form-control text-uppercase" id="codigo_ua" name="codigo_ua">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">UA</label>
                                    <input type="text" class="form-control text-uppercase" id="ua" name="ua">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Número Dependentes</label>
                                    <input type="text" class="form-control text-uppercase" id="numero_dependentes" name="numero_dependentes">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">IR Dependente</label>
                                    <input type="text" class="form-control text-uppercase" id="ir_dependente" name="ir_dependente">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Cotista</label>
                                    <input type="text" class="form-control text-uppercase" id="cotista" name="cotista">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Cidade</label>
                                    <input type="text" class="form-control text-uppercase" id="cidade" name="cidade">
                                </div>
                            </div>
                        </div>

                        <div class="row pt-4">
                            <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Documentos</h5>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">CPF</label>
                                <input type="text" class="form-control text-uppercase" id="cpf" name="cpf">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">PASEP</label>
                                <input type="text" class="form-control text-uppercase" id="pasep" name="pasep">
                            </div>
                        </div>

                        <div class="row pt-4">
                            <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informações Bancárias</h5>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Banco</label>
                                <input type="text" class="form-control text-uppercase" id="banco" name="banco">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Agência</label>
                                <input type="text" class="form-control text-uppercase" id="agencia" name="agencia">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Conta Corrente</label>
                                <input type="text" class="form-control text-uppercase" id="conta_corrente" name="conta_corrente">
                            </div>
                        </div>
                        <div class="row pt-4">
                            <h5 class="pb-4 text-primary"><i class="fas fa-comment-dollar"></i> Valores Principais</h5>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Bruto</label>
                                <input type="text" class="form-control mask_money valores_principais" id="bruto" name="bruto">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Fundo Saúde</label>
                                <input type="text" class="form-control mask_money valores_principais" id="fundo_saude" name="fundo_saude">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Auxílio Transporte</label>
                                <input type="text" class="form-control mask_money valores_principais" id="auxilio_transporte" name="auxilio_transporte">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Rioprevidência 22</label>
                                <input type="text" class="form-control mask_money valores_principais" id="rioprevidencia22" name="rioprevidencia22">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Etapa Férias</label>
                                <input type="text" class="form-control mask_money valores_principais" id="etapa_ferias" name="etapa_ferias">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Etapa Destacado</label>
                                <input type="text" class="form-control mask_money valores_principais" id="etapa_destacado" name="etapa_destacado">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Abono Permanência</label>
                                <input type="text" class="form-control mask_money valores_principais" id="abono_permanencia" name="abono_permanencia">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Valor Total</label>
                                <input type="text" class="form-control mask_money" id="valores_principais_total" name="valores_principais_total" readonly>
                            </div>
                        </div>
                        <div class="row pt-4">
                            <h5 class="pb-4 text-primary"><i class="fas fa-comments-dollar"></i> Outros Valores</h5>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Desconto</label>
                                <input type="text" class="form-control mask_money" id="desconto" name="desconto">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Líquido</label>
                                <input type="text" class="form-control mask_money" id="liquido" name="liquido">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Soldo</label>
                                <input type="text" class="form-control mask_money" id="soldo" name="soldo">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Hospital 10</label>
                                <input type="text" class="form-control mask_money" id="hospital10" name="hospital10">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Ajuda Fardamento</label>
                                <input type="text" class="form-control mask_money" id="ajuda_fardamento" name="ajuda_fardamento">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Habilitação Profissional</label>
                                <input type="text" class="form-control mask_money" id="habilitacao_profissional" name="habilitacao_profissional">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">GRET</label>
                                <input type="text" class="form-control mask_money" id="gret" name="gret">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Auxílio Moradia</label>
                                <input type="text" class="form-control mask_money" id="auxilio_moradia" name="auxilio_moradia">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">GPE</label>
                                <input type="text" class="form-control mask_money" id="gpe" name="gpe">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">GEE Capacitação</label>
                                <input type="text" class="form-control mask_money" id="gee_capacitacao" name="gee_capacitacao">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Decreto 14407</label>
                                <input type="text" class="form-control mask_money" id="decreto14407" name="decreto14407">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Férias</label>
                                <input type="text" class="form-control mask_money" id="ferias" name="ferias">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Raio X</label>
                                <input type="text" class="form-control mask_money" id="raio_x" name="raio_x">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Triênio</label>
                                <input type="text" class="form-control mask_money" id="trienio" name="trienio">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Auxílio Invalidez</label>
                                <input type="text" class="form-control mask_money" id="auxilio_invalidez" name="auxilio_invalidez">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Tempo Certo</label>
                                <input type="text" class="form-control mask_money" id="tempo_certo" name="tempo_certo">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Dedução IR</label>
                                <input type="text" class="form-control mask_money" id="deducao_ir" name="deducao_ir">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">IR Valor</label>
                                <input type="text" class="form-control mask_money" id="ir_valor" name="ir_valor">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">GRAM</label>
                                <input type="text" class="form-control mask_money" id="gram" name="gram">
                            </div>
                            <div class="form-group col-12 col-md-3 pb-3">
                                <label class="form-label">Auxílio Fardamento</label>
                                <input type="text" class="form-control mask_money" id="auxilio_fardamento" name="auxilio_fardamento">
                            </div>
                        </div>
                        <div class="row pt-4">
                            <h5 class="pb-4 text-primary"><i class="fas fa-list-alt"></i> Observação</h5>
                            <div class="form-group col-12 col-md-12 pb-3">
                                <label class="form-label">Observação</label>
                                <textarea class="form-control text-uppercase" id="observacao" name="observacao"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para importação do Pagamento -->
<div class="modal fade modal-importar-pagamento" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Importar Pagamento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post" enctype="multipart/form-data" id="frm_importar_ressarcimento_pagamento">
                    @csrf
                    @method('POST')

                    <div class="mb-3">
                        <label class="form-label">Referência</label>
                        <select class="form-select" name="ressarcimento_pagamento_referencia" id="ressarcimento_pagamento_referencia" required>
                            <option value="">Selecione...</option>

                            @foreach ($referencias as $key => $referencia)
                                <option value="{{ $referencia['referencia'] }}">{{ \App\Facades\SuporteFacade::getReferencia(1, $referencia['referencia']) }}</option>
                            @endforeach

                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Arquivo</label>
                        <div class="input-group">
                            <input type="file" class="form-control" name="ressarcimento_pagamento_file" id="ressarcimento_pagamento_file">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col-12 text-end" id="modal-importar-pagamento-footer-1">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnConfirmarImportacaoPagamento">Confirmar Importação</button>
                </div>
                <div class="col-12 text-center" id="modal-importar-pagamento-footer-2" style="display: none;">
                    <i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Processando...
                </div>
            </div>
        </div>
    </div>
</div>
