document.addEventListener("DOMContentLoaded", function(event) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Click btnDashboardsViews
    document.getElementById('btnDashboardsViews').addEventListener("click", function(e) {
        //Montar o formulário no offcanvasDashboardsViews
        montar_offcanvasDashboardsViews();
    });

    //Ressarcimento - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Ressarcimento - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Botão Filtrar Periodos Órgãos
    document.getElementById('btnFiltrarPeriodosOrgaos').addEventListener("click", function(e) {
        e.preventDefault();

        //Colocar Processando...
        document.getElementById('ressarcimento-modal-filtro-footer-1').style.display = 'none';
        document.getElementById('ressarcimento-modal-filtro-footer-2').style.display = 'block';

        //Trocar inputs
        document.getElementById('ressarcimento_periodo1').value = document.getElementById('ressarcimento-modal-filtro_periodo1').value;
        document.getElementById('ressarcimento_periodo2').value = document.getElementById('ressarcimento-modal-filtro_periodo2').value;
        document.getElementById('ressarcimento_orgao_id').value = document.getElementById('ressarcimento-modal-filtro_orgao').value;

        //Chamar funções para atualizar gráficos
        dashboards();

        //Retirar Processando...
        document.getElementById('ressarcimento-modal-filtro-footer-1').style.display = 'block';
        document.getElementById('ressarcimento-modal-filtro-footer-2').style.display = 'none';

        //Fechando Modal
        $('.ressarcimento-modal-filtro').modal('hide');
    });
    //Ressarcimento - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //Ressarcimento - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    //Iniciando
    iniciando();
});

//Iniciando
async function iniciando() {
    //Montar o offcanvasDashboardsViews primeiro
    await montar_offcanvasDashboardsViews();

    //Gerar os Dashboards depois
    setTimeout(() => {dashboards();}, 2000);
}

