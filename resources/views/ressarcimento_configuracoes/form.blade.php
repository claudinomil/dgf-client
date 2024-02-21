<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- store or update -->
                        @if(\App\Facades\Permissoes::permissao([$ajaxPrefixPermissaoSubmodulo.'_create', $ajaxPrefixPermissaoSubmodulo.'_edit'], $userLoggedPermissoes))
                            <!-- Botão Confirnar Operação -->
                                <button type="button" class="btn btn-success waves-effect btn-label waves-light" data-bs-toggle="tooltip" data-bs-placement="top" title="Confirmar Operação" id="crudFormConfirmOperacao"><i class="fa fa-save label-icon"></i> Confirmar</button>
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <button type="button" class="btn btn-secondary waves-effect btn-label waves-light crudFormCancelOperacao" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancelar Operação"><i class="fa fa-arrow-left label-icon"></i> Cancelar</button>
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- edit or delete -->
                        @if(\App\Facades\Permissoes::permissao([$ajaxPrefixPermissaoSubmodulo.'_edit'], $userLoggedPermissoes))
                            <!-- Botão Alterar Registro -->
                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light editRecord" data-bs-toggle="tooltip" data-bs-placement="top" data-id="0" title="Alterar Registro"><i class="fas fa-pencil-alt label-icon"></i> Alterar</button>
                        @endif

                        @if(\App\Facades\Permissoes::permissao([$ajaxPrefixPermissaoSubmodulo.'_destroy'], $userLoggedPermissoes))
                            <!-- Botão Excluir Registro -->
                                <button type="button" class="btn btn-danger waves-effect btn-label waves-light deleteRecord" data-bs-toggle="tooltip" data-bs-placement="top" data-id="0" title="Excluir Registro"><i class="fa fa-trash-alt label-icon"></i> Excluir</button>
                        @endif

                        <!-- Botão Cancelar Operação -->
                        <button type="button" class="btn btn-secondary waves-effect btn-label waves-light crudFormCancelOperacao" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancelar Operação"><i class="fa fa-arrow-left label-icon"></i> Cancelar</button>
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
                    <form id="{{$ajaxNameFormSubmodulo}}" name="{{$ajaxNameFormSubmodulo}}">
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
