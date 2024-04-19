/*
* Montar o Card Principal para cada Agrupamento
* icone : imagem via class
* texto_1 : Texto 1 do Card
* texto_2 : Texto 2 do Card
* texto_3 : Texto 3 do Card
* dados : Colunas com informações
* menu : Opções do Menu
* divId : Id da Div que vai Renderizar o Card
 */
function cardPrincipalAgrupamento({op=1, icone, texto_1='', texto_2='', texto_3='', dados, menu, divId}) {
    var retorno = '';

    if (op == 1) {
        retorno += '<div class="card shadow rounded">';
        retorno += '    <div class="card-body">';
        retorno += '        <div class="row">';
        retorno += '            <div class="col">';
        retorno += '                <div class="d-flex">';
        retorno += '                    <div class="flex-shrink-0 me-3"><i class="'+icone+' text-primary text-center d-flex flex-column justify-content-center avatar-md rounded-circle img-thumbnail" style="font-size: 40px;"></i></div>';
        retorno += '                    <div class="flex-grow-1 align-self-center">';
        retorno += '                        <div class="text-muted">';

        if (texto_1 != '') {retorno += '        <h5 class="mb-2">'+texto_1+'</h5>';}
        if (texto_2 != '') {retorno += '        <p class="mb-1">'+texto_2+'</p>';}
        if (texto_3 != '') {retorno += '        <p class="mb-0">'+texto_3+'</p>';}

        retorno += '                        </div>';
        retorno += '                    </div>';
        retorno += '                </div>';
        retorno += '            </div>';
        retorno += '            <div class="col align-self-center">';
        retorno += '                <div class="text-lg-center mt-4 mt-lg-0">';
        retorno += '                    <div class="row">';

        dados.forEach(function (item) {
            retorno += '                    <div class="'+item.col+'">';
            retorno += '                        <p class="text-muted text-nowrap mb-2">'+item.titulo+'</p>';
            retorno += '                        <h5 class="mb-0 text-nowrap">'+item.valor+'</h5>';
            retorno += '                    </div>';
        });

        retorno += '                    </div>';
        retorno += '                </div>';
        retorno += '            </div>';
        retorno += '            <div class="col-12 col-lg-1 d-lg-block">';
        retorno += '                <div class="clearfix mt-4 mt-lg-0">';
        retorno += '                    <div class="dropdown float-end">';
        retorno += '                        <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-cog-outline font-size-20 align-middle text-muted"></i></button>';
        retorno += '                        <div class="dropdown-menu dropdown-menu-end">';

        if (menu.length > 0) {
            menu.forEach(function (item) {
                retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
            });
        }

        retorno += '                            <div class="dropdown-divider"></div>';
        retorno += '                            <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
        retorno += '                        </div>';
        retorno += '                    </div>';
        retorno += '                </div>';
        retorno += '            </div>';
        retorno += '        </div>';
        retorno += '    </div>';
        retorno += '</div>';
    }

    if (op == 2) {
        retorno += '<div class="card" style="min-height: 370px;">';
        retorno += '    <div class="card-body">';
        retorno += '            <div class="col">';
        retorno += '                <div class="d-flex">';
        retorno += '                    <div class="flex-shrink-0 me-3"><i class="'+icone+' text-primary display-5"></i></div>';
        retorno += '                    <div class="flex-grow-1 align-self-center">';
        retorno += '                        <div class="text-muted">';

        if (texto_1 != '') {
            retorno += '                        <h5 class="mb-2">';
            retorno += '                            <b>'+texto_1+'</b>';
            retorno += '                            <div class="float-end dropdown">';
            retorno += '                                <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-filter align-middle text-muted"></i></button>';
            retorno += '                                <div class="dropdown-menu dropdown-menu-start">';

            if (menu.length > 0) {
                menu.forEach(function (item) {
                    retorno += '                            <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
                });
            }

            retorno += '                                </div>';
            retorno += '                            </div>';
            retorno += '                        </h5>';
        }
        if (texto_2 != '') {retorno += '        <p class="mb-1">'+texto_2+'</p>';}
        if (texto_3 != '') {retorno += '        <p class="mb-0">'+texto_3+'</p>';}

        retorno += '                        </div>';
        retorno += '                    </div>';
        retorno += '                </div>';
        retorno += '            </div>';
        retorno += '        <div class="table-responsive mt-4">';
        retorno += '            <table class="table align-middle table-nowrap">';
        retorno += '                <tbody>';

        dados.forEach(function (item) {
            retorno += '                <tr>';
            retorno += '                    <td style="width: 50%">';
            retorno += '                        <p class="mb-0">'+item.titulo+'</p>';
            retorno += '                    </td>';
            retorno += '                    <td style="width: 50%; text-align: right;">';
            retorno += '                        <h5 class="mb-0">'+item.valor+'</h5>';
            retorno += '                    </td>';
            retorno += '                </tr>';
        });

        retorno += '                </tbody>';
        retorno += '            </table>';
        retorno += '        </div>';
        retorno += '    </div>';
        retorno += '</div>';
    }

    document.getElementById(divId).innerHTML = retorno;
}

/*
* card : Se vai ser envolvido por um Card
* title : Título do Gráfico
* subtitle : Subtítulo do Gráfico
* series : Valores do Gráfico
* height : Altura do Gráfico
* labels : Labels do Gráfico
* valor_tipo : 1(moeda) 2(inteiro) 3(como enviado)
* divId : Id da Div que vai Renderizar o Gráfico
 */