//Montar o formulário no offcanvasDashboardsViews
function montar_offcanvasDashboardsViews() {
    return new Promise(resolve => {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        $.get(url+'dashboards/dashboards_views', function (data) {
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
                    var dashboard_id = grupo_dashboard['dashboard_id'];
                    var dashboard_modulo = grupo_dashboard['dashboard_modulo'];
                    var dashboard_name = grupo_dashboard['dashboard_name'];
                    var dashboard_descricao = grupo_dashboard['dashboard_descricao'];
                    var dashboard_icone = grupo_dashboard['dashboard_icone'];
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
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_id_' + grupo_dashboard_id + '" name="dashboard_id_' + grupo_dashboard_id + '" value="'+dashboard_id+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_name_' + grupo_dashboard_id + '" name="dashboard_name_' + grupo_dashboard_id + '" value="'+dashboard_name+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_descricao_' + grupo_dashboard_id + '" name="dashboard_descricao_' + grupo_dashboard_id + '" value="'+dashboard_descricao+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_icone_' + grupo_dashboard_id + '" name="dashboard_icone_' + grupo_dashboard_id + '" value="'+dashboard_icone+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_modulo_' + grupo_dashboard_id + '" name="dashboard_modulo_' + grupo_dashboard_id + '" value="'+dashboard_modulo+'">';
                    offcanvasDashboardsViewsBody += '               <label class="form-check-label" for="grupo_dashboard_id_' + grupo_dashboard_id + '">' + dashboard_modulo + ' - ' + dashboard_name + '</label>';
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

        resolve();
    });
}

//Salvar Dashboards escolhidos e as ordens de visualizações
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
                //Montar dashboards
                dashboards();

                //Fechar offcanvasDashboardsViews
                document.getElementById('btnDashboardsViewsClose').click();
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

function abrirModalPeriodosOrgaos() {
    //Repassando valores
    document.getElementById('ressarcimento-modal-filtro_periodo1').value = document.getElementById('ressarcimento_periodo1').value;
    document.getElementById('ressarcimento-modal-filtro_periodo2').value = document.getElementById('ressarcimento_periodo2').value;
    document.getElementById('ressarcimento-modal-filtro_orgao').value = document.getElementById('ressarcimento_orgao_id').value;

    //Abrir Modal
    $('.ressarcimento-modal-filtro').modal('show');
}

//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Início''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function dashboards() {
    return new Promise(resolve => {
        //Criar array
        let dados = [];

        //Adicionar
        for (i = 1; i <= 50; i++) {
            //Verifica se o elemento existe
            let dashboard_checkbox = document.getElementById('grupo_dashboard_id_' + i);
            if (dashboard_checkbox) {
                //Verifica se a caixa de seleção está marcada
                if (dashboard_checkbox.checked) {
                    let grupo_dashboard_id = i;
                    let ordem_visualizacao = document.getElementById('ordem_visualizacao_' + i).value;
                    let dashboard_id = document.getElementById('dashboard_id_' + i).value;
                    let dashboard_name = document.getElementById('dashboard_name_' + i).value;
                    let dashboard_descricao = document.getElementById('dashboard_descricao_' + i).value;
                    let dashboard_modulo = document.getElementById('dashboard_modulo_' + i).value;
                    let dashboard_icone = document.getElementById('dashboard_icone_' + i).value;

                    dados.push({
                        ordem_visualizacao: parseInt(ordem_visualizacao),
                        dashboard_modulo: dashboard_modulo,
                        dashboard_name: dashboard_name,
                        dashboard_id: parseInt(dashboard_id),
                        dashboard_descricao: dashboard_descricao,
                        dashboard_icone: dashboard_icone,
                        grupo_dashboard_id: parseInt(grupo_dashboard_id)
                    });
                }
            }
        }

        //Ordenar array
        dados.sort((a, b) => a.ordem_visualizacao - b.ordem_visualizacao || a.dashboard_name - b.dashboard_name || a.dashboard_id - b.dashboard_id);

        //Limpar divDashboards
        document.getElementById('divDashboards').innerHTML = '';

        //Ler array
        dados.forEach(function (item) {
            var ordem_visualizacao = item.ordem_visualizacao;
            var dashboard_modulo = item.dashboard_modulo;
            var dashboard_name = item.dashboard_name;
            var dashboard_id = item.dashboard_id;
            var dashboard_descricao = item.dashboard_descricao;
            var dashboard_icone = item.dashboard_icone;
            var grupo_dashboard_id = item.grupo_dashboard_id;

            //Chamar Dashboards
            var classCol = 'col-12 col-md-12';

            if (dashboard_id == 4) {classCol = 'col-12 col-md-6';}
            if (dashboard_id == 5) {classCol = 'col-12 col-md-6';}
            if (dashboard_id == 7) {classCol = 'col-12 col-md-6';}
            if (dashboard_id == 8) {classCol = 'col-12 col-md-6';}
            if (dashboard_id == 9) {classCol = 'col-12 col-md-6';}
            if (dashboard_id == 10) {classCol = 'col-12 col-md-6';}

            //Montando HTML e chamando a função correspondente dinamicamente
            var divDashboardsHtml = document.getElementById('divDashboards');
            divDashboardsHtml.innerHTML += '<div class="' + classCol + '" id="divDashboard' + dashboard_id + '"></div>';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_id" name="dashboard' + dashboard_id + '_id" value="' + dashboard_id + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_name" name="dashboard' + dashboard_id + '_name" value="' + dashboard_name + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_descricao" name="dashboard' + dashboard_id + '_descricao" value="' + dashboard_descricao + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_modulo" name="dashboard' + dashboard_id + '_modulo" value="' + dashboard_modulo + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_icone" name="dashboard' + dashboard_id + '_icone" value="' + dashboard_icone + '">';

            //Nome da Função que vai ser chamada
            var nameFunction = 'dashboard' + dashboard_id;

            //Verificando se existe antes de chamá-la
            if (typeof window[nameFunction] === 'function') {window[nameFunction]();}
        });

        resolve();
    });
}

function dashboard1() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard1_id').value;
    var dashboard_name = document.getElementById('dashboard1_name').value;
    var dashboard_descricao = document.getElementById('dashboard1_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard1_modulo').value;
    var dashboard_icone = document.getElementById('dashboard1_icone').value;

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
        var menu = [{onclick: 'dashboard1()', nome: 'Atualizar'}];

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
    var dashboard_id = document.getElementById('dashboard2_id').value;
    var dashboard_name = document.getElementById('dashboard2_name').value;
    var dashboard_descricao = document.getElementById('dashboard2_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard2_modulo').value;
    var dashboard_icone = document.getElementById('dashboard2_icone').value;

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
        var menu = [{onclick: 'dashboard2();', nome: 'Atualizar'}];

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
    var dashboard_id = document.getElementById('dashboard3_id').value;
    var dashboard_name = document.getElementById('dashboard3_name').value;
    var dashboard_descricao = document.getElementById('dashboard3_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard3_modulo').value;
    var dashboard_icone = document.getElementById('dashboard3_icone').value;

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
        var menu = [{onclick: 'dashboard3();', nome: 'Atualizar'}];

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
    var dashboard_id = document.getElementById('dashboard4_id').value;
    var dashboard_name = document.getElementById('dashboard4_name').value;
    var dashboard_descricao = document.getElementById('dashboard4_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard4_modulo').value;
    var dashboard_icone = document.getElementById('dashboard4_icone').value;

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
        var menu = [{onclick: 'dashboard4();', nome: 'Atualizar'}];

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
    var dashboard_id = document.getElementById('dashboard5_id').value;
    var dashboard_name = document.getElementById('dashboard5_name').value;
    var dashboard_descricao = document.getElementById('dashboard5_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard5_modulo').value;
    var dashboard_icone = document.getElementById('dashboard5_icone').value;

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
        var menu = [{onclick: 'dashboard5();', nome: 'Atualizar'}];

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

function dashboard6() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard6_id').value;
    var dashboard_name = document.getElementById('dashboard6_name').value;
    var dashboard_descricao = document.getElementById('dashboard6_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard6_modulo').value;
    var dashboard_icone = document.getElementById('dashboard6_icone').value;

    var orgaosQtd = 0;
    var militaresQtd = 0;
    var valorRessarcimento = 0;

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard6/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
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
            {onclick: 'dashboard6()', nome: 'Atualizar'}
            ];

        var dados = [
            {descricao: 'Órgãos', valor: orgaosQtd},
            {descricao: 'Militares', valor: militaresQtd},
            {descricao: 'Ressarcimento', valor: 'R$ '+float2moeda(valorRessarcimento)}
        ];

        var imagem = dashboard_icone;

        var texto_1 = dashboard_modulo;
        var texto_2 = dashboard_name;
        var texto_3 = getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2);

        cg_card_modelo_5({col_1:true, imagem:imagem, texto_1:texto_1, texto_2:texto_2, texto_3:texto_3, col_2:true, col_3:true, dados:dados, menu:menu, div_id:'divDashboard6'}).then(function() {
            showTooltips();
        });
    });
}

