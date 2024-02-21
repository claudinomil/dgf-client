$(document).ready(function () {
    if ($('#frm_users').length) {
        $('#frm_users').validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                layout_mode: {
                    required: true
                },
                layout_style: {
                    required: true
                },
                grupo_id: {
                    required: true
                },
                situacao_id: {
                    required: true
                }
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

    $('#militar_rg').keyup(function () {
        $.get('webservices/militar/rg/'+$('#militar_rg').val(), function( data ) {
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
