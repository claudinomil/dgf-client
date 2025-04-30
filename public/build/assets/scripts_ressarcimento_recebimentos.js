$(document).ready(function () {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Alterar Registros
    $('#re_btn_alterar_registros').click(function () {
        preencherCamposModal();

        //Modal Confirmação
        $('.confirmacaoAlterarRegistrosModal').modal('show');
    });

    $('#re_btn_alterar_registros_confirmar').click(function () {
        //Loading/Botões
        $(".confirmacaoAlterarRegistrosModal_loading").show();
        $(".confirmacaoAlterarRegistrosModal_botoes").hide();

        //Parametros
        var referencia = $('#ar_referencia').val();
        var orgao_id = $('#ar_orgao').val();

        $.get(url+'ressarcimento_recebimentos/registros_alterar/'+referencia+'/'+orgao_id, function (data) {
            if (data.success) {
                //Dados para montar a grade de registros
                var dados = data.success;
                var ctrl_ln = 0;
                var gradeRecebimentosTituloDados = '';
                var gradeRecebimentosTheadDados = '';
                var gradeRecebimentosTbodyDados = '';
                var recebimento_id;
                var data_recebimento;
                var guia_recolhimento;
                var documento;
                var valor_a_receber_orgao = 0;
                var valor_recebido_orgao = 0;
                var col_militar;
                var col_valor;
                var col_valor_br;
                var col_valor_html;
                var col_valor_recebido;
                var col_valor_recebido_br;
                var col_valor_recebido_html;
                var col_saldo_restante;
                var col_saldo_restante_br;
                var col_saldo_restante_html;
                var total_valor = 0;
                var total_valor_recebido = 0;
                var total_saldo_restante = 0;

                //Varrer dados
                $.each(dados, function(i, item) {
                    ctrl_ln++;
                    recebimento_id = item.id;
                    data_recebimento = item.data_recebimento;
                    guia_recolhimento = item.guia_recolhimento;
                    documento = item.documento;

                    //Montar Table Thead com Referência / Órgão e o nome para as colunas''''''''''''''''''''''''''''''''
                    if (ctrl_ln == 1) {
                        //Preenchendo campos hidden
                        $("#grade_recebimentos_referencia").val(referencia);
                        $("#grade_recebimentos_orgao_id").val(orgao_id);

                        //Montando gradeRecebimentosTitulo
                        var titulo = '';
                        titulo += 'Órgão: '+'<b>'+item.orgao+'</b>'+'<br>' + 'Referência: '+'<b>'+getReferencia(1, item.referencia)+'</b>';

                        gradeRecebimentosTituloDados += titulo;

                        $("#gradeRecebimentosTitulo").html(gradeRecebimentosTituloDados);

                        //Montando gradeRecebimentosThead
                        gradeRecebimentosTheadDados += '<tr>';
                        gradeRecebimentosTheadDados += '    <th class="col_militar">Militar</th>';
                        gradeRecebimentosTheadDados += '    <th class="text-nowrap col_valor" style="text-align: right;">Valor (R$)</th>';
                        gradeRecebimentosTheadDados += '    <th class="text-nowrap col_valor_recebido" style="text-align: right;">Recebido (R$)</th>';
                        gradeRecebimentosTheadDados += '    <th class="text-nowrap col_saldo_restante" style="text-align: right;">Saldo (R$)</th>';
                        gradeRecebimentosTheadDados += '</tr>';

                        $("#gradeRecebimentosThead").html(gradeRecebimentosTheadDados);
                    }
                    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    //Montar Table Thead com Referência / Órgão e o nome para as colunas''''''''''''''''''''''''''''''''
                    col_militar = item.nome+'<br>'+item.rg+' - '+item.posto_graduacao;

                    //Montando dados HTML da coluna Valor
                    col_valor = item.valor;
                    if (col_valor === undefined) {col_valor = 0;}
                    col_valor_br = float2moeda(col_valor);
                    col_valor_html = col_valor_br;
                    col_valor_html += '<input type="hidden" id="valor_'+recebimento_id+'" name="valor_'+recebimento_id+'" value="'+col_valor+'">';
                    total_valor += col_valor;

                    //Montando dados HTML da coluna Recebido
                    col_valor_recebido = item.valor_recebido;
                    if (col_valor_recebido === undefined) {col_valor_recebido = 0;}
                    col_valor_recebido_br = float2moeda(col_valor_recebido);
                    col_valor_recebido_html = '<input type="hidden" id="valor_recebido_'+recebimento_id+'" name="valor_recebido_'+recebimento_id+'" value="'+col_valor_recebido+'">';
                    col_valor_recebido_html += '<input type="text" class="form-control text-end mask_money font-size-11" id="valor_recebido_br_'+recebimento_id+'" name="valor_recebido_br_'+recebimento_id+'" value="'+col_valor_recebido_br+'" onblur="gradeRecebimentosTableConfigurar();">';
                    total_valor_recebido += col_valor_recebido;

                    //Preparando valor_a_receber_orgao
                    valor_a_receber_orgao += col_valor;

                    //Preparando valor_recebido_orgao
                    valor_recebido_orgao += col_valor_recebido;

                    //Montando dados HTML da coluna Saldo
                    col_saldo_restante = col_valor - col_valor_recebido;
                    col_saldo_restante_br = float2moeda(col_saldo_restante);
                    col_saldo_restante_html = '<input type="hidden" id="saldo_restante_'+recebimento_id+'" name="saldo_restante_'+recebimento_id+'" value="'+col_saldo_restante+'">';
                    col_saldo_restante_html += '<input type="text" class="form-control text-end mask_money font-size-11" id="saldo_restante_br_'+recebimento_id+'" name="saldo_restante_br_'+recebimento_id+'" value="'+col_saldo_restante_br+'">';
                    total_saldo_restante += col_saldo_restante;

                    gradeRecebimentosTbodyDados += '<tr class="gradeRecebimentosTbodyTr" data-recebimento_id="'+recebimento_id+'">';
                    gradeRecebimentosTbodyDados += '    <td>'+col_militar+'</td>';
                    gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+col_valor_html+'</td>';
                    gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+col_valor_recebido_html+'</td>';
                    gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+col_saldo_restante_html+'</td>';
                    gradeRecebimentosTbodyDados += '</tr>';
                    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                });

                //Montando dados HTML da linha de Totais
                total_valor_html = '<input type="text" class="form-control text-end mask_money font-size-14" id="total_valor" name="total_valor" value="'+float2moeda(total_valor)+'" readonly>';
                total_saldo_restante_html = '<input type="text" class="form-control text-end mask_money font-size-14" id="total_saldo_restante" name="total_saldo_restante" value="'+float2moeda(total_saldo_restante)+'" readonly>';
                total_valor_recebido_html = '<input type="text" class="form-control text-end mask_money font-size-14" id="total_valor_recebido" name="total_valor_recebido" value="'+float2moeda(total_valor_recebido)+'" readonly>';

                gradeRecebimentosTbodyDados += '<tr>';
                gradeRecebimentosTbodyDados += '    <td><b>TOTAIS</b></td>';
                gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+total_valor_html+'</td>';
                gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+total_valor_recebido_html+'</td>';
                gradeRecebimentosTbodyDados += '    <td style="text-align: right;">'+total_saldo_restante_html+'</td>';
                gradeRecebimentosTbodyDados += '</tr>';

                //Campo valor_a_receber_orgao
                $('#valor_a_receber_orgao').val(float2moeda(valor_a_receber_orgao));

                //Campo valor_recebido_orgao
                $('#valor_recebido_orgao').val(float2moeda(valor_recebido_orgao));

                //Campo data_recebimento
                $('#data_recebimento').val(formatarData(2, data_recebimento));

                //Campo guia_recolhimento
                $('#guia_recolhimento').val(guia_recolhimento);

                //Campo documento
                $('#documento').val(documento);

                //Dados do Tbody
                $("#gradeRecebimentosTbody").html(gradeRecebimentosTbodyDados);

                //Configurações'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                $('#frm_operacao').val('edit');

                $('input').prop('disabled', false);
                $('textarea').prop('disabled', false);
                $('select').prop('disabled', false);
                $('.select2').prop('disabled', false);

                $('#crudFormButtons1').show();
                $('#crudFormButtons2').hide();

                $('#crudTable').hide();

                $('#crudForm').show();

                removeMask();
                putMask();
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            } else if (data.error) {
                removeMask();
                putMask();

                alertSwal('warning', data.error, '', 'true', 2000);
            } else {
                removeMask();
                putMask();

                alert('Erro interno');
            }
        }).then((e) => {
            //Loading/Botões
            $(".confirmacaoAlterarRegistrosModal_loading").hide();
            $(".confirmacaoAlterarRegistrosModal_botoes").show();

            //Modal Confirmação
            $('.confirmacaoAlterarRegistrosModal').modal('hide');

            //Configurar tabela gradeRecebimentosTable
            gradeRecebimentosTableConfigurar();
        });
    });

    $('#re_btn_alterar_registros_confirmar_update').click(function (e) {
        e.preventDefault();

        //variáveis
        var validacao = true;

        //Verificar Validação feita com sucesso
        //Verificando data_recebimento
        if ($('#valor_a_receber_orgao').val() == '' || $('#valor_recebido_orgao').val() == '' || $('#data_recebimento').val() == '') {
            alert('O valor a receber, o valor recebido e a data recebimento são requeridos');
            validacao = false;
        }

        //Verificando se tem saldo restante
        if ($('#total_valor_recebido').val() != $('#total_valor').val()) {
            var result = confirm('O valor recebido pelo Órgão é diferente do valor total. ' + 'Saldo restante: R$ ' + $('#total_saldo_restante').val() + '. Deseja confirmar?');
            if (result == false) {
                validacao = false;
            }
        }

        if (validacao === true) {
            //Configuração
            removeMask();

            //Ajax
            $.ajax({
                data: $("#frm_ressarcimento_recebimentos").serialize(),
                url: url+'ressarcimento_recebimentos',
                type: "POST",
                dataType: "json",
                beforeSend: function () {
                    //Configuração - Retirar DIV Botões e colocar DIV Loading
                    $('#crudFormButtons1').hide();
                    $('#crudFormAjaxLoading').show();
                },
                success: function (response) {
                    if (response.success) {
                        alertSwal('success', "Recebimentos", response.success, 'true', 2000);

                        //Configuração
                        $('#crudTable').show();
                        $('#crudForm').hide();

                        //Table
                        window.location.href = url+'ressarcimento_recebimentos';
                        //tableContent('ressarcimento_recebimentos');
                    } else if (response.error) {
                        alertSwal('warning', "Recebimentos", response.error, 'true', 10000);
                    } else if (response.error_validation) {
                        //Configuração
                        removeMask();
                        putMask();

                        //Montar mensage de erro de Validação
                        message = '<div class="pt-3">';
                        $.each(response.error_validation, function (index, value) {
                            message += '<div class="col-12 text-start font-size-12"><b>></b> ' + value + '</div>';
                        });
                        message += '</div>';

                        alertSwal('warning', "Validação", message, 'true', 20000);
                    } else if (response.error_not_found) {
                        //Configuração
                        removeMask();
                        putMask();

                        alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
                    } else if (response.error_permissao) {
                        //Configuração
                        removeMask();
                        putMask();

                        alertSwal('warning', "Permissão Negada", '', 'true', 2000);
                    } else {
                        //Configuração
                        removeMask();
                        putMask();

                        alert('Erro interno');
                    }
                },
                error: function (data) {
                    //Configuração
                    removeMask();
                    putMask();

                    alert('Erro interno');
                },
                complete: function () {
                    //Configuração - Retirar DIV Loading e colocar DIV Botões
                    $('#crudFormButtons1').show();
                    $('#crudFormAjaxLoading').hide();
                }
            });
        }
    });

    $('#valor_recebido_orgao_op_1').click(function () {
        //Verificando valores se iguais
        if ($('#valor_a_receber_orgao').val() != $('#valor_recebido_orgao').val()) {
            alert('Valor total a receber é diferente de Valor total recebido');
            return false;
        }

        //Varrer gradeRecebimentosTbodyTr
        $(".gradeRecebimentosTbodyTr").each(function () {
            //Pegando valores ta tabela tr
            var recebimento_id = $(this).data('recebimento_id');
            var valor = $("#valor_"+recebimento_id).val();
            var valor_recebido = $("#valor_recebido_br_"+recebimento_id).val();

            $("#valor_recebido_br_"+recebimento_id).val(float2moeda(valor));
        });

        gradeRecebimentosTableConfigurar();
    });

    $('#valor_recebido_orgao_op_2').click(function () {
        //valor_recebido_orgao
        var valor_a_distribuir = moeda2float($('#valor_recebido_orgao').val());

        //Varrer gradeRecebimentosTbodyTr
        $(".gradeRecebimentosTbodyTr").each(function () {
            //Pegando valores ta tabela tr
            var recebimento_id = $(this).data('recebimento_id');

            var valor = $("#valor_"+recebimento_id).val();

            if (valor_a_distribuir > valor) {
                $("#valor_recebido_br_" + recebimento_id).val(float2moeda(valor));
                valor_a_distribuir = valor_a_distribuir - valor;
            } else {
                $("#valor_recebido_br_"+recebimento_id).val(float2moeda(valor_a_distribuir));
            }
        });

        gradeRecebimentosTableConfigurar();
    });

    $('#ar_referencia').change(function () {
        preencherCamposModal();
    });
});

