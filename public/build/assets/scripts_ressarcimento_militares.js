$(document).ready(function () {
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

    //Validação
    if ($('#frm_importar_ressarcimento_militar').length) {
        $('#frm_importar_ressarcimento_militar').validate({
            rules: {
                ressarcimento_militar_referencia: {
                    required: true
                },
                ressarcimento_militar_file: {
                    required: true
                }
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    }

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
