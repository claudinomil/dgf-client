$(document).ready(function () {
    //Modelo de como chamar os Cards e Gráficos
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_card_modelo_1"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_card_modelo_2"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_card_modelo_3"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_card_modelo_4"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-12" id="db_card_modelo_5"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-3" id="db_card_modelo_6"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-3" id="db_card_modelo_6_2"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-3" id="db_card_modelo_6_3"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-3" id="db_card_modelo_6_4"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_graf_modelo_1"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_graf_modelo_2"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-4" id="db_graf_modelo_3"></div>');
    $('#divDashboardsModelos').append('<div class="col-12 col-md-8" id="db_graf_modelo_4"></div>');

    $('#divDashboardsModelos').show();

    cardModelo1();
    cardModelo2();
    cardModelo3();
    cardModelo4();
    cardModelo5();
    cardModelo6();
    grafModelo1();
    grafModelo2();
    grafModelo3();
    grafModelo4();
});

//Modelo de como chamar os Cards e Gráficos
//Card - Modelo 1
function cardModelo1() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'cardModelo1();', nome: 'Atualizar'}
    ];

    var dados = [
        {descricao: 'Militares', valor: 1887},
        {descricao: 'Oficiais', valor: 888},
        {descricao: 'Praças', valor: 999}
    ];

    cg_card_modelo_1({titulo_tooltip:'Título tooltip', titulo:'Claudino Card 1', height:234, dados:dados, menu:menu, icone:'fa fa-star', div_id:'db_card_modelo_1'}).then(function() {
        showTooltips();
    });
}

//Card - Modelo 2
function cardModelo2() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'cardModelo1();', nome: 'Atualizar'}
    ];

    var dados = [
        {descricao: 'Militares', valor: 1887},
        {descricao: 'Oficiais', valor: 888},
        {descricao: 'Praças', valor: 999}
    ];

    cg_card_modelo_2({titulo_tooltip:'Título tooltip', titulo:'Claudino Card 2', height:234, dados:dados, menu:menu, icone:'fa fa-list-ol', div_id:'db_card_modelo_2'}).then(function() {
        showTooltips();
    });
}

//Card - Modelo 3
function cardModelo3() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'cardModelo1();', nome: 'Atualizar'}
    ];

    var dados = [
        {descricao: 'Militares', valor: 1887, id: 'radialchart-1', porcentagem: 100, cor: '#556ee6'},
        {descricao: 'Oficiais', valor: 888, id: 'radialchart-2', porcentagem: 27, cor: '#34c38f'},
        {descricao: 'Praças', valor: 999, id: 'radialchart-3', porcentagem: 73, cor: '#f46a6a'}
    ];

    cg_card_modelo_3({titulo_tooltip:'Título tooltip', titulo:'Claudino Card 3', principal:'Principal', principal_valor:'99.999,99', principal_texto:'Principal Texto', height:234, dados:dados, menu:menu, div_id:'db_card_modelo_3'}).then(function() {
        cg_card_modelo_3_render(dados);
    });
}

//Card - Modelo 4
function cardModelo4() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'cardModelo1();', nome: 'Atualizar'}
    ];

    var dados = [
        {descricao: 'Oficiais', valor: 888, id: 'radialchart-2', porcentagem: 27, cor: '#34c38f'},
        {descricao: 'Praças', valor: 999, id: 'radialchart-3', porcentagem: 73, cor: '#f46a6a'}
    ];

    cg_card_modelo_4({titulo_tooltip:'Título tooltip', titulo:'Claudino Card 4', height:150, dados:dados, icone:'fa fa-star', icone_cor:'text-danger', descricao:'Militares', total:1887, menu:menu, div_id:'db_card_modelo_4'}).then(function() {
        showTooltips();
    });
}

//Card - Modelo 5
function cardModelo5() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'cardModelo1();', nome: 'Atualizar'}
    ];

    var dados = [
        {descricao: 'Militares', valor: 1887},
        {descricao: 'Oficiais', valor: 888},
        {descricao: 'Militares', valor: 1887},
        {descricao: 'Oficiais', valor: 888}
    ];

    var imagem = 'fa fa-star';

    var texto_1 = 'Claudino Mil';
    var texto_2 = 'Homens';
    var texto_3 = 'de Moraes';

    cg_card_modelo_5({col_1:true, imagem:imagem, texto_1:texto_1, texto_2:texto_2, texto_3:texto_3, col_2:true, col_3:true, dados:dados, menu:menu, div_id:'db_card_modelo_5'}).then(function() {
        showTooltips();
    });
}