function apexchartsPie({card=false, title, subtitle, series, height=330, labels, valor_tipo=1, divId}) {
    var options = {
        chart: {
            height: height,
            type: 'pie'
        },
        title: {
            text: title,
            align: 'center'
        },
        subtitle: {
            text: subtitle,
            align: 'center'
        },
        series: series,
        labels: labels,
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -20
                }
            }
        },
        dataLabels: {
            style: {
                fontSize: '10px'
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + '%'];
            }
        },
        tooltip: {
            y: {
                title: {
                    formatter(serieName) {
                        if (valor_tipo == 1) {
                            return serieName+': '+'R$ ';
                        } else {
                            return serieName+': ';
                        }
                    }
                },
                formatter: function(val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            fontSize: '10px',
            formatter: function(seriesName, opts) {
                const percent = parseFloat(opts.w.globals.seriesPercent[opts.seriesIndex]).toFixed(1);

                if (valor_tipo == 1) {
                    return seriesName + ": R$ " + float2moeda(opts.w.globals.series[opts.seriesIndex])+" ("+percent + '%'+")";
                } else if (valor_tipo == 2) {
                    return seriesName + ": " + parseInt(opts.w.globals.series[opts.seriesIndex])+" ("+percent + '%'+")";
                } else {
                    return seriesName + ": " + opts.w.globals.series[opts.seriesIndex]+" ("+percent + '%'+")";
                }
            }
        }
    };

    //Verificar se é para colocar o Card
    if (card) {
        var div = document.getElementById(divId).innerHTML = '<div class="card" style="min-height: 370px;" id="'+divId+'_card"><div class="card-body" id="'+divId+'_card_body"></div></div>';
        divId = divId+'_card_body';
    }

    //Renderizar
    var chart = new ApexCharts(document.querySelector('#'+divId), options);
    chart.render();
}

/*
* card : Se vai ser envolvido por um Card
* title : Título do Gráfico
* subtitle : Subtítulo do Gráfico
* series : Valores do Gráfico
* height : Altura do Gráfico
* labels : Labels do Gráfico
* valor_tipo : 1(moeda) 2(inteiro) 3(como enviado)
* divId : Id da Div que vai Renderizar o Gráfico
 */
function apexchartsDonut({card=false, title, subtitle, series, height=330, labels, valor_tipo=1, divId}) {
    var options = {
        chart: {
            height: height,
            type: 'donut'
        },
        title: {
            text: title,
            align: 'center'
        },
        subtitle: {
            text: subtitle,
            align: 'center'
        },
        series: series,
        labels: labels,
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -20
                }
            }
        },
        dataLabels: {
            style: {
                fontSize: '10px'
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + '%'];
            }
        },
        tooltip: {
            y: {
                title: {
                    formatter(serieName) {
                        if (valor_tipo == 1) {
                            return serieName+': '+'R$ ';
                        } else {
                            return serieName+': ';
                        }
                    }
                },
                formatter: function(val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            fontSize: '10px',
            formatter: function(seriesName, opts) {
                const percent = parseFloat(opts.w.globals.seriesPercent[opts.seriesIndex]).toFixed(1);

                if (valor_tipo == 1) {
                    return seriesName + ": R$ " + float2moeda(opts.w.globals.series[opts.seriesIndex])+" ("+percent + '%'+")";
                } else if (valor_tipo == 2) {
                    return seriesName + ": " + parseInt(opts.w.globals.series[opts.seriesIndex])+" ("+percent + '%'+")";
                } else {
                    return seriesName + ": " + opts.w.globals.series[opts.seriesIndex]+" ("+percent + '%'+")";
                }
            }
        }
    };

    //Verificar se é para colocar o Card
    if (card) {
        var div = document.getElementById(divId).innerHTML = '<div class="card" style="min-height: 370px;" id="'+divId+'_card"><div class="card-body" id="'+divId+'_card_body"></div></div>';
        divId = divId+'_card_body';
    }

    //Renderizar
    var chart = new ApexCharts(document.querySelector('#'+divId), options);
    chart.render();
}

/*
* card : Se vai ser envolvido por um Card
* title : Título do Gráfico
* subtitle : Subtítulo do Gráfico
* series_name : Nome da Série do Gráfico
* series_data : Valores do Gráfico
* colors : Cores do Gráfico
* height : Altura do Gráfico
* xaxis_categories : xaxis_categories do Gráfico
* valor_tipo : 1(moeda) 2(inteiro) 3(como enviado)
* divId : Id da Div que vai Renderizar o Gráfico
 */
