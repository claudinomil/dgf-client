<!-- Formulario -->
<div id="crudForm" style="display: none;">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="modal-buttons" id="crudFormButtons1">&nbsp;</div>
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
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">RG</label>
                                    <input type="text" class="form-control text-uppercase" id="rg" name="rg">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Id. Funcional</label>
                                    <input type="text" class="form-control text-uppercase" id="identidade_funcional" name="identidade_funcional">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">V&iacute;nculo</label>
                                    <input type="text" class="form-control text-uppercase" id="vinculo" name="vinculo">
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control text-uppercase" id="nome" name="nome">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Nome de Guerra</label>
                                    <input type="text" class="form-control text-uppercase" id="nome_guerra" name="nome_guerra">
                                </div>

                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Situação</label>
                                    <input type="text" class="form-control text-uppercase" id="situacao" name="situacao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Situação</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_situacao" name="boletim_situacao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Quadro</label>
                                    <input type="text" class="form-control text-uppercase" id="quadro" name="quadro">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Quadro</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_quadro" name="boletim_quadro">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Posto Graduação</label>
                                    <input type="text" class="form-control text-uppercase" id="graduacao" name="graduacao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Promoção</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_graduacao" name="boletim_graduacao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Data Ingresso</label>
                                    <input type="text" class="form-control mask_date" id="data_ingresso" name="data_ingresso">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Ingresso</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_ingresso" name="boletim_ingresso">
                                </div>
                                <div class="form-group col-12 col-md-9 pb-3">
                                    <label class="form-label">Unidade</label>
                                    <input type="text" class="form-control text-uppercase" id="unidade" name="unidade">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Movimentação</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_movimentacao" name="boletim_movimentacao">
                                </div>
                                <div class="form-group col-12 col-md-9 pb-3">
                                    <label class="form-label">Prestando Serviço</label>
                                    <input type="text" class="form-control text-uppercase" id="unidade_prestando_servico" name="unidade_prestando_servico">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Boletim Prestando Serviço</label>
                                    <input type="text" class="form-control text-uppercase" id="boletim_prestando_servico" name="boletim_prestando_servico">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Data Nascimento</label>
                                    <input type="text" class="form-control mask_date" id="data_nascimento" name="data_nascimento">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Estado Civil</label>
                                    <input type="text" class="form-control text-uppercase" id="estado_civil" name="estado_civil">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Comportamento</label>
                                    <input type="text" class="form-control text-uppercase" id="comportamento" name="comportamento">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Sexo</label>
                                    <input type="text" class="form-control text-uppercase" id="sexo" name="sexo">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Tipo Sanguíneo</label>
                                    <input type="text" class="form-control text-uppercase" id="tipo_sanguineo" name="tipo_sanguineo">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Fator RH</label>
                                    <input type="text" class="form-control text-uppercase" id="fator_rh" name="fator_rh">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Nacionalidade</label>
                                    <input type="text" class="form-control text-uppercase" id="nacionalidade" name="nacionalidade">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Naturalidade</label>
                                    <input type="text" class="form-control text-uppercase" id="naturalidade" name="naturalidade">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Banco</label>
                                    <input type="text" class="form-control text-uppercase" id="banco" name="banco">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Agência</label>
                                    <input type="text" class="form-control text-uppercase" id="agencia" name="agencia">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Conta Corrente</label>
                                    <input type="text" class="form-control text-uppercase" id="conta_corrente" name="conta_corrente">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">CPF</label>
                                    <input type="text" class="form-control text-uppercase" id="cpf" name="cpf">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">PASEP</label>
                                    <input type="text" class="form-control text-uppercase" id="pasep" name="pasep">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Título Eleitor</label>
                                    <input type="text" class="form-control text-uppercase" id="titulo_eleitoral" name="titulo_eleitoral">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Zona</label>
                                    <input type="text" class="form-control text-uppercase" id="titulo_eleitoral_zona" name="titulo_eleitoral_zona">
                                </div>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Seção</label>
                                    <input type="text" class="form-control text-uppercase" id="titulo_eleitoral_secao" name="titulo_eleitoral_secao">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Pai</label>
                                    <input type="text" class="form-control text-uppercase" id="pai" name="pai">
                                </div>
                                <div class="form-group col-12 col-md-3 pb-3">
                                    <label class="form-label">Mãe</label>
                                    <input type="text" class="form-control text-uppercase" id="mae" name="mae">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
