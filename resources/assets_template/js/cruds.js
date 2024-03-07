document.addEventListener("DOMContentLoaded", function(event) {
    if (document.getElementById('crudPrefixPermissaoSubmodulo')) {
        //Variáveis
        var prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;

        if (typeof prefixPermissaoSubmodulo !== "undefined" && prefixPermissaoSubmodulo != '') {
            if (prefixPermissaoSubmodulo != 'dashboards' && prefixPermissaoSubmodulo != 'logos' && prefixPermissaoSubmodulo != 'ressarcimento_cobrancas' && prefixPermissaoSubmodulo != 'relatorios' && prefixPermissaoSubmodulo != 'ressarcimento_relatorios' && prefixPermissaoSubmodulo != 'ressarcimento_dashboards') {
                //Header
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                //Table
                crudTable(prefixPermissaoSubmodulo);

                //Configurações Gerais
                // //Select2
                // if ($('select').hasClass('select2')) {$('.select2').select2({dropdownParent: $('#crudForm')});}
                // if ($('select').hasClass('select2-limiting')) {$('.select2-limiting').select2({maximumSelectionLength:2, dropdownParent: $('#crudForm')});}
                // if ($('select').hasClass('select2-search-disable')) {$('.select2-search-disable').select2({minimumResultsForSearch:1/0, dropdownParent: $('#crudForm')});}
            }
        }
    }
});