function dashboard7() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard7_id').value;
    var dashboard_name = document.getElementById('dashboard7_name').value;
    var dashboard_descricao = document.getElementById('dashboard7_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard7_modulo').value;
    var dashboard_icone = document.getElementById('dashboard7_icone').value;

    var militaresQtd = 0;
    var oficiaisQtd = 0;
    var pracasQtd = 0;
    var porcentagem_militares = 0;
    var porcentagem_oficiais = 0;
    var porcentagem_pracas = 0;

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard7/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
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
            {onclick: 'dashboard7()', nome: 'Atualizar'}
            ];

        var dados = [
            {descricao: 'Militares', valor: militaresQtd, id: 'radialchart7-1', porcentagem: porcentagem_militares, cor: '#556ee6'},
            {descricao: 'Oficiais', valor: oficiaisQtd, id: 'radialchart7-2', porcentagem: porcentagem_oficiais, cor: '#34c38f'},
            {descricao: 'Praças', valor: pracasQtd, id: 'radialchart7-3', porcentagem: porcentagem_pracas, cor: '#f46a6a'}
        ];

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2)+'</span>';

        cg_card_modelo_3({titulo_tooltip:titulo_tooltip, titulo:titulo, height:285, dados:dados, menu:menu, div_id:'divDashboard7'}).then(function() {
            cg_card_modelo_3_render(dados);
            showTooltips();
        });
    });
}

function dashboard8() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard8_id').value;
    var dashboard_name = document.getElementById('dashboard8_name').value;
    var dashboard_descricao = document.getElementById('dashboard8_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard8_modulo').value;
    var dashboard_icone = document.getElementById('dashboard8_icone').value;

    var series = [];
    var yaxis_min = 0;
    var yaxis_max = 0;

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard8/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
            if (data.success) {
                series = data.success.series;
                yaxis_max = data.success.yaxis_max;
            }

            resolve();
        });
    }).then(function () {
        var menu = [
            {onclick: 'abrirModalPeriodosOrgaos()', nome: 'Filtro'},
            {onclick: 'dashboard8()', nome: 'Atualizar'}
            ];

        series = series;

        //Colors
        var colors = new Array();
        for(i=1; i<=series.length; i++) {
            colors.push(gerarCor(i));
        }

        var xaxis_categories = ['', ''];

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2)+'</span>';

        cg_graf_modelo_1({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard8', div_id:'divDashboard8'}).then(function() {
            cg_graf_modelo_1_render({chart_height:285, plotOptions_columnWidth:70, plotOptions_columnWidth_formatter:'R$', plotOptions_dataLabels_position:'top', dataLabels_enabled:true, dataLabels_formatter:'R$', dataLabels_offsetY:25, dataLabels_style_fontSize:'12', dataLabels_style_colors:'#000', tooltip_formatter:'R$', stroke_show:false, stroke_width:3, series:series, colors:colors, xaxis:true, xaxis_categories:xaxis_categories, xaxis_position:'top', yaxis:true, title: '', yaxis_labels_formatter:'', graf_id:'grafDashboard8'});
            showTooltips();
        });
    });
}

