function validar_frm_ferramentas() {
    var validacao_ok = true;
    var mensagem = '';

    //Campo: name (requerido)
    if (validacao({op:1, value:document.getElementById('name').value}) === false) {
        validacao_ok = false;
        mensagem += 'Nome requerido.'+'<br>';
    }

    //Campo: descricao (requerido)
    if (validacao({op:1, value:document.getElementById('descricao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Descrição requerido.'+'<br>';
    }

    //Campo: url (requerido)
    if (validacao({op:1, value:document.getElementById('url').value}) === false) {
        validacao_ok = false;
        mensagem += 'URL requerido.'+'<br>';
    }

    //Campo: icon (requerido)
    if (validacao({op:1, value:document.getElementById('icon').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ícone requerido.'+'<br>';
    }

    //Campo: ordem_visualizacao (requerido)
    if (validacao({op:1, value:document.getElementById('ordem_visualizacao').value}) === false) {
        validacao_ok = false;
        mensagem += 'Ordem Visualização requerido.'+'<br>';
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
