$(document).ready(function () {
    //Acessos
    $.get('ressarcimento_relatorios/acessos', function (data) {
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

    //Botão Executar Relatório id=6
    $('#filtro_relatorio_6_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_6();
    });

    //Botão Executar Relatório id=7
    $('#filtro_relatorio_7_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_7();
    });

    //Botão Executar Relatório id=8
    $('#filtro_relatorio_8_executar').click(function (e) {
        e.preventDefault();

        executar_relatorio_8();
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
    $('#filtro_relatorio_6').hide();
    $('#filtro_relatorio_7').hide();
    $('#filtro_relatorio_8').hide();
    $('#filtro_relatorio_9').hide();
    $('#filtro_relatorio_10').hide();

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

function executar_relatorio_6() {
    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_6_footer_1').hide();
        $('#filtro_relatorio_6_footer_2').show();

        //Dados
        $.get('ressarcimento_relatorios/executar_relatorio_6/'+$('#filtro_relatorio_6_referencia').val()+'/'+$('#filtro_relatorio_6_orgao_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_6_footer_2').hide();
        $('#filtro_relatorio_6_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_6').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_7() {
    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_7_footer_1').hide();
        $('#filtro_relatorio_7_footer_2').show();

        //Dados
        $.get('ressarcimento_relatorios/executar_relatorio_7/'+$('#filtro_relatorio_7_referencia').val()+'/'+$('#filtro_relatorio_7_orgao_id').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_7_footer_2').hide();
        $('#filtro_relatorio_7_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_7').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}

function executar_relatorio_8() {
    //Variaveis
    let caminho_pdf = '';

    return new Promise(function(resolve, reject) {
        //Colocar Processando...
        $('#filtro_relatorio_8_footer_1').hide();
        $('#filtro_relatorio_8_footer_2').show();

        //Dados
        $.get('ressarcimento_relatorios/executar_relatorio_8/'+$('#filtro_relatorio_8_referencia').val()+'/'+$('#filtro_relatorio_8_orgao_id').val()+'/'+$('#filtro_relatorio_8_saldo').val(), function (data) {
            if (data.success) {
                caminho_pdf = data.caminho_pdf;
            }

            resolve();
        });
    }).then(function () {
        $('#visualizar_relatorio_iframe_pdf').attr('src', caminho_pdf);

        //Retirar Processando...
        $('#filtro_relatorio_8_footer_2').hide();
        $('#filtro_relatorio_8_footer_1').show();

        //Filtro Relatórios
        $('#filtro_relatorios').hide();
        $('#filtro_relatorio_8').hide();

        //Visualizar Relatórios
        $('#visualizar_relatorios').show();
    });
}
