function validar_frm_notificacoes() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: title (requerido)
    if (validacao({op:1, value:document.getElementById('title').value}) === false) {
        validacao_ok = false;
        mensagem += 'Título requerido.'+'<br>';
    }

    //Campo: notificacao (requerido)
    if (validacao({op:1, value:document.getElementById('notificacao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Notificação requerido.'+'<br>';
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
