document.addEventListener("DOMContentLoaded", function(event) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    //Click btnDashboardsViews
    document.getElementById('btnDashboardsViews').addEventListener("click", function(e) {
        //Montar o formulário no offcanvasDashboardsViews
        montar_offcanvasDashboardsViews();
    });

    //Botão Filtrar : dashboards_modal_filtro_1
    document.getElementById('btnDashboardsModalFiltro1Executar').addEventListener("click", function(e) {
        e.preventDefault();

        //Colocar Processando...
        document.getElementById('dashboards_modal_filtro_1-footer-1').style.display = 'none';
        document.getElementById('dashboards_modal_filtro_1-footer-2').style.display = 'block';

        //Chamar funções para atualizar gráficos
        atualizarDashboardsAgrupamentos(2);

        //Retirar Processando...
        document.getElementById('dashboards_modal_filtro_1-footer-1').style.display = 'block';
        document.getElementById('dashboards_modal_filtro_1-footer-2').style.display = 'none';

        //Fechando Modal
        $('.dashboards_modal_filtro_1').modal('hide');
    });

    //Botão Filtrar : dashboards_modal_filtro_2
    document.getElementById('btnDashboardsModalFiltro2Executar').addEventListener("click", function(e) {
        e.preventDefault();

        //Colocar Processando...
        document.getElementById('dashboards_modal_filtro_2-footer-1').style.display = 'none';
        document.getElementById('dashboards_modal_filtro_2-footer-2').style.display = 'block';

        //Chamar funções para atualizar gráficos
        atualizarDashboardsAgrupamentos(3);

        //Retirar Processando...
        document.getElementById('dashboards_modal_filtro_2-footer-1').style.display = 'block';
        document.getElementById('dashboards_modal_filtro_2-footer-2').style.display = 'none';

        //Fechando Modal
        $('.dashboards_modal_filtro_2').modal('hide');
    });

    //Iniciando
    iniciando();
});

