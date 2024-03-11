document.addEventListener("DOMContentLoaded", function(event) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Click btnDashboardsViews
    document.getElementById('btnDashboardsViews').addEventListener("click", function(e) {
        $.get(url+'dashboards/dashboards_views', function (data) {
            //Mensagem no OffCanvas
            document.getElementById('offcanvasDashboardsViewsBody').innerHTML = 'Preparando...';

            //offcanvasDashboardsViewsBody
            var offcanvasDashboardsViewsBody = '';

            if (data.success) {
                //Dados
                var grupo_dashboards = data.success.grupo_dashboards;
                var dashboards_views = data.success.dashboards_views;

                //Botão Salvar Dashboards
                offcanvasDashboardsViewsBody += '<form id="frm_dashboards_views" name="frm_dashboards_views">';
                offcanvasDashboardsViewsBody += '   <div class="pb-4" id="divBtnSalvarDashboardsViews">';
                offcanvasDashboardsViewsBody += '       <button type="button" class="btn btn-success" onclick="dashboards_salvar()"><i class="bx bxs-dashboard me-1"></i> Salvar e Reorganizar Dashboards</button>';
                offcanvasDashboardsViewsBody += '   </div>';
                offcanvasDashboardsViewsBody += '   <div class="pb-4 spinner-chase" id="divLoadingDashboardsViews" style="display: none;">';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '       <div class="chase-dot"></div>';
                offcanvasDashboardsViewsBody += '   </div>';

                //ForEach
                grupo_dashboards.forEach(function (grupo_dashboard) {
                    var grupo_dashboard_id = grupo_dashboard['grupo_dashboard_id'];
                    var dashboard_name = grupo_dashboard['dashboard_name'];
                    var dashboard_view_id = 0;
                    var ordem_visualizacao = 1;
                    var input_checked = '';

                    //ForEach
                    dashboards_views.forEach(function (dashboard_view) {
                        if (dashboard_view['grupo_dashboard_id'] == grupo_dashboard['grupo_dashboard_id']) {
                            dashboard_view_id = dashboard_view['id'];
                            ordem_visualizacao = dashboard_view['ordem_visualizacao'];
                            input_checked = 'checked';
                        }
                    });

                    //Formulário
                    offcanvasDashboardsViewsBody += '   <div class="row pe-3 pb-2">';
                    offcanvasDashboardsViewsBody += '       <div class="col-10">';
                    offcanvasDashboardsViewsBody += '           <div class="form-check custom-checkbox">';
                    offcanvasDashboardsViewsBody += '               <input type="checkbox" class="form-check-input" id="grupo_dashboard_id_' + grupo_dashboard_id + '" name="grupo_dashboard_id_' + grupo_dashboard_id + '" value="'+grupo_dashboard_id+'" '+input_checked+'>';
                    offcanvasDashboardsViewsBody += '               <label class="form-check-label" for="grupo_dashboard_id_' + grupo_dashboard_id + '">' + dashboard_name + '</label>';
                    offcanvasDashboardsViewsBody += '           </div>';
                    offcanvasDashboardsViewsBody += '       </div>';
                    offcanvasDashboardsViewsBody += '       <div class="col-2 px-0 py-0">';
                    offcanvasDashboardsViewsBody += '           <select class="form-control form-control-sm text-center" id="ordem_visualizacao_' + grupo_dashboard_id + '" name="ordem_visualizacao_' + grupo_dashboard_id + '">';

                    var select_selected;
                    for (i = 1; i <= 30; i++) {
                        select_selected = '';

                        if (ordem_visualizacao == i) {select_selected = 'selected';}

                        offcanvasDashboardsViewsBody += '           <option value="'+i+'" '+select_selected+'>'+i+'</option>';
                    }

                    offcanvasDashboardsViewsBody += '           </select>';
                    offcanvasDashboardsViewsBody += '       </div>';
                    offcanvasDashboardsViewsBody += '   </div>';
                });

                offcanvasDashboardsViewsBody += '</form>';
            }

            document.getElementById('offcanvasDashboardsViewsBody').innerHTML = offcanvasDashboardsViewsBody;
        });
    });

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

function dashboards_salvar() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //FormData
    var formulario = document.getElementById('frm_dashboards_views');
    var formData = new FormData(formulario);

    //Ajax
    $.ajax({
        url: url+'dashboards/dashboards_views_salvar',
        type: "POST",
        dataType: "json",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            //Retirar DIV Botão e colocar DIV Loading
            document.getElementById('divBtnSalvarDashboardsViews').style.display = 'none';
            document.getElementById('divLoadingDashboardsViews').style.display = 'block';
        },
        success: function (response) {
            //Lendo dados
            if (response.success) {
                //Fechar offcanvasDashboardsViews
                document.getElementById('btnDashboardsViewsClose').click();

                //Limpar offcanvasDashboardsViewsBody
                document.getElementById('offcanvasDashboardsViewsBody').innerHTML = '';
            } else {
                alert('Erro interno');
            }
        },
        error: function (data) {
            alert('Erro interno');
        },
        complete: function () {
            //Retirar DIV Loading e colocar DIV Botão
            document.getElementById('divBtnSalvarDashboardsViews').style.display = 'block';
            document.getElementById('divLoadingDashboardsViews').style.display = 'none';
        }
    });
}

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