function dashboard9() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard9_id').value;
    var dashboard_name = document.getElementById('dashboard9_name').value;
    var dashboard_descricao = document.getElementById('dashboard9_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard9_modulo').value;
    var dashboard_icone = document.getElementById('dashboard9_icone').value;

    var series = [];
    var labels = [];
    var colors = [];

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard9/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
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
            {onclick: 'dashboard9()', nome: 'Atualizar'}
            ];

        series = series;
        labels = labels;
        colors = colors;

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2)+'</span>';

        cg_graf_modelo_2({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard9', div_id:'divDashboard9'}).then(function() {
            cg_graf_modelo_2_render({chart_height:285, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'grafDashboard9'});
            showTooltips();
        });
    });
}

function dashboard10() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard10_id').value;
    var dashboard_name = document.getElementById('dashboard10_name').value;
    var dashboard_descricao = document.getElementById('dashboard10_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard10_modulo').value;
    var dashboard_icone = document.getElementById('dashboard10_icone').value;

    var series = [];
    var labels = [];
    var colors = [];

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard10/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
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
            {onclick: 'dashboard10()', nome: 'Atualizar'}
            ];

        series = series;
        labels = labels;
        colors = colors;

        var titulo_tooltip = dashboard_name+' : '+dashboard_descricao;
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2)+'</span>';

        cg_graf_modelo_3({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard10', div_id:'divDashboard10'}).then(function() {
            cg_graf_modelo_3_render({chart_height:285, series:series, labels:labels, colors:colors, legend_show:true, legend_position:'bottom', legend_fontSize:12, responsive_breakpoint:600, responsive_options_chart_height:240, responsive_options_chart_legend:true, graf_id:'grafDashboard10'});
            showTooltips();
        });
    });
}

function dashboard11() {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Iniciando dados
    var dashboard_id = document.getElementById('dashboard11_id').value;
    var dashboard_name = document.getElementById('dashboard11_name').value;
    var dashboard_descricao = document.getElementById('dashboard11_descricao').value;
    var dashboard_modulo = document.getElementById('dashboard11_modulo').value;
    var dashboard_icone = document.getElementById('dashboard11_icone').value;

    var series = [];
    var colors = [];
    var xaxis_categories = [];

    var titulo1 = ''; //Bottom
    var titulo2 = ''; //Left
    var titulo3 = ''; //Top

    //Valores hiddens
    var ressarcimento_periodo1 = document.getElementById('ressarcimento_periodo1').value;
    var ressarcimento_periodo2 = document.getElementById('ressarcimento_periodo2').value;
    var ressarcimento_orgao_id = document.getElementById('ressarcimento_orgao_id').value;

    //Return
    if (ressarcimento_periodo1 == '' || ressarcimento_periodo2) {return false;}

    //Buscar Dados
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboard11/'+ressarcimento_periodo1+'/'+ressarcimento_periodo2+'/'+ressarcimento_orgao_id, function (data) {
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
            {onclick: 'dashboard11()', nome: 'Atualizar'}
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
        var titulo = dashboard_name+'<br>'+'<span class="small text-muted">'+getReferencia(1, ressarcimento_periodo1)+' até '+getReferencia(1, ressarcimento_periodo2)+'</span>';

        cg_graf_modelo_4({titulo_tooltip:titulo_tooltip, titulo:titulo, height:150, menu:menu, graf_id:'grafDashboard11', div_id:'divDashboard11'}).then(function() {
            cg_graf_modelo_4_render({chart_height:285, colors:colors, series:series, dataLabels_enabled:dataLabels_enabled, dataLabels_style_colors:dataLabels_style_colors, dataLabels_formatter:'R$', tooltip_formatter:'R$', stroke_width:stroke_width, grid_row_colors:grid_row_colors, xaxis_categories:xaxis_categories, xaxis_title_text:titulo1, yaxis_title_text:titulo2, yaxis_min:yaxis_min, yaxis_max:yaxis_max, title_text:titulo3, graf_id:'grafDashboard11'});
            showTooltips();
        });
    });
}
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
