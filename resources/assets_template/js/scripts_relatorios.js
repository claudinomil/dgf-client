document.addEventListener("DOMContentLoaded", function(event) {
    relatorios();
});

//Montar Divs com opções de Relatórios
function relatorios() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    $.get(url+'relatorios/relatorios', function (data) {
        //relatorios
        var relatorios = '';

        if (data.success) {
            //Dados
            var agrupamentos = data.success.agrupamentos;
            var grupo_relatorios = data.success.grupo_relatorios;

            agrupamentos.forEach(function (agrupamento) {
                relatorios += '<div class="col-12 col-md-4">';
                relatorios += ' <div class="card">';
                relatorios += '     <div class="card-body">';
                relatorios += '         <div class="text-center">';
                relatorios += '             <div class="mb-3">';
                relatorios += '                 <i class="bx bx-printer text-primary display-6"></i>';
                relatorios += '             </div>';
                relatorios += '             <h5>'+agrupamento['name']+'</h5>';
                relatorios += '         </div>';
                relatorios += '         <div class="table-responsive mt-4">';
                relatorios += '             <table class="table align-middle">';
                relatorios += '                 <tbody>';

                var num = 0;

                grupo_relatorios.forEach(function (grupo_relatorio) {
                    if (agrupamento['id'] == grupo_relatorio['agrupamento_id']) {
                        num++;

                        relatorios += '             <tr>';
                        relatorios += '                 <th>';
                        relatorios += '                     <div class="d-flex align-items-center">'+num+'</div>';
                        relatorios += '                 </th>';
                        relatorios += '                 <td>';
                        relatorios += '                     <div class="d-flex align-items-center">' + grupo_relatorio['relatorio_name'] + '</div>';
                        relatorios += '                 </td>';
                        relatorios += '                 <td style="text-align: right">';
                        relatorios += '                     <button type="button" class="btn btn-light btn-sm w-xs" onclick="relatorio' + grupo_relatorio['relatorio_id'] + '(1, \''+grupo_relatorio['relatorio_name']+'\');">Filtro</button>';
                        relatorios += '                 </td>';
                        relatorios += '             </tr>';
                    }
                });

                relatorios += '                 </tbody>';
                relatorios += '             </table>';
                relatorios += '         </div>';
                relatorios += '     </div>';
                relatorios += ' </div>';
                relatorios += '</div>';
            });

            document.getElementById('divRelatorios').innerHTML = relatorios;
        } else {
            alert('Relatórios não encontrado.');
        }
    });
}

function relatorio1(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio1_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio1')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio1_footer_1').hide();
            $('#modal_relatorio1_footer_2').show();

            //Dados
            $.get(url+'relatorios/relatorio1/'+$('#modal_relatorio1_grupo_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['NOME']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.name]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio1_footer_2').hide();
            $('#modal_relatorio1_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio1_cancelar').click();
        });
    }
}

function relatorio2(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio2_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio2')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio2_footer_1').hide();
            $('#modal_relatorio2_footer_2').show();

            //Dados
            $.get(url+'relatorios/relatorio2/'+$('#modal_relatorio2_grupo_id').val()+'/'+$('#modal_relatorio2_situacao_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['USUÀRIO','E-MAIL','MILITAR','GRUPO','SITUAÇÃO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.name,item.email,item.militar_rg+' - '+item.militar_posto_graduacao,item.grupo,item.situacao]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio2_footer_2').hide();
            $('#modal_relatorio2_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio2_cancelar').click();
        });
    }
}