// document.addEventListener("DOMContentLoaded", function(event) {
//     //Variáveis
//     let prefixPermissaoSubmodulo = $('#crudPrefixPermissaoSubmodulo').val();
//     let nameSubmodulo = $('#crudNameSubmodulo').val();
//     let nameFormSubmodulo = $('#crudNameFormSubmodulo').val();
//
//     if (typeof prefixPermissaoSubmodulo !== "undefined" && prefixPermissaoSubmodulo != '') {
//         if (prefixPermissaoSubmodulo != 'dashboards' && prefixPermissaoSubmodulo != 'logos' && prefixPermissaoSubmodulo != 'ressarcimento_cobrancas' && prefixPermissaoSubmodulo != 'relatorios' && prefixPermissaoSubmodulo != 'ressarcimento_relatorios' && prefixPermissaoSubmodulo != 'ressarcimento_dashboards') {
//             //Header
//             $.ajaxSetup({
//                 headers:{
//                     'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
//                 }
//             });
//
//             //Table
//             crudTable(prefixPermissaoSubmodulo);
//
//             //Create
//             $('#crudIncluirRegistro').click(function () {
//                 //Passar pelo evento create do controller
//                 $.get(prefixPermissaoSubmodulo+'/create', function (data) {
//                     //Lendo dados
//                     if (data.success) {
//                         //Configuração
//                         crudConfiguracao({p_frm_operacao:'create', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});
//
//                         //Limpar Formulario
//                         crudLimparFormulario(nameFormSubmodulo);
//
//                         //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                         if (prefixPermissaoSubmodulo == 'notificacoes') {
//                             $('.fieldsViewEdit').hide();
//                             $('.fieldsCreate').show();
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'grupos') {
//                             $('.markUnmarkAll').show();
//
//                             //Desabilitar/Habilitar opções de Show
//                             $('.tdShow').hide();
//
//                             //Desabilitar/Habilitar opções de Create/Edit
//                             $('.tdCreateEdit').show();
//
//                             //Dashboards - desmarcar checkbox
//                             $('.grupo_dashboards').attr('checked', false);
//
//                             //Relatorios - desmarcar checkbox
//                             $('.grupo_relatorios').attr('checked', false);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ferramentas') {
//                             //Esconder botão buscar icones
//                             $('#buscarIcones').show();
//
//                             $('#iconView').removeClass();
//
//                             $('.fieldsViewEdit').hide();
//                             $('.fieldsCreate').show();
//                         }
//                         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                     } else if (data.error_permissao) {
//                         alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                     } else {
//                         alert('Erro interno');
//                     }
//                 });
//             });
//
//             //View
//             $('body').on('click', '.crudVisualizarRegistro', function () {
//                 //Campo hidden registro_id
//                 $('#registro_id').val($(this).data('id'));
//
//                 //Buscar dados do Registro
//                 $.get(prefixPermissaoSubmodulo+'/'+$('#registro_id').val(), function (data) {
//                     //Lendo dados
//                     if (data.success) {
//                         //Configuração
//                         crudConfiguracao({p_frm_operacao:'view', p_fieldsDisabled:true, p_crudFormButtons1:'hide', p_crudFormButtons2:'show', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});
//
//                         //Limpar Formulario
//                         crudLimparFormulario(nameFormSubmodulo);
//
//                         //preencher formulário
//                         let input = $('#crudFieldsFormSubmodulo').val();
//                         let crudFieldsFormSubmodulo = input.split(',');
//                         crudFieldsFormSubmodulo.forEach(function (field) {
//                             crudPreencherFormulario(field, data.success);
//                         });
//
//                         //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                         if (prefixPermissaoSubmodulo == 'notificacoes') {
//                             $('.fieldsViewEdit').show();
//                             $('.fieldsCreate').hide();
//
//                             $('#fieldDate').val(data.success['date']);
//                             $('#fieldTime').val(data.success['time']);
//                             $('#fieldUserName').val(data.success['userName']);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'grupos') {
//                             $('.markUnmarkAll').hide();
//
//                             //Desabilitar/Habilitar opções de Show
//                             $.each(data.success, function (i, item) {
//                                 $('.show_' + i).show();
//                             });
//
//                             //Desabilitar/Habilitar opções de Create/Edit
//                             $('.tdCreateEdit').hide();
//
//                             //Dashboards
//                             //desmarcar checkbox
//                             $('.grupo_dashboards').attr('checked', false);
//
//                             var dashboards = data.success['dashboards'];
//
//                             $.each(dashboards, function (i, item) {
//                                 //marcar como checado
//                                 $('#dashboard_' + item.dashboard_id).attr('checked', true);
//                             });
//
//                             //Relatorios
//                             //desmarcar checkbox
//                             $('.grupo_relatorios').attr('checked', false);
//
//                             var relatorios = data.success['relatorios'];
//
//                             $.each(relatorios, function (i, item) {
//                                 //marcar como checado
//                                 $('#relatorio_' + item.relatorio_id).attr('checked', true);
//                             });
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ferramentas') {
//                             //Esconder botão buscar icones
//                             $('#buscarIcones').hide();
//
//                             $('#iconView').removeClass();
//                             $('#iconView').addClass(data.success['icon']);
//
//                             $('.fieldsViewEdit').show();
//                             $('.fieldsCreate').hide();
//                             $('#fieldUserName').val(data.success['userName']);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_militares') {
//                             $('#referencia').val(getReferencia(1, $('#referencia').val()));
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_configuracoes') {
//                             $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_referencias') {
//                             $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
//                         }
//                         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                     } else if (data.error_not_found) {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
//                     } else if (data.error_permissao) {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                     } else {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alert('Erro interno');
//                     }
//                 });
//             });
//
//             //Edit
//             $('body').on('click', '.crudAlterarRegistro', function () {
//                 //Campo hidden registro_id
//                 if ($(this).data('id') != 0) {
//                     $('#registro_id').val($(this).data('id'));
//                 }
//
//                 //Buscar dados do Registro
//                 $.get(prefixPermissaoSubmodulo+'/'+$('#registro_id').val()+"/edit", function (data) {
//                     //Lendo dados
//                     if (data.success) {
//                         //Configuração
//                         crudConfiguracao({p_frm_operacao:'edit', p_fieldsDisabled:false, p_crudFormButtons1:'show', p_crudFormButtons2:'hide', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});
//
//                         //Limpar Formulario
//                         crudLimparFormulario(nameFormSubmodulo);
//
//                         //preencher formulário
//                         let input = $('#crudFieldsFormSubmodulo').val();
//                         let crudFieldsFormSubmodulo = input.split(',');
//                         crudFieldsFormSubmodulo.forEach(function (field) {
//                             crudPreencherFormulario(field, data.success);
//                         });
//
//                         //Settings Submódulos'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                         if (prefixPermissaoSubmodulo == 'notificacoes') {
//                             $('.fieldsViewEdit').show();
//                             $('.fieldsCreate').hide();
//
//                             $('#fieldDate').val(data.success['date']);
//                             $('#fieldTime').val(data.success['time']);
//                             $('#fieldUserName').val(data.success['userName']);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'grupos') {
//                             $('.markUnmarkAll').show();
//
//                             //Desabilitar/Habilitar opções de Show
//                             $('.tdShow').hide();
//
//                             //Desabilitar/Habilitar opções de Create/Edit
//                             $('.tdCreateEdit').show();
//
//                             $.each(data.success, function (i, item) {
//                                 $('.create_edit_' + i).prop('checked', true);
//                             });
//
//                             //Dashboards
//                             //desmarcar checkbox
//                             $('.grupo_dashboards').attr('checked', false);
//
//                             var dashboards = data.success['dashboards'];
//
//                             $.each(dashboards, function (i, item) {
//                                 //marcar como checado
//                                 $('#dashboard_' + item.dashboard_id).attr('checked', true);
//                             });
//
//                             //Relatorios
//                             //desmarcar checkbox
//                             $('.grupo_relatorios').attr('checked', false);
//
//                             var relatorios = data.success['relatorios'];
//
//                             $.each(relatorios, function (i, item) {
//                                 //marcar como checado
//                                 $('#relatorio_' + item.relatorio_id).attr('checked', true);
//                             });
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'users') {
//                             $('#email').prop('readonly', true);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ferramentas') {
//                             //Esconder botão buscar icones
//                             $('#buscarIcones').show();
//
//                             $('#iconView').removeClass();
//                             $('#iconView').addClass(data.success['icon']);
//
//                             $('.fieldsViewEdit').show();
//                             $('.fieldsCreate').hide();
//                             $('#fieldUserName').val(data.success['userName']);
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_militares') {
//                             $('#referencia').val(getReferencia(1, $('#referencia').val()));
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_configuracoes') {
//                             $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
//                         }
//
//                         if (prefixPermissaoSubmodulo == 'ressarcimento_referencias') {
//                             $('#referencia_extenso').val(getReferencia(1, $('#referencia').val()));
//                         }
//                         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                     } else if (data.error_not_found) {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
//                     } else if (data.error_permissao) {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                     } else {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                         alert('Erro interno');
//                     }
//                 });
//             });
//
//             //Delete
//             $('body').on('click', '.crudExcluirRegistro', function () {
//                 //Campo hidden registro_id
//                 if ($(this).data('id') != 0) {
//                     $('#registro_id').val($(this).data('id'));
//                 }
//
//                 //Confirmação de Delete
//                 alertSwalConfirmacao(function (confirmed) {
//                     if (confirmed) {
//                         $.ajax({
//                             type: "DELETE",
//                             url: prefixPermissaoSubmodulo+'/'+$('#registro_id').val(),
//                             beforeSend: function () {
//                                 //Configuração - Retirar DIV Botões e colocar DIV Loading
//                                 crudConfiguracao({p_crudFormButtons2:'hide', p_crudFormAjaxLoading:'show'});
//                             },
//                             success: function (response) {
//                                 //Lendo dados
//                                 if (response.success) {
//                                     alertSwal('success', nameSubmodulo, response.success, 'true', 2000);
//
//                                     //Configuração
//                                     crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});
//
//                                     //Table
//                                     crudTable(prefixPermissaoSubmodulo);
//                                 } else if (response.error) {
//                                     alertSwal('error', nameSubmodulo, response.error, 'true', 2000);
//
//                                     //Configuração
//                                     crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});
//
//                                     //Table
//                                     crudTable(prefixPermissaoSubmodulo);
//                                 } else if (response.error_permissao) {
//                                     alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                                 } else {
//                                     alert('Erro interno');
//                                 }
//                             },
//                             error: function (data) {
//                                 alert('Erro interno');
//                             },
//                             complete: function () {
//                                 //Configuração - Retirar DIV Loading e colocar DIV Botões
//                                 crudConfiguracao({p_crudFormButtons2:'show', p_crudFormAjaxLoading:'hide'});
//                             }
//                         });
//                     }
//                 });
//             });
//
//             //Confirm Operacao
//             $('#crudConfirmarOperacao').click(function (e) {
//                 e.preventDefault();
//
//                 //Verificar Validação feita com sucesso
//                 if ($('#'+nameFormSubmodulo).valid()) {
//                     var executar = 1;
//
//                     //Validação CNPJ e UG'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                     if (prefixPermissaoSubmodulo == 'ressarcimento_orgaos') {
//                         if ($('#cnpj').val() == '' && $('#ug').val() == '') {
//                             alertSwal('warning', 'Validação', 'Digite CNPJ e/ou UG ', 'true', 20000);
//                             executar = 0;
//                             return false;
//                         }
//                     }
//                     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//                     if (executar == 1) {
//                         //Configuração
//                         crudConfiguracao({p_removeMask:true});
//
//                         //Confirm Operacao - Create
//                         if ($('#frm_operacao').val() == 'create') {
//                             $.ajax({
//                                 data: $('#'+nameFormSubmodulo).serialize(),
//                                 url: prefixPermissaoSubmodulo,
//                                 type: "POST",
//                                 dataType: "json",
//                                 beforeSend: function () {
//                                     //Configuração - Retirar DIV Botões e colocar DIV Loading
//                                     crudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});
//                                 },
//                                 success: function (response) {
//                                     //Lendo dados
//                                     if (response.success) {
//                                         //Enviar E-mail'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                                         if (prefixPermissaoSubmodulo == 'users') {
//                                             email = $("#email").val();
//                                             senha = response.content;
//                                             senha = senha.substring(4, 14);
//                                             $.get('enviar_email/users/primeiro_acesso/' + email + '/' + senha);
//                                         }
//                                         //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//                                         alertSwal('success', nameSubmodulo, response.success, 'true', 2000);
//
//                                         //Configuração
//                                         crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});
//
//                                         //Limpar Formulario
//                                         crudLimparFormulario(nameFormSubmodulo);
//
//                                         //Table
//                                         crudTable(prefixPermissaoSubmodulo);
//                                     } else if (response.error_validation) {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         //Montar mensage de erro de Validação
//                                         message = '<div class="pt-3">';
//                                         $.each(response.error_validation, function (index, value) {
//                                             message += '<div class="col-12 text-start font-size-12"><b>></b> ' + value + '</div>';
//                                         });
//                                         message += '</div>';
//
//                                         alertSwal('warning', "Validação", message, 'true', 20000);
//                                     } else if (response.error_permissao) {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                                     } else if (response.error) {
//                                         alertSwal('warning', nameSubmodulo, response.error, 'true', 20000);
//                                     } else {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         alert('Erro interno');
//                                     }
//                                 },
//                                 error: function (data) {
//                                     //Configuração
//                                     crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                     alert('Erro interno');
//                                 },
//                                 complete: function () {
//                                     //Configuração - Retirar DIV Loading e colocar DIV Botões
//                                     crudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
//                                 }
//                             });
//                         }
//
//                         //Confirm Operacao - Edit
//                         if ($('#frm_operacao').val() == 'edit') {
//                             $.ajax({
//                                 data: $('#'+nameFormSubmodulo).serialize(),
//                                 url: prefixPermissaoSubmodulo+'/'+$('#registro_id').val(),
//                                 type: "PUT",
//                                 dataType: "json",
//                                 beforeSend: function () {
//                                     //Configuração - Retirar DIV Botões e colocar DIV Loading
//                                     crudConfiguracao({p_crudFormButtons1:'hide', p_crudFormAjaxLoading:'show'});
//                                 },
//                                 success: function (response) {
//                                     //Lendo dados
//                                     if (response.success) {
//                                         alertSwal('success', nameSubmodulo, response.success, 'true', 2000);
//
//                                         //Limpar Formulario
//                                         crudLimparFormulario(nameFormSubmodulo);
//
//                                         //Configuração
//                                         crudConfiguracao({p_crudTable:'show', p_crudForm:'hide'});
//
//                                         //Table
//                                         crudTable(prefixPermissaoSubmodulo);
//                                     } else if (response.error_validation) {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         //Montar mensage de erro de Validação
//                                         message = '<div class="pt-3">';
//                                         $.each(response.error_validation, function (index, value) {
//                                             message += '<div class="col-12 text-start font-size-12"><b>></b> ' + value + '</div>';
//                                         });
//                                         message += '</div>';
//
//                                         alertSwal('warning', "Validação", message, 'true', 20000);
//                                     } else if (response.error_not_found) {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
//                                     } else if (response.error_permissao) {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         alertSwal('warning', "Permissão Negada", '', 'true', 2000);
//                                     } else if (response.error) {
//                                         alertSwal('warning', nameSubmodulo, response.error, 'true', 20000);
//                                     } else {
//                                         //Configuração
//                                         crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                         alert('Erro interno');
//                                     }
//                                 },
//                                 error: function (data) {
//                                     //Configuração
//                                     crudConfiguracao({p_removeMask:true, p_putMask:true});
//
//                                     alert('Erro interno');
//                                 },
//                                 complete: function () {
//                                     //Configuração - Retirar DIV Loading e colocar DIV Botões
//                                     crudConfiguracao({p_crudFormButtons1:'show', p_crudFormAjaxLoading:'hide'});
//                                 }
//                             });
//                         }
//                     }
//                 }
//             });
//
//             //Cancel Operacao
//             $('.crudCancelarOperacao').click(function (e) {
//                 e.preventDefault();
//
//                 //Configuração
//                 crudConfiguracao({p_fieldsDisabled:false, p_crudTable:'show', p_crudForm:'hide'});
//             });
//
//             //Filter Repeater
//             $(".crudFiltrarRegistros").repeater({
//                 defaultValues: {
//                     'filter_crud_tipo_condicao': $('#filter-crud-filter_crud_tipo_condicao').val(),
//                     'filter_crud_campo_pesquisar': $('#filter-crud-filter_crud_campo_pesquisar').val(),
//                     'filter_crud_operacao_realizar': $('#filter-crud-filter_crud_operacao_realizar').val(),
//                     'filter_crud_dado_pesquisar': ''
//                 },
//                 show: function() {
//                     //repetir filtro com temporizador zero(0)
//                     $(this).slideDown(0, function() {
//                         //executar filtros
//                         crudFilterExecutar('show', prefixPermissaoSubmodulo);
//                     });
//                 },
//                 hide:function(removeElement) {
//                     //Pegar quantidade de Itens/Filtros
//                     var qtdItens = $('[data-repeater-item]').length;
//
//                     //Não deixar excluir quando só tiver uma linha
//                     if (qtdItens > 1) {
//                         $(this).slideUp(function () {
//                             //remover filtro
//                             removeElement();
//
//                             //executar filtros
//                             crudFilterExecutar('hide', prefixPermissaoSubmodulo);
//                         });
//                     } else {
//                         alert('Esse Filtro não pode ser excluído.');
//                     }
//                 }
//             });
//
//             //Filter
//             $(document).on('click', '.filterRecords', function() {
//                 crudFilterExecutar('', prefixPermissaoSubmodulo);
//             });
//
//             //Configurações Gerais
//             //Select2
//             if ($('select').hasClass('select2')) {$(".select2").select2({dropdownParent: $('#crudForm')});}
//             if ($('select').hasClass('select2-limiting')) {$(".select2-limiting").select2({maximumSelectionLength:2, dropdownParent: $('#crudForm')});}
//             if ($('select').hasClass('select2-search-disable')) {$(".select2-search-disable").select2({minimumResultsForSearch:1/0, dropdownParent: $('#crudForm')});}
//         }
//     }
// });
