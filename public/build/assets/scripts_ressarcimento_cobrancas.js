$(document).ready(function () {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Buscar Dados da Referência
    $('.re_btn_referencia').click(function () {
        //Referência
        var referencia = $(this).data('referencia');

        limparDadosReferencia();
        buscarDadosReferencia(referencia);
    });

    //Gerar Cobrança
    $('#re_btn_gerar_cobranca').click(function () {
        //Modal Confirmação
        $('.confirmacaoGerarCobrancaModal').modal('show');
    });

    $('#re_btn_gerar_cobranca_confirmar').click(function () {
        //Loading/Botões
        $(".confirmacaoGerarCobrancaModal_loading").show();
        $(".confirmacaoGerarCobrancaModal_botoes").hide();

        //Referência
        var referencia = $('#ctrl_referencia').val();

        //Deletar PDFs gerados para a referência
        $.get(url+'ressarcimento_cobrancas/deletar_pdfs_gerados/'+referencia);

        //Gerar Cobrança para o Ressarcimento
        $.get(url+'ressarcimento_cobrancas/gerar_cobrancas/'+referencia, function (data) {
            //Lendo dados
            if (data.success) {
                limparDadosReferencia();
                buscarDadosReferencia(referencia);
            } else if (data.error) {
                alertSwal('warning', data.error, '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).then((e) => {
            //Loading/Botões
            $(".confirmacaoGerarCobrancaModal_loading").hide();
            $(".confirmacaoGerarCobrancaModal_botoes").show();

            //Modal Confirmação
            $('.confirmacaoGerarCobrancaModal').modal('hide');
        });
    });

    //Gerar PDFs
    $('#re_btn_gerar_pdfs').click(function () {
        //Modal Confirmação
        $('.confirmacaoGerarPdfsModal').modal('show');
    });

    $('#re_btn_gerar_pdfs_confirmar').click(function () {
        //Loading/Botões
        $(".confirmacaoGerarPdfsModal_loading").show();
        $(".confirmacaoGerarPdfsModal_botoes").hide();

        //Referência
        var referencia = $('#ctrl_referencia').val();

        //Deletar PDFs gerados para a referência
        $.get(url+'ressarcimento_cobrancas/deletar_pdfs_gerados/'+referencia);

        //Gerar PDFs para Cobrança
        $.get(url+'ressarcimento_cobrancas/gerar_pdfs/'+referencia, function (data) {
            //Lendo dados
            if (data.success) {
                limparDadosReferencia();
                buscarDadosReferencia(referencia);
            } else if (data.error) {
                alertSwal('warning', data.error, '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        }).then((e) => {
            //Loading/Botões
            $(".confirmacaoGerarPdfsModal_loading").hide();
            $(".confirmacaoGerarPdfsModal_botoes").show();

            //Modal Confirmação
            $('.confirmacaoGerarPdfsModal').modal('hide');
        });
    });

    //Baixar PDFs
    $('#re_btn_baixar_pdfs').click(function () {
        var referencia = $('#ctrl_referencia').val();

        $.get(url+'ressarcimento_cobrancas/verificar_existe_zip/'+referencia, function (data) {
            if (data.success) {
                var url_atual = window.location.protocol + '//' + window.location.host + '/';

                //Cria um elemento <a> temporário
                const link = document.createElement('a');
                link.href = url_atual + 'build/assets/pdfs/cobrancas/cobranca_' + referencia + '.zip';

                //Define o atributo 'download' para o nome do arquivo
                link.download = 'cobranca_' + referencia + '.zip';

                //Adiciona o elemento <a> ao DOM (não é necessário para a funcionalidade do download)
                document.body.appendChild(link);

                //Aciona o clique no link para iniciar o download
                link.click();

                //Remove o elemento <a> do DOM depois que o download é iniciado
                document.body.removeChild(link);
            } else {
                alertSwal('warning', data.error, '', 'true', 5000);
            }
        });
    });

    /*
    * Preenche Modal com dados da configuração para a referência
     */
    function preencherConfirmacaoModal(configuracoes) {
        $('#confirmacaoGerarCobrancaModal_data_vencimento').html(configuracoes['data_vencimento']);

        $('#confirmacaoGerarCobrancaModal_diretor_linha_0').html(configuracoes['diretor_cargo']);
        $('#confirmacaoGerarCobrancaModal_diretor_linha_1').html(configuracoes['diretor_nome']+' - '+configuracoes['diretor_posto']+' '+configuracoes['diretor_quadro']);
        $('#confirmacaoGerarCobrancaModal_diretor_linha_2').html(configuracoes['diretor_cargo']);
        $('#confirmacaoGerarCobrancaModal_diretor_linha_3').html('ID Funcional: '+configuracoes['diretor_identidade_funcional']);

        $('#confirmacaoGerarCobrancaModal_dgf2_linha_0').html(configuracoes['dgf2_cargo']);
        $('#confirmacaoGerarCobrancaModal_dgf2_linha_1').html(configuracoes['dgf2_nome']+' - '+configuracoes['dgf2_posto']+' '+configuracoes['dgf2_quadro']);
        $('#confirmacaoGerarCobrancaModal_dgf2_linha_2').html(configuracoes['dgf2_cargo']);
        $('#confirmacaoGerarCobrancaModal_dgf2_linha_3').html('ID Funcional: '+configuracoes['dgf2_identidade_funcional']);
    }

    function limparDadosReferencia() {
        $('#ctrl_referencia').val('');
        $('#re_referencia').html('');
        $('#re_status_dados').html('');
        $('#re_status_documentos').html('');
        $('#re_quantidade_orgaos').html('0');
        $('#re_quantidade_militares').html('0');
        $('#re_quantidade_pagamentos').html('0');
        $('#re_quantidade_configuracoes').html('0');
        $('#re_quantidade_cobranca').html('0');
        $('#re_quantidade_listagens').html('0');
        $('#re_quantidade_notas').html('0');
        $('#re_quantidade_oficios').html('0');
        $('#re_registros_grade_status_dados').html('');
        $('#re_registros_grade_status_documentos').html('');
    }

    function buscarDadosReferencia(referencia) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        var re_referencia = getReferencia(1, referencia);

        //Campo ctrl_referencia
        $('#ctrl_referencia').val(referencia);

        //Html
        $('#re_referencia').html(re_referencia);

        //Buscar dados do Ressarcimento
        $.get(url+'ressarcimento_cobrancas/dados_ressarcimento/' + referencia, function (data) {
            //Lendo dados
            if (data.success) {
                //Status Dados
                var re_status_dados = '';

                if (data.success.re_status_dados == 1) {
                    re_status_dados = '<span class="badge-soft-success">' + data.success.re_status_dados_texto + '</span>';
                } else if (data.success.re_status_dados == 0) {
                    re_status_dados = '<span class="badge-soft-danger">' + data.success.re_status_dados_texto + '</span>';
                }

                //Status Documentos
                var re_status_documentos = '';

                if (data.success.re_status_documentos == 1) {
                    re_status_documentos = '<span class="badge-soft-success">' + data.success.re_status_documentos_texto + '</span>';
                } else if (data.success.re_status_documentos == 0) {
                    re_status_documentos = '<span class="badge-soft-danger">' + data.success.re_status_documentos_texto + '</span>';
                }

                //Botão Cobranças
                if (data.success.re_status_dados == 1) {
                    //Preencher confirmacaoGerarCobrancaModal
                    var configuracoes = data.success.re_configuracoes[0];
                    preencherConfirmacaoModal(configuracoes);

                    //Cobranças
                    $('#div_botao_cobrancas').show();
                } else {
                    $('#div_botao_cobrancas').hide();
                }

                //Html
                $('#re_status_dados').html(re_status_dados);
                $('#re_status_documentos').html(re_status_documentos);
                $('#re_referencia').html(data.success.re_referencia);
                $('#re_quantidade_orgaos').html(data.success.re_quantidade_orgaos);
                $('#re_quantidade_militares').html(data.success.re_quantidade_militares);
                $('#re_quantidade_pagamentos').html(data.success.re_quantidade_pagamentos);
                $('#re_quantidade_configuracoes').html(data.success.re_quantidade_configuracoes);
                $('#re_quantidade_cobranca').html(data.success.re_quantidade_cobranca);
                $('#re_quantidade_listagens').html(data.success.re_quantidade_listagens);
                $('#re_quantidade_notas').html(data.success.re_quantidade_notas);
                $('#re_quantidade_oficios').html(data.success.re_quantidade_oficios);

                //Registros Grade de Status dos Dados'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var grade_inicio = '';
                var grade_meio = '';
                var grade_fim = '';

                grade_inicio += '<div class="table-responsive">';
                grade_inicio += '<table class="table align-middle mb-0">';
                grade_inicio += '<thead class="table-light">';
                grade_inicio += '<tr>';
                grade_inicio += '<th style="width: 5px;">#</th>';
                grade_inicio += '<th class="align-middle">Status dos Dados</th>';
                grade_inicio += '<th class="align-middle">Detalhes</th>';
                grade_inicio += '</tr>';
                grade_inicio += '</thead>';
                grade_inicio += '<tbody>';

                var linha = 0;

                $.each(data.success.re_registros_grade_status_dados, function (i, item) {
                    grade_meio += '<tr>';

                    //Linha
                    linha++;
                    grade_meio += '<td>' + linha + '</td>';

                    //Status
                    var status = '<span class="badge badge-pill badge-soft-' + item.status_cor + ' font-size-12">' + item.status + '</span>';
                    grade_meio += '<td>' + status + '</td>';

                    //Detalhes
                    var detalhes = '';
                    if (item.detalhes != '') {
                        detalhes = '<button type="button" class="btn btn-warning btn-sm btn-rounded" data-bs-toggle="modal" data-bs-target=".gradeRegistrosModal" onclick="$(\'.gradeRegistrosModal #gradeRegistrosModalLabel\').html(\'<font class=badge-soft-' + item.status_cor + '>' + item.status + '</font>' + '\');     $(\'.gradeRegistrosModal .modal-body\').html(\'' + item.detalhes + '\');">ver Detalhes</button>';
                    }
                    grade_meio += '<td>' + detalhes + '</td>';

                    grade_meio += '</tr>';
                });

                grade_fim += '</tbody>';
                grade_fim += '</table>';
                grade_fim += '</div>';

                //Html
                $('#re_registros_grade_status_dados').html(grade_inicio + grade_meio + grade_fim);
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                //Registros Grade de Status dos Documentos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                var grade_inicio = '';
                var grade_meio = '';
                var grade_fim = '';

                grade_inicio += '<div class="table-responsive">';
                grade_inicio += '<table class="table align-middle mb-0">';
                grade_inicio += '<thead class="table-light">';
                grade_inicio += '<tr>';
                grade_inicio += '<th style="width: 5px;">#</th>';
                grade_inicio += '<th class="align-middle">Status dos Documentos</th>';
                grade_inicio += '<th class="align-middle">Detalhes</th>';
                grade_inicio += '</tr>';
                grade_inicio += '</thead>';
                grade_inicio += '<tbody>';

                var linha = 0;

                $.each(data.success.re_registros_grade_status_documentos, function (i, item) {
                    grade_meio += '<tr>';

                    //Linha
                    linha++;
                    grade_meio += '<td>' + linha + '</td>';

                    //Status
                    var status = '<span class="badge badge-pill badge-soft-' + item.status_cor + ' font-size-12">' + item.status + '</span>';
                    grade_meio += '<td>' + status + '</td>';

                    //Detalhes
                    var detalhes = '';
                    if (item.detalhes != '') {
                        detalhes = '<button type="button" class="btn btn-warning btn-sm btn-rounded" data-bs-toggle="modal" data-bs-target=".gradeRegistrosModal" onclick="$(\'.gradeRegistrosModal #gradeRegistrosModalLabel\').html(\'<font class=badge-soft-' + item.status_cor + '>' + item.status + '</font>' + '\');     $(\'.gradeRegistrosModal .modal-body\').html(\'' + item.detalhes + '\');">ver Detalhes</button>';
                    }
                    grade_meio += '<td>' + detalhes + '</td>';

                    grade_meio += '</tr>';
                });

                grade_fim += '</tbody>';
                grade_fim += '</table>';
                grade_fim += '</div>';

                //Html
                $('#re_registros_grade_status_documentos').html(grade_inicio + grade_meio + grade_fim);
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            } else if (data.error) {
                alertSwal('warning', data.error, '', 'true', 2000);
            } else {
                alert('Erro interno');
            }
        });
    }
});
