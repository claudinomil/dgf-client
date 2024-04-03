function configurarDataTable(op) {
	if (op == 1) {
		$('.class-datatable-1').DataTable({
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
			order: []
		});
	}

	if (op == 2) {
		$('.class-datatable-2').DataTable({
			dom: 'Bfrtip',
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
			pageLength: 10,
			lengthChange: true,
			autoWidth: true,
			processing: true,
			buttons: ['excel'],
			order: []
		});
	}
}

function showTooltips() {
	$('[data-bs-toggle="tooltip"]').tooltip({ boundary: 'window' });
}

function hideTooltips() {
	//Remove os Tooltips
	$('[data-bs-toggle="tooltip"]').tooltip('hide');

	//Remove os que perderam a referencia
	$('[role="tooltip"]').hide();
}

function relatoriosGerarBotoes() {
	//Ajax (Relatórios: Gerar botões para executar relatórios)
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios.php',
		dataType: 'html',
		data: {opcao: 1},
		success: function(data) {
			if (data) {
				$('#relatoriosModelos').html(data);

				showTooltips();
			}
		}
	});
}

function percentagemUsoIncluirRegistro(relatorio_id) {
	//Ajax (Percentagens: Incluir Registro)
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_percentagens.php',
		dataType: 'html',
		data: {
			opcao: 1,
			relatorio_id: relatorio_id}
	});
}

function percentagemUsoMontarGrafico() {
	//Ajax (Percentagens: Colocar gráfico)
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_percentagens.php',
		dataType: 'html',
		data: {opcao: 2},
		success: function(data) {
			if (data) {
				$('#sectionPercentagemUsoGrafico').html(data);
			}
		}
	});
}

function loginPrepararFormulario() {
	//Ajax (Login: Campo Select relatorio_usuario_id)
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_login.php',
		dataType: 'html',
		data: {opcao: 1},
		success: function(data) {
			if (data) {
				$('#relatorio_usuario_id').html(data);
			}
		}
	});

	//Limpar campos
	$('#relatorio_usuario_id').val('');
	$('#email').val('');
	$('#rg').val('');
	$('#senha').val('');

	$('.is-invalid').removeClass('is-invalid');
}

function login() {
	//Ajax (Login: Verificar as credenciais do usuário)
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_login.php',
		dataType: 'html',
		data: {
			opcao: 2,
			relatorio_usuario_id: $('#relatorio_usuario_id').val(),
			email: $('#email').val(),
			rg: $('#rg').val(),
			senha: $('#senha').val()
		},
		success: function(data) {
			if (data) {
				if (data.substring(0, 4) == 'Erro') {
					alert(data);
				} else {
					configurarAcesso();
				}
			}
		}
	});
}

function logout() {
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_login.php',
		dataType: 'html',
		data: {opcao: 4},
		success: function(data) {
			configurarAcesso();
		}
	});
}

function configurarAcesso() {
	$.ajax({
		type: 'POST',
		url: 'assets/php/ajax_relatorios_login.php',
		dataType: 'json',
		data: {opcao: 3},
		success: function(data) {
			if (data.logado == 'sim') {
				$('#menuUsuario').html(data.usuario);
				$('#section_login').hide();
				$('#menuLogin').hide();
				$('#menuPerfil').show();
				$('#menuDivider').show();
				$('#menuLogout').show();

				relatoriosGerarBotoes();

				$('#menuHome')[0].click();
			} else {
				$('#menuUsuario').html('Usuário');
				$('#section_login').show();
				$('#menuLogin').show();
				$('#menuPerfil').hide();
				$('#menuDivider').hide();
				$('#menuLogout').hide();

				relatoriosGerarBotoes();

				$('#menuHome')[0].click();
			}
		}
	});
}

function fecharRelatoriosVisualisar() {
	event.preventDefault();

	relatoriosGerarBotoes();

	$('#relatoriosVisualisar').hide();
	$('#relatoriosModelos').show();

	$('#menuRelatorios')[0].click();
}