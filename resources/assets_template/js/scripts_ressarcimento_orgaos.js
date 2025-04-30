function validar_frm_ressarcimento_orgaos() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: cnpj (não requerido)
    if (validacao({op:1, value:document.getElementById('cnpj').value}) === true) {
        if (validacao({op: 6, value: document.getElementById('cnpj').value}) === false) {
            validacao_ok = false;
            mensagem += 'CNPJ inválido.' + '<br>';
        }
    }

    //Campo: esfera_id (requerido)
    if (validacao({op:1, value:document.getElementById('esfera_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Esfera requerido.'+'<br>';
    }

    //Campo: poder_id (requerido)
    if (validacao({op:1, value:document.getElementById('poder_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Poder requerido.'+'<br>';
    }

    //Campo: tratamento_id (requerido)
    if (validacao({op:1, value:document.getElementById('tratamento_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Tratamento requerido.'+'<br>';
    }

    //Campo: vocativo_id (requerido)
    if (validacao({op:1, value:document.getElementById('vocativo_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Vocativo requerido.'+'<br>';
    }

    //Campo: funcao_id (requerido)
    if (validacao({op:1, value:document.getElementById('funcao_id').value}) === false) {
        validacao_ok = false;
        mensagem += 'Função requerido.'+'<br>';
    }

    //Campo: cep (requerido)
    if (validacao({op:1, value:document.getElementById('cep').value}) === false) {
        validacao_ok = false;
        mensagem += 'CEP requerido.'+'<br>';
    } else {
        if (validacao({op: 9, value: document.getElementById('cep').value}) === false) {
            validacao_ok = false;
            mensagem += 'CEP inválido.' + '<br>';
        }
    }

    //Campo: numero (requerido)
    if (validacao({op:1, value:document.getElementById('numero').value}) === false) {
        validacao_ok = false;
        mensagem += 'Número requerido.'+'<br>';
    } else {
        if (validacao({op:4, value:document.getElementById('numero').value}) === false) {
            validacao_ok = false;
            mensagem += 'Número inválido.'+'<br>';
        }
    }

    //Campo: telefone_1 (não requerido)
    if (validacao({op:1, value:document.getElementById('telefone_1').value}) === true) {
        if (validacao({op:11, value:document.getElementById('telefone_1').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 1 inválido.'+'<br>';
        }
    }

    //Campo: telefone_2 (não requerido)
    if (validacao({op:1, value:document.getElementById('telefone_2').value}) === true) {
        if (validacao({op:11, value:document.getElementById('telefone_2').value}) === false) {
            validacao_ok = false;
            mensagem += 'Telefone 2 inválido.'+'<br>';
        }
    }

    //Campo: contato_telefone (não requerido)
    if (validacao({op:1, value:document.getElementById('contato_telefone').value}) === true) {
        if (validacao({op:11, value:document.getElementById('contato_telefone').value}) === false) {
            validacao_ok = false;
            mensagem += 'Contato telefone inválido.'+'<br>';
        }
    }

    //Campo: contato_celular (não requerido)
    if (validacao({op:1, value:document.getElementById('contato_celular').value}) === true) {
        if (validacao({op:12, value:document.getElementById('contato_celular').value}) === false) {
            validacao_ok = false;
            mensagem += 'Contato celular inválido.'+'<br>';
        }
    }

    //Campo: contato_email (não requerido)
    if (validacao({op:1, value:document.getElementById('contato_email').value}) === true) {
        if (validacao({op:5, value:document.getElementById('contato_email').value}) === false) {
            validacao_ok = false;
            mensagem += 'Contato e-mail inválido.'+'<br>';
        }
    }

    //Mensagem
    if (validacao_ok === false) {
        var texto = '<div class="pt-3">';
        texto += '<div class="col-12 text-start font-size-12">'+mensagem+'</div>';
        texto += '</div>';

        alertSwal('warning', 'Validação', texto, 'true', 5000);
    }

    //Retorno
    return validacao_ok;
}


document.addEventListener("DOMContentLoaded", function(event) {
    $(function () {
        //Header
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            }
        });

        //API CNPJ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        // $('#link_api_buscar').click(function () {
        //     //Buscando valor
        //     var cnpj = $('#cnpj').val();
        //
        //     //Validando
        //     if ($('#cnpj').hasClass('is-invalid')) {
        //         alert($('#cnpj-error').html());
        //         return;
        //     } else if (cnpj == '') {
        //         alert('Informe um CNPJ.');
        //         return;
        //     }
        //
        //     //Limpando mascara
        //     cnpj = cnpj.replace(/[^\d]+/g,"");
        //
        //     //Indo no Controller buscar dados na API
        //     $.ajax({
        //         type:'GET',
        //         url: 'https://receitaws.com.br/v1/cnpj/'+cnpj,
        //         data: '',
        //         dataType: 'json',
        //         cache: false,
        //         contentType: false,
        //         processData: false,
        //         success: function (response) {
        //             //retorno da API
        //             /*
        //             abertura	"15/07/2016"
        //             situacao	"INAPTA"
        //             tipo	"MATRIZ"
        //             nome	"CLAUDINO MIL HOMENS DE MORAES 01798241714"
        //             fantasia	"CMDS INFORMATICA"
        //             porte	"MICRO EMPRESA"
        //             natureza_juridica	"213-5 - Empresário (Individual)"
        //             logradouro	"RUA LINS DE VASCONCELOS"
        //             numero	"579"
        //             complemento	"APT 102"
        //             municipio	"RIO DE JANEIRO"
        //             bairro	"LINS DE VASCONCELOS"
        //             uf	"RJ"
        //             cep	"20.710-130"
        //             email	"claudinomoraes@yahoo.com.br"
        //             telefone	"(21) 6421-0128"
        //             data_situacao	"12/01/2022"
        //             motivo_situacao	"OMISSÃO DE DECLARAÇÕES"
        //             cnpj	"25.221.403/0001-91"
        //             ultima_atualizacao	"2023-03-11T23:59:59.000Z"
        //             status	"OK"
        //             efr	""
        //             situacao_especial	""
        //             data_situacao_especial	""
        //             atividade_principal
        //             0
        //             code	"00.00-0-00"
        //             text	"********"
        //             atividades_secundarias
        //             0
        //             code	"00.00-0-00"
        //             text	"Não informada"
        //             capital_social	"1.00"
        //             qsa	[]
        //             extra	{}
        //             billing
        //             free	true
        //             database	true
        //             */
        //
        //             var dados = response;
        //
        //             alert(dados.status);
        //
        //             if (dados.status != 'OK') {
        //                 alert(dados.message);
        //             } else {
        //                 $('#td_api_situacao').html(dados.situacao);
        //                 $('#hidden_api_situacao').val(dados.situacao);
        //                 $('#td_api_tipo').html(dados.tipo);
        //                 $('#hidden_api_tipo').val(dados.tipo);
        //                 $('#td_api_natureza_juridica').html(dados.natureza_juridica);
        //                 $('#hidden_api_natureza_juridica').val(dados.natureza_juridica);
        //                 $('#td_api_nome').html(dados.nome);
        //                 $('#hidden_api_nome').val(dados.nome);
        //                 $('#td_api_fantasia').html(dados.fantasia);
        //                 $('#hidden_api_fantasia').val(dados.fantasia);
        //                 $('#td_api_cnpj').html(dados.cnpj);
        //                 $('#hidden_api_cnpj').val(dados.cnpj);
        //                 $('#td_api_abertura').html(dados.abertura);
        //                 $('#hidden_api_abertura').val(dados.abertura);
        //                 $('#td_api_cep').html(dados.cep.replace(/[^\d]+/g,""));
        //                 $('#hidden_api_cep').val(dados.cep.replace(/[^\d]+/g,""));
        //                 $('#td_api_telefone').html(dados.telefone);
        //                 $('#hidden_api_telefone').val(dados.telefone);
        //                 $('#td_api_email').html(dados.email);
        //                 $('#hidden_api_email').val(dados.email);
        //                 $('#td_api_logradouro').html(dados.logradouro);
        //                 $('#hidden_api_logradouro').val(dados.logradouro);
        //                 $('#td_api_numero').html(dados.numero);
        //                 $('#hidden_api_numero').val(dados.numero);
        //                 $('#td_api_complemento').html(dados.complemento);
        //                 $('#hidden_api_complemento').val(dados.complemento);
        //                 $('#td_api_bairro').html(dados.bairro);
        //                 $('#hidden_api_bairro').val(dados.bairro);
        //                 $('#td_api_municipio').html(dados.municipio);
        //                 $('#hidden_api_municipio').val(dados.municipio);
        //                 $('#td_api_uf').html(dados.uf);
        //                 $('#hidden_api_uf').val(dados.uf);
        //             }
        //
        //             //abrir modal
        //             $('#modal_api').modal('show');
        //         },
        //         error: function(){
        //             alert('Erro na API.');
        //         }
        //     });
        // });

        document.getElementById('link_api_buscar').addEventListener('click', function () {
            //Buscando valor
            var cnpj = document.getElementById('cnpj').value;

            // Validando
            if (document.getElementById('cnpj').classList.contains('is-invalid')) {
                alert(document.getElementById('cnpj-error').innerHTML);
                return;
            } else if (cnpj === '') {
                alert('Informe um CNPJ.');
                return;
            }

            // Limpando máscara
            cnpj = cnpj.replace(/[^\d]+/g, "");

            // Agora chama o proxy no servidor
            fetch('build/assets/php/proxy_receitaws.php?cnpj=' + cnpj, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (dados) {
                    if (dados.status !== 'OK') {
                        alert('Erro ao consultar CNPJ.');
                    } else {
                        document.getElementById('td_api_situacao').innerHTML = dados.situacao;
                        document.getElementById('hidden_api_situacao').value = dados.situacao;

                        document.getElementById('td_api_tipo').innerHTML = dados.tipo;
                        document.getElementById('hidden_api_tipo').value = dados.tipo;

                        document.getElementById('td_api_natureza_juridica').innerHTML = dados.natureza_juridica;
                        document.getElementById('hidden_api_natureza_juridica').value = dados.natureza_juridica;

                        document.getElementById('td_api_nome').innerHTML = dados.nome;
                        document.getElementById('hidden_api_nome').value = dados.nome;

                        document.getElementById('td_api_fantasia').innerHTML = dados.fantasia;
                        document.getElementById('hidden_api_fantasia').value = dados.fantasia;

                        document.getElementById('td_api_cnpj').innerHTML = dados.cnpj;
                        document.getElementById('hidden_api_cnpj').value = dados.cnpj;

                        document.getElementById('td_api_abertura').innerHTML = dados.abertura;
                        document.getElementById('hidden_api_abertura').value = dados.abertura;

                        document.getElementById('td_api_cep').innerHTML = dados.cep.replace(/[^\d]+/g, "");
                        document.getElementById('hidden_api_cep').value = dados.cep.replace(/[^\d]+/g, "");

                        document.getElementById('td_api_telefone').innerHTML = dados.telefone;
                        document.getElementById('hidden_api_telefone').value = dados.telefone;

                        document.getElementById('td_api_email').innerHTML = dados.email;
                        document.getElementById('hidden_api_email').value = dados.email;

                        document.getElementById('td_api_logradouro').innerHTML = dados.logradouro;
                        document.getElementById('hidden_api_logradouro').value = dados.logradouro;

                        document.getElementById('td_api_numero').innerHTML = dados.numero;
                        document.getElementById('hidden_api_numero').value = dados.numero;

                        document.getElementById('td_api_complemento').innerHTML = dados.complemento;
                        document.getElementById('hidden_api_complemento').value = dados.complemento;

                        document.getElementById('td_api_bairro').innerHTML = dados.bairro;
                        document.getElementById('hidden_api_bairro').value = dados.bairro;

                        document.getElementById('td_api_municipio').innerHTML = dados.municipio;
                        document.getElementById('hidden_api_municipio').value = dados.municipio;

                        document.getElementById('td_api_uf').innerHTML = dados.uf;
                        document.getElementById('hidden_api_uf').value = dados.uf;

                        // Abrir modal (Bootstrap 5)
                        var modal = new bootstrap.Modal(document.getElementById('modal_api'));
                        modal.show();
                    }
                })
                .catch(function () {
                    alert('Erro ao consultar o servidor.');
                });
        });

        $('.button_api_copiar').click(function () {
            $('#name').val($('#hidden_api_nome').val());
            $('#nome_fantasia').val($('#hidden_api_fantasia').val());
            $('#data_nascimento').val($('#hidden_api_abertura').val());
            $('#cep').val($('#hidden_api_cep').val());
            $('#telefone_1').val($('#hidden_api_telefone').val());
            $('#email').val($('#hidden_api_email').val());
            $('#logradouro').val($('#hidden_api_logradouro').val());
            $('#numero').val($('#hidden_api_numero').val());
            $('#complemento').val($('#hidden_api_complemento').val());
            $('#bairro').val($('#hidden_api_bairro').val());
            $('#localidade').val($('#hidden_api_municipio').val());
            $('#uf').val($('#hidden_api_uf').val());

            //fechar modal
            $('#modal_api').modal('hide');
        });
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    });
});
