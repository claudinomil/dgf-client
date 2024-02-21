$(document).ready(function () {
    if ($('#frm_ressarcimento_referencias').length) {
        $('#frm_ressarcimento_referencias').validate({
            rules: {
                referencia: {
                    required: true,
                    min: 202301,
                    max: 203012,
                    minlength: 6,
                    maxlength: 6
                },
                ano: {
                    required: true,
                    min: 2023,
                    max: 2030,
                    minlength: 4,
                    maxlength: 4
                },
                mes: {
                    required: true,
                    min: '01',
                    max: '12',
                    minlength: 2,
                    maxlength: 2
                },
                parte: {
                    required: true,
                    min: '01',
                    max: '31',
                    minlength: 2,
                    maxlength: 2
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

    $('#mes').keyup(function () {formatar_campo_referencia();});

    $('#ano').keyup(function () {formatar_campo_referencia();});

    $('#parte').keyup(function () {formatar_campo_referencia();});

    function formatar_campo_referencia() {
        var parte = $('#parte').val();
        var mes = $('#mes').val();
        var ano = $('#ano').val();

        $('#referencia').val('');
        $('#referencia_extenso').val('');

        if (ano.length == 4 && mes.length == 2 && parte.length == 2) {
            var referencia = ano+''+mes+''+parte;
            var referencia_extenso = getReferencia(1, referencia);

            $('#referencia').val(referencia);
            $('#referencia_extenso').val(referencia_extenso);
        }
    }
});