//Iniciando
async function iniciando() {
    //Montar o offcanvasDashboardsViews primeiro
    await montar_offcanvasDashboardsViews();

    //Gerar os Dashboards depois
    setTimeout(() => {
        atualizarDashboardsAgrupamentos(1);
        atualizarDashboardsAgrupamentos(2);
        atualizarDashboardsAgrupamentos(3);
    }, 2000);
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
                    var dashboard_id = grupo_dashboard['dashboard_id'];
                    var dashboard_agrupamento_id = grupo_dashboard['dashboard_agrupamento_id'];
                    var dashboard_agrupamento = grupo_dashboard['dashboard_agrupamento'];
                    var dashboard_name = grupo_dashboard['dashboard_name'];
                    var dashboard_descricao = grupo_dashboard['dashboard_descricao'];
                    var dashboard_icone = grupo_dashboard['dashboard_icone'];
                    var dashboard_principal_dashboard_id = grupo_dashboard['dashboard_principal_dashboard_id'];
                    var dashboard_view_id = 0;
                    var largura = 4;
                    var ordem_visualizacao = 1;
                    var input_checked = '';

                    //ForEach
                    dashboards_views.forEach(function (dashboard_view) {
                        if (dashboard_view['dashboard_id'] == grupo_dashboard['dashboard_id']) {
                            dashboard_view_id = dashboard_view['id'];
                            largura = dashboard_view['largura'];
                            ordem_visualizacao = dashboard_view['ordem_visualizacao'];
                            input_checked = 'checked';
                        }
                    });

                    //Formulário
                    offcanvasDashboardsViewsBody += '   <div class="row pe-3 pb-2">';
                    offcanvasDashboardsViewsBody += '       <div class="col-8" title="Dashboard">';
                    offcanvasDashboardsViewsBody += '           <div class="form-check custom-checkbox">';
                    offcanvasDashboardsViewsBody += '               <input type="checkbox" class="form-check-input" id="dashboard_id_' + dashboard_id + '" name="dashboard_id_' + dashboard_id + '" value="'+dashboard_id+'" '+input_checked+'>';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_name_' + dashboard_id + '" name="dashboard_name_' + dashboard_id + '" value="'+dashboard_name+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_descricao_' + dashboard_id + '" name="dashboard_descricao_' + dashboard_id + '" value="'+dashboard_descricao+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_icone_' + dashboard_id + '" name="dashboard_icone_' + dashboard_id + '" value="'+dashboard_icone+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_agrupamento_id_' + dashboard_id + '" name="dashboard_agrupamento_id_' + dashboard_id + '" value="'+dashboard_agrupamento_id+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_agrupamento_' + dashboard_id + '" name="dashboard_agrupamento_' + dashboard_id + '" value="'+dashboard_agrupamento+'">';
                    offcanvasDashboardsViewsBody += '               <input type="hidden" id="dashboard_principal_dashboard_id_' + dashboard_id + '" name="dashboard_principal_dashboard_id_' + dashboard_id + '" value="'+dashboard_principal_dashboard_id+'">';
                    offcanvasDashboardsViewsBody += '               <label class="form-check-label" for="dashboard_id_' + dashboard_id + '">' + dashboard_agrupamento + ' - ' + dashboard_name + '</label>';
                    offcanvasDashboardsViewsBody += '           </div>';
                    offcanvasDashboardsViewsBody += '       </div>';
                    offcanvasDashboardsViewsBody += '       <div class="col-2 px-0 py-0" title="Largura">';
                    offcanvasDashboardsViewsBody += '           <select class="form-control form-control-sm text-center" id="largura_' + dashboard_id + '" name="largura_' + dashboard_id + '">';

                    //Verificar se campo "principal_dashboard_id" está como 0 e deixar somente a largura 12
                    if (dashboard_principal_dashboard_id == 0) {
                        offcanvasDashboardsViewsBody += '           <option value="12" selected>12</option>';
                    } else {
                        var select_selected;
                        for (i = 1; i <= 12; i++) {
                            select_selected = '';

                            if (largura == i) {select_selected = 'selected';}

                            offcanvasDashboardsViewsBody += '           <option value="'+i+'" '+select_selected+'>'+i+'</option>';
                        }
                    }

                    offcanvasDashboardsViewsBody += '           </select>';
                    offcanvasDashboardsViewsBody += '       </div>';
                    offcanvasDashboardsViewsBody += '       <div class="col-2 px-0 py-0" title="Ordem de Visualização">';
                    offcanvasDashboardsViewsBody += '           <select class="form-control form-control-sm text-center" id="ordem_visualizacao_' + dashboard_id + '" name="ordem_visualizacao_' + dashboard_id + '">';

                    //Verificar se campo "principal_dashboard_id" está como 0 e deixar somente a ordem_visualizacao 1
                    if (dashboard_principal_dashboard_id == 0) {
                        offcanvasDashboardsViewsBody += '           <option value="1" selected>1</option>';
                    } else {
                        var select_selected;
                        for (i = 1; i <=30; i++) {
                            select_selected = '';

                            if (ordem_visualizacao == i) {select_selected = 'selected';}

                            offcanvasDashboardsViewsBody += '           <option value="'+i+'" '+select_selected+'>'+i+'</option>';
                        }
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
    //Fazer acertos nas Larguras e Ordem de Visualização dos Dashboards Principal'''''''''''''''''''''''''''''''''''''''
    for(i=1; i<=50; i++) {
        if (document.getElementById('dashboard_id_' + i)) {
            if (document.getElementById('dashboard_id_' + i).checked) {
                if (document.getElementById('dashboard_principal_dashboard_id_' + i).value != 0) {
                    document.getElementById('dashboard_id_'+document.getElementById('dashboard_principal_dashboard_id_' + i).value).checked = true;
                    document.getElementById('largura_'+document.getElementById('dashboard_principal_dashboard_id_' + i).value).value = 12;
                    document.getElementById('ordem_visualizacao_'+document.getElementById('dashboard_principal_dashboard_id_' + i).value).value = 1;
                }
            }
        }
    }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
                atualizarDashboardsAgrupamentos(1);
                atualizarDashboardsAgrupamentos(2);
                atualizarDashboardsAgrupamentos(3);

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

function abrirDashboardsModalFiltro1() {
    //Abrir Modal
    $('.dashboards_modal_filtro_1').modal('show');
}

function abrirDashboardsModalFiltro2() {
    //Abrir Modal
    $('.dashboards_modal_filtro_2').modal('show');
}

/*
* Refazer Dashboards por Agrupamento
 */
function atualizarDashboardsAgrupamentos(agrupamento_id) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    var ids = [];

    //Pegar ids dos Dashboards do Agrupamento
    return new Promise(function(resolve, reject) {
        $.get(url+'dashboards/dashboards_ids/'+agrupamento_id, function (data) {
            if (data.success) {
                var dashboards_ids = data.success.dashboards_ids;

                dashboards_ids.forEach(function (item) {
                    ids.push(item.id);
                });
            }

            resolve();
        });
    }).then(function () {
        //Chamar Dashboards
        dashboards(ids);
    });
}

/*
* CHAMAR ATRAVES DA FUNÇÃO atualizarDashboardsAgrupamentos
* Montar Html/Div para cada Dashboard e Chamar as Funções correspondentes
* @PARAM dashboard_ids : Id's dos Dashboards que quer Criar/Atualizar
 */
function dashboards(dashboard_ids=[]) {
    return new Promise(resolve => {
        //Criar array
        let dados = [];

        //Adicionar
        dashboard_ids.forEach(function (value) {
            i = value;

            //Verifica se o elemento existe
            let dashboard_checkbox = document.getElementById('dashboard_id_' + i);
            if (dashboard_checkbox) {
                //Verifica se a caixa de seleção está marcada
                if (dashboard_checkbox.checked) {
                    let largura = document.getElementById('largura_' + i).value;
                    let ordem_visualizacao = document.getElementById('ordem_visualizacao_' + i).value;
                    let dashboard_id = document.getElementById('dashboard_id_' + i).value;
                    let dashboard_name = document.getElementById('dashboard_name_' + i).value;
                    let dashboard_descricao = document.getElementById('dashboard_descricao_' + i).value;
                    let dashboard_agrupamento_id = document.getElementById('dashboard_agrupamento_id_' + i).value;
                    let dashboard_agrupamento = document.getElementById('dashboard_agrupamento_' + i).value;
                    let dashboard_principal_dashboard_id = document.getElementById('dashboard_principal_dashboard_id_' + i).value;
                    let dashboard_icone = document.getElementById('dashboard_icone_' + i).value;

                    //Limpar divDashboards'''''''''''''''''''''''''''''''''''''
                    if (dashboard_principal_dashboard_id == 0) {
                        document.getElementById('divDashboardsAgrupamentoId_'+dashboard_agrupamento_id).innerHTML = '';
                    }
                    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                    dados.push({
                        largura: parseInt(largura),
                        ordem_visualizacao: parseInt(ordem_visualizacao),
                        dashboard_agrupamento_id: dashboard_agrupamento_id,
                        dashboard_agrupamento: dashboard_agrupamento,
                        dashboard_name: dashboard_name,
                        dashboard_id: parseInt(dashboard_id),
                        dashboard_descricao: dashboard_descricao,
                        dashboard_icone: dashboard_icone
                    });
                }
            }
        });

        //Ordenar array
        dados.sort((a, b) => a.ordem_visualizacao - b.ordem_visualizacao || a.dashboard_name - b.dashboard_name || a.dashboard_id - b.dashboard_id);

        //Ler array
        dados.forEach(function (item) {
            var largura = item.largura;
            var ordem_visualizacao = item.ordem_visualizacao;
            var dashboard_agrupamento_id = item.dashboard_agrupamento_id;
            var dashboard_agrupamento = item.dashboard_agrupamento;
            var dashboard_name = item.dashboard_name;
            var dashboard_id = item.dashboard_id;
            var dashboard_descricao = item.dashboard_descricao;
            var dashboard_icone = item.dashboard_icone;

            //Chamar Dashboards
            var classCol = 'col-12 col-md-'+largura;

            //Montando HTML e chamando a função correspondente dinamicamente
            var divDashboardsHtml = document.getElementById('divDashboardsAgrupamentoId_'+dashboard_agrupamento_id);
            divDashboardsHtml.innerHTML += '<div class="' + classCol + ' pb-5" id="divDashboard' + dashboard_id + '"></div>';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_id" name="dashboard' + dashboard_id + '_id" value="' + dashboard_id + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_name" name="dashboard' + dashboard_id + '_name" value="' + dashboard_name + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_descricao" name="dashboard' + dashboard_id + '_descricao" value="' + dashboard_descricao + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento_id" name="dashboard' + dashboard_id + '_agrupamento_id" value="' + dashboard_agrupamento_id + '">';
            divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento" name="dashboard' + dashboard_id + '_agrupamento" value="' + dashboard_agrupamento + '">';
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
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard1_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard1_id').value;
        var dashboard_name = document.getElementById('dashboard1_name').value;
        var dashboard_descricao = document.getElementById('dashboard1_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard1_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard1_icone').value;

        var quantidade_grupos = 0;
        var quantidade_usuarios = 0;
        var quantidade_transacoes = 0;

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard1', function (data) {
                if (data.success) {
                    quantidade_grupos = data.success.quantidade_grupos;
                    quantidade_usuarios = data.success.quantidade_usuarios;
                    quantidade_transacoes = data.success.quantidade_transacoes;
                }

                resolve();
            });
        }).then(function () {
            //Dados
            var dados = [];
            dados.push({col:'col-4', titulo:'Grupos', valor:quantidade_grupos});
            dados.push({col:'col-4', titulo:'Usuários', valor:quantidade_usuarios});
            dados.push({col:'col-4', titulo:'Transações', valor:quantidade_transacoes});

            //Menu
            var menu = [];
            menu.push({onclick:'atualizarDashboardsAgrupamentos(1)', nome:'Atualizar'});

            cardPrincipalAgrupamento({icone:dashboard_icone, texto_1:dashboard_agrupamento, dados:dados, menu:menu, divId:'divDashboard1'});
        });
    }
}

