<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">
                        <!-- update -->
                    @if(\App\Facades\Permissoes::permissao(['edit']))
                        <!-- Botão Confirnar Operação -->
                            <button type="button" class="btn btn-success waves-effect btn-label waves-light" data-bs-toggle="tooltip" data-bs-placement="top" title="Confirmar Operação" id="re_btn_alterar_registros_confirmar_update"><i class="fa fa-save label-icon"></i> Confirmar</button>
                    @endif

                    <!-- Botão Cancelar Operação -->
                        <x-button-crud op="4" onclick="crudCancelOperation();" />
                    </div>
                    <div class="modal-buttons" id="crudFormButtons2">
                        <!-- edit -->
                    @if(\App\Facades\Permissoes::permissao(['edit']))
                        <!-- Botão Alterar Registro -->
                            <x-button-crud op="2" onclick="crudEdit(0)" />
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

                            <input type="hidden" id="grade_recebimentos_referencia" name="grade_recebimentos_referencia">
                            <input type="hidden" id="grade_recebimentos_orgao_id" name="grade_recebimentos_orgao_id">

                            <div class="row mt-4">
                                <div class="pb-4" id="gradeRecebimentosTitulo"></div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Valor total a receber</label>
                                    <input type="text" class="form-control mask_money" id="valor_a_receber_orgao" name="valor_a_receber_orgao" required="required" readonly>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Valor total recebido</label>
                                    <input type="text" class="form-control mask_money" id="valor_recebido_orgao" name="valor_recebido_orgao" required="required">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Operações</label>
                                    <div class="input-group">
                                        <button type="button" class="btn btn-info float-end" id="valor_recebido_orgao_op_1" data-bs-toggle="tooltip" data-bs-placement="top" title="Dividir Valor Total Recebido Integralmente"><i class="fas fa-divide"></i></button>
                                        <button type="button" class="btn btn-success float-end" id="valor_recebido_orgao_op_2" data-bs-toggle="tooltip" data-bs-placement="top" title="Dividir Valor Total Recebido Distribuído"><i class="fas fa-align-center"></i></button>
                                    </div>
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Data recebimento</label>
                                    <input type="text" class="form-control mask_date" id="data_recebimento" name="data_recebimento" required="required">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Guia Recolhimento</label>
                                    <input type="text" class="form-control" id="guia_recolhimento" name="guia_recolhimento">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Documento</label>
                                    <input type="text" class="form-control" id="documento" name="documento">
                                </div>

                                <div class="table-responsive">
                                    <table class="table align-middle table-hover font-size-11" id="gradeRecebimentosTable">
                                        <thead class="table-light" id="gradeRecebimentosThead"></thead>
                                        <tbody id="gradeRecebimentosTbody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
