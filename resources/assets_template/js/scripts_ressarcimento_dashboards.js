$(document).ready(function () {
    if ($('#periodo1').val() == '') {
        alert('Não existe Ressarcimento para análise.');
    } else {
        //Acessos
        $.get('ressarcimento_dashboards/acessos', function (data) {
            if (data.success) {
                var classCol = 'col-12 col-md-12';

                var acessos = data.success;
                acessos.forEach(function (item) {
                    if (item.dashboard_id == 7) {var classCol = 'col-12 col-md-6';}
                    if (item.dashboard_id == 8) {var classCol = 'col-12 col-md-6';}
                    if (item.dashboard_id == 9) {var classCol = 'col-12 col-md-6';}
                    if (item.dashboard_id == 10) {var classCol = 'col-12 col-md-6';}

                    //Montando HTML e chamando a função correspondente dinamicamente
                    $('#divDashboards').append('<div class="'+classCol+'" id="divDashboard'+item.dashboard_id+'"></div>');
                    $('#divDashboards').append('<input type="hidden" id="dashboard'+item.dashboard_id+'_id" name="dashboard'+item.dashboard_id+'_id" value="'+item.dashboard_id+'">');
                    $('#divDashboards').append('<input type="hidden" id="dashboard'+item.dashboard_id+'_name" name="dashboard'+item.dashboard_id+'_name" value="'+item.dashboard_name+'">');
                    $('#divDashboards').append('<input type="hidden" id="dashboard'+item.dashboard_id+'_descricao" name="dashboard'+item.dashboard_id+'_descricao" value="'+item.dashboard_descricao+'">');
                    $('#divDashboards').append('<input type="hidden" id="dashboard'+item.dashboard_id+'_modulo" name="dashboard'+item.dashboard_id+'_modulo" value="'+item.dashboard_modulo+'">');
                    $('#divDashboards').append('<input type="hidden" id="dashboard'+item.dashboard_id+'_icone" name="dashboard'+item.dashboard_id+'_icone" value="'+item.dashboard_icone+'">');

                    //Nome da Função que vai ser chamada
                    var nameFunction = 'dashboard'+item.dashboard_id;

                    //Verificando se existe antes de chamá-la
                    if (typeof window[nameFunction] === 'function') {
                        window[nameFunction]();
                    }
                });
            }
        });
    }

    //Botão Filtrar Periodos Órgãos
    $('#btnFiltrarPeriodosOrgaos').click(function (e) {
        e.preventDefault();

        //Colocar Processando...
        $('#modal-filtro-footer-1').hide();
        $('#modal-filtro-footer-2').show();

        //Trocar inputs
        $('#periodo1').val($('#modal-filtro_periodo1').val());
        $('#periodo2').val($('#modal-filtro_periodo2').val());
        $('#orgao_id').val($('#modal-filtro_orgao').val());

        //Chamar funções para atualizar gráficos
        montarGraficos();

        //Retirar Processando...
        $('#modal-filtro-footer-1').show();
        $('#modal-filtro-footer-2').hide();

        //Fechando Modal
        $('.modal-filtro').modal('hide');
    });
});
//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function abrirModalPeriodosOrgaos() {
    //Colocar periodo1 atual no select#modal-filtro_periodo1
    $('#modal-filtro_periodo1').val($('#periodo1').val());

    //Colocar periodo2 atual no select#modal-filtro_periodo2
    $('#modal-filtro_periodo2').val($('#periodo2').val());

    //Colocar orgao_id atual no select#modal-filtro_orgao
    $('#modal-filtro_orgao').val($('#orgao_id').val());

    //Abrir Modal
    $('.modal-filtro').modal('show');
}

function montarGraficos() {
    dashboard6();
    dashboard7();
    dashboard8();
    dashboard9();
    dashboard10();
    dashboard11();
}