function apexchartsBar({card=false, title, subtitle, series_name='', series_data, colors, height=330, xaxis_categories, valor_tipo=1, divId}) {
    var options = {
        chart: {
            height: height,
            type: 'bar',
            toolbar: {
                tools:{
                    download: false
                }
            }
        },
        title: {
            text: title,
            align: 'center'
        },
        subtitle: {
            text: subtitle,
            align: 'center'
        },
        series: [
            {
                name: series_name,
                data: series_data
            }
        ],
        colors: colors,
        plotOptions: {
            bar: {
                distributed: true
            }
        },
        dataLabels: {
            style: {
                fontSize: '10px'
            },
            formatter: function(val) {
                if (valor_tipo == 1) {
                    return 'R$ '+float2moeda(val);
                } else if (valor_tipo == 2) {
                    return parseInt(val);
                } else {
                    return val;
                }
            }
        },
        tooltip: {
            y: {
                title: {
                    formatter(serieName) {
                        if (valor_tipo == 1) {
                            return serieName+': '+'R$ ';
                        } else {
                            return serieName+': ';
                        }
                    }
                },
                formatter: function(val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            }
        },
        legend: {
            show: true,
            fontSize: '10px'
        },
        xaxis: {
            categories: xaxis_categories,
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            },
        },
    };

    //Verificar se é para colocar o Card
    if (card) {
        var div = document.getElementById(divId).innerHTML = '<div class="card" style="min-height: 370px;" id="'+divId+'_card"><div class="card-body" id="'+divId+'_card_body"></div></div>';
        divId = divId+'_card_body';
    }

    //Renderizar
    var chart = new ApexCharts(document.querySelector('#'+divId), options);
    chart.render();
}

/*
* card : Se vai ser envolvido por um Card
* title : Título do Gráfico
* subtitle : Subtítulo do Gráfico
* series : Valores do Gráfico
* height : Altura do Gráfico
* labels : Labels do Gráfico
* valor_tipo : 1(moeda) 2(inteiro) 3(como enviado)
* divId : Id da Div que vai Renderizar o Gráfico
 */
function apexchartsRadialBar({card=false, title, subtitle, series, height=330, labels, total_label, total_return, valor_tipo=1, divId}) {
    var options = {
        chart: {
            height: height,
            type: 'radialBar'
        },
        title: {text: title,
            align: 'center'
        },
        subtitle: {
            text: subtitle,
            align: 'center'
        },
        series: series,
        labels: labels,
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '14px'
                    },
                    value: {
                        fontSize: '14px'
                    },
                    total: {
                        show: true,
                        label: total_label,
                        formatter: function (w) {
                            return total_return
                        }
                    }
                }
            }
        }
    };

    //Verificar se é para colocar o Card
    if (card) {
        var div = document.getElementById(divId).innerHTML = '<div class="card" style="min-height: 370px;" id="'+divId+'_card"><div class="card-body" id="'+divId+'_card_body"></div></div>';
        divId = divId+'_card_body';
    }

    //Renderizar
    var chart = new ApexCharts(document.querySelector('#'+divId), options);
    chart.render();
}

/*
* Montar Gráfico de Linha
* card : Se vai ser envolvido por um Card
* title : Título do Gráfico
* subtitle : Subtítulo do Gráfico
* colors : Cores do Gráfico
* series : Valores do Gráfico
* height : Altura do Gráfico
* xaxis_categories : xaxis_categories do Gráfico
* xaxis_title_text : Texto do xaxis
* yaxis_title_text : Texto do yaxis
* valor_tipo : 1(moeda) 2(inteiro) 3(como enviado)
* divId : Id da Div que vai Renderizar o Gráfico
 */
function apexchartsLine({card=false, title, subtitle, colors, series, height=330, xaxis_categories, xaxis_title_text, yaxis_title_text, valor_tipo=1, divId}) {
    options = {
        chart: {
            height: height,
            type: 'line',
            zoom: {
                enabled: true
            },
            toolbar: {
                show: false
            }
        },
        title: {
            text: title,
            align: 'center'
        },
        subtitle: {
            text: subtitle,
            align: 'center'
        },
        colors: colors,
        series: series,
        dataLabels: {
            style: {
                fontSize: '10px'
            },
            formatter: function(val) {
                if (valor_tipo == 1) {
                    return 'R$ '+float2moeda(val);
                } else if (valor_tipo == 2) {
                    return parseInt(val);
                } else {
                    return val;
                }
            }
        },
        tooltip: {
            y: {
                title: {
                    formatter(serieName) {
                        if (valor_tipo == 1) {
                            return serieName+': '+'R$ ';
                        } else {
                            return serieName+': ';
                        }
                    }
                },
                formatter: function(val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            }
        },
        legend: {
            position: 'top',
            fontSize: '10px',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth'
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            },
            borderColor: '#e7e7e7'
        },
        markers: {
            style: 'inverted',
            size: 4
        },
        xaxis: {
            categories: xaxis_categories, //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
            title: {
                text: xaxis_title_text
            }
        },
        yaxis: {
            title: {
                text: yaxis_title_text
            },
            labels: {
                formatter: function (val) {
                    if (valor_tipo == 1) {
                        return float2moeda(val);
                    } else if (valor_tipo == 2) {
                        return parseInt(val);
                    } else {
                        return val;
                    }
                }
            },
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: !1
                    }
                },
                legend: {
                    show: !1
                }
            }
        }]
    };

    //Verificar se é para colocar o Card
    if (card) {
        var div = document.getElementById(divId).innerHTML = '<div class="card" style="min-height: 370px;" id="'+divId+'_card"><div class="card-body" id="'+divId+'_card_body"></div></div>';
        divId = divId+'_card_body';
    }

    //Renderizar
    var chart = new ApexCharts(document.querySelector('#'+divId), options);
    chart.render();
}

//Funções para Chamar cada Dashboard pelo Id - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Chamar cada Dashboard pelo Id - Início'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function dashboard1(card=false, op=1) {
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

            cardPrincipalAgrupamento({card:card, op:op, icone:dashboard_icone, texto_1:dashboard_agrupamento, dados:dados, menu:menu, divId:'divDashboard1'});
        });
    }
}

