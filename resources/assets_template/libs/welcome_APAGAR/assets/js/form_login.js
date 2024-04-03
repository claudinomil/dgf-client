$(document).ready(function () {
	if ($('#form_login').length) {
		$('#form_login').validate({
			rules: {
				email: {
					required: true,
					email: true
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

	//Fazer Login
	$('#btnFazerLogin').click(function () {
		if ($('#form_login').valid()) {
			login();
		} else {
			alert('Erro na validação do formulário.');
		}
	});
});