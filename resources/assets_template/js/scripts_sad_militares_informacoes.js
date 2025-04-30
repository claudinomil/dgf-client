function validar_frm_sad_militares_informacoes() {
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

    $('#militar_rg').keyup(function () {
        $.get(url+'webservices/militar/rg/'+$('#militar_rg').val(), function( data ) {
            //Lendo dados
            if (data.success) {
                var militar = data.success;

                //Retornar dados para os inputs
                $('#militar_nome').val(militar.nome);
                $('#militar_posto_graduacao_ordem').val(militar.graduacao_id);
                $('#militar_posto_graduacao').val(militar.graduacao);

                $('#errorMilitarRg').html('');
            } else {
                //Retornar dados para os inputs
                $('#militar_nome').val('');
                $('#militar_posto_graduacao_ordem').val(0);
                $('#militar_posto_graduacao').val('');

                $('#errorMilitarRg').html(data.error);
            }
        });
    });
});
