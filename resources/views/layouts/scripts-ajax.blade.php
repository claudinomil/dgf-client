@if(isset($ajaxPrefixPermissaoSubmodulo))
    <!-- Script para CRUD Ajax -->
    <!-- Alguns Submódulos não tem CRUD, então entra na exceção -->
    <!-- Submódulos que não vão usar: Dashboards, Logos -->
    @if($ajaxPrefixPermissaoSubmodulo != 'dashboards' and $ajaxPrefixPermissaoSubmodulo != 'logos' and $ajaxPrefixPermissaoSubmodulo != 'ressarcimento_cobrancas' and $ajaxPrefixPermissaoSubmodulo != 'relatorios' and $ajaxPrefixPermissaoSubmodulo != 'ressarcimento_relatorios' and $ajaxPrefixPermissaoSubmodulo != 'ressarcimento_dashboards' and $ajaxPrefixPermissaoSubmodulo != 'efetivo_militares')
        {{-- Script para CRUD Ajax --}}
        <script type="text/javascript">
            $(function () {
                //Configuração
                function ajaxCrudConfiguracao({p_frm_operacao=null, p_fieldsDisabled=null, p_crudFormButtons1=null, p_crudFormButtons2=null, p_crudTable=null, p_crudForm=null, p_crudFormAjaxLoading=null, p_removeMask=null, p_putMask=null}) {
                    //Campo hidden frm_operacao
                    if (p_frm_operacao !== null) {$('#frm_operacao').val(p_frm_operacao);}

                    //Campos do Formulário - disabled true/false
                    if (p_fieldsDisabled !== null) {
                        $('input').prop('disabled', p_fieldsDisabled);
                        $('textarea').prop('disabled', p_fieldsDisabled);
                        $('select').prop('disabled', p_fieldsDisabled);
                        $('.select2').prop('disabled', p_fieldsDisabled);

                        //Campos do Formulário - disabled true/false (Campos Padrões)
                        if (p_fieldsDisabled === true) {
                            $('#pesquisar_field').prop('disabled', false);
                            $('#pesquisar_value').prop('disabled', false);
                            $('.fildFilterTable').prop('disabled', false);
                            $('.fildLengthTable').prop('disabled', false);
                        }
                    }

                    //Botões do Modal
                    if (p_crudFormButtons1 == 'show') {$('#crudFormButtons1').show();}

                    if (p_crudFormButtons1 == 'hide') {$('#crudFormButtons1').hide();}

                    if (p_crudFormButtons2 == 'show') {$('#crudFormButtons2').show();}

                    if (p_crudFormButtons2 == 'hide') {$('#crudFormButtons2').hide();}

                    //Table Show/Hide
                    if (p_crudTable == 'show') {$('#crudTable').show();}

                    if (p_crudTable == 'hide') {$('#crudTable').hide();}

                    //Form Show/Hide
                    if (p_crudForm == 'show') {$('#crudForm').show();}

                    if (p_crudForm == 'hide') {$('#crudForm').hide();}

                    //DIV Loading Show/Hide
                    if (p_crudFormAjaxLoading == 'show') {$('#crudFormAjaxLoading').show();}

                    if (p_crudFormAjaxLoading == 'hide') {$('#crudFormAjaxLoading').hide();}

                    //Removendo Máscaras
                    if (p_removeMask === true) {removeMask();}

                    //Restaurando Máscaras
                    if (p_putMask === true) {putMask();}
                }

                //Preencher Formulario
                function ajaxCrudPreencherFormulario(campo, dados) {
                    if (campo == 'id') {
                        $('#registro_id').val(dados['id']);
                    } else {
                        if ($('#'+campo).hasClass('select2')) {
                            $('#'+campo).val(dados[campo]).trigger('change');
                        } else {
                            $('#'+campo).val(dados[campo]);
                        }
                    }
                }

                //Limpar Formulario
                function ajaxCrudLimparFormulario(nomeFormulario) {
                    $('.is-invalid').removeClass('is-invalid');
                    $('#'+nomeFormulario).trigger('reset');
                    $('.select2').val('').trigger('change');
                }

                //Header
                $.ajaxSetup({
                    headers:{
                        'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
                    }
                });

                //Table
                tableContent('{{$ajaxPrefixPermissaoSubmodulo}}');

                function tableContent(route) {
                    $('.datatable-crud-ajax').DataTable({
                        language: {
                            pageLength: {
                                '-1': 'Mostrar todos os registros',
                                '_': 'Mostrar %d registros'
                            },
                            lengthMenu: 'Exibir _MENU_ resultados por página',
                            emptyTable: 'Nenhum registro encontrado',
                            info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
                            infoEmpty: 'Mostrando 0 até 0 de 0 registros',
                            infoFiltered: '(Filtrados de _MAX_ registros)',
                            infoThousands: '.',
                            loadingRecords: 'Carregando...',
                            processing: 'Processando...',
                            zeroRecords: 'Nenhum registro encontrado',
                            search: 'Pesquisar',
                            paginate: {
                                next: 'Próximo',
                                previous: 'Anterior',
                                first: 'Primeiro',
                                last: 'Último'
                            }
                        },
                        bDestroy: true,
                        responsive: true,
                        lengthChange: true,
                        autoWidth: true,
                        order: [],

                        processing: true,
                        serverSide: false,
                        ajax: route,
                        columns: [
                            @foreach($colsFields as $colField)
                                {'data': '{{$colField}}'},
                            @endforeach

                            @if($colActions == 'yes')
                                {'data': 'action'}
                            @endif
                        ]
                    });

                    //Configuração
                    ajaxCrudConfiguracao({p_fieldsDisabled:false});
                }

                //Create
                $('#createNewRecord').click(function () {
                    //Passar pelo evento create do controller
                    $.get("{{$ajaxPrefixPermissaoSubmodulo}}/create", function (data) {
                        //Limpar Formulario
                        ajaxCrudLimparFormulario('{{$ajaxNameFormSubmodulo}}');

                        //Lendo dados
                        if (data.success) {
                            //Configuração
                            ajaxCrudConfiguracao({p_frm_operacao:'create', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});

                            //Settings'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                            @if($ajaxPrefixPermissaoSubmodulo == 'notificacoes')
                                $('.fieldsViewEdit').hide();
                                $('.fieldsCreate').show();
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'grupos')
                                $('.markUnmarkAll').show();

                                //Desabilitar/Habilitar opções de Show
                                $('.tdShow').hide();

                                //Desabilitar/Habilitar opções de Create/Edit
                                $('.tdCreateEdit').show();

                                //Dashboards - desmarcar checkbox
                                $('.grupo_dashboards').attr('checked', false);

                                //Relatorios - desmarcar checkbox
                                $('.grupo_relatorios').attr('checked', false);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ferramentas')
                                //Esconder botão buscar icones
                                $('#buscarIcones').show();

                                $('#iconView').removeClass();

                                $('.fieldsViewEdit').hide();
                                $('.fieldsCreate').show();
                            @endif
                            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        } else if (data.error_permissao) {
                            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                        } else {
                            alert('Erro interno');
                        }
                    });
                });

                //View
                $('body').on('click', '.viewRecord', function () {
                    //Campo hidden registro_id
                    $('#registro_id').val($(this).data('id'));

                    //Buscar dados do Registro
                    $.get("{{$ajaxPrefixPermissaoSubmodulo}}/"+$('#registro_id').val(), function (data) {
                        //Limpar Formulario
                        ajaxCrudLimparFormulario('{{$ajaxNameFormSubmodulo}}');

                        //Lendo dados
                        if (data.success) {
                            //preencher formulário
                            @foreach($ajaxNamesFieldsSubmodulo as $field)
                                ajaxCrudPreencherFormulario('{{$field}}', data.success);
                            @endforeach

                            //Configuração
                            ajaxCrudConfiguracao({p_frm_operacao:'view', p_fieldsDisabled:true, p_crudFormButtons1:'hide', p_crudFormButtons2:'show', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});

                            //Settings'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                            @if($ajaxPrefixPermissaoSubmodulo == 'notificacoes')
                                $('.fieldsViewEdit').show();
                                $('.fieldsCreate').hide();

                                $('#fieldDate').val(data.success['date']);
                                $('#fieldTime').val(data.success['time']);
                                $('#fieldUserName').val(data.success['userName']);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'grupos')
                                $('.markUnmarkAll').hide();

                                //Desabilitar/Habilitar opções de Show
                                $.each(data.success, function(i, item) {
                                    $('.show_'+i).show();
                                });

                                //Desabilitar/Habilitar opções de Create/Edit
                                $('.tdCreateEdit').hide();

                                //Dashboards
                                //desmarcar checkbox
                                $('.grupo_dashboards').attr('checked', false);

                                var dashboards = data.success['dashboards'];

                                $.each(dashboards, function(i, item) {
                                	//marcar como checado
                                    $('#dashboard_'+item.dashboard_id).attr('checked', true);
                                });

                                //Relatorios
                                //desmarcar checkbox
                                $('.grupo_relatorios').attr('checked', false);

                                var relatorios = data.success['relatorios'];

                                $.each(relatorios, function(i, item) {
                                    //marcar como checado
                                    $('#relatorio_'+item.relatorio_id).attr('checked', true);
                                });
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ferramentas')
                                //Esconder botão buscar icones
                                $('#buscarIcones').hide();

                                $('#iconView').removeClass();
                                $('#iconView').addClass(data.success['icon']);

                                $('.fieldsViewEdit').show();
                                $('.fieldsCreate').hide();
                                $('#fieldUserName').val(data.success['userName']);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_militares')
                            $('#referencia').val(getReferencia(1, $('#referencia').val()));
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_configuracoes')
                            $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_referencias')
                            $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
                            @endif
                            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        } else if (data.error_not_found) {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
                        } else if (data.error_permissao) {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                        } else {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alert('Erro interno');
                        }
                    });
                });

                //Edit
                $('body').on('click', '.editRecord', function () {
                    //Campo hidden registro_id
                    if ($(this).data('id') != 0) {
                        $('#registro_id').val($(this).data('id'));
                    }

                    //Buscar dados do Registro
                    $.get("{{$ajaxPrefixPermissaoSubmodulo}}/"+$('#registro_id').val()+"/edit", function (data) {
                        //Limpar Formulario
                        ajaxCrudLimparFormulario('{{$ajaxNameFormSubmodulo}}');

                        //Lendo dados
                        if (data.success) {
                            //preencher formulário
                            @foreach($ajaxNamesFieldsSubmodulo as $field)
                                ajaxCrudPreencherFormulario('{{$field}}', data.success);
                            @endforeach

                            //Configuração
                            ajaxCrudConfiguracao({p_frm_operacao:'edit', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});

                            //Settings'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                            @if($ajaxPrefixPermissaoSubmodulo == 'notificacoes')
                                $('.fieldsViewEdit').show();
                                $('.fieldsCreate').hide();

                                $('#fieldDate').val(data.success['date']);
                                $('#fieldTime').val(data.success['time']);
                                $('#fieldUserName').val(data.success['userName']);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'grupos')
                                $('.markUnmarkAll').show();

                                //Desabilitar/Habilitar opções de Show
                                $('.tdShow').hide();

                                //Desabilitar/Habilitar opções de Create/Edit
                                $('.tdCreateEdit').show();

                                $.each(data.success, function(i, item) {
                                    $('.create_edit_'+i).prop('checked', true);
                                });

                                //Dashboards
                                //desmarcar checkbox
                                $('.grupo_dashboards').attr('checked', false);

                                var dashboards = data.success['dashboards'];

                                $.each(dashboards, function(i, item) {
                                    //marcar como checado
                                    $('#dashboard_'+item.dashboard_id).attr('checked', true);
                                });

                                //Relatorios
                                //desmarcar checkbox
                                $('.grupo_relatorios').attr('checked', false);

                                var relatorios = data.success['relatorios'];

                                $.each(relatorios, function(i, item) {
                                    //marcar como checado
                                    $('#relatorio_'+item.relatorio_id).attr('checked', true);
                                });
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'users')
                                $('#email').prop('readonly', true);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ferramentas')
                                //Esconder botão buscar icones
                                $('#buscarIcones').show();

                                $('#iconView').removeClass();
                                $('#iconView').addClass(data.success['icon']);

                                $('.fieldsViewEdit').show();
                                $('.fieldsCreate').hide();
                                $('#fieldUserName').val(data.success['userName']);
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_militares')
                            $('#referencia').val(getReferencia(1, $('#referencia').val()));
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_configuracoes')
                            $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
                            @endif

                            @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_referencias')
                            $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
                            @endif
                            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        } else if (data.error_not_found) {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
                        } else if (data.error_permissao) {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                        } else {
                            //Configuração
                            ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                            alert('Erro interno');
                        }
                    });
                });

                //Delete
                $('body').on('click', '.deleteRecord', function () {
                    //Campo hidden registro_id
                    if ($(this).data('id') != 0) {
                        $('#registro_id').val($(this).data('id'));
                    }

                    //Confirmação de Delete
                    alertSwalConfirmacao(function (confirmed) {
                        if (confirmed) {
                            $.ajax({
                                type: "DELETE",
                                url: "{{$ajaxPrefixPermissaoSubmodulo}}/" + $('#registro_id').val(),
                                beforeSend: function () {
                                    //Configuração - Retirar DIV Botões e colocar DIV Loading
                                    ajaxCrudConfiguracao({p_crudFormButtons2:'hide', p_crudFormAjaxLoading:'show'});
                                },
                                success: function (response) {
                                    //Lendo dados
                                    if (response.success) {
                                        alertSwal('success', "{{$ajaxNameSubmodulo}}", response.success, 'true', 2000);

                                        //Configuração
                                        ajaxCrudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                                        //Table
                                        tableContent('{{$ajaxPrefixPermissaoSubmodulo}}');
                                    } else if (response.error) {
                                        alertSwal('warning', "{{$ajaxNameSubmodulo}}", response.error, 'true', 5000);

                                        //Configuração
                                        ajaxCrudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                                        //Table
                                        tableContent('{{$ajaxPrefixPermissaoSubmodulo}}');
                                    } else if (response.error_permissao) {
                                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                                    } else {
                                        alert('Erro interno');
                                    }
                                },
                                error: function (data) {
                                    alert('Erro interno');
                                },
                                complete: function () {
                                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                                    ajaxCrudConfiguracao({p_crudFormButtons2:'show', p_crudFormAjaxLoading:'hide'});
                                }
                            });
                        }
                    });
                });

                //Confirm Operacao
                $('#crudFormConfirmOperacao').click(function (e) {
                    e.preventDefault();

                    //Verificar Validação feita com sucesso
                    if ($('#{{$ajaxNameFormSubmodulo}}').valid()) {
                    	//Validação CNPJ e UG'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        @if($ajaxPrefixPermissaoSubmodulo == 'ressarcimento_orgaos')
                            if ($('#cnpj').val() == '' && $('#ug').val() == '') {
                            	alertSwal('warning', 'Validação', 'Digite CNPJ e/ou UG ', 'true', 20000);
                            	return false;
                            }
                        @endif
                        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                        //Configuração
                        ajaxCrudConfiguracao({p_removeMask:true});

                        //Confirm Operacao - Create
                        if ($('#frm_operacao').val() == 'create') {
                            $.ajax({
                                data: $('#{{$ajaxNameFormSubmodulo}}').serialize(),
                                url: "{{$ajaxPrefixPermissaoSubmodulo}}",
                                type: "POST",
                                dataType: "json",
                                beforeSend: function () {
                                    //Configuração - Retirar DIV Botões e colocar DIV Loading
                                    ajaxCrudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});
                                },
                                success: function (response) {
                                    //Lendo dados
                                    if (response.success) {
                                        //Enviar E-mail'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                        @if($ajaxPrefixPermissaoSubmodulo == 'users')
                                            email = $("#email").val();
                                            senha = response.content;
                                            $.get("enviar_email/users/primeiro_acesso/" + email + "/" + senha);
                                        @endif
                                        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                                        alertSwal('success', "{{$ajaxNameSubmodulo}}", response.success, 'true', 2000);

                                        //Limpar Formulario
                                        ajaxCrudLimparFormulario('{{$ajaxNameFormSubmodulo}}');

                                        //Configuração
                                        ajaxCrudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                                        //Table
                                        tableContent('{{$ajaxPrefixPermissaoSubmodulo}}');
                                    } else if (response.error_validation) {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        //Montar mensage de erro de Validação
                                        message = '<div class="pt-3">';
                                        $.each(response.error_validation, function (index, value) {
                                            message += '<div class="col-12 text-start font-size-12"><b>></b> ' + value + '</div>';
                                        });
                                        message += '</div>';

                                        alertSwal('warning', "Validação", message, 'true', 20000);
                                    } else if (response.error_permissao) {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                                    } else {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        alert('Erro interno');
                                    }
                                },
                                error: function (data) {
                                    //Configuração
                                    ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                    alert('Erro interno');
                                },
                                complete: function () {
                                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                                    ajaxCrudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
                                }
                            });
                        }

                        //Confirm Operacao - Edit
                        if ($('#frm_operacao').val() == 'edit') {
                        	$.ajax({
                                data: $('#{{$ajaxNameFormSubmodulo}}').serialize(),
                                url: "{{$ajaxPrefixPermissaoSubmodulo}}/"+$('#registro_id').val(),
                                type: "PUT",
                                dataType: "json",
                                beforeSend: function () {
                                    //Configuração - Retirar DIV Botões e colocar DIV Loading
                                    ajaxCrudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});
                                },
                                success: function (response) {
                                    //Lendo dados
                                    if (response.success) {
                                        alertSwal('success', "{{$ajaxNameSubmodulo}}", response.success, 'true', 2000);

                                        //Limpar Formulario
                                        ajaxCrudLimparFormulario('{{$ajaxNameFormSubmodulo}}');

                                        //Configuração
                                        ajaxCrudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});

                                        //Table
                                        tableContent('{{$ajaxPrefixPermissaoSubmodulo}}');
                                    } else if (response.error) {
                                        alertSwal('warning', "{{$ajaxNameSubmodulo}}", response.error, 'true', 10000);
                                    } else if (response.error_validation) {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        //Montar mensage de erro de Validação
                                        message = '<div class="pt-3">';
                                        $.each(response.error_validation, function (index, value) {
                                            message += '<div class="col-12 text-start font-size-12"><b>></b> ' + value + '</div>';
                                        });
                                        message += '</div>';

                                        alertSwal('warning', "Validação", message, 'true', 20000);
                                    } else if (response.error_not_found) {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
                                    } else if (response.error_permissao) {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                                    } else {
                                        //Configuração
                                        ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                        alert('Erro interno');
                                    }
                                },
                                error: function (data) {
                                    //Configuração
                                    ajaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                                    alert('Erro interno');
                                },
                                complete: function () {
                                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                                    ajaxCrudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
                                }
                            });
                        }
                    }
                });

                //Cancel Operacao
                $('.crudFormCancelOperacao').click(function (e) {
                    e.preventDefault();

                    //Configuração
                    ajaxCrudConfiguracao({p_fieldsDisabled:false, p_crudTable:'show', p_crudForm:'hide'});
                });

                //Configurações'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Select2
                if ($('select').hasClass('select2')) {
                    $(".select2").select2({dropdownParent: $('#crudForm')});
                }

                if ($('select').hasClass('select2-limiting')) {
                    $(".select2-limiting").select2({maximumSelectionLength:2, dropdownParent: $('#crudForm')});
                }

                if ($('select').hasClass('select2-search-disable')) {
                    $(".select2-search-disable").select2({minimumResultsForSearch:1/0, dropdownParent: $('#crudForm')});
                }
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Código para o Filter CRUD - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Código para o Filter CRUD - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $(".repeaterFilter").repeater({
                    defaultValues: {
                        'filter_crud_tipo_condicao': $('#filter-crud-filter_crud_tipo_condicao').val(),
                        'filter_crud_campo_pesquisar': $('#filter-crud-filter_crud_campo_pesquisar').val(),
                        'filter_crud_operacao_realizar': $('#filter-crud-filter_crud_operacao_realizar').val(),
                        'filter_crud_dado_pesquisar': ''
                    },
                    show: function() {
                        //repetir filtro com temporizador zero(0)
                        $(this).slideDown(0, function() {
                            //executar filtros
                            filter_crud_executar('show');
                        });
                    },
                    hide:function(removeElement) {
                        //Pegar quantidade de Itens/Filtros
                        var qtdItens = $('[data-repeater-item]').length;

                        //Não deixar excluir quando só tiver uma linha
                        if (qtdItens > 1) {
                            $(this).slideUp(function () {
                                //remover filtro
                                removeElement();

                                //executar filtros
                                filter_crud_executar('hide');
                            });
                        } else {
                            alert('Esse Filtro não pode ser excluído.');
                        }
                    }
                });

                //Filter
                $(document).on('click', '.filterRecords', function() {
                    filter_crud_executar();
                });

                //Retira a última linha adicionada caso a anterior esteja com o campo dado_pesquisar vazio
                function filter_crud_retirar_linha_adicionada() {
                    //Pegar quantidade de Itens/Filtros
                    var qtdItens = $('[data-repeater-item]').length;

                    //Verificar o ajuste necessário
                    var diminuirItens = 1;

                    //qtdItens ajustada
                    qtdItens = qtdItens - diminuirItens;

                    var ind = 0;
                    $('[data-repeater-item]').each(function () {
                        if (ind == qtdItens) {
                            $(this).remove();
                        }

                        ind++;
                    });
                }

                //Executar Filtros
                function filter_crud_executar(locale='') {
                    //Pegar quantidade de Itens/Filtros
                    var qtdItens = $('[data-repeater-item]').length;

                    //Verificar o ajuste necessário para mandar somente os filtros que já estavam renderizados
                    if (locale == '') {var diminuirItens = 1;}
                    if (locale == 'show') {var diminuirItens = 2;}
                    if (locale == 'hide') {var diminuirItens = 1;}

                    //qtdItens ajustada
                    qtdItens = qtdItens - diminuirItens;

                    //Arrays
                    const array_dados = [];

                    //Varrer filtros para montar array de dados
                    for(i=0; i<=qtdItens; i++) {
                        var tipo_condicao = $("select[name='field["+i+"][filter_crud_tipo_condicao]']").val();
                        var campo_pesquisar = $("select[name='field["+i+"][filter_crud_campo_pesquisar]']").val();
                        var operacao_realizar = $("select[name='field["+i+"][filter_crud_operacao_realizar]']").val();
                        var dado_pesquisar = $("input[name='field["+i+"][filter_crud_dado_pesquisar]']").val();

                        if (dado_pesquisar == '') {
                            if (locale != 'hide') {
                                alert('Digite algo para pesquisar no filtro ' + (i + 1));

                                if (locale == 'show') {
                                    filter_crud_retirar_linha_adicionada();
                                }
                            }

                            return false;
                        }

                        //Populando array_dados
                        array_dados.push(tipo_condicao);
                        array_dados.push(campo_pesquisar);
                        array_dados.push(operacao_realizar);
                        array_dados.push(dado_pesquisar);
                    }

                    //Table
                    tableContent('{{$ajaxPrefixPermissaoSubmodulo}}/filter/'+array_dados);
                }
                //Código para o Filter CRUD - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //Código para o Filter CRUD - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            });
        </script>
    @endif
@endif