function dashboard2(card=false) {
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
            apexchartsBar({card:card, title:title, subtitle:subtitle, series_name:series_name, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:3, divId:'divDashboard2'});
        });
    }
}

function dashboard3(card=false) {
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
            apexchartsBar({card:card, title:title, subtitle:subtitle, series_name:series_name, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:3, divId:'divDashboard3'});
        });
    }
}

function dashboard4(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard4'});
        });
    }
}

function dashboard5(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard5'});
        });
    }
}

function dashboard6(card=false, op=1) {
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

            cardPrincipalAgrupamento({card:card, op:op, icone:dashboard_icone, texto_1:dashboard_agrupamento, texto_2:getReferencia(1, dashboards_modal_filtro_1_periodo1)+' até '+getReferencia(1, dashboards_modal_filtro_1_periodo2), texto_3:orgao_escolhido, dados:dados, menu:menu, divId:'divDashboard6'});
        });
    }
}

function dashboard7(card=false) {
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
            apexchartsRadialBar({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, total_label:total_label, total_return:total_return, valor_tipo:3, divId:'divDashboard7'});
        });
    }
}

function dashboard8(card=false) {
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
            apexchartsBar({card:card, title:title, subtitle:subtitle, series_data:series_data, colors:colors, height:330, xaxis_categories:xaxis_categories, valor_tipo:1, divId:'divDashboard8'});
        });
    }
}

function dashboard9(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard9'});
        });
    }
}

function dashboard10(card=false) {
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
            apexchartsDonut({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:3, divId:'divDashboard10'});
        });
    }
}

function dashboard11(card=false) {
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
            apexchartsLine({card:card, title:title, subtitle:subtitle, colors:colors, series:series, height:330, xaxis_categories:xaxis_categories, xaxis_title_text:xaxis_title_text, yaxis_title_text:yaxis_title_text, valor_tipo:1, divId:'divDashboard11'});

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

function dashboard12(card=false, op=1) {
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

            cardPrincipalAgrupamento({card:card, op:op, icone:dashboard_icone, texto_1:dashboard_agrupamento, texto_2:formatarData(2, dashboards_modal_filtro_2_data1)+' até '+formatarData(2, dashboards_modal_filtro_2_data2), texto_3:subconta_escolhida, dados:dados, menu:menu, divId:'divDashboard12'});
        });
    }
}

function dashboard13(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard13'});
        });
    }
}

function dashboard14(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard14'});
        });
    }
}

function dashboard15(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard15'});
        });
    }
}

function dashboard16(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard16'});
        });
    }
}

function dashboard17(card=false) {
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
            apexchartsPie({card:card, title:title, subtitle:subtitle, series:series, height:330, labels:labels, valor_tipo:1, divId:'divDashboard17'});
        });
    }
}
//Funções para Chamar cada Dashboard pelo Id - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Chamar cada Dashboard pelo Id - Fim''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''






