//Card - Modelo 6
function cardModelo6() {
    var descricao = 'Claudino Mil';
    var valor = 1000;
    var icone = 'fa fa-star';

    cg_card_modelo_6({col_1:true, descricao:descricao, valor:valor, col_2:true, icone:icone, div_id:'db_card_modelo_6'}).then(function() {
        showTooltips();
    });

    cg_card_modelo_6({col_1:true, descricao:descricao, valor:valor, col_2:true, icone:icone, div_id:'db_card_modelo_6_2'}).then(function() {
        showTooltips();
    });

    cg_card_modelo_6({col_1:true, descricao:descricao, valor:valor, col_2:true, icone:icone, div_id:'db_card_modelo_6_3'}).then(function() {
        showTooltips();
    });

    cg_card_modelo_6({col_1:true, descricao:descricao, valor:valor, col_2:true, icone:icone, div_id:'db_card_modelo_6_4'}).then(function() {
        showTooltips();
    });
}

//Graf - Modelo 1
function grafModelo1() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'grafModelo1();', nome: 'Atualizar'}
    ];

    var series = [
        {name: 'Militares', data: [20,30,40]},
        {name: 'Oficiais', data: [60,50,40]},
        {name: 'Praças', data: [70,80,90]}
    ];

    var colors = ['#556ee6', '#34c38f', '#f46a6a'];

    var xaxis_categories = ['Jan', 'Feb', 'Mar'];

    cg_graf_modelo_1({titulo_tooltip:'Título tooltip', titulo:'Claudino Graf 1', height:150, menu:menu, graf_id:'graf_modelo_1', div_id:'db_graf_modelo_1'}).then(function() {
        cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'%', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'%', dataLabels_offsetY:-22, dataLabels_style_fontSize:'10', dataLabels_style_colors:'#304758', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, title: 'Título do Gráfico', yaxis_labels_formatter:'', graf_id:'graf_modelo_1'});
        showTooltips();
    });
}

//Graf - Modelo 2
function grafModelo2() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'grafModelo1();', nome: 'Atualizar'}
    ];

    var series = [100,40,60];

    var colors = ['#556ee6', '#34c38f', '#f46a6a'];

    var labels = ['Militares', 'Oficiais', 'Praças'];

    cg_graf_modelo_2({titulo_tooltip:'Título tooltip', titulo:'Claudino Graf 2', height:150, menu:menu, graf_id:'graf_modelo_2', div_id:'db_graf_modelo_2'}).then(function() {
        cg_graf_modelo_2_render({chart_height:317, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'graf_modelo_2'});
        showTooltips();
    });
}

//Graf - Modelo 3
function grafModelo3() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'grafModelo1();', nome: 'Atualizar'}
    ];

    var series = [100,40,60];

    var colors = ['#556ee6', '#34c38f', '#f46a6a'];

    var labels = ['Militares', 'Oficiais', 'Praças'];

    cg_graf_modelo_3({titulo_tooltip:'Título tooltip', titulo:'Claudino Graf 3', height:150, menu:menu, graf_id:'graf_modelo_3', div_id:'db_graf_modelo_3'}).then(function() {
        cg_graf_modelo_3_render({chart_height:317, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'graf_modelo_3'});
        showTooltips();
    });
}

//Graf - Modelo 4
function grafModelo4() {
    var menu = [
        {onclick: 'cardModelo1(); cardModelo2(); cardModelo3(); cardModelo4(); grafModelo1(); grafModelo2(); grafModelo3(); grafModelo4();', nome: 'Filtro'},
        {onclick: 'grafModelo1();', nome: 'Atualizar'}
    ];

    var colors = ["#556ee6", "#34c38f"];

    var stroke_width = [3, 3];

    var series = [
        {name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33]},
        {name: "Low - 2018", data: [14, 11, 16, 12, 17, 13, 12]}
    ];

    var grid_row_colors = ['transparent', 'transparent'];

    var xaxis_categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    var yaxis_min = 5;

    var yaxis_max = 40;

    var dataLabels_style_colors = ["#556ee6", "#34c38f"];

    cg_graf_modelo_4({titulo_tooltip:'Título tooltip', titulo:'Claudino Graf 4', height:150, menu:menu, graf_id:'graf_modelo_4', div_id:'db_graf_modelo_4'}).then(function() {
        cg_graf_modelo_4_render({chart_height:285, colors:colors, series:series, dataLabels_enabled:true, dataLabels_style_colors:dataLabels_style_colors, stroke_width:stroke_width, grid_row_colors:grid_row_colors, xaxis_categories:xaxis_categories, xaxis_title_text:'Título 1', yaxis_title_text:'Título 2', yaxis_min:yaxis_min, yaxis_max:yaxis_max, title_text:'Título 3', graf_id:'graf_modelo_4'});
        showTooltips();
    });
}
