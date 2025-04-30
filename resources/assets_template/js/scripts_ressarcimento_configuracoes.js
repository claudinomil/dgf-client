function validar_frm_ressarcimento_configuracoes() {
    var validacao_ok = true;
    var mensagem = '';

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
    //URL
    var url = window.location.protocol+'//'+window.location.host+'/';
    if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';}

    $('#diretor_rg').keyup(function () {
        $.get(url+'webservices/militar/rg/'+$('#diretor_rg').val(), function( data ) {
            //Lendo dados
            if (data.success) {
                var militar = data.success;

                //Retornar dados para os inputs
                $('#diretor_identidade_funcional').val(militar.identidade_funcional);
                $('#diretor_nome').val(militar.nome);
                $('#diretor_posto').val(militar.graduacao);
                $('#diretor_quadro').val(militar.quadro);

                $('#errorDiretorRg').html('');
            } else {
                //Retornar dados para os inputs
                $('#diretor_identidade_funcional').val('');
                $('#diretor_nome').val('');
                $('#diretor_posto').val('');
                $('#diretor_quadro').val('');

                $('#errorDiretorRg').html(data.error);
            }
        });
    });

    $('#dgf2_rg').keyup(function () {
        $.get(url+'webservices/militar/rg/'+$('#dgf2_rg').val(), function( data ) {
            //Lendo dados
            if (data.success) {
                var militar = data.success;

                //Retornar dados para os inputs
                $('#dgf2_identidade_funcional').val(militar.identidade_funcional);
                $('#dgf2_nome').val(militar.nome);
                $('#dgf2_posto').val(militar.graduacao);
                $('#dgf2_quadro').val(militar.quadro);

                $('#errorDgf2Rg').html('');
            } else {
                //Retornar dados para os inputs
                $('#dgf2_identidade_funcional').val('');
                $('#dgf2_nome').val('');
                $('#dgf2_posto').val('');
                $('#dgf2_quadro').val('');

                $('#errorDgf2Rg').html(data.error);
            }
        });
    });
});