function dashboard2() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard2_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard2_id').value;
        var dashboard_name = document.getElementById('dashboard2_name').value;
        var dashboard_descricao = document.getElementById('dashboard2_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard2_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard2_icone').value;

        var quantidade_usuarios = 0;
        var series_data = [];
        var xaxis_categories = [];

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard2', function (data) {
                if (data.success) {
                    quantidade_usuarios = data.success.quantidade_usuarios;
                    series_data = data.success.series_data;
                    xaxis_categories = data.success.xaxis_categories;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Usuários: '+quantidade_usuarios;

            //Series Name
            var series_name = 'Qtd Usuários';

            //Colors
            var colors = new Array();
            for(i=1; i<=series_data.length; i++) {
                colors.push(gerarCor(i));
            }

            //Gráfico
            apexchartsBar({title:title, subtitle:subtitle, series_name:series_name, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:3, divId:'divDashboard2'});
        });
    }
}

function dashboard3() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard3_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard3_id').value;
        var dashboard_name = document.getElementById('dashboard3_name').value;
        var dashboard_descricao = document.getElementById('dashboard3_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard3_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard3_icone').value;

        var quantidade_usuarios = 0;
        var series_data = [];
        var xaxis_categories = [];

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard3', function (data) {
                if (data.success) {
                    quantidade_usuarios = data.success.quantidade_usuarios;
                    series_data = data.success.series_data;
                    xaxis_categories = data.success.xaxis_categories;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Usuários: '+quantidade_usuarios;

            //Series Name
            var series_name = 'Qtd Usuários';

            //Colors
            var colors = new Array();
            for(i=1; i<=series_data.length; i++) {
                colors.push(gerarCor(i));
            }

            //Gráfico
            apexchartsBar({title:title, subtitle:subtitle, series_name:series_name, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:3, divId:'divDashboard3'});
        });
    }
}

