$(document).ready(function () {
	//Relatórios: Gerar botões para executar relatórios
	relatoriosGerarBotoes();

	//Percentagens: Colocar gráfico
	percentagemUsoMontarGrafico();

	//Login: Preparar Formulário
	loginPrepararFormulario();

	//Login: Configurar para usuário logado
	configurarAcesso();

	//Gerar Relatório
	$('body').on('click', '.btnGerarRelatorio', function () {
		//Gerar botoes aqui para refazer acessos aos relatorios
		relatoriosGerarBotoes();

		//Variáveis
		var registros_incluir = $(this).data('registros_incluir');
		var registros_atualizar = $(this).data('registros_atualizar');
		var registros_excluir = $(this).data('registros_excluir');
		var relatorio_id = $(this).data('id');
		var relatorio_nome = $(this).data('nome');
		var relatorio_nome_tooltip = $(this).data('nome_tooltip');
		var relatorio_descricao = $(this).data('descricao');

		var rel10_codigo_situacao = $('#rel10_codigo_situacao').val();
		var rel10_campo_diferente = $('#rel10_campo_diferente').val();

		//Ajax (Relatório)
		$.ajax({
			type: 'POST',
			url: 'assets/php/ajax_relatorios.php',
			dataType: 'html',
			data: {
				opcao: 2,
				registros_incluir: registros_incluir,
				registros_atualizar: registros_atualizar,
				registros_excluir: registros_excluir,
				relatorio_id: relatorio_id,
				relatorio_nome: relatorio_nome,
				relatorio_nome_tooltip: relatorio_nome_tooltip,
				relatorio_descricao: relatorio_descricao,

				rel10_codigo_situacao: rel10_codigo_situacao,
				rel10_campo_diferente: rel10_campo_diferente
			},
			beforeSend: function () {
				$('#relatoriosModelos').hide();
				$('#relatoriosVisualisar').html('');
				$('#relatoriosVisualisar').hide();
				$('#relatoriosLoading').show();
			},
			success: function(data) {
				if (data) {
					if (data.substring(0, 4) == 'Erro') {
						alert(data);

						$('#relatoriosVisualisar').html('');

						configurarAcesso();
					} else {
						//visualização do relatorio recebido
						$('#relatoriosVisualisar').html(data);

						//Configurar DataTable
						configurarDataTable(2);

						//Percentagens: Incluir Registro
						percentagemUsoIncluirRegistro(relatorio_id);

						//Percentagens: Colocar gráfico
						percentagemUsoMontarGrafico();
					}
				} else {
					$('#relatoriosVisualisar').html('<span class="pt-5 text-center text-danger">Erro ao tentar gerar o relatório.</span>');
				}
			},
			error: function (data) {
				alert('Erro interno');
			},
			complete: function () {
				$('#relatoriosLoading').hide();
				//$('#relatoriosModelos').show();
				$('#relatoriosVisualisar').show();

				$('#menuRelatorios')[0].click();
			}
		});
	});

	//Menu Login
	$('body').on('click', '#menuLogin', function () {
		loginPrepararFormulario();
	});

	//Menu Logout
	$('body').on('click', '#menuLogout', function () {
		logout();
	});
});