function dashboard6() {
    //Iniciando dados
    var dashboard_id = $('#dashboard6_id').val();
    var dashboard_name = $('#dashboard6_name').val();
    var dashboard_descricao = $('#dashboard6_descricao').val();
    var dashboard_modulo = $('#dashboard6_modulo').val();
    var dashboard_icone = $('#dashboard6_icone').val();

    var orgaosQtd = 0;
    var militaresQtd = 0;
    var valorRessarcimento = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard6/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                orgaosQtd = data.success.orgaosQtd;
                militaresQtd = data.success.militaresQtd;
                valorRessarcimento = data.success.valorRessarcimento;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard6()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        var dados = [
            {descricao: 'Órgãos', valor: orgaosQtd},
            {descricao: 'Militares', valor: militaresQtd},
            {descricao: 'Ressarcimento', valor: 'R$ '+float2moeda(valorRessarcimento)}
        ];

        var imagem = dashboard_icone;

        var texto_1 = dashboard_modulo;
        var texto_2 = dashboard_name;
        var texto_3 = getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val());

        cg_card_modelo_5({col_1:true, imagem:imagem, texto_1:texto_1, texto_2:texto_2, texto_3:texto_3, col_2:true, col_3:true, dados:dados, menu:menu, div_id:'divDashboard6'}).then(function() {
            showTooltips();
        });
    });
}

function dashboard7() {
    //Iniciando dados
    var dashboard_id = $('#dashboard7_id').val();
    var dashboard_name = $('#dashboard7_name').val();
    var dashboard_descricao = $('#dashboard7_descricao').val();
    var dashboard_modulo = $('#dashboard7_modulo').val();
    var dashboard_icone = $('#dashboard7_icone').val();

    var militaresQtd = 0;
    var oficiaisQtd = 0;
    var pracasQtd = 0;
    var porcentagem_militares = 0;
    var porcentagem_oficiais = 0;
    var porcentagem_pracas = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard7/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                militaresQtd = data.success.militaresQtd;
                oficiaisQtd = data.success.oficiaisQtd;
                pracasQtd = data.success.pracasQtd;

                //Calcular porcentagens
                porcentagem_militares = 100;
                if (oficiaisQtd > 0) {
                    porcentagem_oficiais = (oficiaisQtd*100)/militaresQtd;
                    porcentagem_oficiais = porcentagem_oficiais.toFixed(2);
                }
                if (pracasQtd > 0) {
                    porcentagem_pracas = (pracasQtd*100)/militaresQtd;
                    porcentagem_pracas = porcentagem_pracas.toFixed(2);
                }
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard7()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        var dados = [
            {descricao: 'Militares', valor: militaresQtd, id: 'radialchart7-1', porcentagem: porcentagem_militares, cor: '#556ee6'},
            {descricao: 'Oficiais', valor: oficiaisQtd, id: 'radialchart7-2', porcentagem: porcentagem_oficiais, cor: '#34c38f'},
            {descricao: 'Praças', valor: pracasQtd, id: 'radialchart7-3', porcentagem: porcentagem_pracas, cor: '#f46a6a'}
        ];

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val())+'</span>';

        cg_card_modelo_3({titulo_tooltip:titulo_tooltip, titulo:titulo, height:285, dados:dados, menu:menu, div_id:'divDashboard7'}).then(function() {
            cg_card_modelo_3_render(dados);
            showTooltips();
        });
    });
}

function dashboard8() {
    //Iniciando dados
    var dashboard_id = $('#dashboard8_id').val();
    var dashboard_name = $('#dashboard8_name').val();
    var dashboard_descricao = $('#dashboard8_descricao').val();
    var dashboard_modulo = $('#dashboard8_modulo').val();
    var dashboard_icone = $('#dashboard8_icone').val();

    var series = [];
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard8/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                series = data.success.series;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard8()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(i));
        }

        var xaxis_categories = ['', ''];

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val())+'</span>';

        cg_graf_modelo_1({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard8', div_id:'divDashboard8'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'R$', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'R$', dataLabels_offsetY:25, dataLabels_style_fontSize:'12', dataLabels_style_colors:'#000', tooltip_formatter:'R$', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, title: '', yaxis_labels_formatter:'', graf_id:'grafDashboard8'});
            showTooltips();
        });
    });
}