function dashboard4() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard4_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard4_id').value;
        var dashboard_name = document.getElementById('dashboard4_name').value;
        var dashboard_descricao = document.getElementById('dashboard4_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard4_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard4_icone').value;

        var quantidade_usuarios = 0;
        var series = [];
        var labels = [];

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard4', function (data) {
                if (data.success) {
                    quantidade_usuarios = data.success.quantidade_usuarios;
                    series = data.success.series;
                    labels = data.success.labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Usuários: '+quantidade_usuarios;

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard4'});
        });
    }
}

function dashboard5() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard5_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard5_id').value;
        var dashboard_name = document.getElementById('dashboard5_name').value;
        var dashboard_descricao = document.getElementById('dashboard5_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard5_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard5_icone').value;

        var quantidade_transacoes = 0;
        var series = [];
        var labels = [];

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard5', function (data) {
                if (data.success) {
                    quantidade_transacoes = data.success.quantidade_transacoes;
                    series = data.success.series;
                    labels = data.success.labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Transações: '+quantidade_transacoes;

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard5'});
        });
    }
}

function dashboard6() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard6_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard6_id').value;
        var dashboard_name = document.getElementById('dashboard6_name').value;
        var dashboard_descricao = document.getElementById('dashboard6_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard6_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard6_icone').value;

        var quantidade_orgaos = 0;
        var quantidade_militares = 0;
        var valor_ressarcimento = 0;

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Obter o Órgão escolhido
        var selectElement = document.getElementById('dashboards_modal_filtro_1_orgao_id');
        var selectedIndex = selectElement.selectedIndex;
        var selectedOption = selectElement.options[selectedIndex];
        var orgao_escolhido = selectedOption.innerHTML;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard6/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    quantidade_orgaos = data.success.quantidade_orgaos;
                    quantidade_militares = data.success.quantidade_militares;
                    valor_ressarcimento = data.success.valor_ressarcimento;
                }

                resolve();
            });
        }).then(function () {
            //Dados
            var dados = [];
            dados.push({col:'col-4', titulo:'Órgãos', valor:quantidade_orgaos});
            dados.push({col:'col-4', titulo:'Militares', valor:quantidade_militares});
            dados.push({col:'col-4', titulo:'Ressarcimento', valor:'R$ '+float2moeda(valor_ressarcimento)});

            //Menu
            var menu = [];
            menu.push({onclick:'abrirDashboardsModalFiltro1()', nome:'Filtro'});

            cardPrincipalAgrupamento({icone:dashboard_icone, texto_1:dashboard_agrupamento, texto_2:getReferencia(1, dashboards_modal_filtro_1_periodo1)+' até '+getReferencia(1, dashboards_modal_filtro_1_periodo2), texto_3:orgao_escolhido, dados:dados, menu:menu, divId:'divDashboard6'});
        });
    }
}