// /*
// * Card com uma única coluna
// * Cada uma célula com duas linhas
//  */
// function cg_card_modelo_1({titulo_tooltip=false, titulo=false, height=false, dados=false, menu=false, icone=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//         retorno += '        <div class="d-flex flex-wrap" style="height: '+height+'px;">';
//         retorno += '            <div>';
//
//         //Dados
//         if (dados) {
//             dados.forEach(function (item) {
//                 retorno += '                <p class="text-muted mb-1">' + item.descricao + '</p>';
//                 retorno += '                <h4 class="mb-3">' + item.valor + '</h4>';
//             });
//         }
//
//         retorno += '            </div>';
//         retorno += '            <div class="ms-auto align-self-end"><i class="'+icone+' display-4 text-light"></i></div>';
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * Card com duas colunas
// * Primeira com a descrição e a segunda com o valor
//  */
// function cg_card_modelo_2({titulo_tooltip=false, titulo=false, height=false, dados=false, menu=false, icone=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//         retorno += '        <div class="d-flex flex-wrap" style="height: '+height+'px;">';
//         retorno += '            <div class="col-10">';
//         retorno += '                <div class="row">';
//
//         //Dados
//         if (dados) {
//             dados.forEach(function (item) {
//                 retorno += '                <div class="col-12 row">';
//                 retorno += '                    <p class="col-8 text-muted mb-1">' + item.descricao + '</p>';
//                 retorno += '                    <h4 class="col-4 text-end mb-3">' + item.valor + '</h4>';
//                 retorno += '                </div>';
//             });
//         }
//
//         retorno += '                </div>';
//         retorno += '            </div>';
//         retorno += '            <div class="col-2 ms-auto align-self-end"><i class="'+icone+' display-4 text-light"></i></div>';
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * Card com três colunas
// * Primeira com a descrição, segunda com gráfico e terceira com porcentagem do valor
//  */
// function cg_card_modelo_3({titulo_tooltip=false, titulo=false, principal=false, principal_valor=false, principal_texto=false, height=false, dados=false, menu=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         //Principal
//         if (principal) {
//             retorno += '        <div class="text-muted text-center pb-3">';
//             retorno += '            <p class="mb-2 font-size-12"><b>'+principal+'</b></p>';
//             if (principal_valor) {
//                 retorno += '        <h6>'+principal_valor+'</h6>';
//             }
//             if (principal_texto) {
//                 retorno += '            <p class="mt-2 mb-0 font-size-12">'+principal_texto+'</p>';
//             }
//             retorno += '        </div>';
//         }
//
//         retorno += '        <div class="table-responsive" style="height: '+height+'px;">';
//         retorno += '            <table class="table align-middle mb-0">';
//         retorno += '                <tbody>';
//
//         //Dados
//         if (dados) {
//             dados.forEach(function (item) {
//                 retorno += '<tr>';
//                 retorno += '    <td style="padding: 0.5rem 0.5rem !important;">';
//                 retorno += '        <h5 class="font-size-10 mb-1">' + item.descricao + '</h5>';
//                 retorno += '        <p class="text-muted mb-0">' + item.valor + '</p>';
//                 retorno += '    </td>';
//                 retorno += '    <td style="padding: 0.5rem 0.5rem !important;">';
//                 retorno += '        <div id="' + item.id + '" class="apex-charts"></div>';
//                 retorno += '    </td>';
//                 retorno += '    <td style="padding: 0.5rem 0.5rem !important;">';
//                 //retorno += '        <p class="text-muted mb-1">'+item.descricao_porcentagem+'</p>';
//                 retorno += '        <h5 class="mb-0 font-size-12">' + item.porcentagem + ' %</h5>';
//                 retorno += '    </td>';
//                 retorno += '</tr>';
//             });
//         }
//
//         retorno += '                </tbody>';
//         retorno += '            </table>';
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// function cg_card_modelo_3_render(dados) {
//     //Dados
//     dados.forEach(function(item) {
//         var radialoptions = {
//             series: [item.porcentagem],
//             chart: {
//                 type: "radialBar",
//                 width: 60,
//                 height: 60,
//                 sparkline: {enabled: !0}
//             },
//             dataLabels: {enabled: !1},
//             colors: [item.cor],
//             plotOptions: {
//                 radialBar: {
//                     hollow: {
//                         margin: 0,
//                         size: "60%"
//                     },
//                     track: {
//                         margin: 0
//                     },
//                     dataLabels: {
//                         show: !1
//                     }
//                 }
//             }
//         },
//         radialchart = new ApexCharts(document.querySelector("#"+item.id), radialoptions);
//         radialchart.render();
//     });
// }
//
// /*
// * Card com duas colunas
// * Primeira com a descrição e a segunda com valor
//  */
// function cg_card_modelo_4({titulo_tooltip=false, titulo=false, height=false, dados=false, icone=false, icone_cor=false, descricao=false, total=false, menu=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div class="text-center">';
//
//         if (icone) {
//             retorno += '            <div class="mb-3"><i class="'+icone+' '+icone_cor+' display-4"></i></div>';
//         }
//
//         if (descricao) {
//             retorno += '            <h4>'+descricao+'</h4>';
//         }
//
//         if (total) {
//             retorno += '            <h4>'+total+'</h4>';
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div class="table-responsive" style="height: '+height+'px;">';
//         retorno += '            <table class="table align-middle mb-0">';
//         retorno += '                <tbody>';
//
//         //Dados
//         if (dados) {
//             dados.forEach(function (item) {
//                 retorno += '<tr>';
//                 retorno += '    <td style="width: 75%">';
//                 retorno += '        <p class="mb-0">' + item.descricao + '</p>';
//                 retorno += '    </td>';
//                 retorno += '    <td style="width: 25%">';
//                 retorno += '        <h5 class="mb-0">' + item.valor + '</h5>';
//                 retorno += '    </td>';
//                 retorno += '</tr>';
//             });
//         }
//
//         retorno += '                </tbody>';
//         retorno += '            </table>';
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * Card com Imagem e colunas com descriçao e valores
//  */
// function cg_card_modelo_5({col_1=true, imagem=false, texto_1=false, texto_2=false, texto_3=false, col_2=true, col_3=true, dados=false, menu=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body">';
//         retorno += '        <div class="row">';
//
//         if (col_1) {
//             retorno += '            <div class="col">';
//             retorno += '                <div class="d-flex">';
//
//             if (imagem) {
//                 retorno += '                <div class="flex-shrink-0 me-3"><i class="'+imagem+' text-primary text-center d-flex flex-column justify-content-center avatar-md rounded-circle img-thumbnail" style="font-size: 40px;"></i></div>';
//             }
//
//             if ((texto_1) || (texto_2) || (texto_3)) {
//                 retorno += '                    <div class="flex-grow-1 align-self-center">';
//                 retorno += '                        <div class="text-muted">';
//
//                 if (texto_1) {
//                     retorno += '                        <h5 class="mb-2">'+texto_1+'</h5>';
//                 }
//                 if (texto_2) {
//                     retorno += '                        <p class="mb-1">'+texto_2+'</p>';
//                 }
//                 if (texto_3) {
//                     retorno += '                        <p class="mb-0">'+texto_3+'</p>';
//                 }
//
//                 retorno += '                        </div>';
//                 retorno += '                    </div>';
//             }
//
//             retorno += '                </div>';
//             retorno += '            </div>';
//         }
//
//         if ((col_2) && (dados)) {
//             retorno += '            <div class="col align-self-center">';
//             retorno += '                <div class="text-lg-center mt-4 mt-lg-0">';
//             retorno += '                    <div class="row">';
//
//             //Dados
//             var classDado = 'col';
//             if (dados.length == 1) {classDado = 'col-12';}
//             if (dados.length == 2) {classDado = 'col-6';}
//             if (dados.length == 3) {classDado = 'col-4';}
//             if (dados.length == 4) {classDado = 'col-3';}
//             if (dados.length == 5) {classDado = 'col-2';}
//             if (dados.length == 6) {classDado = 'col-2';}
//             if (dados.length == 7) {classDado = 'col-2';}
//             if (dados.length == 8) {classDado = 'col-1';}
//             if (dados.length == 9) {classDado = 'col-1';}
//             if (dados.length == 10) {classDado = 'col-1';}
//             if (dados.length == 11) {classDado = 'col-1';}
//             if (dados.length == 12) {classDado = 'col-1';}
//
//             dados.forEach(function (item) {
//                 retorno += '                    <div class="'+classDado+'">';
//                 retorno += '                        <div>';
//                 retorno += '                            <p class="text-muted text-nowrap mb-2">'+item.descricao+'</p>';
//                 retorno += '                            <h5 class="mb-0 text-nowrap">'+item.valor+'</h5>';
//                 retorno += '                        </div>';
//                 retorno += '                    </div>';
//             });
//
//             retorno += '                    </div>';
//             retorno += '                </div>';
//             retorno += '            </div>';
//         }
//
//         if (col_3) {
//             if (menu.length > 0) {
//                 retorno += '    <div class="col-12 col-lg-1 d-lg-block">';
//                 retorno += '        <div class="clearfix mt-4 mt-lg-0">';
//                 retorno += '            <div class="dropdown float-end">';
//                 retorno += '                <button class="btn btn-sm btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-cog-outline font-size-20 align-middle"></i></button>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//                 retorno += '        </div>';
//                 retorno += '    </div>';
//             }
//         }
//
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * Card com Descrição, valor e Ícone
//  */
// function cg_card_modelo_6({col_1=true, descricao=false, valor=false, col_2=true, icone=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card mini-stats-wid" id="'+div_id+'">';
//         retorno += '    <div class="card-body">';
//         retorno += '        <div class="d-flex">';
//
//         if (col_1) {
//             retorno += '        <div class="flex-grow-1">';
//
//             if (descricao) {
//                 retorno += '        <p class="text-muted fw-medium">' + descricao + '</p>';
//             }
//
//             if (valor) {
//                 retorno += '        <h4 class="mb-0">' + valor + '</h4>';
//             }
//
//             retorno += '        </div>';
//         }
//
//         if (col_2) {
//             retorno += '        <div class="flex-shrink-0 align-self-center">';
//             retorno += '            <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">';
//             retorno += '                <span class="avatar-title rounded-circle bg-primary">';
//
//             if (icone) {
//                 retorno += '                <i class="' + icone + ' font-size-24"></i>';
//             }
//
//             retorno += '                </span>';
//             retorno += '            </div>';
//             retorno += '        </div>';
//         }
//
//         retorno += '        </div>';
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * Gráfico Simples de Barra
//  */
// function cg_graf_modelo_1({titulo_tooltip=false, titulo=false, height=false, dados=false, menu=false, graf_id=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div id="'+graf_id+'" class="apex-charts" dir="ltr"></div>';
//
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * @PARAM chart_height : Altura do Gráfico
// * @PARAM plotOptions_columnWidth : Largura da Barra
// * @PARAM plotOptions_dataLabels_position : Etiqueta com uma informação em cada Barra
// * @PARAM dataLabels_enabled : Colocar Valor na Barra
// * @PARAM dataLabels_offsetY : Posição que vai ficar Valor na Barra
// * @PARAM dataLabels_style_fontSize : Tamanho da fonte da Etiqueta com uma informação em cada Barra
// * @PARAM dataLabels_style_colors : Cor da fonte da Etiqueta com uma informação em cada Barra
// * @PARAM stroke_show : Espaçamento entre as Barras
// * @PARAM stroke_width : Tamanho do Espaçamento entre as Barras
// * @PARAM series : Nomes e Valores
// * @PARAM colors : Cor de cada Série
// * @PARAM xaxis : Colocar informações topo
// * @PARAM xaxis_categories :
// * @PARAM xaxis_position :
// * @PARAM yaxis : Colocar informações lateral esquerda
// * @PARAM yaxis_min : Valor mínimo da regua esquerda
// * @PARAM yaxis_max : Valor máximo da regua esquerda
// * @PARAM title : Título do Gráfico
// * @PARAM graf_id : Identificação do Gráfico
// */
// function cg_graf_modelo_1_render({chart_height=285, plotOptions_columnWidth=70, plotOptions_columnWidth_formatter='%', plotOptions_dataLabels_position='top', dataLabels_enabled=true, dataLabels_formatter='%', dataLabels_offsetY=-22, dataLabels_style_fontSize='10', dataLabels_style_colors='#304758', tooltip_formatter='', stroke_show=false, stroke_width=3, series=false, colors=false, xaxis=false, xaxis_categories=false, xaxis_position='top', yaxis=false, yaxis_labels_formatter='%', yaxis_min=0, yaxis_max=100, title='', graf_id}) {
//     options = {
//         chart: {height: chart_height, type: "bar", toolbar: {show: !1}},
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: plotOptions_columnWidth+plotOptions_columnWidth_formatter,
//                 dataLabels: {
//                     position: plotOptions_dataLabels_position
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: dataLabels_enabled,
//             formatter: function formatter(e) {
//                 if (dataLabels_formatter == 'R$') {
//                     return dataLabels_formatter+' '+float2moeda(e);
//                 } else {
//                     return e + dataLabels_formatter;
//                 }
//             },
//             offsetY: dataLabels_offsetY,
//             style: {fontSize: dataLabels_style_fontSize+'px', colors: [dataLabels_style_colors]}
//         },
//         tooltip: {
//             y: {
//                 formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
//                     if (tooltip_formatter == 'R$') {
//                         return tooltip_formatter+' '+float2moeda(value);
//                     } else {
//                         return value + tooltip_formatter;
//                     }
//                 }
//             }
//         },
//         stroke: {
//             show: stroke_show,
//             width: stroke_width,
//             colors: ['transparent']
//         },
//         series: series,
//         colors: colors,
//         grid: {borderColor: "#f1f1f1"},
//         xaxis: {
//             categories: xaxis_categories,
//             position: xaxis_position,
//             labels: {show:xaxis},
//             axisBorder: {show: xaxis},
//             axisTicks: {show: xaxis},
//             tooltip: {enabled: 1, offsetY: -35}
//         },
//         yaxis: {
//             labels: {show: yaxis, formatter: function formatter(e) {return e + yaxis_labels_formatter;}},
//             axisBorder: {show: yaxis},
//             axisTicks: {show: yaxis}
//
//             //Retirei essas linhas para deixar o ApexCharts resolver quais valores colocar
//             // min: yaxis_min,
//             // max: yaxis_max
//         },
//         title: {
//             text: title,
//             floating: 1,
//             offsetY: -6,
//             align: "center",
//             style: {
//                 color: "#000",
//                 fontWeight: "500"
//             }
//         },
//         legend: {
//             position: 'bottom',
//             //offsetY: 40,
//             labels: {
//                 style: {
//                     fontSize: '140px'
//                 }
//             }
//         }
//     };
//     (chart = new ApexCharts(document.querySelector("#"+graf_id), options)).render();
// }
//
// /*
// * Gráfico Piza
//  */
// function cg_graf_modelo_2({titulo_tooltip=false, titulo=false, height=false, dados=false, menu=false, graf_id=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div id="'+graf_id+'" class="apex-charts" dir="ltr"></div>';
//
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * @PARAM chart_height : Altura do Gráfico
// * @PARAM series : Nomes e Valores
// * @PARAM labels : Etiquetas de cada Série
// * @PARAM colors : Cor de cada Série
// * @PARAM legend_show: Colocar Legenda
// * @PARAM legend_position : Posição da Legenda
// * @PARAM legend_fontSize : Tamanho da Fonte da Legenda
// * @PARAM responsive_breakpoint:
// * @PARAM responsive_options_chart_height :
// * @PARAM responsive_options_chart_legend : Colocar Legenda no responsivo
// * @PARAM graf_id : Identificação do Gráfico
// */
// function cg_graf_modelo_2_render({chart_height=317, series=false, labels=false, colors=false, legend_show=true, legend_position='bottom', legend_fontSize=12, responsive_breakpoint=600, responsive_options_chart_height=240, responsive_options_chart_legend=true, graf_id}) {
//     options = {
//         chart: {height: chart_height, type: "pie"},
//         series: series, //series: [44, 55, 41, 17, 15]
//         labels: labels, //labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"]
//         colors: colors, //colors: ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"]
//         legend: {show: legend_show, position: legend_position, horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: legend_fontSize+'px', offsetX: 0},
//         responsive: [{
//             breakpoint: responsive_breakpoint,
//             options: {
//                 chart: {height: responsive_options_chart_height},
//                 legend: {show: responsive_options_chart_legend}
//             }
//         }]
//     };
//     (chart = new ApexCharts(document.querySelector("#"+graf_id), options)).render();
// }
//
// /*
// * Gráfico Donut
//  */
// function cg_graf_modelo_3({titulo_tooltip=false, titulo=false, height=false, dados=false, menu=false, graf_id=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div id="'+graf_id+'" class="apex-charts" dir="ltr"></div>';
//
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * @PARAM chart_height : Altura do Gráfico
// * @PARAM series : Nomes e Valores
// * @PARAM labels : Etiquetas de cada Série
// * @PARAM colors : Cor de cada Série
// * @PARAM legend_show: Colocar Legenda
// * @PARAM legend_position : Posição da Legenda
// * @PARAM legend_fontSize : Tamanho da Fonte da Legenda
// * @PARAM responsive_breakpoint:
// * @PARAM responsive_options_chart_height :
// * @PARAM responsive_options_chart_legend : Colocar Legenda no responsivo
// * @PARAM graf_id : Identificação do Gráfico
// */
// function cg_graf_modelo_3_render({chart_height=317, series=false, labels=false, colors=false, legend_show=true, legend_position='bottom', legend_fontSize=12, responsive_breakpoint=600, responsive_options_chart_height=240, responsive_options_chart_legend=true, graf_id}) {
//     options = {
//         chart: {height: chart_height, type: "donut"},
//         series: series, //series: [44, 55, 41, 17, 15]
//         labels: labels, //labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"]
//         colors: colors, //colors: ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"]
//         legend: {show: legend_show, position: legend_position, horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: legend_fontSize+'px', offsetX: 0},
//         responsive: [{
//             breakpoint: responsive_breakpoint,
//             options: {
//                 chart: {height: responsive_options_chart_height},
//                 legend: {show: responsive_options_chart_legend}
//             }
//         }]
//     };
//
//     (chart = new ApexCharts(document.querySelector("#"+graf_id), options)).render();
// }
//
// /*
// * Gráfico de Pontos
//  */
// function cg_graf_modelo_4({titulo_tooltip=false, titulo=false, height=false, menu=false, graf_id=false, div_id=false}) {
//     return new Promise(function(resolve, reject) {
//         var retorno = '';
//
//         retorno += '<div class="card" id="'+div_id+'">';
//         retorno += '    <div class="card-body px-3 py-2">';
//         retorno += '        <div class="d-flex flex-wrap align-items-start">';
//         retorno += '            <h5 class="card-title font-size-12 mb-3 me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title="'+titulo_tooltip+'">'+titulo+'</h5>';
//
//         //Dropdown
//         if (menu) {
//             if (menu.length > 0) {
//                 retorno += '            <div class="dropdown ms-auto">';
//                 retorno += '                <a class="text-muted dropdown-toggle font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-horizontal"></i></a>';
//                 retorno += '                <div class="dropdown-menu dropdown-menu-end">';
//
//                 menu.forEach(function (item) {
//                     retorno += '                    <a class="dropdown-item" href="javascript:void(0)" onclick="'+item.onclick+'">' + item.nome + '</a>';
//                 });
//
//                 retorno += '                    <div class="dropdown-divider"></div>';
//                 retorno += '                    <a class="dropdown-item" href="javascript:void(0)">Fechar</a>';
//                 retorno += '                </div>';
//                 retorno += '            </div>';
//             }
//         }
//
//         retorno += '        </div>';
//
//         retorno += '        <div id="'+graf_id+'" class="apex-charts" dir="ltr"></div>';
//
//         retorno += '    </div>';
//         retorno += '</div>';
//
//         $('#'+div_id).html(retorno);
//
//         resolve();
//     });
// }
//
// /*
// * @PARAM chart_height : Altura do Gráfico
// * @PARAM colors : Cor de cada Série
// * @PARAM series : Nomes e Valores
// * @PARAM dataLabels_enabled : Colocar Valor nos Pontos
// * @PARAM dataLabels_style_colors : Cor de Fundo entre pontos
// * @PARAM stroke_width : Espessura da Linha
// * @PARAM grid_row_colors : Cor das Linhas de fundo
// * @PARAM xaxis_categories :
// * @PARAM xaxis_title_text : Título Inferior/Superior
// * @PARAM yaxis_title_text : Título Esquerdo
// * @PARAM yaxis_min : Valor mínimo da regua esquerda
// * @PARAM yaxis_max : Valor máximo da regua esquerda
// * @PARAM title_text : Título do Gráfico
// * @PARAM graf_id : Identificação do Gráfico
// */
// function cg_graf_modelo_4_render({chart_height=285, colors=false, series=false, dataLabels_enabled=false, dataLabels_style_colors=['#000000'], dataLabels_formatter='', tooltip_formatter='', stroke_width=[3,3], grid_row_colors=false, xaxis_categories=false, xaxis_title_text='', yaxis_title_text='', yaxis_min=0, yaxis_max=100, title_text='', graf_id}) {
//     options = {
//         chart: {height: chart_height, type: "line", zoom: {enabled: !1}, toolbar: {show: !1}},
//         colors: colors, //colors: ["#556ee6", "#34c38f"]
//         series: series, //series: [{name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33]}, {name: "Low - 2018", data: [14, 11, 16, 12, 17, 13, 12]}]
//         dataLabels: {
//             enabled: dataLabels_enabled,
//             formatter: function formatter(e) {
//                 if (dataLabels_formatter == 'R$') {
//                     return dataLabels_formatter+' '+float2moeda(e);
//                 } else {
//                     return e;
//                 }
//             },
//             style: {colors: dataLabels_style_colors}
//         },
//         stroke: {
//             width: stroke_width, //[3, 3]
//             curve: "straight"
//         },
//         grid: {
//             row: {
//                 colors: grid_row_colors, //colors: ["transparent", "transparent"]
//                 opacity: .2
//             },
//             borderColor: "#f1f1f1"
//         },
//         xaxis: {
//             categories: xaxis_categories, //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
//             title: {text: xaxis_title_text}
//         },
//         yaxis: {
//             title: {text: yaxis_title_text}
//
//             //Retirei essas linhas para deixar o ApexCharts resolver quais valores colocar
//             // min: yaxis_min,
//             // max: yaxis_max
//         },
//         title: {
//             text: title_text,
//             align: "center",
//             style: {fontWeight: "500"}
//         },
//         markers: {
//             style: "inverted",
//             size: 6
//         },
//         legend: {
//             position: "top",
//             horizontalAlign: "right",
//             floating: !0,
//             offsetY: -25,
//             offsetX: -5
//         },
//         tooltip: {
//             y: {
//                 formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
//                     if (tooltip_formatter == 'R$') {
//                         return tooltip_formatter+' '+float2moeda(value);
//                     } else {
//                         return value + tooltip_formatter;
//                     }
//                 }
//             }
//         },
//         responsive: [{
//             breakpoint: 600,
//             options: {
//                 chart: {
//                     toolbar: {
//                         show: !1
//                     }
//                 },
//                 legend: {
//                     show: !1
//                 }
//             }
//         }]
//     };
//
//     (chart = new ApexCharts(document.querySelector("#"+graf_id), options)).render();
// }
