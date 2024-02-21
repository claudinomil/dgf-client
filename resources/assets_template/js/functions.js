//Funções para o Submódulo Ressarcimento Recebimentos - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Ressarcimento Recebimentos - INÍCIO''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


//Configurar tabela gradeRecebimentosTable
function gradeRecebimentosTableConfigurar() {
    var total_valor = 0;
    var total_valor_recebido = 0;
    var total_saldo_restante = 0;

    //Varrer gradeRecebimentosTbodyTr
    $(".gradeRecebimentosTbodyTr").each(function () {
        //Pegando valores ta tabela tr
        var recebimento_id = $(this).data('recebimento_id');
        var valor = $("#valor_"+recebimento_id).val();
        var valor_recebido = $("#valor_recebido_br_"+recebimento_id).val();

        //Alterando valores
        valor_recebido = moeda2float(valor_recebido);
        var saldo_restante = valor - valor_recebido;

        //Totais
        total_valor += 1*valor;
        total_valor_recebido += 1*valor_recebido;
        total_saldo_restante += 1*saldo_restante;

        //Retornando valores
        $("#valor_"+recebimento_id).val(valor);
        $("#valor_recebido_"+recebimento_id).val(valor_recebido);
        $("#valor_recebido_br_"+recebimento_id).val(float2moeda(valor_recebido));
        $("#saldo_restante_"+recebimento_id).val(saldo_restante);
        $("#saldo_restante_br_"+recebimento_id).val(float2moeda(saldo_restante));

        //Colocando o input saldo_restante_br_* como disabled
        $("#saldo_restante_br_"+recebimento_id).prop('disabled', true);
    });

    //Retornando valores totais
    $("#total_valor").val(float2moeda(total_valor));
    $("#total_valor_recebido").val(float2moeda(total_valor_recebido));
    $("#total_saldo_restante").val(float2moeda(total_saldo_restante));

    //Ajustar tamanhos das colunas de valores'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    var col_valor_largura = $("#gradeRecebimentosTable .col_valor").width();
    if (col_valor_largura < 90) {col_valor_largura = 90;}

    $("#gradeRecebimentosTable .col_valor").css('width', col_valor_largura);

    $("#gradeRecebimentosTable .col_valor_recebido").css('width', col_valor_largura+20);
    $("#gradeRecebimentosTable .col_valor_recebido").css('min-width', col_valor_largura+20);
    $("#gradeRecebimentosTable .col_valor_recebido").css('max-width', col_valor_largura+20);

    $("#gradeRecebimentosTable .col_saldo_restante").css('width', col_valor_largura+20);
    $("#gradeRecebimentosTable .col_saldo_restante").css('min-width', col_valor_largura+20);
    $("#gradeRecebimentosTable .col_saldo_restante").css('max-width', col_valor_largura+20);
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}

//Funções para o Submódulo Ressarcimento Recebimentos - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para o Submódulo Ressarcimento Recebimentos - FIM'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function notificacaoLerData(id) {
    //Buscar dados do Registro
    $.get("notificacoes/"+id, function (data) {
        //Lendo dados
        if (data.success) {
            $('.jsonNotificacaoLerTitulo').html(data.success.title);
            $('.jsonNotificacaoLerNotificacao').html(data.success.notificacao);
        } else if (data.error_not_found) {
            alertSwal('warning', "Registro não encontrado", '', 'true', 2000);
        } else if (data.error_permissao) {
            alertSwal('warning', "Permissão Negada", '', 'true', 2000);
        } else {
            alert('Erro interno');
        }
    });
}