function dashboard7() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard7_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard7_id').value;
        var dashboard_name = document.getElementById('dashboard7_name').value;
        var dashboard_descricao = document.getElementById('dashboard7_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard7_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard7_icone').value;

        var quantidade_militares = 0;
        var quantidade_oficiais = 0;
        var quantidade_pracas = 0;
        var porcentagem_militares = 0;
        var porcentagem_oficiais = 0;
        var porcentagem_pracas = 0;

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard7/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    quantidade_militares = data.success.quantidade_militares;
                    quantidade_oficiais = data.success.quantidade_oficiais;
                    quantidade_pracas = data.success.quantidade_pracas;

                    //Calcular porcentagens
                    porcentagem_militares = 100;
                    if (quantidade_oficiais > 0) {
                        porcentagem_oficiais = (quantidade_oficiais*100)/quantidade_militares;
                        porcentagem_oficiais = porcentagem_oficiais.toFixed(2);
                    }
                    if (quantidade_pracas > 0) {
                        porcentagem_pracas = (quantidade_pracas*100)/quantidade_militares;
                        porcentagem_pracas = porcentagem_pracas.toFixed(2);
                    }
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = quantidade_militares+' Militares: '+quantidade_oficiais+' Oficiais('+float2moeda(porcentagem_pracas)+'%) e '+quantidade_pracas+' Praças('+float2moeda(porcentagem_oficiais)+'%)';

            //Series
            var series = [porcentagem_militares, porcentagem_oficiais, porcentagem_pracas];

            //Labels
            var labels = ['Militares', 'Oficiais', 'Praças'];

            //Total Label
            var total_label = 'Militares';

            //Total return
            var total_return = quantidade_militares;

            //Gráfico
            apexchartsRadialBar({title:title, subtitle:subtitle, series:series, height:330, labels:labels, total_label:total_label, total_return:total_return, valor_tipo:3, divId:'divDashboard7'});
        });
    }
}