function relatorio3(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio3_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio3')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio3_footer_1').hide();
            $('#modal_relatorio3_footer_2').show();

            //Acertos nos inputs
            var modal_relatorio3_data = 'xxxyyyzzz';
            if ($('#modal_relatorio3_data').val() != '') {modal_relatorio3_data = formatarData(1, $('#modal_relatorio3_data').val());}

            var modal_relatorio3_dado = 'xxxyyyzzz';
            if ($('#modal_relatorio3_dado').val() != '') {modal_relatorio3_dado = $('#modal_relatorio3_dado').val();}

            //Dados
            $.get(url+'relatorios/relatorio3/'+modal_relatorio3_data+'/'+$('#modal_relatorio3_user_id').val()+'/'+$('#modal_relatorio3_submodulo_id').val()+'/'+$('#modal_relatorio3_operacao_id').val()+'/'+modal_relatorio3_dado, function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['DATA','USUÁRIO','SUBMÓDULO','OPERAÇÃO','DADOS']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                //Retirar as Tags Html para melhorar a visualização na Table'''''
                var dados = item.dados;
                dados = dados.replaceAll('<br>', '\n');
                dados = dados.replaceAll('<b>', '');
                dados = dados.replaceAll('</b>', '');
                dados = dados.replaceAll('<b class="text-success">', '');
                dados = dados.replaceAll("<b class='text-success'>", '');
                dados = dados.replaceAll('<b class="text-danger">', '');
                dados = dados.replaceAll("<b class='text-danger'>", '');
                dados = dados.replaceAll("<font class='text-success'>", '');
                dados = dados.replaceAll('<font class="text-success">', '');
                dados = dados.replaceAll("<font class='text-danger'>", '');
                dados = dados.replaceAll('<font class="text-danger">', '');
                dados = dados.replaceAll('</font>', '');
                //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                dadosTableLinhas.push([item.date,item.user,item.submodulo,item.operacao,dados]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'l',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio3_footer_2').hide();
            $('#modal_relatorio3_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio3_cancelar').click();
        });
    }
}

function relatorio4(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio4_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio4')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio4_footer_1').hide();
            $('#modal_relatorio4_footer_2').show();

            //Acertos nos inputs
            var modal_relatorio4_data = 'xxxyyyzzz';
            if ($('#modal_relatorio4_data').val() != '') {modal_relatorio4_data = formatarData(1, $('#modal_relatorio4_data').val());}

            var modal_relatorio4_title = 'xxxyyyzzz';
            if ($('#modal_relatorio4_title').val() != '') {modal_relatorio4_title = $('#modal_relatorio4_title').val();}

            var modal_relatorio4_notificacao = 'xxxyyyzzz';
            if ($('#modal_relatorio4_notificacao').val() != '') {modal_relatorio4_notificacao = $('#modal_relatorio4_notificacao').val();}

            //Dados
            $.get(url+'relatorios/relatorio4/'+modal_relatorio4_data+'/'+modal_relatorio4_title+'/'+modal_relatorio4_notificacao+'/'+$('#modal_relatorio4_user_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['DATA','HORA','TÍTULO','NOTIFICAÇÃO','USUÁRIO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.date,item.time,item.title,item.notificacao,item.user]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio4_footer_2').hide();
            $('#modal_relatorio4_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio4_cancelar').click();
        });
    }
}

function relatorio5(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio5_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio5')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio5_footer_1').hide();
            $('#modal_relatorio5_footer_2').show();

            //Acertos nos inputs
            var modal_relatorio5_name = 'xxxyyyzzz';
            if ($('#modal_relatorio5_name').val() != '') {modal_relatorio5_name = $('#modal_relatorio5_name').val();}

            var modal_relatorio5_descricao = 'xxxyyyzzz';
            if ($('#modal_relatorio5_descricao').val() != '') {modal_relatorio5_descricao = $('#modal_relatorio5_descricao').val();}

            var modal_relatorio5_url = 'xxxyyyzzz';
            if ($('#modal_relatorio5_url').val() != '') {modal_relatorio5_url = $('#modal_relatorio5_url').val();}

            //Dados
            $.get(url+'relatorios/relatorio5/'+modal_relatorio5_name+'/'+modal_relatorio5_descricao+'/'+modal_relatorio5_url+'/'+$('#modal_relatorio5_user_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['NOME','DESCRIÇÃO','URL','USUÁRIO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.name,item.descricao,item.url,item.user]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio5_footer_2').hide();
            $('#modal_relatorio5_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio5_cancelar').click();
        });
    }
}

