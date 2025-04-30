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

                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Referência</h5>
                                <div class="form-group col-12 col-md-2 pb-3">
                                    <label class="form-label">Militar (RG)</label>
                                    <input type="text" class="form-control" id="militar_rg" name="militar_rg" required="required">
                                    <span class="text-danger small" id="errorMilitarRg"></span>
                                </div>
                                <div class="form-group col-12 col-md-6 pb-3">
                                    <label class="form-label">Militar (Nome)</label>
                                    <input type="text" class="form-control text-uppercase" id="militar_nome" name="militar_nome" required="required" readonly>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Militar (Posto/Graduação)</label>
                                    <input type="hidden" id="militar_posto_graduacao_ordem" name="militar_posto_graduacao_ordem" value="0">
                                    <input type="text" class="form-control text-uppercase" id="militar_posto_graduacao" name="militar_posto_graduacao" required="required" readonly>
                                </div>
                            </div>
                            <div class="row pt-4">
                                <h5 class="pb-4 text-primary"><i class="fas fa-user"></i> Informações Gerais</h5>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Setor</label>
                                    <select class="form-control" name="setor_id" id="setor_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($setores as $key => $setor)
                                            <option value="{{ $setor['id'] }}">{{ $setor['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group col-12 col-md-4 pb-3">
                                    <label class="form-label">Função</label>
                                    <select class="form-control" name="funcao_id" id="funcao_id">
                                        <option value="">Selecione...</option>

                                        @foreach ($funcoes as $key => $funcao)
                                            <option value="{{ $funcao['id'] }}">{{ $funcao['name'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