function preencherCamposModal() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Verificar se tem referência escolhida
    var referencia_escolhida = 'ref';
    if ($("#ar_referencia").val() !== null && $("#ar_referencia").val() !== undefined && $("#ar_referencia").val() != '') {referencia_escolhida = $("#ar_referencia").val();}

    //Buscar dados
    $.get(url+'ressarcimento_recebimentos/dados/modal/'+referencia_escolhida, function (data) {
        if (data.success) {
            if (referencia_escolhida == 'ref') {
                //Select ar_referencia
                var referencias = data.success.referencias;
                var ar_referencia_options = '<option value="">Escolha uma referência...</option>';

                $.each(referencias, function (i, item) {
                    ar_referencia_options += '<option value="' + item.referencia + '">' + getReferencia(1, item.referencia) + '</option>';
                });

                $("#ar_referencia").html(ar_referencia_options);

                //Select ar_orgao
                $("#ar_orgao").html('');
            } else {
                //Select ar_orgao
                var orgaos = data.success.orgaos;
                var ar_orgao_options = '';

                $.each(orgaos, function (i, item) {
                    ar_orgao_options += '<option value="' + item.id + '">' + item.name + '</option>';
                });

                $("#ar_orgao").html(ar_orgao_options);
            }
        }
    });
}
