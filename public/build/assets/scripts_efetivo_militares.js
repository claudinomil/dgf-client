$(document).ready(function () {
    //Table
    crudAjaxTable('efetivo_militares', '', 10);

    //Fields Form
    //let fieldsForm = ['id', 'rg', 'identidade_funcional', 'vinculo', 'nome', 'nome_guerra', 'situacao', 'boletim_situacao', 'quadro', 'boletim_quadro', 'graduacao', 'boletim_graduacao', 'data_ingresso', 'boletim_ingresso', 'unidade', 'boletim_movimentacao', 'unidade_prestando_servico', 'boletim_prestando_servico', 'data_nascimento', 'estado_civil', 'comportamento', 'sexo', 'tipo_sanguineo', 'fator_rh', 'nacionalidade', 'naturalidade', 'banco', 'agencia', 'conta_corrente', 'cpf', 'pasep', 'titulo_eleitoral', 'titulo_eleitoral_zona', 'titulo_eleitoral_secao', 'pai', 'mae'];

    //View
    $('body').on('click', '.viewRecord', function () {
        //Campo hidden registro_id
        $('#registro_id').val($(this).data('id'));

        //Buscar dados do Registro
        $.get('efetivo_militares/'+$('#registro_id').val(), function (data) {
            //Limpar Formulario
            crudAjaxLimparFormulario('frm_efetivo_militares');

            //Lendo dados
            if (data.success) {
                //preencher formulário
                let crudAjaxFieldsForm = $('#crudAjaxFieldsForm').val();
                let camposForm = crudAjaxFieldsForm.split(',');
                camposForm.forEach(function (field) {
                    crudAjaxPreencherFormulario(field, data.success);
                });

                //Configuração
                crudAjaxConfiguracao({p_frm_operacao:'view', p_fieldsDisabled:true, p_crudFormButtons1:'hide', p_crudFormButtons2:'show', p_crudTable:'hide', p_crudForm:'show', p_removeMask:true, p_putMask:true});
            } else if (data.error_not_found) {
                //Configuração
                crudAjaxCrudConfiguracao({p_removeMask:true, p_putMask:true});

                alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
            } else if (data.error) {
                //Configuração
                crudAjaxConfiguracao({p_removeMask:true, p_putMask:true});

                alertSwal('warning', "Erro", data.error, 'true', 2000);
            } else {
                //Configuração
                crudAjaxConfiguracao({p_removeMask:true, p_putMask:true});

                alert('Erro interno');
            }
        });
    });

    //Cancel Operacao
    $('.crudFormCancelOperacao').click(function (e) {
        e.preventDefault();

        //Configuração
        crudAjaxConfiguracao({p_fieldsDisabled:false, p_crudTable:'show', p_crudForm:'hide'});
    });

    //Filter
    $(document).on('click', '.filterRecords', function() {
        crudAjaxFilterExecutar();
    });
});