function relatorio6(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio6_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio6')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio6_footer_1').hide();
            $('#modal_relatorio6_footer_2').show();

            //Dados
            $.get(url+'relatorios/relatorio6/'+$('#modal_relatorio6_referencia').val()+'/'+$('#modal_relatorio6_orgao_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['ÓRGÃO','MILITAR','ID FUNC.','POSTO/GRAD','QUADRO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.orgao_nome,item.militar_nome,item.militar_identidade_funcional,item.militar_posto_graduacao,item.militar_quadro]);
            });

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio6_footer_2').hide();
            $('#modal_relatorio6_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio6_cancelar').click();
        });
    }
}

function relatorio7(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio7_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio7')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio7_footer_1').hide();
            $('#modal_relatorio7_footer_2').show();

            //Dados
            $.get(url+'relatorios/relatorio7/'+$('#modal_relatorio7_referencia').val()+'/'+$('#modal_relatorio7_orgao_id').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['ÓRGÃO','VENCIMENTOS BRUTOS','ENCARGOS SOCIAIS E PATRONAIS','RESSARCIMENTO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.orgao_name,float2moeda(item.vencimentos_brutos),float2moeda(item.encargos_sociais_e_patronais),float2moeda(item.ressarcimento)]);
            });

            //Definir as configurações de estilo para cada célula
            const columnStyles = {
                1: { halign: 'right' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            };

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_columnStyles:columnStyles,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio7_footer_2').hide();
            $('#modal_relatorio7_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio7_cancelar').click();
        });
    }
}

function relatorio8(op=1, relatorio_name='') {
    if (op == 1) {
        //Título Modal
        document.getElementById('modal_relatorio8_titulo').innerHTML = relatorio_name;

        //Abrir Modal
        new bootstrap.Modal(document.getElementById('modal_relatorio8')).show();
    } else {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        return new Promise(function(resolve, reject) {
            //Colocar Processando...
            $('#modal_relatorio8_footer_1').hide();
            $('#modal_relatorio8_footer_2').show();

            //Dados
            $.get(url+'relatorios/relatorio8/'+$('#modal_relatorio8_referencia').val()+'/'+$('#modal_relatorio8_orgao_id').val()+'/'+$('#modal_relatorio8_saldo').val(), function (data) {
                if (data.success) {
                    resolve(data.success);
                } else {
                    alert(data.error);
                    resolve([]);
                }
            });
        }).then(function (data) {
            //Dados da tabela Cabeçalho
            let dadosTableCabecalho = [['ÓRGÃO','RESSARCIMENTO','RECEBIMENTO','SALDO']];

            //Dados da tabela Linhas
            var dadosTableLinhas = [];

            data['relatorio_registros'].forEach(function (item) {
                dadosTableLinhas.push([item.orgao_name,float2moeda(item.ressarcimento),float2moeda(item.recebimento),float2moeda(item.saldo)]);
            });

            //Definir as configurações de estilo para cada célula
            const columnStyles = {
                1: { halign: 'right' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            };

            //Gerar PDF
            gerarPdfTabela({
                p_orientation:'p',
                p_header:true,
                p_topo_1:false,
                p_topo_2:true,
                p_nome:data['relatorio_nome'],
                p_parametros:true,
                p_parametros_texto:data['relatorio_parametros'],
                p_dadosTableCabecalho:dadosTableCabecalho,
                p_dadosTableLinhas:dadosTableLinhas,
                p_columnStyles:columnStyles,
                p_footer:true,
                p_data:data['relatorio_data'],
                p_hora:data['relatorio_hora']
            });

            //Retirar Processando...
            $('#modal_relatorio8_footer_2').hide();
            $('#modal_relatorio8_footer_1').show();

            //Fechar Modal
            document.getElementById('modal_relatorio8_cancelar').click();
        });
    }
}