function dashboard8() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard8_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard8_id').value;
        var dashboard_name = document.getElementById('dashboard8_name').value;
        var dashboard_descricao = document.getElementById('dashboard8_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard8_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard8_icone').value;

        var series_data = [];
        var xaxis_categories = [];

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard8/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    series_data = data.success.series_data;
                    xaxis_categories = data.success.xaxis_categories;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = '';

            //Colors
            var colors = new Array();
            for(i=1; i<=series_data.length; i++) {
                colors.push(gerarCor(i));
            }

            //Gráfico
            apexchartsBar({title:title, subtitle:subtitle, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:1, divId:'divDashboard8'});
        });
    }
}

function dashboard9() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard9_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard9_id').value;
        var dashboard_name = document.getElementById('dashboard9_name').value;
        var dashboard_descricao = document.getElementById('dashboard9_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard9_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard9_icone').value;

        var quantidade_orgaos = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard9/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    quantidade_orgaos = data.success.quantidade_orgaos;
                    series = data.success.series;
                    labels = data.success.labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Órgãos: '+quantidade_orgaos;

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard9'});
        });
    }
}

function dashboard10() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard10_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard10_id').value;
        var dashboard_name = document.getElementById('dashboard10_name').value;
        var dashboard_descricao = document.getElementById('dashboard10_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard10_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard10_icone').value;

        var quantidade_orgaos = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard10/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    quantidade_orgaos = data.success.quantidade_orgaos;
                    series = data.success.series;
                    labels = data.success.labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'Orgãos: '+quantidade_orgaos;

            //Gráfico
            apexchartsDonut({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard10'});
        });
    }
}

