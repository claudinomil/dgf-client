$(document).ready(function () {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Acessos
    $.get(url+'dashboards/acessos', function (data) {
        if (data.success) {
            var classCol = 'col-12 col-md-12';

            var acessos = data.success;
            acessos.forEach(function (item) {
                if (item.dashboard_id == 4) {var classCol = 'col-12 col-md-6';}
                if (item.dashboard_id == 5) {var classCol = 'col-12 col-md-6';}

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
});

//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function dashboard1() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = $('#dashboard1_id').val();
    var dashboard_name = $('#dashboard1_name').val();
    var dashboard_descricao = $('#dashboard1_descricao').val();
    var dashboard_modulo = $('#dashboard1_modulo').val();
    var dashboard_icone = $('#dashboard1_icone').val();

    var gruposQtd = 0;
    var usuariosQtd = 0;
    var transacoesQtd = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard1', function (data) {
            if (data.success) {
                gruposQtd = data.success.gruposQtd;
                usuariosQtd = data.success.usuariosQtd;
                transacoesQtd = data.success.transacoesQtd;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'dashboard1()', nome: 'Atualizar'},
            {onclick: 'dashboard1(); dashboard2(); dashboard3(); dashboard4(); dashboard5();', nome: 'Atualizar Todos'}
        ];

        var dados = [
            {descricao: 'Grupos', valor: gruposQtd},
            {descricao: 'Usuários', valor: usuariosQtd},
            {descricao: 'Transações', valor: transacoesQtd}
        ];

        var imagem = dashboard_icone;

        var texto_1 = dashboard_modulo;
        var texto_2 = dashboard_name;
        var texto_3 = '';

        cg_card_modelo_5({col_1:true, imagem:imagem, texto_1:texto_1, texto_2:texto_2, texto_3:texto_3, col_2:true, col_3:true, dados:dados, menu:menu, div_id:'divDashboard1'}).then(function() {
            showTooltips();
        });
    });
}

function dashboard2() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = $('#dashboard2_id').val();
    var dashboard_name = $('#dashboard2_name').val();
    var dashboard_descricao = $('#dashboard2_descricao').val();
    var dashboard_modulo = $('#dashboard2_modulo').val();
    var dashboard_icone = $('#dashboard2_icone').val();

    var series = [];
    var usuariosQtd = 0;
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard2', function (data) {
            if (data.success) {
                series = data.success.series;
                usuariosQtd = data.success.usuariosQtd;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            // {onclick: '', nome: 'Filtro'},
            {onclick: 'dashboard2();', nome: 'Atualizar'},
            {onclick: 'dashboard1(); dashboard2(); dashboard3(); dashboard4(); dashboard5();', nome: 'Atualizar Todos'}
        ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(i));
        }

        var xaxis_categories = [''];

        var title = 'Usuários: '+usuariosQtd;

        cg_graf_modelo_1({titulo_tooltip:dashboard_name+'<br>'+dashboard_descricao, titulo:dashboard_name, height:350, menu:menu, graf_id:'grafDashboard2', div_id:'divDashboard2'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'', dataLabels_offsetY:-22, dataLabels_style_fontSize:'10', dataLabels_style_colors:'#304758', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, yaxis_labels_formatter:'', yaxis_min:yaxis_min, yaxis_max:yaxis_max, title:title, graf_id:'grafDashboard2'});
            showTooltips();
        });
    });
}

function dashboard3() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = $('#dashboard3_id').val();
    var dashboard_name = $('#dashboard3_name').val();
    var dashboard_descricao = $('#dashboard3_descricao').val();
    var dashboard_modulo = $('#dashboard3_modulo').val();
    var dashboard_icone = $('#dashboard3_icone').val();

    var series = [];
    var usuariosQtd = 0;
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard3', function (data) {
            if (data.success) {
                series = data.success.series;
                usuariosQtd = data.success.usuariosQtd;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            // {onclick: '', nome: 'Filtro'},
            {onclick: 'dashboard3();', nome: 'Atualizar'},
            {onclick: 'dashboard1(); dashboard2(); dashboard3(); dashboard4(); dashboard5();', nome: 'Atualizar Todos'}
        ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(i));
        }

        var xaxis_categories = [''];

        var title = 'Usuários: '+usuariosQtd;

        cg_graf_modelo_1({titulo_tooltip:dashboard_name+'<br>'+dashboard_descricao, titulo:dashboard_name, height:350, menu:menu, graf_id:'grafDashboard3', div_id:'divDashboard3'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'', dataLabels_offsetY:-22, dataLabels_style_fontSize:'10', dataLabels_style_colors:'#304758', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, yaxis_labels_formatter:'', yaxis_min:yaxis_min, yaxis_max:yaxis_max, title:title, graf_id:'grafDashboard3'});
            showTooltips();
        });
    });
}

function dashboard4() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = $('#dashboard4_id').val();
    var dashboard_name = $('#dashboard4_name').val();
    var dashboard_descricao = $('#dashboard4_descricao').val();
    var dashboard_modulo = $('#dashboard4_modulo').val();
    var dashboard_icone = $('#dashboard4_icone').val();

    var series = [];
    var usuariosQtd = 0;
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard4', function (data) {
            if (data.success) {
                series = data.success.series;
                usuariosQtd = data.success.usuariosQtd;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            // {onclick: '', nome: 'Filtro'},
            {onclick: 'dashboard4();', nome: 'Atualizar'},
            {onclick: 'dashboard1(); dashboard2(); dashboard3(); dashboard4(); dashboard5();', nome: 'Atualizar Todos'}
        ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(0));
        }

        var xaxis_categories = [''];

        var title = 'Usuários: '+usuariosQtd;

        cg_graf_modelo_1({titulo_tooltip:dashboard_name+'<br>'+dashboard_descricao, titulo:dashboard_name, height:350, menu:menu, graf_id:'grafDashboard4', div_id:'divDashboard4'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'', dataLabels_offsetY:-22, dataLabels_style_fontSize:'10', dataLabels_style_colors:'#304758', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, yaxis_labels_formatter:'', yaxis_min:yaxis_min, yaxis_max:yaxis_max, title:title, graf_id:'grafDashboard4'});
            showTooltips();
        });
    });
}

function dashboard5() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = $('#dashboard5_id').val();
    var dashboard_name = $('#dashboard5_name').val();
    var dashboard_descricao = $('#dashboard5_descricao').val();
    var dashboard_modulo = $('#dashboard5_modulo').val();
    var dashboard_icone = $('#dashboard5_icone').val();

    var series = [];
    var transacoesQtd = 0;
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard5', function (data) {
            if (data.success) {
                series = data.success.series;
                transacoesQtd = data.success.transacoesQtd;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            // {onclick: '', nome: 'Filtro'},
            {onclick: 'dashboard5();', nome: 'Atualizar'},
            {onclick: 'dashboard1(); dashboard2(); dashboard3(); dashboard4(); dashboard5();', nome: 'Atualizar Todos'}
        ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(0));
        }

        var xaxis_categories = [''];

        var title = 'Transações: '+transacoesQtd;

        cg_graf_modelo_1({titulo_tooltip:dashboard_name+'<br>'+dashboard_descricao, titulo:dashboard_name, height:350, menu:menu, graf_id:'grafDashboard5', div_id:'divDashboard5'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'', dataLabels_offsetY:-22, dataLabels_style_fontSize:'10', dataLabels_style_colors:'#304758', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, yaxis_labels_formatter:'', yaxis_min:yaxis_min, yaxis_max:yaxis_max, title:title, graf_id:'grafDashboard5'});
            showTooltips();
        });
    });
}
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
