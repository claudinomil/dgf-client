function validar_frm_ressarcimento_pagamentos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: identidade_funcional (requerido)
    if (validacao({op:1, value:document.getElementById('identidade_funcional').value}) === false) {
        validacao_ok = false;
        mensagem += 'Identidade Funcional é requerido.'+'<br>';
    }

    //Campo: vinculo (requerido)
    if (validacao({op:1, value:document.getElementById('vinculo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Vínculo é requerido.'+'<br>';
    }

    //Campo: rg (requerido)
    if (validacao({op:1, value:document.getElementById('rg').value}) === false) {
        validacao_ok = false;
        mensagem += 'RG é requerido.'+'<br>';
    }

    //Campo: codigo_cargo (requerido)
    if (validacao({op:1, value:document.getElementById('codigo_cargo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Código Cargo é requerido.'+'<br>';
    }

    //Campo: nome_cargo (requerido)
    if (validacao({op:1, value:document.getElementById('nome_cargo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome Cargo é requerido.'+'<br>';
    }

    //Campo: posto_graduacao (requerido)
    if (validacao({op:1, value:document.getElementById('posto_graduacao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Posto/Graduação é requerido.'+'<br>';
    }

    //Campo: nome (requerido)
    if (validacao({op:1, value:document.getElementById('nome').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome é requerido.'+'<br>';
    }

    //Campo: situacao_pagamento (requerido)
    if (validacao({op:1, value:document.getElementById('situacao_pagamento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Situação Pagamento é requerido.'+'<br>';
    }

    //Campo: data_ingresso (requerido)
    if (validacao({op:1, value:document.getElementById('data_ingresso').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Ingresso é requerido.'+'<br>';
    }

    //Campo: data_nascimento (requerido)
    if (validacao({op:1, value:document.getElementById('data_nascimento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Data Nascimento é requerido.'+'<br>';
    }

    //Campo: genero (requerido)
    if (validacao({op:1, value:document.getElementById('genero').value}) === false) {
        validacao_ok = false;
        mensagem += 'Gênero é requerido.'+'<br>';
    }

    //Campo: codigo_ua (requerido)
    if (validacao({op:1, value:document.getElementById('codigo_ua').value}) === false) {
        validacao_ok = false;
        mensagem += 'Código UA é requerido.'+'<br>';
    }

    //Campo: ua (requerido)
    if (validacao({op:1, value:document.getElementById('ua').value}) === false) {
        validacao_ok = false;
        mensagem += 'UA é requerido.'+'<br>';
    }

    //Campo: cpf (requerido)
    if (validacao({op:1, value:document.getElementById('cpf').value}) === false) {
        validacao_ok = false;
        mensagem += 'CPF é requerido.'+'<br>';
    }

    //Campo: pasep (requerido)
    if (validacao({op:1, value:document.getElementById('pasep').value}) === false) {
        validacao_ok = false;
        mensagem += 'PASEP é requerido.'+'<br>';
    }

    //Campo: banco (requerido)
    if (validacao({op:1, value:document.getElementById('banco').value}) === false) {
        validacao_ok = false;
        mensagem += 'Banco é requerido.'+'<br>';
    }

    //Campo: agencia (requerido)
    if (validacao({op:1, value:document.getElementById('agencia').value}) === false) {
        validacao_ok = false;
        mensagem += 'Agência é requerido.'+'<br>';
    }

    //Campo: conta_corrente (requerido)
    if (validacao({op:1, value:document.getElementById('conta_corrente').value}) === false) {
        validacao_ok = false;
        mensagem += 'Conta Corrente é requerido.'+'<br>';
    }

    //Campo: numero_dependentes (requerido)
    if (validacao({op:1, value:document.getElementById('numero_dependentes').value}) === false) {
        validacao_ok = false;
        mensagem += 'Número Dependentes é requerido.'+'<br>';
    }

    //Campo: ir_dependente (requerido)
    if (validacao({op:1, value:document.getElementById('ir_dependente').value}) === false) {
        validacao_ok = false;
        mensagem += 'IR Dependente é requerido.'+'<br>';
    }

    //Campo: cotista (requerido)
    if (validacao({op:1, value:document.getElementById('cotista').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cotista é requerido.'+'<br>';
    }

    //Campo: bruto (requerido)
    if (validacao({op:1, value:document.getElementById('bruto').value}) === false) {
        validacao_ok = false;
        mensagem += 'Bruto é requerido.'+'<br>';
    }

    //Campo: desconto (requerido)
    if (validacao({op:1, value:document.getElementById('desconto').value}) === false) {
        validacao_ok = false;
        mensagem += 'Desconto é requerido.'+'<br>';
    }

    //Campo: liquido (requerido)
    if (validacao({op:1, value:document.getElementById('liquido').value}) === false) {
        validacao_ok = false;
        mensagem += 'Líquido é requerido.'+'<br>';
    }

    //Campo: soldo (requerido)
    if (validacao({op:1, value:document.getElementById('soldo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Soldo é requerido.'+'<br>';
    }

    //Campo: hospital10 (requerido)
    if (validacao({op:1, value:document.getElementById('hospital10').value}) === false) {
        validacao_ok = false;
        mensagem += 'Hospital 10 é requerido.'+'<br>';
    }

    //Campo: rioprevidencia22 (requerido)
    if (validacao({op:1, value:document.getElementById('rioprevidencia22').value}) === false) {
        validacao_ok = false;
        mensagem += 'Rioprevidência 22 é requerido.'+'<br>';
    }

    //Campo: etapa_ferias (requerido)
    if (validacao({op:1, value:document.getElementById('etapa_ferias').value}) === false) {
        validacao_ok = false;
        mensagem += 'Etapa Férias é requerido.'+'<br>';
    }

    //Campo: etapa_destacado (requerido)
    if (validacao({op:1, value:document.getElementById('etapa_destacado').value}) === false) {
        validacao_ok = false;
        mensagem += 'Etapa Destacado é requerido.'+'<br>';
    }

    //Campo: ajuda_fardamento (requerido)
    if (validacao({op:1, value:document.getElementById('ajuda_fardamento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ajuda Fardamento é requerido.'+'<br>';
    }

    //Campo: habilitacao_profissional (requerido)
    if (validacao({op:1, value:document.getElementById('habilitacao_profissional').value}) === false) {
        validacao_ok = false;
        mensagem += 'Habilitação Profissional é requerido.'+'<br>';
    }

    //Campo: gret (requerido)
    if (validacao({op:1, value:document.getElementById('gret').value}) === false) {
        validacao_ok = false;
        mensagem += 'GRET é requerido.'+'<br>';
    }

    //Campo: auxilio_moradia (requerido)
    if (validacao({op:1, value:document.getElementById('auxilio_moradia').value}) === false) {
        validacao_ok = false;
        mensagem += 'Auxílio Moradia é requerido.'+'<br>';
    }

    //Campo: gpe (requerido)
    if (validacao({op:1, value:document.getElementById('gpe').value}) === false) {
        validacao_ok = false;
        mensagem += 'GPE é requerido.'+'<br>';
    }

    //Campo: gee_capacitacao (requerido)
    if (validacao({op:1, value:document.getElementById('gee_capacitacao').value}) === false) {
        validacao_ok = false;
        mensagem += 'GEE Capacitação é requerido.'+'<br>';
    }

    //Campo: decreto14407 (requerido)
    if (validacao({op:1, value:document.getElementById('decreto14407').value}) === false) {
        validacao_ok = false;
        mensagem += 'Decreto 14407 é requerido.'+'<br>';
    }

    //Campo: ferias (requerido)
    if (validacao({op:1, value:document.getElementById('ferias').value}) === false) {
        validacao_ok = false;
        mensagem += 'Férias é requerido.'+'<br>';
    }

    //Campo: raio_x (requerido)
    if (validacao({op:1, value:document.getElementById('raio_x').value}) === false) {
        validacao_ok = false;
        mensagem += 'Raio X é requerido.'+'<br>';
    }

    //Campo: trienio (requerido)
    if (validacao({op:1, value:document.getElementById('trienio').value}) === false) {
        validacao_ok = false;
        mensagem += 'Triênio é requerido.'+'<br>';
    }

    //Campo: auxilio_invalidez (requerido)
    if (validacao({op:1, value:document.getElementById('auxilio_invalidez').value}) === false) {
        validacao_ok = false;
        mensagem += 'Auxilio Invalidez é requerido.'+'<br>';
    }

    //Campo: tempo_certo (requerido)
    if (validacao({op:1, value:document.getElementById('tempo_certo').value}) === false) {
        validacao_ok = false;
        mensagem += 'Tempo Certo é requerido.'+'<br>';
    }

    //Campo: fundo_saude (requerido)
    if (validacao({op:1, value:document.getElementById('fundo_saude').value}) === false) {
        validacao_ok = false;
        mensagem += 'Fundo Saúde é requerido.'+'<br>';
    }

    //Campo: abono_permanencia (requerido)
    if (validacao({op:1, value:document.getElementById('abono_permanencia').value}) === false) {
        validacao_ok = false;
        mensagem += 'Abono Permanência é requerido.'+'<br>';
    }

    //Campo: deducao_ir (requerido)
    if (validacao({op:1, value:document.getElementById('deducao_ir').value}) === false) {
        validacao_ok = false;
        mensagem += 'Dedução IR é requerido.'+'<br>';
    }

    //Campo: ir_valor (requerido)
    if (validacao({op:1, value:document.getElementById('ir_valor').value}) === false) {
        validacao_ok = false;
        mensagem += 'IR Valor é requerido.'+'<br>';
    }

    //Campo: auxilio_transporte (requerido)
    if (validacao({op:1, value:document.getElementById('auxilio_transporte').value}) === false) {
        validacao_ok = false;
        mensagem += 'Auxílio Transporte é requerido.'+'<br>';
    }

    //Campo: gram (requerido)
    if (validacao({op:1, value:document.getElementById('gram').value}) === false) {
        validacao_ok = false;
        mensagem += 'GRAM é requerido.'+'<br>';
    }

    //Campo: auxilio_fardamento (requerido)
    if (validacao({op:1, value:document.getElementById('auxilio_fardamento').value}) === false) {
        validacao_ok = false;
        mensagem += 'Auxílio Fardamento é requerido.'+'<br>';
    }

    //Campo: cidade (requerido)
    if (validacao({op:1, value:document.getElementById('cidade').value}) === false) {
        validacao_ok = false;
        mensagem += 'Cidade é requerido.'+'<br>';
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

function validar_frm_importar_ressarcimento_pagamento() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: ressarcimento_pagamento_referencia (requerido)
    if (validacao({op:1, value:document.getElementById('ressarcimento_pagamento_referencia').value}) === false) {
        validacao_ok = false;
        mensagem += 'Referência requerido.'+'<br>';
    }

    //Campo: ressarcimento_pagamento_file (requerido)
    if (validacao({op:1, value:document.getElementById('ressarcimento_pagamento_file').value}) === false) {
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

    //Botao Confirmar Importação
    $('#btnConfirmarImportacaoPagamento').click(function (e) {
        e.preventDefault();

        //Verificar Validação feita com sucesso
        if (validar_frm_importar_ressarcimento_pagamento() === true) {
            $('#frm_importar_ressarcimento_pagamento').submit();
        }
    });

    //Submit
    $('#frm_importar_ressarcimento_pagamento').submit(function(e) {
        e.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: url+'ressarcimento_pagamentos/importar/dados',
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
