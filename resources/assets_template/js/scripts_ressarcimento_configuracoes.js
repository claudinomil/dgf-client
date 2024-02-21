$(document).ready(function () {
    if ($('#frm_ressarcimento_orgaos').length) {
        $('#frm_ressarcimento_orgaos').validate({
            rules: {
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    }

    $('#diretor_rg').keyup(function () {
        $.get('webservices/militar/rg/'+$('#diretor_rg').val(), function( data ) {
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
        $.get('webservices/militar/rg/'+$('#dgf2_rg').val(), function( data ) {
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