function dashboard11() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard11_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard11_id').value;
        var dashboard_name = document.getElementById('dashboard11_name').value;
        var dashboard_descricao = document.getElementById('dashboard11_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard11_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard11_icone').value;

        var series_data_valores_devidos = [];
        var series_data_valores_pagos = [];
        var xaxis_categories = [];
        var yaxis_min = 0;
        var yaxis_max = 0;

        //Valores hiddens
        var dashboards_modal_filtro_1_periodo1 = document.getElementById('dashboards_modal_filtro_1_periodo1').value;
        var dashboards_modal_filtro_1_periodo2 = document.getElementById('dashboards_modal_filtro_1_periodo2').value;
        var dashboards_modal_filtro_1_orgao_id = document.getElementById('dashboards_modal_filtro_1_orgao_id').value;

        //Return
        if (dashboards_modal_filtro_1_periodo1 == '' || dashboards_modal_filtro_1_periodo2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard11/'+dashboards_modal_filtro_1_periodo1+'/'+dashboards_modal_filtro_1_periodo2+'/'+dashboards_modal_filtro_1_orgao_id, function (data) {
                if (data.success) {
                    series_data_valores_devidos = data.success.series_data_valores_devidos;
                    series_data_valores_pagos = data.success.series_data_valores_pagos;
                    xaxis_categories = data.success.xaxis_categories;
                    yaxis_min = data.success.yaxis_min;
                    yaxis_max = data.success.yaxis_max;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = '';

            //Montando a Series
            var series = [{name: "Valor Devido", data: series_data_valores_devidos}, {name: "Valor Pago", data: series_data_valores_pagos}];

            //Colors
            var colors = new Array();
            for(i=1; i<=series.length; i++) {
                colors.push(gerarCor(i));
            }

            //xaxis_title_text
            var xaxis_title_text = 'Referências';

            //yaxis_title_text
            var yaxis_title_text = 'Valores';

            //Gráfico
            apexchartsLine({title:title, subtitle:subtitle, colors:colors, series:series, height:330, xaxis_categories:xaxis_categories, xaxis_title_text:xaxis_title_text, yaxis_title_text:yaxis_title_text, valor_tipo:1, divId:'divDashboard11'});

            // var options = {
            //     title: {text: title, align: 'center'},
            //     subtitle: {text: subtitle, align: 'center'},
            //     series: [{name: "Valor Devido", data: series_data_valores_devidos}, {name: "Valor Pago", data: series_data_valores_pagos}],
            //     chart: {height: 330, type: 'line', dropShadow: {enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2}, toolbar: {show: false}},
            //     colors: ['#77B6EA', '#545454'],
            //     dataLabels: {enabled: false},
            //     stroke: {width: [3, 3], curve: "smooth"},
            //     grid: {borderColor: '#e7e7e7', row: {colors: ['transparent', 'transparent'], opacity: 0.5}},
            //     markers: {style: "inverted", size: 4},
            //     xaxis: {categories: xaxis_categories, title: {text: 'Referências'}},
            //     yaxis: {title: {text: ''}, min: yaxis_min, max: yaxis_max},
            //     legend: {position: 'top', horizontalAlign: 'right', floating: true, offsetY: -25, offsetX: -5},
            //     tooltip: {y: {title: {formatter(serieName) {return serieName+': R$'}}, formatter: function(val) {return float2moeda(val)}}}
            // };
            //
            // var chart = new ApexCharts(document.querySelector('#divDashboard11'), options);
            // chart.render();



        });
    }
}

function dashboard12() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard12_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard12_id').value;
        var dashboard_name = document.getElementById('dashboard12_name').value;
        var dashboard_descricao = document.getElementById('dashboard12_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard12_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard12_icone').value;

        var total_repasses = 0;
        var total_despesas = 0;

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Obter a Subconta escolhida
        var selectElement = document.getElementById('dashboards_modal_filtro_2_subconta_id');
        var selectedIndex = selectElement.selectedIndex;
        var selectedOption = selectElement.options[selectedIndex];
        var subconta_escolhida = selectedOption.innerHTML;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard12/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    total_repasses = data.success.total_repasses;
                    total_despesas = data.success.total_despesas;
                }

                resolve();
            });
        }).then(function () {
            //Dados
            var dados = [];
            dados.push({col:'col-6', titulo:'Repasses', valor:'R$ '+float2moeda(total_repasses)});
            dados.push({col:'col-6', titulo:'Despesas', valor:'R$ '+float2moeda(total_despesas)});

            //Menu
            var menu = [];
            menu.push({onclick:'abrirDashboardsModalFiltro2()', nome:'Filtro'});

            cardPrincipalAgrupamento({icone:dashboard_icone, texto_1:dashboard_agrupamento, texto_2:formatarData(2, dashboards_modal_filtro_2_data1)+' até '+formatarData(2, dashboards_modal_filtro_2_data2), texto_3:subconta_escolhida, dados:dados, menu:menu, divId:'divDashboard12'});
        });
    }
}

