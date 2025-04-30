$(document).ready(function () {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Acessos
    $.get(url+'relatorios/acessos', function (data) {
        if (data.success) {
            var acessos = data.success;
            acessos.forEach(function (item) {
                //Montando HTML - Itens do Menu
                $('#dropdown-menu_itens').append('<a class="dropdown-item" href="#" id="menu_relatorio_'+item.relatorio_id+'">'+item.relatorio_name+'</a>');

                //Montando chamadas para abrir card de filtro do relatorio
                $('#menu_relatorio_'+item.relatorio_id).click(function () {
                    //Configurar Relatórios
                    configurar_relatorios(item.relatorio_id, item.relatorio_name);
                });
            });
        }
    });

    //Botão Executar Relatório id=1
    $('#filtro_relatorio_1_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_1();
    });

    //Botão Executar Relatório id=2
    $('#filtro_relatorio_2_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_2();
    });

    //Botão Executar Relatório id=3
    $('#filtro_relatorio_3_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_3();
    });

    //Botão Executar Relatório id=4
    $('#filtro_relatorio_4_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_4();
    });

    //Botão Executar Relatório id=5
    $('#filtro_relatorio_5_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_5();
    });

    //Configurar Relatórios
    configurar_relatorios();
});

/*
* Limpa Div's de Filtros e Visualizações
* Abre Card Filtro do Relatório pedido pelo usuário
* Se não tiver Card Filtro para o Relatório pedido enviar direto para Execução do Relatório
 */
function configurar_relatorios(relatorio_id=0, relatorio_name='') {
    //Filtro Relatórios (Hide)
    $('#filtro_relatorios').hide();
    $('#filtro_relatorio_1').hide();
    $('#filtro_relatorio_2').hide();
    $('#filtro_relatorio_3').hide();
    $('#filtro_relatorio_4').hide();
    $('#filtro_relatorio_5').hide();

    //Visualizar Relatórios
    $('#visualizar_relatorios').hide();

    if (relatorio_id != 0) {
        //Verificar se existe card com filtro para o relatorio
        const elemento = document.querySelector('#filtro_relatorio_'+relatorio_id+'_card');
        const existe = document.body.contains(elemento);

        if (existe) {
            //Filtro Relatórios
            $('#filtro_relatorios').show();
            $('#filtro_relatorio_'+relatorio_id).show();
            $('#filtro_relatorio_'+relatorio_id+'_titulo').html('Filtro - '+relatorio_name);

            //Visualizar Relatórios
            $('#visualizar_relatorio_titulo').html('Visualizar - '+relatorio_name);
        } else {}

    }
}

function executar_relatorio_1() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_1_footer_1').hide();
        $('#filtro_relatorio_1_footer_2').show();

        //Dados
        $.get(url+'relatorios/executar_relatorio_1/'+$('#filtro_relatorio_1_grupo_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_1_footer_2').hide();
        $('#filtro_relatorio_1_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_1').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_2() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_2_footer_1').hide();
        $('#filtro_relatorio_2_footer_2').show();

        //Dados
        $.get(url+'relatorios/executar_relatorio_2/'+$('#filtro_relatorio_2_grupo_id').val()+'/'+$('#filtro_relatorio_2_situacao_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_2_footer_2').hide();
        $('#filtro_relatorio_2_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_2').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_3() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_3_footer_1').hide();
        $('#filtro_relatorio_3_footer_2').show();

        //Acertos nos inputs
        let filtro_relatorio_3_data = 'xxxyyyzzz';
        if ($('#filtro_relatorio_3_data').val() != '') {filtro_relatorio_3_data = formatarData(1, $('#filtro_relatorio_3_data').val());}

        let filtro_relatorio_3_dado = 'xxxyyyzzz';
        if ($('#filtro_relatorio_3_dado').val() != '') {filtro_relatorio_3_dado = $('#filtro_relatorio_3_dado').val();}

        //Dados
        $.get(url+'relatorios/executar_relatorio_3/'+filtro_relatorio_3_data+'/'+$('#filtro_relatorio_3_user_id').val()+'/'+$('#filtro_relatorio_3_submodulo_id').val()+'/'+$('#filtro_relatorio_3_operacao_id').val()+'/'+filtro_relatorio_3_dado, function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_3_footer_2').hide();
        $('#filtro_relatorio_3_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_3').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_4() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_4_footer_1').hide();
        $('#filtro_relatorio_4_footer_2').show();

        //Acertos nos inputs
        let filtro_relatorio_4_data = 'xxxyyyzzz';
        if ($('#filtro_relatorio_4_data').val() != '') {filtro_relatorio_4_data = formatarData(1, $('#filtro_relatorio_4_data').val());}

        let filtro_relatorio_4_title = 'xxxyyyzzz';
        if ($('#filtro_relatorio_4_title').val() != '') {filtro_relatorio_4_title = $('#filtro_relatorio_4_title').val();}

        let filtro_relatorio_4_notificacao = 'xxxyyyzzz';
        if ($('#filtro_relatorio_4_notificacao').val() != '') {filtro_relatorio_4_notificacao = $('#filtro_relatorio_4_notificacao').val();}

        //Dados
        $.get(url+'relatorios/executar_relatorio_4/'+filtro_relatorio_4_data+'/'+filtro_relatorio_4_title+'/'+filtro_relatorio_4_notificacao+'/'+$('#filtro_relatorio_4_user_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_4_footer_2').hide();
        $('#filtro_relatorio_4_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_4').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_5() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_5_footer_1').hide();
        $('#filtro_relatorio_5_footer_2').show();

        //Acertos nos inputs
        let filtro_relatorio_5_name = 'xxxyyyzzz';
        if ($('#filtro_relatorio_5_name').val() != '') {filtro_relatorio_5_name = $('#filtro_relatorio_5_name').val();}

        let filtro_relatorio_5_descricao = 'xxxyyyzzz';
        if ($('#filtro_relatorio_5_descricao').val() != '') {filtro_relatorio_5_descricao = $('#filtro_relatorio_5_descricao').val();}

        let filtro_relatorio_5_url = 'xxxyyyzzz';
        if ($('#filtro_relatorio_5_url').val() != '') {filtro_relatorio_5_url = $('#filtro_relatorio_5_url').val();}

        //Dados
        $.get(url+'relatorios/executar_relatorio_5/'+filtro_relatorio_5_name+'/'+filtro_relatorio_5_descricao+'/'+filtro_relatorio_5_url+'/'+$('#filtro_relatorio_5_user_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_5_footer_2').hide();
        $('#filtro_relatorio_5_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_5').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}
