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
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">
                                            CNPJ
                                            <a href="#" class="texto-primary" id="link_api_buscar">&nbsp;&nbsp;&nbsp;<i class="mdi mdi-search-web"></i> Buscar na API</a>
                                        </label>
                                        <input type="text" class="form-control mask_cnpj" id="cnpj" name="cnpj">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">UG</label>
                                        <input type="text" class="form-control" id="ug" name="ug">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="name" name="name" required="required">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Responsável</label>
                                        <input type="text" class="form-control text-uppercase" id="responsavel" name="responsavel">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Esfera</label>
                                        <select class="select2 form-control" name="esfera_id" id="esfera_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($esferas as $key => $esfera)
                                                <option value="{{ $esfera['id'] }}">{{ $esfera['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Poder</label>
                                        <select class="select2 form-control" name="poder_id" id="poder_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($poderes as $key => $poder)
                                                <option value="{{ $poder['id'] }}">{{ $poder['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Tratamento</label>
                                        <select class="select2 form-control" name="tratamento_id" id="tratamento_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($tratamentos as $key => $tratamento)
                                                <option value="{{ $tratamento['id'] }}">{{ $tratamento['completo'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Vocativo</label>
                                        <select class="select2 form-control" name="vocativo_id" id="vocativo_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($vocativos as $key => $vocativo)
                                                <option value="{{ $vocativo['id'] }}">{{ $vocativo['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Função</label>
                                        <select class="select2 form-control" name="funcao_id" id="funcao_id" required="required">
                                            <option value="">Selecione...</option>

                                            @foreach ($funcoes as $key => $funcao)
                                                <option value="{{ $funcao['id'] }}">{{ $funcao['name'] }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Telefone 1</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_1" name="telefone_1">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Telefone 2</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="telefone_2" name="telefone_2">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-house-user"></i> Endereço</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">CEP</label>
                                        <input type="text" class="form-control mask_cep" id="cep" name="cep" onblur="pesquisacep(this.value);">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Número</label>
                                        <input type="text" class="form-control" id="numero" name="numero">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Complemento</label>
                                        <input type="text" class="form-control text-uppercase" id="complemento" name="complemento">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Logradouro</label>
                                        <input type="text" class="form-control text-uppercase" id="logradouro" name="logradouro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Bairro</label>
                                        <input type="text" class="form-control text-uppercase" id="bairro" name="bairro" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Localidade</label>
                                        <input type="text" class="form-control text-uppercase" id="localidade" name="localidade" readonly="readonly">
                                    </div>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">UF</label>
                                        <input type="text" class="form-control text-uppercase" id="uf" name="uf" readonly="readonly">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-file-contract"></i> Contato</h5>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="contato_nome" name="contato_nome">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Telefone</label>
                                        <input type="text" class="form-control mask_phone_with_ddd" id="contato_telefone" name="contato_telefone">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">Celular</label>
                                        <input type="text" class="form-control mask_cell_with_ddd" id="contato_celular" name="contato_celular">
                                    </div>
                                    <div class="form-group col-12 col-md-3 pb-3">
                                        <label class="form-label">E-mail</label>
                                        <input type="email" class="form-control text-lowercase" id="contato_email" name="contato_email">
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-reply"></i> Lotação (Referência na DGP)</h5>
                                    <div class="form-group col-12 col-md-2 pb-3">
                                        <label class="form-label">ID</label>
                                        <input type="text" class="form-control text-uppercase" id="lotacao_id" name="lotacao_id" readonly>
                                    </div>
                                    <div class="form-group col-12 col-md-10 pb-3">
                                        <label class="form-label">Nome</label>
                                        <input type="text" class="form-control text-uppercase" id="lotacao" name="lotacao" readonly>
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <h5 class="pb-4 text-primary"><i class="fas fa-money-check"></i> Cobrança</h5>
                                    <div class="form-group col-12 col-md-4 pb-3">
                                        <label class="form-label">Realizar Cobrança</label>
                                        <select class="select2 form-control" name="realizar_cobranca" id="realizar_cobranca" required="required">
                                            <option value="">Selecione...</option>
                                            <option value="1">Cobrar</option>
                                            <option value="2">Controlar</option>
                                        </select>
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

<!-- API modal -->
<div class="modal fade modal-dialog-scrollable" id="modal_api" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Dados</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="card">
                        <div class="card-body">
                            <div class="pb-2">
                                <button type="button" class="btn btn-success button_api_copiar">Copiar Informações</button>
                            </div>
                            <div class="table-responsive">
                                <!-- Campos hidden para copiar -->
                                <input type="hidden" name="hidden_api_situacao" id="hidden_api_situacao">
                                <input type="hidden" name="hidden_api_tipo" id="hidden_api_tipo">
                                <input type="hidden" name="hidden_api_natureza_juridica" id="hidden_api_natureza_juridica">
                                <input type="hidden" name="hidden_api_nome" id="hidden_api_nome">
                                <input type="hidden" name="hidden_api_fantasia" id="hidden_api_fantasia">
                                <input type="hidden" name="hidden_api_cnpj" id="hidden_api_cnpj">
                                <input type="hidden" name="hidden_api_abertura" id="hidden_api_abertura">
                                <input type="hidden" name="hidden_api_cep" id="hidden_api_cep">
                                <input type="hidden" name="hidden_api_telefone" id="hidden_api_telefone">
                                <input type="hidden" name="hidden_api_email" id="hidden_api_email">
                                <input type="hidden" name="hidden_api_logradouro" id="hidden_api_logradouro">
                                <input type="hidden" name="hidden_api_numero" id="hidden_api_numero">
                                <input type="hidden" name="hidden_api_complemento" id="hidden_api_complemento">
                                <input type="hidden" name="hidden_api_bairro" id="hidden_api_bairro">
                                <input type="hidden" name="hidden_api_municipio" id="hidden_api_municipio">
                                <input type="hidden" name="hidden_api_uf" id="hidden_api_uf">

                                <table class="table table-nowrap mb-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Situação</th>
                                            <td name="td_api_situacao" id="td_api_situacao"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tipo</th>
                                            <td name="td_api_tipo" id="td_api_tipo"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Natureza Jurídica</th>
                                            <td name="td_api_natureza_juridica" id="td_api_natureza_juridica"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Nome</th>
                                            <td name="td_api_nome" id="td_api_nome"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Nome Fantasia</th>
                                            <td name="td_api_fantasia" id="td_api_fantasia"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">CNPJ</th>
                                            <td name="td_api_cnpj" id="td_api_cnpj"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Abertura</th>
                                            <td name="td_api_abertura" id="td_api_abertura"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">CEP</th>
                                            <td name="td_api_cep" id="td_api_cep"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Telefone</th>
                                            <td name="td_api_telefone" id="td_api_telefone"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">E-mail</th>
                                            <td name="td_api_email" id="td_api_email"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Logradouro</th>
                                            <td name="td_api_logradouro" id="td_api_logradouro"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Número</th>
                                            <td name="td_api_numero" id="td_api_numero"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Complemento</th>
                                            <td name="td_api_complemento" id="td_api_complemento"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Bairro</th>
                                            <td name="td_api_bairro" id="td_api_bairro"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Município</th>
                                            <td name="td_api_municipio" id="td_api_municipio"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">UF</th>
                                            <td name="td_api_uf" id="td_api_uf"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-success button_api_copiar">Copiar Informações</button>
            </div>
        </div>
    </div>
</div>