function dashboard13() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard13_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard13_id').value;
        var dashboard_name = document.getElementById('dashboard13_name').value;
        var dashboard_descricao = document.getElementById('dashboard13_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard13_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard13_icone').value;

        var valor_total = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard13/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    valor_total = data.success.repasses_total;
                    series = data.success.repasses_series;
                    labels = data.success.repasses_labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'R$ '+float2moeda(valor_total);

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard13'});
        });
    }
}

function dashboard14() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard14_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard14_id').value;
        var dashboard_name = document.getElementById('dashboard14_name').value;
        var dashboard_descricao = document.getElementById('dashboard14_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard14_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard14_icone').value;

        var valor_total = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard14/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    valor_total = data.success.despesas_total;
                    series = data.success.despesas_series;
                    labels = data.success.despesas_labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'R$ '+float2moeda(valor_total);

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard14'});
        });
    }
}

function dashboard15() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard15_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard15_id').value;
        var dashboard_name = document.getElementById('dashboard15_name').value;
        var dashboard_descricao = document.getElementById('dashboard15_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard15_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard15_icone').value;

        var valor_total = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard15/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    valor_total = data.success.transferencias_realizadas_total;
                    series = data.success.transferencias_realizadas_series;
                    labels = data.success.transferencias_realizadas_labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'R$ '+float2moeda(valor_total);

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard15'});
        });
    }
}

function dashboard16() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard16_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard16_id').value;
        var dashboard_name = document.getElementById('dashboard16_name').value;
        var dashboard_descricao = document.getElementById('dashboard16_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard16_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard16_icone').value;

        var valor_total = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard16/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    valor_total = data.success.transferencias_recebidas_total;
                    series = data.success.transferencias_recebidas_series;
                    labels = data.success.transferencias_recebidas_labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'R$ '+float2moeda(valor_total);

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard16'});
        });
    }
}

function dashboard17() {
    //Verifica se o elemento existe
    let dashboard_checkbox = document.getElementById('dashboard17_id');
    if (dashboard_checkbox) {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Iniciando dados
        var dashboard_id = document.getElementById('dashboard17_id').value;
        var dashboard_name = document.getElementById('dashboard17_name').value;
        var dashboard_descricao = document.getElementById('dashboard17_descricao').value;
        var dashboard_agrupamento = document.getElementById('dashboard17_agrupamento').value;
        var dashboard_icone = document.getElementById('dashboard17_icone').value;

        var valor_total = 0;
        var series = [];
        var labels = [];

        //Valores hiddens
        var dashboards_modal_filtro_2_data1 = document.getElementById('dashboards_modal_filtro_2_data1').value;
        var dashboards_modal_filtro_2_data2 = document.getElementById('dashboards_modal_filtro_2_data2').value;
        var dashboards_modal_filtro_2_subconta_id = document.getElementById('dashboards_modal_filtro_2_subconta_id').value;

        //Return
        if (dashboards_modal_filtro_2_data1 == '' || dashboards_modal_filtro_2_data2 == '') {return false;}

        //Buscar Dados
        return new Promise(function(resolve, reject) {
            $.get(url+'dashboards/dashboard17/'+dashboards_modal_filtro_2_data1+'/'+dashboards_modal_filtro_2_data2+'/'+dashboards_modal_filtro_2_subconta_id, function (data) {
                if (data.success) {
                    valor_total = data.success.resultado_total;
                    series = data.success.resultado_series;
                    labels = data.success.resultado_labels;
                }

                resolve();
            });
        }).then(function () {
            //Títulos
            var title = dashboard_name;
            var subtitle = 'R$ '+float2moeda(valor_total);

            //Gráfico
            apexchartsPie({title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard17'});
        });
    }
}
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções de chamada dos Dashboards - Fim'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
