function validar_frm_importar_ressarcimento_militar() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: ressarcimento_militar_referencia (requerido)
    if (validacao({op:1, value:document.getElementById('ressarcimento_militar_referencia').value}) === false) {
        validacao_ok = false;
        mensagem += 'Referência requerido.'+'<br>';
    }

    //Campo: ressarcimento_militar_file (requerido)
    if (validacao({op:1, value:document.getElementById('ressarcimento_militar_file').value}) === false) {
        validacao_ok = false;
        mensagem += 'Arquivo requerido.'+'<br>';
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}

document.addEventListener("DOMContentLoaded", function(event) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Importar Militares''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Botão Modal Importar Militares
    $('#btnModalImportarMilitar').click(function () {
        //Limpar validações
        $('.is-invalid').removeClass('is-invalid');

        //Limpar Formulário
        $('#frm_importar_ressarcimento_militar').trigger('reset');

        //Campos do Formulário - disabled true/false
        $('input').prop('disabled', false);
        $('select').prop('disabled', false);
        $('.select2').prop('disabled', false);

        //Abrir Modal
        $('.modal-importar-militares').modal('show');
    });

    //Botao Confirmar Importação
    $('#btnConfirmarImportacaoMilitar').click(function (e) {
        e.preventDefault();

        //Verificar Validação feita com sucesso
        if ($('#frm_importar_ressarcimento_militar').valid()) {
            $('#frm_importar_ressarcimento_militar').submit();
        }
    });

    //Submit
    $('#frm_importar_ressarcimento_militar').submit(function(e) {
        e.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: url+'ressarcimento_militares/importar',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                //Colocar Processando...
                $('#modal-importar-militares-footer-1').hide();
                $('#modal-importar-militares-footer-2').show();
            },
            success: function (response) {



                if (response.eduardo) {
                    alert(response.eduardo);
                }




                if (response.success) {
                    //Registros importados
                    var registros_importados = '<div class="col-12 text-success">Registros Importados: '+response.success.registros_importados+'</div>'

                    //Registros importados anteriormente
                    var registros_importados_anteriormente = '';
                    var registros_importados_anteriormente_qtd = 0;

                    response.success.registros_importados_anteriormente.forEach(function (item) {
                        registros_importados_anteriormente += '<div class="col-12 font-size-10">'+item+'</div>';
                        registros_importados_anteriormente_qtd++;
                    });

                    if (registros_importados_anteriormente != '') {registros_importados_anteriormente = '<div class="col-12 text-primary">Registros Importados anteriormente: '+registros_importados_anteriormente_qtd+'</div>'+registros_importados_anteriormente;}

                    //Registros com erros na importação
                    var registros_erros = '';
                    var registros_erros_qtd = '';

                    response.success.registros_erros.forEach(function (item) {
                        registros_erros += '<div class="col-12 font-size-10">'+item+'</div>';
                        registros_erros_qtd++;
                    });

                    if (registros_erros != '') {registros_erros = '<div class="col-12 text-danger">Registros com Erro: '+registros_erros_qtd+'</div>'+registros_erros;}

                    //Planilha errada
                    var planilha_error = '';
                    var planilha_error_qtd = '';

                    response.success.planilha_error.forEach(function (item) {
                        planilha_error += '<div class="col-12 font-size-10">'+item+'</div>';
                        planilha_error_qtd++;
                    });

                    if (planilha_error != '') {planilha_error = '<div class="col-12 text-danger">Planilha com Erro: '+planilha_error_qtd+'</div>'+planilha_error;}

                    //Mensagem
                    alertSwal('success', 'Ressarcimento Militares - Importação', registros_importados+registros_importados_anteriormente+registros_erros+planilha_error, 'true', 50000);
                }

                if (response.error) {
                    alert(response.error);

                    //Retirar Processando...
                    $('#modal-importar-militares-footer-1').show();
                    $('#modal-importar-militares-footer-2').hide();
                }
            },
            error: function(response){
                alert(response);
            },
            complete: function () {
                //Retirar Processando...
                $('#modal-importar-militares-footer-1').show();
                $('#modal-importar-militares-footer-2').hide();
            }
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
});