//Marcar permissão -list quando escolher qualquer outra
function checkedPermissaoTable(opClick, submodulo_id) {
    //opClick = 1 : Clicou em todos_listar
    if (opClick == 1) {
        if ($('#todos_listar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            $('#todos_mostrar').prop('checked', false);
            $('#todos_criar').prop('checked', false);
            $('#todos_editar').prop('checked', false);
            $('#todos_deletar').prop('checked', false);

            for (id = 1; id <= 100; id++) {
                $('#listar_' + id).prop('checked', false);
                $('#mostrar_' + id).prop('checked', false);
                $('#criar_' + id).prop('checked', false);
                $('#editar_' + id).prop('checked', false);
                $('#deletar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 2 : Clicou em todos_mostrar
    if (opClick == 2) {
        if ($('#todos_mostrar').is(':checked') == true) {
            $('#todos_listar').prop('checked', true);

            for (id = 1; id <= 100; id++) {
                $('#mostrar_' + id).prop('checked', true);

                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#mostrar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 3 : Clicou em todos_criar
    if (opClick == 3) {
        if ($('#todos_criar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#criar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#criar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 4 : Clicou em todos_editar
    if (opClick == 4) {
        if ($('#todos_editar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#editar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#editar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 5 : Clicou em todos_deletar
    if (opClick == 5) {
        if ($('#todos_deletar').is(':checked') == true) {
            for (id = 1; id <= 100; id++) {
                $('#deletar_' + id).prop('checked', true);

                $('#todos_listar').prop('checked', true);
                $('#listar_' + id).prop('checked', true);
            }
        } else {
            for (id = 1; id <= 100; id++) {
                $('#deletar_' + id).prop('checked', false);
            }
        }
    }

    //opClick = 6 : Clicou em listar_
    if (opClick == 6) {
        if ($('#listar_' + submodulo_id).is(':checked') == false) {
            $('#todos_mostrar').prop('checked', false);
            $('#mostrar_' + submodulo_id).prop('checked', false);

            $('#todos_criar').prop('checked', false);
            $('#criar_' + submodulo_id).prop('checked', false);

            $('#todos_editar').prop('checked', false);
            $('#editar_' + submodulo_id).prop('checked', false);

            $('#todos_deletar').prop('checked', false);
            $('#deletar_' + submodulo_id).prop('checked', false);
        }
    }

    //opClick = 7 : Clicou em mostrar_
    if (opClick == 7) {
        if ($('#mostrar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#mostrar_' + submodulo_id).is(':checked') == false) {
            $('#todos_mostrar').prop('checked', false);
        }
    }

    //opClick = 8 : Clicou em criar_
    if (opClick == 8) {
        if ($('#criar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#criar_' + submodulo_id).is(':checked') == false) {
            $('#todos_criar').prop('checked', false);
        }
    }
    //opClick = 9 : Clicou em editar_
    if (opClick == 9) {
        if ($('#editar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#editar_' + submodulo_id).is(':checked') == false) {
            $('#todos_editar').prop('checked', false);
        }
    }
    //opClick = 10 : Clicou em deletar_
    if (opClick == 10) {
        if ($('#deletar_' + submodulo_id).is(':checked') == true) {
            $('#listar_' + submodulo_id).prop('checked', true);
        }

        if ($('#deletar_' + submodulo_id).is(':checked') == false) {
            $('#todos_deletar').prop('checked', false);
        }
    }
}

//Modal de Confirmação
function alertSwalConfirmacao(callback) {
    Swal.fire({
        title: 'Confirma operação?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
        confirmButtonColor: '#38c172',
        denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
        denyButtonColor: '#e3342f',
        customClass: {
            container: '...',
            popup: 'small',
            header: '...',
            title: 'h5',
            closeButton: '...',
            icon: 'small',
            image: '...',
            content: '...',
            htmlContainer: '...',
            input: '...',
            inputLabel: '...',
            validationMessage: '...',
            actions: '...',
            confirmButton: 'btn btn-success',
            denyButton: '...',
            cancelButton: 'btn btn-primary',
            loader: '...',
            footer: '....'
        }
    }).then((confirmed) => {
        callback(confirmed && confirmed.value == true);
    });
}

//Modal de Confirmação com submit
function alertSwalConfirmacaoSubmit(frm_name) {
    Swal.fire({
        title: 'Confirma operação?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
        confirmButtonColor: '#38c172',
        denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
        denyButtonColor: '#e3342f',
        customClass: {
            container: '...',
            popup: 'small',
            header: '...',
            title: 'h5',
            closeButton: '...',
            icon: 'small',
            image: '...',
            content: '...',
            htmlContainer: '...',
            input: '...',
            inputLabel: '...',
            validationMessage: '...',
            actions: '...',
            confirmButton: 'btn btn-success',
            denyButton: '...',
            cancelButton: 'btn btn-primary',
            loader: '...',
            footer: '....'
        }
    }).then((confirmed) => {
        $('#'+frm_name).submit();
    });
}

//Modal de Confirmação para Exclusão de Registro - (CRUD)
// function alertSwalConfirmacaoExclusaoRegistro(id, descricao) {
//     Swal.fire({
//         title: 'Confirma exclusão do registro?',
//         text: descricao,
//         icon: 'warning',
//         showDenyButton: true,
//         confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirmar',
//         confirmButtonColor: '#38c172',
//         denyButtonText: `<i class="fa fa-thumbs-down"></i> Cancelar`,
//         denyButtonColor: '#e3342f'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Livewire.emit("destroy", id);
//         }
//     });
// }

//Modal para Mensagens
function alertSwal(icon='success', title='', html='', showConfirmButton=false, timer=2000) {
    Swal.fire({
        icon: icon,
        title: title,
        html: html,
        showConfirmButton: showConfirmButton,
        timer: timer
    });
}

//visualizar a imagem da font awesome em uma div ao lado
function viewFontAwesome(field) {
    if ($('#'+field).val() != '') {
        const image_view = $('#image_view');
        image_view.attr('class', $('#'+field).val());
    }
}

/*
 * Retornar referencia
 * @PARAM op=1 : recebe 20230902 e retorna setembro de 2023 parte 02
 * @PARAM op=2 : recebe 202309 e retorna setembro de 2023
 * @PARAM op=3 : recebe setembro de 2023 parte 02 e retorna 20230902
 * @PARAM op=4 : recebe setembro de 2023 e retorna 202309
 */
function getReferencia(op, referencia) {
    var referencia = referencia.toString();

    if (op == 1) {
        var ano = referencia.substring(0, 4);
        var mes = referencia.substring(4, 6);
        var parte = referencia.substring(6, 8);
        var mes_extenso = getMes(1, mes);

        return mes_extenso+' de '+ano+' parte '+parte;
    }

    if (op == 2) {
        var ano = referencia.substring(0, 4);
        var mes = referencia.substring(4, 6);
        var mes_extenso = getMes(1, mes);

        return mes_extenso+' de '+ano;
    }

    if (op == 3) {
        const explode = referencia.split(' ');

        parte = explode[4];
        ano = explode[2];
        mes_extenso = explode[0];
        mes = getMes(2, mes_extenso);

        return ano+mes+parte;
    }

    if (op == 4) {
        const explode = referencia.split(' ');

        ano = explode[2];
        mes_extenso = explode[0];
        mes = getMes(2, mes_extenso);

        return ano+mes;
    }

    return false;
}

/*
 * Retornar Mês e Mês por Extenso
 * @PARAM op=1 = retorna Mês por Extenso
 * @PARAM op=2 = retorna Mês Numeral
 */
function getMes(op, mes) {
    if (op == 1) {
        if (mes.length == 1) {mes = '0'+mes;}

        if (mes == '01') {return 'janeiro';}
        if (mes == '02') {return 'fevereiro';}
        if (mes == '03') {return 'março';}
        if (mes == '04') {return 'abril';}
        if (mes == '05') {return 'maio';}
        if (mes == '06') {return 'junho';}
        if (mes == '07') {return 'julho';}
        if (mes == '08') {return 'agosto';}
        if (mes == '09') {return 'setembro';}
        if (mes == '10') {return 'outubro';}
        if (mes == '11') {return 'novembro';}
        if (mes == '12') {return 'dezembro';}
    }

    if (op == 2) {
        if (mes == 'janeiro') {return '01';}
        if (mes == 'fevereiro') {return '02';}
        if (mes == 'março') {return '03';}
        if (mes == 'abril') {return '04';}
        if (mes == 'maio') {return '05';}
        if (mes == 'junho') {return '06';}
        if (mes == 'julho') {return '07';}
        if (mes == 'agosto') {return '08';}
        if (mes == 'setembro') {return '09';}
        if (mes == 'outubro') {return '10';}
        if (mes == 'novembro') {return '11';}
        if (mes == 'dezembro') {return '12';}
    }

    return false;
}

//Retorna data por extenso
//op=1, data=14/04/2023 : Sexta-feira, 14 de Abril de 2023
//op=2, data=14/04/2023 : Rio de Janeiro, 14 de Abril de 2023
//op=3, data=14/04/2023 : Rio de Janeiro, Sexta-feira, 14 de Abril de 2023

function dataExtenso(op, data_informada) {
    meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
    semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");

    var dia_informado = data_informada.split('/')[0];
    var mes_informado = data_informada.split('/')[1];
    var ano_informado = data_informada.split('/')[2];
    var data = ano_informado + '-' + mes_informado + '-' + dia_informado + " 00:00:00";
    var dataInfo = new Date(data);
    var dia = dataInfo.getDate();
    var dias = dataInfo.getDay();
    var mes = dataInfo.getMonth();
    var ano = dataInfo.getFullYear();

    if (op == 1) {
        var dataext = semana[dias] + ", " + dia + " de " + meses[mes] + " de " + ano;
    }

    if (op == 2) {
        var dataext = "Rio de Janeiro, " + dia + " de " + meses[mes] + " de " + ano;
    }

    if (op == 3) {
        var dataext = "Rio de Janeiro, " + semana[dias] + ", " + dia + " de " + meses[mes] + " de " + ano;
    }

    return dataext;
}

function valorExtenso(vlr) {
    var Num=parseFloat(vlr);

    if (vlr == 0) {
        return "Zero";
    } else {
        var inteiro = parseInt(vlr);; // parte inteira do valor

        if(inteiro<1000000000000000) {
            var resto = Num.toFixed(2) - inteiro.toFixed(2);       // parte fracionária do valor
            resto=resto.toFixed(2)
            var vlrS =  inteiro.toString();

            var cont=vlrS.length;
            var extenso="";
            var auxnumero;
            var auxnumero2;
            var auxnumero3;

            var unidade =["", "um", "dois", "três", "quatro", "cinco",
                "seis", "sete", "oito", "nove", "dez", "onze",
                "doze", "treze", "quatorze", "quinze", "dezesseis",
                "dezessete", "dezoito", "dezenove"];

            var centena = ["", "cento", "duzentos", "trezentos",
                "quatrocentos", "quinhentos", "seiscentos",
                "setecentos", "oitocentos", "novecentos"];

            var dezena = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
                "sessenta", "setenta", "oitenta", "noventa"];

            var qualificaS = ["reais", "mil", "milhão", "bilhão", "trilhão"];
            var qualificaP = ["reais", "mil", "milhões", "bilhões", "trilhões"];

            for (var i=cont;i > 0;i--)
            {
                var verifica1="";
                var verifica2=0;
                var verifica3=0;
                auxnumero2="";
                auxnumero3="";
                auxnumero=0;
                auxnumero2 = vlrS.substr(cont-i,1);
                auxnumero = parseInt(auxnumero2);


                if((i==14)||(i==11)||(i==8)||(i==5)||(i==2))
                {
                    auxnumero2 = vlrS.substr(cont-i,2);
                    auxnumero = parseInt(auxnumero2);
                }

                if((i==15)||(i==12)||(i==9)||(i==6)||(i==3))
                {
                    extenso=extenso+centena[auxnumero];
                    auxnumero2 = vlrS.substr(cont-i+1,1)
                    auxnumero3 = vlrS.substr(cont-i+2,1)

                    if((auxnumero2!="0")||(auxnumero3!="0"))
                        extenso+=" e ";

                }else

                if(auxnumero>19){
                    auxnumero2 = vlrS.substr(cont-i,1);
                    auxnumero = parseInt(auxnumero2);
                    extenso=extenso+dezena[auxnumero];
                    auxnumero3 = vlrS.substr(cont-i+1,1)

                    if((auxnumero3!="0")&&(auxnumero2!="1"))
                        extenso+=" e ";
                }
                else if((auxnumero<=19)&&(auxnumero>9)&&((i==14)||(i==11)||(i==8)||(i==5)||(i==2)))
                {
                    extenso=extenso+unidade[auxnumero];
                }else if((auxnumero<10)&&((i==13)||(i==10)||(i==7)||(i==4)||(i==1)))
                {
                    auxnumero3 = vlrS.substr(cont-i-1,1);
                    if((auxnumero3!="1")&&(auxnumero3!=""))
                        extenso=extenso+unidade[auxnumero];
                }

                if(i%3==1)
                {
                    verifica3 = cont-i;
                    if(verifica3==0)
                        verifica1 = vlrS.substr(cont-i,1);

                    if(verifica3==1)
                        verifica1 = vlrS.substr(cont-i-1,2);

                    if(verifica3>1)
                        verifica1 = vlrS.substr(cont-i-2,3);

                    verifica2 = parseInt(verifica1);

                    if(i==13)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[4]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[4]+" ";}}
                    if(i==10)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[3]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[3]+" ";}}
                    if(i==7)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[2]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[2]+" ";}}
                    if(i==4)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[1]+" ";
                        }else if(verifica2!=0){extenso=extenso+" "+qualificaP[1]+" ";}}
                    if(i==1)
                    {
                        if(verifica2==1){
                            extenso=extenso+" "+qualificaS[0]+" ";
                        }else {extenso=extenso+" "+qualificaP[0]+" ";}}
                }
            }
            resto = resto * 100;
            var aexCent=0;
            if(resto<=19&&resto>0)
                extenso+=" e "+unidade[resto]+" Centavos";
            if(resto>19)
            {
                aexCent=parseInt(resto/10);

                extenso+=" e "+dezena[aexCent]
                resto=resto-(aexCent*10);

                if(resto!=0)
                    extenso+=" e "+unidade[resto]+" Centavos";
                else extenso+=" Centavos";
            }

            return extenso;
        } else {
            return "Numero maior que 999 trilhões";
        }
    }
}

function float2moeda(num) {
    x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }

    if (isNaN(num)) num = "0";

    cents = Math.floor((num*100+0.5)%100);
    num = Math.floor((num*100+0.5)/100).toString();

    if (cents < 10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    ret = num + ',' + cents;

    if (x == 1) ret = ' - ' + ret;

    return ret;
}

function moeda2float(moeda){
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(".","");
    moeda = moeda.replace(",",".");
    return parseFloat(moeda);
}

/*
* @PARAM op=1 : Entrada 01/02/2003   Saída 2003-02-01
* @PARAM op=2 : Entrada 2003-02-01   Saída 01/02/2003
 */
function formatarData(op, data) {
    if (data === null || data == '') {return '';}

    if (op == 1) {
        var dia = data.substring(0, 2);
        var mes = data.substring(3, 5);
        var ano = data.substring(6, 10);

        return ano+'-'+mes+'-'+dia;
    }

    if (op == 2) {
        var dia = data.substring(8, 10);
        var mes = data.substring(5, 7);
        var ano = data.substring(0, 4);

        return dia+'/'+mes+'/'+ano;
    }
}

function gerarCor(op=0) {
    if (op == 1) {
        cor = '#556ee6';
    } else if (op == 2) {
        cor = '#f46a6a';
    } else if (op == 3) {
        cor = '#34c38f';
    } else if (op == 4) {
        cor = '#f1b44c';
    } else if (op == 5) {
        cor = '#564ab1';
    } else if (op == 6) {
        cor = '#adb5bd';
    } else if (op == 7) {
        cor = '#e83e8c';
    } else if (op == 8) {
        cor = '#000000';
    } else if (op == 9) {
        cor = '#50a5f1';
    } else if (op == 10) {
        cor = '#74788d';
    } else if (op == 11) {
        cor = '#6f42c1';
    } else if (op == 12) {
        cor = '#e83e8c';
    } else if (op == 13) {
        cor = '#34c38f';
    } else if (op == 14) {
        cor = '#f1b44c';
    } else if (op == 15) {
        cor = '#556ee6';
    } else if (op == 16) {
        cor = '#74788d';
    } else if (op == 17) {
        cor = '#f46a6a';
    } else if (op == 18) {
        cor = '#50a5f1';
    } else if (op == 19) {
        cor = '#343a40';
    } else if (op == 20) {
        cor = '#74788d';
    } else {
        var hexadecimais = '0123456789ABCDEF';
        var cor = '#';

        //Pega um número aleatório no array acima
        for (var i = 0; i < 6; i++) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
    }

    return cor;
}

//Funções para operações de CRUD fora do arquivo scripts-ajax.blade.php - INÍCIO''''''''''''''''''''''''''''''''''''''''
//Funções para operações de CRUD fora do arquivo scripts-ajax.blade.php - INÍCIO''''''''''''''''''''''''''''''''''''''''

/*
* Retorna preenchimento via ajax da tabela do CRUD
* Serve para quando não for usar o arquivo scripts-ajax.blade.php
* Quando quiser ter uma tabela preenchida da mesma forma com o DataTables via Controller
 */
function crudAjaxTable(route, fieldsColumns='', pageLength=5) {
    if (fieldsColumns == '') {
        let crudAjaxFieldsColumnsTable = $('#crudAjaxFieldsColumnsTable').val();
        let camposColunasTabelas = crudAjaxFieldsColumnsTable.split(',');
        fieldsColumns = [];
        camposColunasTabelas.forEach(function (campo) {
            fieldsColumns.push({data: campo});
        });
    }

    $('.datatable-crud-ajax').DataTable({
        language: {
            pageLength: {
                '-1': 'Mostrar todos os registros',
                '_': 'Mostrar %d registros'
            },
            lengthMenu: 'Exibir _MENU_ resultados por página',
            emptyTable: 'Nenhum registro encontrado',
            info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 até 0 de 0 registros',
            infoFiltered: '(Filtrados de _MAX_ registros)',
            infoThousands: '.',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            zeroRecords: 'Nenhum registro encontrado',
            search: 'Pesquisar',
            paginate: {
                next: 'Próximo',
                previous: 'Anterior',
                first: 'Primeiro',
                last: 'Último'
            }
        },
        bDestroy: true,
        responsive: true,
        lengthChange: true,
        autoWidth: true,
        order: [],
        processing: true,
        serverSide: false,
        pageLength: pageLength,
        ajax: route,
        columns: fieldsColumns
    });
}

//Configuração
function crudAjaxConfiguracao({p_frm_operacao=null, p_fieldsDisabled=null, p_crudFormButtons1=null, p_crudFormButtons2=null, p_crudTable=null, p_crudForm=null, p_crudFormAjaxLoading=null, p_removeMask=null, p_putMask=null}) {
    //Campo hidden frm_operacao
    if (p_frm_operacao !== null) {$('#frm_operacao').val(p_frm_operacao);}

    //Campos do Formulário - disabled true/false
    if (p_fieldsDisabled !== null) {
        $('input').prop('disabled', p_fieldsDisabled);
        $('textarea').prop('disabled', p_fieldsDisabled);
        $('select').prop('disabled', p_fieldsDisabled);
        $('.select2').prop('disabled', p_fieldsDisabled);

        //Campos do Formulário - disabled true/false (Campos Padrões)
        if (p_fieldsDisabled === true) {
            $('#pesquisar_field').prop('disabled', false);
            $('#pesquisar_value').prop('disabled', false);
            $('.fildFilterTable').prop('disabled', false);
            $('.fildLengthTable').prop('disabled', false);
        }
    }

    //Botões do Modal
    if (p_crudFormButtons1 == 'show') {$('#crudFormButtons1').show();}

    if (p_crudFormButtons1 == 'hide') {$('#crudFormButtons1').hide();}

    if (p_crudFormButtons2 == 'show') {$('#crudFormButtons2').show();}

    if (p_crudFormButtons2 == 'hide') {$('#crudFormButtons2').hide();}

    //Table Show/Hide
    if (p_crudTable == 'show') {$('#crudTable').show();}

    if (p_crudTable == 'hide') {$('#crudTable').hide();}

    //Form Show/Hide
    if (p_crudForm == 'show') {$('#crudForm').show();}

    if (p_crudForm == 'hide') {$('#crudForm').hide();}

    //DIV Loading Show/Hide
    if (p_crudFormAjaxLoading == 'show') {$('#crudFormAjaxLoading').show();}

    if (p_crudFormAjaxLoading == 'hide') {$('#crudFormAjaxLoading').hide();}

    //Removendo Máscaras
    if (p_removeMask === true) {removeMask();}

    //Restaurando Máscaras
    if (p_putMask === true) {putMask();}
}

//Preencher Formulario
function crudAjaxPreencherFormulario(campo, dados) {
    if (campo == 'id') {
        $('#registro_id').val(dados['id']);
    } else {
        if ($('#'+campo).hasClass('select2')) {
            $('#'+campo).val(dados[campo]).trigger('change');
        } else {
            $('#'+campo).val(dados[campo]);
        }
    }
}

//Limpar Formulario
function crudAjaxLimparFormulario(nomeFormulario) {
    $('.is-invalid').removeClass('is-invalid');
    $('#'+nomeFormulario).trigger('reset');
    $('.select2').val('').trigger('change');
}

//Código para o Filter CRUD - Início'''''''''''''''''
//Código para o Filter CRUD - Início'''''''''''''''''
$(".repeaterFilter").repeater({
    defaultValues: {
        'filter_crud_tipo_condicao': $('#filter-crud-filter_crud_tipo_condicao').val(),
        'filter_crud_campo_pesquisar': $('#filter-crud-filter_crud_campo_pesquisar').val(),
        'filter_crud_operacao_realizar': $('#filter-crud-filter_crud_operacao_realizar').val(),
        'filter_crud_dado_pesquisar': ''
    },
    show: function() {
        //repetir filtro com temporizador zero(0)
        $(this).slideDown(0, function() {
            //executar filtros
            crudAjaxFilterExecutar('show');
        });
    },
    hide:function(removeElement) {
        //Pegar quantidade de Itens/Filtros
        var qtdItens = $('[data-repeater-item]').length;

        //Não deixar excluir quando só tiver uma linha
        if (qtdItens > 1) {
            $(this).slideUp(function () {
                //remover filtro
                removeElement();

                //executar filtros
                crudAjaxFilterExecutar('hide');
            });
        } else {
            alert('Esse Filtro não pode ser excluído.');
        }
    }
});

//Retira a última linha adicionada caso a anterior esteja com o campo dado_pesquisar vazio
function crudAjaxFilterRetirarLinhaAdicionada() {
    //Pegar quantidade de Itens/Filtros
    var qtdItens = $('[data-repeater-item]').length;

    //Verificar o ajuste necessário
    var diminuirItens = 1;

    //qtdItens ajustada
    qtdItens = qtdItens - diminuirItens;

    var ind = 0;
    $('[data-repeater-item]').each(function () {
        if (ind == qtdItens) {
            $(this).remove();
        }

        ind++;
    });
}

//Executar Filtros
function crudAjaxFilterExecutar(locale='') {
    //Pegar quantidade de Itens/Filtros
    var qtdItens = $('[data-repeater-item]').length;

    //Verificar o ajuste necessário para mandar somente os filtros que já estavam renderizados
    if (locale == '') {var diminuirItens = 1;}
    if (locale == 'show') {var diminuirItens = 2;}
    if (locale == 'hide') {var diminuirItens = 1;}

    //qtdItens ajustada
    qtdItens = qtdItens - diminuirItens;

    //Arrays
    const array_dados = [];

    //Varrer filtros para montar array de dados
    for(i=0; i<=qtdItens; i++) {
        var tipo_condicao = $("select[name='field["+i+"][filter_crud_tipo_condicao]']").val();
        var campo_pesquisar = $("select[name='field["+i+"][filter_crud_campo_pesquisar]']").val();
        var operacao_realizar = $("select[name='field["+i+"][filter_crud_operacao_realizar]']").val();
        var dado_pesquisar = $("input[name='field["+i+"][filter_crud_dado_pesquisar]']").val();

        if (dado_pesquisar == '') {
            if (locale != 'hide') {
                alert('Digite algo para pesquisar no filtro ' + (i + 1));

                if (locale == 'show') {
                    crudAjaxFilterRetirarLinhaAdicionada();
                }
            }

            return false;
        }

        //Populando array_dados
        array_dados.push(tipo_condicao);
        array_dados.push(campo_pesquisar);
        array_dados.push(operacao_realizar);
        array_dados.push(dado_pesquisar);
    }

    //Table
    crudAjaxTable($('#ajaxPrefixPermissaoSubmodulo').val()+'/filter/'+array_dados, '', 10);
}
//Código para o Filter CRUD - Fim''''''''''''''''''''
//Código para o Filter CRUD - Fim''''''''''''''''''''




//Funções para operações de CRUD fora do arquivo scripts-ajax.blade.php - FIM''''''''''''''''''''''''''''''''''''''''
//Funções para operações de CRUD fora do arquivo scripts-ajax.blade.php - FIM'''''''''''''''''''''''''''''''''''''''''''

//Funções para Api ViaCep Para rodar em formulario sem REPEATER (Inicio)''''''''''''''''''''''''''''''''''''''''''''''''

//FORMULARIO COM CAMPOS SIMPLES'''''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('localidade').value=("");
    document.getElementById('uf').value=("");
    //document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('localidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        //document.getElementById('ibge').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('localidade').value="...";
            document.getElementById('uf').value="...";
            //document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

//FORMULARIO COM CAMPOS _COBRANCA'''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep_cobranca() {
    //Limpa valores do formulário de cep_cobranca.
    document.getElementById('logradouro_cobranca').value=("");
    document.getElementById('bairro_cobranca').value=("");
    document.getElementById('localidade_cobranca').value=("");
    document.getElementById('uf_cobranca').value=("");
    //document.getElementById('ibge_cobranca').value=("");
}

function meu_callback_cobranca(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro_cobranca').value=(conteudo.logradouro);
        document.getElementById('bairro_cobranca').value=(conteudo.bairro);
        document.getElementById('localidade_cobranca').value=(conteudo.localidade);
        document.getElementById('uf_cobranca').value=(conteudo.uf);
        //document.getElementById('ibge_cobranca').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep_cobranca();
        alert("CEP não encontrado.");
    }
}

function pesquisacep_cobranca(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro_cobranca').value="...";
            document.getElementById('bairro_cobranca').value="...";
            document.getElementById('localidade_cobranca').value="...";
            document.getElementById('uf_cobranca').value="...";
            //document.getElementById('ibge_cobranca').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback_cobranca';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep_cobranca();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep_cobranca();
    }
};
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//Funções para Api ViaCep Para rodar em formulario sem REPEATER (Fim)'''''''''''''''''''''''''''''''''''''''''''''''''''

//Funções para Api ViaCep Para rodar em formulario com REPEATER (Inicio)'''''''''''''''''''''''''''''''''''''''''''''''''
function limpa_formulário_cep_repeater() {
    //Limpa valores do formulário de cep.
    $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_endereco]']").val('');
}

function meu_callback_repeater(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_endereco]']")
            .val(conteudo.logradouro+', '+
                $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_numero]']").val()+' - '+
                $("input[type=text][name='endereco["+$('#ctrl_endereco_indice').val()+"][a_complemento]']").val()+' - '+
                conteudo.bairro+' - '+
                conteudo.localidade+' - '+
                conteudo.uf);
    } else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep_repeater(indice) {
    //retornar o indice do campo
    $('#ctrl_endereco_indice').val(indice);

    //Valor do campo CEP
    var valorCampoCep = $("input[type=text][name='endereco["+indice+"][a_cep]']").val();

    //Nova variável "cep" somente com dígitos.
    var cep = valorCampoCep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            $("input[type=text][name='endereco["+indice+"][a_endereco]']").val('...');

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
//Funções para Api ViaCep Para rodar em formulario com REPEATER (Fim)'''''''''''''''''''''''''''''''''''''''''''''''''''
