document.addEventListener("DOMContentLoaded", function(event) {
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

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
        var modalEl = document.getElementById('dashboards_modal_filtro_1');
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
            modal.hide();
        }
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
        var modalEl = document.getElementById('dashboards_modal_filtro_2');
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
            modal.hide();
        }
    });

    //Menu Dashboard : menuDashboard
    if (document.querySelector('.linkDashboard')) {
        //Pega o primeiro Dashboard que foi colocado no menu
        document.querySelector('.linkDashboard').click();
    }
});

function abrirDashboardsModalFiltro1() {
    //Abrir Modal
    var modalEl = document.getElementById('dashboards_modal_filtro_1');
    var modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
        modal = new bootstrap.Modal(modalEl);
    }
    modal.show();
}

function abrirDashboardsModalFiltro2() {
    //Abrir Modal
    var modalEl = document.getElementById('dashboards_modal_filtro_2');
    var modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
        modal = new bootstrap.Modal(modalEl);
    }
    modal.show();
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
        //Acessar rota
        fetch(url+'dashboards/dashboards_ids/'+agrupamento_id, {
            method: 'GET',
            headers: {'REQUEST-ORIGIN': 'fetch'}
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                var dashboards_ids = data.success.dashboards_ids;

                dashboards_ids.forEach(function (item) {
                    ids.push(item.id);
                });
            }

            resolve();
        }).catch(error => {
            alert('ErroFunctions:'+error);
        });
    }).then(function () {
        //Hide em todas as divs de Dashboard
        document.querySelectorAll('.divDashboardsAgrupamento').forEach( (e)=>{ e.style.display = 'none'; });

        //Limpar a Div Dashboard escolhida
        document.getElementById('divDashboardsAgrupamentoId_'+agrupamento_id).innerHTML = '';

        //Visualizar a Div Dashboard escolhida
        document.getElementById('divDashboardsAgrupamentoId_'+agrupamento_id).style.display = 'contents';

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
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    return new Promise(resolve => {
        //Visualizar a Div Loading Dashboard
        document.getElementById('loadingDashboard').style.display = 'contents';

        //Acessar rota
        fetch(url + 'dashboards/dashboards_views', {
            method: 'GET',
            headers: {'REQUEST-ORIGIN': 'fetch'}
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                //Dados
                var grupo_dashboards = data.success.grupo_dashboards;
                var dashboards_views = data.success.dashboards_views;

                //ForEach
                grupo_dashboards.forEach(function (grupo_dashboard) {
                    var dashboard_id = grupo_dashboard['dashboard_id'];
                    var dashboard_agrupamento_id = grupo_dashboard['dashboard_agrupamento_id'];
                    var dashboard_agrupamento = grupo_dashboard['dashboard_agrupamento'];
                    var dashboard_name = grupo_dashboard['dashboard_name'];
                    var dashboard_descricao = grupo_dashboard['dashboard_descricao'];
                    var dashboard_icone = 'bx bxs-dashboard';
                    var dashboard_principal_dashboard_id = grupo_dashboard['dashboard_principal_dashboard_id'];
                    var dashboard_view_id = 0;
                    var largura = 4;
                    var ordem_visualizacao = 1;

                    //ForEach
                    dashboards_views.forEach(function (dashboard_view) {
                        if (dashboard_view['dashboard_id'] == grupo_dashboard['dashboard_id']) {
                            dashboard_view_id = dashboard_view['id'];

                            largura = dashboard_view['largura'];

                            //Acertos para visualizar melhor as larguras aqui no welcome
                            if (dashboard_id == 1) {largura = 4;}
                            if (dashboard_id == 2) {largura = 4;}
                            if (dashboard_id == 3) {largura = 4;}
                            if (dashboard_id == 4) {largura = 4;}
                            if (dashboard_id == 5) {largura = 4;}
                            if (dashboard_id == 6) {largura = 4;}
                            if (dashboard_id == 7) {largura = 4;}
                            if (dashboard_id == 8) {largura = 4;}
                            if (dashboard_id == 9) {largura = 4;}
                            if (dashboard_id == 10) {largura = 4;}
                            if (dashboard_id == 11) {largura = 12;}
                            if (dashboard_id == 12) {largura = 4;}
                            if (dashboard_id == 13) {largura = 4;}
                            if (dashboard_id == 14) {largura = 4;}
                            if (dashboard_id == 15) {largura = 4;}
                            if (dashboard_id == 16) {largura = 4;}
                            if (dashboard_id == 17) {largura = 4;}

                            ordem_visualizacao = dashboard_view['ordem_visualizacao'];
                        }
                    });

                    //Varrer array recebido com dashboards_ids dos dashboards do agrupamento
                    dashboard_ids.forEach(function (value) {
                        if (dashboard_id == value) {
                            //Criar array
                            let dados = [];

                            //Limpar divDashboards'''''''''''''''''''''''''''''''''''''
                            if (dashboard_principal_dashboard_id == 0) {
                                document.getElementById('divDashboardsAgrupamentoId_'+dashboard_agrupamento_id).innerHTML = '';
                            }
                            //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

                            //Array
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
                                divDashboardsHtml.innerHTML += '<div class="' + classCol + '" id="divDashboard' + dashboard_id + '"></div>';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_id" name="dashboard' + dashboard_id + '_id" value="' + dashboard_id + '">';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_name" name="dashboard' + dashboard_id + '_name" value="' + dashboard_name + '">';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_descricao" name="dashboard' + dashboard_id + '_descricao" value="' + dashboard_descricao + '">';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento_id" name="dashboard' + dashboard_id + '_agrupamento_id" value="' + dashboard_agrupamento_id + '">';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento" name="dashboard' + dashboard_id + '_agrupamento" value="' + dashboard_agrupamento + '">';
                                divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_icone" name="dashboard' + dashboard_id + '_icone" value="' + dashboard_icone + '">';

                                //Nome da Função que vai ser chamada
                                var nameFunction = 'dashboard' + dashboard_id;

                                //Verificando se existe antes de chamá-la
                                if (typeof window[nameFunction] === 'function') {
                                    if (dashboard_id == 1 || dashboard_id == 6 || dashboard_id == 12) {
                                        window[nameFunction](true, 2);
                                    } else {
                                        window[nameFunction](true);
                                    }
                                }
                            });
                        }
                    });
                });

                resolve();
            }
        }).catch(error => {
            alert('ErroFunctions:'+error);
        });
    }).then(function () {
        //Retirar a Div Loading Dashboard
        document.getElementById('loadingDashboard').style.display = 'none';
    });
}
