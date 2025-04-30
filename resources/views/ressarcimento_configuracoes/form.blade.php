<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao(['create', 'edit']))
                            <!-- Botão Confirnar Operação -->
                                <x-button-crud op="5" onclick="crudConfirmOperation();" />
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- edit or delete -->
                        @if(\App\Facades\Permissoes::permissao(['edit']))
                            <!-- Botão Alterar Registro -->
                                <x-button-crud op="2" onclick="crudEdit(0)" />
                        @endif

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
                    <form id="{{$se_nameFormSubmodulo}}" name="{{$se_nameFormSubmodulo}}">
                        <fieldset>
                            <input type="hidden" id="frm_operacao" name="frm_operacao">
                            <input type="hidden" id="registro_id" name="registro_id">

                            <div class="row mt-4">
                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informa&ccedil;&otilde;es Gerais</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Referência</label>
                                        <input type="text" class="form-control" id="referencia_extenso" name="referencia_extenso" readonly>
                                        <input type="hidden" id="referencia" name="referencia">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Vencimento</label>
                                        <input type="text" class="form-control mask_date" id="data_vencimento" name="data_vencimento" required="required">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Diretor Geral de Finanças</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">RG</label>
                                        <input type="text" class="form-control mask_rg" id="diretor_rg" name="diretor_rg" required>
                                        <span class="text-danger small" id="errorDiretorRg"></span>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Funcional</label>
                                        <input type="text" class="form-control mask_identidade_funcional" id="diretor_identidade_funcional" name="diretor_identidade_funcional" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="diretor_nome" name="diretor_nome" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Posto</label>
                                        <input type="text" class="form-control text-uppercase" id="diretor_posto" name="diretor_posto" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Quadro</label>
                                        <input type="text" class="form-control text-uppercase" id="diretor_quadro" name="diretor_quadro" required readonly>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Chefe da DGF/2 - Contabilidade</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">RG</label>
                                        <input type="text" class="form-control mask_rg" id="dgf2_rg" name="dgf2_rg" required>
                                        <span class="text-danger small" id="errorDgf2Rg"></span>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Identidade Funcional</label>
                                        <input type="text" class="form-control mask_identidade_funcional" id="dgf2_identidade_funcional" name="dgf2_identidade_funcional" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="dgf2_nome" name="dgf2_nome" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Posto</label>
                                        <input type="text" class="form-control text-uppercase" id="dgf2_posto" name="dgf2_posto" required readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">Quadro</label>
                                        <input type="text" class="form-control text-uppercase" id="dgf2_quadro" name="dgf2_quadro" required readonly>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
