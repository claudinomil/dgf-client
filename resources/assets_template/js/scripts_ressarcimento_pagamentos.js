$(document).ready(function () {
    if ($('#frm_ressarcimento_pagamentos').length) {
        $('#frm_ressarcimento_pagamentos').validate({
            rules: {
                referencia: {
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

    //Importar Pagamento''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Botão Modal Importar Pagamento
    $('#btnModalImportarPagamento').click(function () {
        //Limpar validações
        $('.is-invalid').removeClass('is-invalid');

        //Limpar Formulário
        $('#frm_importar_ressarcimento_pagamento').trigger('reset');

        //Campos do Formulário - disabled true/false
        $('input').prop('disabled', false);
        $('select').prop('disabled', false);
        $('.select2').prop('disabled', false);

        //Abrir Modal
        $('.modal-importar-pagamento').modal('show');
    });

    //Validação
    if ($('#frm_importar_ressarcimento_pagamento').length) {
        $('#frm_importar_ressarcimento_pagamento').validate({
            rules: {
                ressarcimento_pagamento_referencia: {
                    required: true
                },
                ressarcimento_pagamento_file: {
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
    $('#btnConfirmarImportacaoPagamento').click(function (e) {
        e.preventDefault();

        //Verificar Validação feita com sucesso
        if ($('#frm_importar_ressarcimento_pagamento').valid()) {
            $('#frm_importar_ressarcimento_pagamento').submit();
        }
    });

    //Submit
    $('#frm_importar_ressarcimento_pagamento').submit(function(e) {
        e.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: '/ressarcimento_pagamentos/importar/dados',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                //Colocar Processando...
                $('#modal-importar-pagamento-footer-1').hide();
                $('#modal-importar-pagamento-footer-2').show();
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

                    //Referência Militares Existe
                    var referencia_militares_existe = '';
                    var referencia_militares_existe_qtd = '';

                    if (response.success.referencia_militares_existe === false) {
                        referencia_militares_existe += '<div class="col-12 font-size-10">'+'Não existe Militares para essa Referência.'+'</div>';
                        referencia_militares_existe_qtd++;
                    }

                    if (referencia_militares_existe != '') {referencia_militares_existe = '<div class="col-12 text-warning">Referência com Erro: '+referencia_militares_existe_qtd+'</div>'+referencia_militares_existe;}

                    //Mensagem
                    alertSwal('success', 'Ressarcimento Pagamento - Importação', registros_importados+registros_importados_anteriormente+registros_erros+planilha_error+referencia_militares_existe, 'true', 50000);
                }

                if (response.error) {
                    alert(response.error);

                    //Retirar Processando...
                    $('#modal-importar-pagamento-footer-1').show();
                    $('#modal-importar-pagamento-footer-2').hide();
                }
            },
            error: function(response){
                alert(response);
            },
            complete: function () {
                //Retirar Processando...
                $('#modal-importar-pagamento-footer-1').show();
                $('#modal-importar-pagamento-footer-2').hide();
            }
        });
    });
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    $('.valores_principais').keyup(function () {
        var bruto = moeda2float($('#bruto').val());
        var fundo_saude = moeda2float($('#fundo_saude').val());
        var auxilio_transporte = moeda2float($('#auxilio_transporte').val());
        var rioprevidencia22 = moeda2float($('#rioprevidencia22').val());
        var etapa_ferias = moeda2float($('#etapa_ferias').val());
        var etapa_destacado = moeda2float($('#etapa_destacado').val());
        var abono_permanencia = moeda2float($('#abono_permanencia').val());

        var fonte10 = etapa_ferias + etapa_destacado;
        bruto = bruto - fonte10;
        var folha_suplementar = 0;
        var valor_total = bruto + fundo_saude + rioprevidencia22 + fonte10 + folha_suplementar;

        $('#bruto').val(float2moeda(bruto));
        $('#valores_principais_total').val(float2moeda(valor_total));
    });
});
