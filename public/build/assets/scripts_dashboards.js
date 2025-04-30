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

    //Configurar offCanvas
    montar_offcanvasDashboardsViews();

    //Iniciar um Dashboard
    iniciar();
});

function iniciar() {
    //Iniciar um Dashboard
    setTimeout(() => {
        //Menu Dashboard : menuDashboard
        if (document.querySelector('.linkDashboard')) {
            //Pega o primeiro Dashboard que foi colocado no menu
            document.querySelector('.linkDashboard').click();
        }
    }, 2000);
}

//Montar o formulário no offcanvasDashboardsViews
function montar_offcanvasDashboardsViews() {
    return new Promise(resolve => {
        //URL
        var url = window.location.protocol+'//'+window.location.host+'/';
        if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

        //Acessar rota
        fetch(url+'dashboards/dashboards_views', {
            method: 'GET',
            headers: {'REQUEST-ORIGIN': 'fetch'}
        }).then(response => {
            return response.json();
        }).then(data => {
            //divBtnDashboards
            var divBtnDashboards = '';

            //offcanvasDashboardsViewsBody
            var offcanvasDashboardsViewsBody = '';

            if (data.success) {
                //Dados
                var agrupamentos = data.success.agrupamentos;
                var grupo_dashboards = data.success.grupo_dashboards;
                var dashboards_views = data.success.dashboards_views;

                //Criar Dropdown com opções de Visualizar Dashboards e Configuração'''''''''''''''''''''''''''''''''''''
                divBtnDashboards = '<div class="col-12 mb-1">';
                divBtnDashboards += '   <div class="dropdown">';
                divBtnDashboards += '       <button type="button" class="btn btn-secondary text-white waves-effect btn-label waves-light dropdown-toggle" id="dropdownEscolherDashboard" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bxs-dashboard label-icon"></i>Opções <i class="mdi mdi-chevron-down"></i></button>';
                divBtnDashboards += '       <div class="dropdown-menu" aria-labelledby="dropdownEscolherDashboard">';

                //ForEach
                agrupamentos.forEach(function (agrupamento) {
                    var agrupamento_id = agrupamento['id'];
                    var agrupamento_name = agrupamento['name'];

                    divBtnDashboards += '       <a class="dropdown-item linkDashboard" href="#" onclick="atualizarDashboardsAgrupamentos('+agrupamento_id+')">'+agrupamento_name+'</a>';
                });

                divBtnDashboards += '           <div class="dropdown-divider"></div>';
                divBtnDashboards += '       <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDashboardsViews" aria-controls="offcanvasDashboardsViews" href="#" onclick="montar_offcanvasDashboardsViews();">Configuração</a>';
                divBtnDashboards += '       </div>';
                divBtnDashboards += '   </div>';
                divBtnDashboards += '</div>';

                document.getElementById('divBtnDashboards').innerHTML = divBtnDashboards;
                //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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
                    var dashboard_icone = 'bx bxs-dashboard';
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

                    //Verificar se campo "principal_dashboard_id" está como 0 e deixar somente as larguras 4 e 12
                    if (dashboard_principal_dashboard_id == 0) {
                        select_selected = '';
                        if (largura == 4) {select_selected = 'selected';}
                        offcanvasDashboardsViewsBody += '           <option value="4" '+select_selected+'>4</option>';

                        select_selected = '';
                        if (largura == 12) {select_selected = 'selected';}
                        offcanvasDashboardsViewsBody += '           <option value="12" '+select_selected+'>12</option>';
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
        }).catch(error => {
            alert('ErroFunctions:'+error);
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
                    //document.getElementById('largura_'+document.getElementById('dashboard_principal_dashboard_id_' + i).value).value = 12;
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

    //Acessar rota
    fetch(url+'dashboards/dashboards_views_salvar', {
        method: 'POST',
        headers: {
            'REQUEST-ORIGIN': 'fetch',
            'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    }).then(response => {
        //Retirar DIV Botão e colocar DIV Loading
        document.getElementById('divBtnSalvarDashboardsViews').style.display = 'none';
        document.getElementById('divLoadingDashboardsViews').style.display = 'block';

        return response.json();
    }).then(response => {
        //Lendo dados
        if (response.success) {
            //Fechar offcanvasDashboardsViews
            document.getElementById('btnDashboardsViewsClose').click();

            //Iniciar
            iniciar();
        } else {
            alert('Erro interno');
        }

        //Retirar DIV Loading e colocar DIV Botão
        document.getElementById('divBtnSalvarDashboardsViews').style.display = 'block';
        document.getElementById('divLoadingDashboardsViews').style.display = 'none';
    }).catch(error => {
        alert('Erro Crud Functions Confirm Operation Create: '+error);
    });
}

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

// function dashboards(dashboard_ids=[]) {
//     return new Promise(resolve => {
//         //Criar array
//         let dados = [];
//
//         //Adicionar
//         dashboard_ids.forEach(function (value) {
//             i = value;
//
//             //Verifica se o elemento existe
//             let dashboard_checkbox = document.getElementById('dashboard_id_' + i);
//             if (dashboard_checkbox) {
//                 //Verifica se a caixa de seleção está marcada
//                 if (dashboard_checkbox.checked) {
//                     let largura = document.getElementById('largura_' + i).value;
//                     let ordem_visualizacao = document.getElementById('ordem_visualizacao_' + i).value;
//                     let dashboard_id = document.getElementById('dashboard_id_' + i).value;
//                     let dashboard_name = document.getElementById('dashboard_name_' + i).value;
//                     let dashboard_descricao = document.getElementById('dashboard_descricao_' + i).value;
//                     let dashboard_agrupamento_id = document.getElementById('dashboard_agrupamento_id_' + i).value;
//                     let dashboard_agrupamento = document.getElementById('dashboard_agrupamento_' + i).value;
//                     let dashboard_principal_dashboard_id = document.getElementById('dashboard_principal_dashboard_id_' + i).value;
//                     let dashboard_icone = document.getElementById('dashboard_icone_' + i).value;
//
//                     //Limpar divDashboards'''''''''''''''''''''''''''''''''''''
//                     if (dashboard_principal_dashboard_id == 0) {
//                         document.getElementById('divDashboardsAgrupamentoId_'+dashboard_agrupamento_id).innerHTML = '';
//                     }
//                     //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//
//                     dados.push({
//                         largura: parseInt(largura),
//                         ordem_visualizacao: parseInt(ordem_visualizacao),
//                         dashboard_agrupamento_id: dashboard_agrupamento_id,
//                         dashboard_agrupamento: dashboard_agrupamento,
//                         dashboard_name: dashboard_name,
//                         dashboard_id: parseInt(dashboard_id),
//                         dashboard_descricao: dashboard_descricao,
//                         dashboard_icone: dashboard_icone
//                     });
//                 }
//             }
//         });
//
//         //Ordenar array
//         dados.sort((a, b) => a.ordem_visualizacao - b.ordem_visualizacao || a.dashboard_name - b.dashboard_name || a.dashboard_id - b.dashboard_id);
//
//         //Ler array
//         dados.forEach(function (item) {
//             var largura = item.largura;
//             var ordem_visualizacao = item.ordem_visualizacao;
//             var dashboard_agrupamento_id = item.dashboard_agrupamento_id;
//             var dashboard_agrupamento = item.dashboard_agrupamento;
//             var dashboard_name = item.dashboard_name;
//             var dashboard_id = item.dashboard_id;
//             var dashboard_descricao = item.dashboard_descricao;
//             var dashboard_icone = item.dashboard_icone;
//
//             //Chamar Dashboards
//             var classCol = 'col-12 col-md-'+largura;
//
//             //Montando HTML e chamando a função correspondente dinamicamente
//             var divDashboardsHtml = document.getElementById('divDashboardsAgrupamentoId_'+dashboard_agrupamento_id);
//             divDashboardsHtml.innerHTML += '<div class="' + classCol + ' pb-5" id="divDashboard' + dashboard_id + '"></div>';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_id" name="dashboard' + dashboard_id + '_id" value="' + dashboard_id + '">';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_name" name="dashboard' + dashboard_id + '_name" value="' + dashboard_name + '">';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_descricao" name="dashboard' + dashboard_id + '_descricao" value="' + dashboard_descricao + '">';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento_id" name="dashboard' + dashboard_id + '_agrupamento_id" value="' + dashboard_agrupamento_id + '">';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_agrupamento" name="dashboard' + dashboard_id + '_agrupamento" value="' + dashboard_agrupamento + '">';
//             divDashboardsHtml.innerHTML += '<input type="hidden" id="dashboard' + dashboard_id + '_icone" name="dashboard' + dashboard_id + '_icone" value="' + dashboard_icone + '">';
//
//             //Nome da Função que vai ser chamada
//             var nameFunction = 'dashboard' + dashboard_id;
//
//             //Verificando se existe antes de chamá-la
//             if (typeof window[nameFunction] === 'function') {window[nameFunction]();}
//         });
//
//         resolve();
//     });
// }

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