function dashboard9() {
    //Iniciando dados
    var dashboard_id = $('#dashboard9_id').val();
    var dashboard_name = $('#dashboard9_name').val();
    var dashboard_descricao = $('#dashboard9_descricao').val();
    var dashboard_modulo = $('#dashboard9_modulo').val();
    var dashboard_icone = $('#dashboard9_icone').val();

    var series = [];
    var labels = [];
    var colors = [];

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard9/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                series = data.success.series;
                labels = data.success.labels;
                colors = data.success.colors;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard9()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        series = series;
        labels = labels;
        colors = colors;

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val())+'</span>';

        cg_graf_modelo_2({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard9', div_id:'divDashboard9'}).then(function() {
            cg_graf_modelo_2_render({chart_height:285, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'grafDashboard9'});
            showTooltips();
        });
    });
}

function dashboard10() {
    //Iniciando dados
    var dashboard_id = $('#dashboard10_id').val();
    var dashboard_name = $('#dashboard10_name').val();
    var dashboard_descricao = $('#dashboard10_descricao').val();
    var dashboard_modulo = $('#dashboard10_modulo').val();
    var dashboard_icone = $('#dashboard10_icone').val();

    var series = [];
    var labels = [];
    var colors = [];

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard10/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                series = data.success.series;
                labels = data.success.labels;
                colors = data.success.colors;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard10()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        series = series;
        labels = labels;
        colors = colors;

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val())+'</span>';

        cg_graf_modelo_3({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard10', div_id:'divDashboard10'}).then(function() {
            cg_graf_modelo_3_render({chart_height:285, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'grafDashboard10'});
            showTooltips();
        });
    });
}

function dashboard11() {
    //Iniciando dados
    var dashboard_id = $('#dashboard11_id').val();
    var dashboard_name = $('#dashboard11_name').val();
    var dashboard_descricao = $('#dashboard11_descricao').val();
    var dashboard_modulo = $('#dashboard11_modulo').val();
    var dashboard_icone = $('#dashboard11_icone').val();

    var series = [];
    var colors = [];
    var xaxis_categories = [];

    var titulo1 = ''; //Bottom
    var titulo2 = ''; //Left
    var titulo3 = ''; //Top

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get('ressarcimento_dashboards/dashboard11/'+$('#periodo1').val()+'/'+$('#periodo2').val()+'/'+$('#orgao_id').val(), function (data) {
            if (data.success) {
                series = data.success.series;
                colors = data.success.colors;
                xaxis_categories = data.success.xaxis_categories;

                titulo1 = data.success.titulo1;
                titulo2 = data.success.titulo2;
                titulo3 = data.success.titulo3;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard11()', nome: 'Atualizar'},
            {onclick: 'montarGraficos();', nome: 'Atualizar Todos'}
        ];

        series = series;
        colors = colors;
        xaxis_categories = xaxis_categories;

        titulo1 = titulo1;
        titulo2 = titulo2;
        titulo3 = titulo3;

        var stroke_width = [1, 1];

        var yaxis_min = 0;
        var yaxis_max = 0;

        var grid_row_colors = ['transparent', 'transparent'];
        var dataLabels_enabled = false;
        var dataLabels_style_colors = ["#000000"];

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, $('#periodo1').val())+' até '+getReferencia(1, $('#periodo2').val())+'</span>';

        cg_graf_modelo_4({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard11', div_id:'divDashboard11'}).then(function() {
            cg_graf_modelo_4_render({chart_height:285, colors:colors, series:series, dataLabels_enabled:dataLabels_enabled, dataLabels_style_colors:dataLabels_style_colors, dataLabels_formatter:'R$', tooltip_formatter:'R$', stroke_width:stroke_width, grid_row_colors:grid_row_colors, xaxis_categories:xaxis_categories, xaxis_title_text:titulo1, yaxis_title_text:titulo2, yaxis_min:yaxis_min, yaxis_max:yaxis_max, title_text:titulo3, graf_id:'grafDashboard11'});
            showTooltips();
        });
    });
}
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
