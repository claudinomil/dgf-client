<?php
include_once "../../../libphp/conexao.php";
include_once "../../../libphp/conexao_dgp.php";
include_once "functions.php";

//Session
session_start();

$opcao = $_POST['opcao'];

//Opção 1 (Gerar botões para executar relatórios)
if ($opcao == 1) {
	//Variáveis de acessos aos relatorios
	montar_variaveis_acessos_relatorios($_SESSION['usu_relatorio_usuario_id']);

	$sql = "SELECT * FROM sac_relatorios ";
    $sql .= "ORDER BY ordem_visualizacao, nome, descricao;";

    $res = mysql_query($sql, $conec);
    $linhas = mysql_num_rows($res);
    $dados = mysql_fetch_array($res);

    $retorno = '';

    if ($linhas > 0) {
        $linhasini = 1;
        while ($linhasini <= $linhas) {
            $id = $dados['id'];

            $nome = $dados['nome'];
            $nome_tooltip = $dados['nome'];
			if (strlen($nome) > 40) {$nome = substr($nome, 0, 40).'...';}

			$descricao = $dados['descricao'];
			$descricao_tooltip = $dados['descricao'];
            if (strlen($descricao) > 140) {$descricao = substr($descricao, 0, 140).'...';}

            $icone = $dados['icone'];

            //Usuário logado
			if ($_SESSION['usu_logado'] == 'sim') {
				//Acesso ao relatório
				if ($_SESSION['usu_acesso_relatorio_'.$id] == 'sim') {
					//Retorno
					$retorno .= '<div class="col-12 col-md-3 p-1 mb-2" style="height: 140px;">
									<div class="text-center bg-white py-2 px-1" style="height: 100px;">
										<p class="text-primary mb-1" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="' . utf8_encode($nome_tooltip) . '" style="font-size: 13px;">' . utf8_encode($nome) . '</p>
										<p class="text-muted text-center" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="bottom" title="' . utf8_encode($descricao_tooltip) . '" style="font-size: 11px;">' . utf8_encode($descricao) . '</p>
									</div>
									<div class="text-center bg-white" style="height: 40px;">
										<button type="button" class="btn btn-sm btn-outline-success opacity-50 btnGerarRelatorio" data-registros_incluir="0" data-registros_atualizar="0" data-registros_excluir="0" data-id="'.$id.'" data-nome="'.utf8_encode($nome).'" data-nome_tooltip="'.utf8_encode($nome_tooltip).'" data-descricao="'.utf8_encode($descricao).'">Gerar Relatório</button>';

					//Botão para abrir Filtro
					if ($id == 10) {
						$retorno .= '&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-outline-success opacity-50" data-bs-toggle="modal" data-bs-target="#modalRelatorio10" title="Filtro do Relatório"><i class="bi bi-funnel"></i></button>';
					}

					$retorno .= '	</div>
								</div>';
				}
			}


            $linhasini++;
            $dados = mysql_fetch_array($res);
        }
    }

    echo $retorno;
}

//Opção 2 (Gerar relatórios)
if ($opcao == 2) {
	//Dados
	$registros_incluir = $_POST['registros_incluir'];
	$registros_atualizar = $_POST['registros_atualizar'];
	$registros_excluir = $_POST['registros_excluir'];
	$relatorio_id = $_POST['relatorio_id'];
	$relatorio_nome = $_POST['relatorio_nome'];
	$relatorio_nome_tooltip = $_POST['relatorio_nome_tooltip'];
	$relatorio_descricao = $_POST['relatorio_descricao'];

	$rel10_codigo_situacao = $_POST['rel10_codigo_situacao'];
	$rel10_campo_diferente = $_POST['rel10_campo_diferente'];

	//Verificar se tem usuário logado
	if ($_SESSION['usu_logado'] != 'sim') {
		$relatorio_id = 0;

		echo 'Erro: Não existe usuário logado ou sessão expirou.';
	}

	//Relatório ID=1 : Acesso ao sistema de saúde
    if ($relatorio_id == 1) {
        $relatorio_html = '<div class="table-responsive px-3 py-3 bg-white">
							<div class="text-center text-primary pb-3">
							'.$relatorio_nome_tooltip.'
							<br>
							<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
							</div>
							<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
                                <thead>
                                    <tr>
                                    	<th scope="col">ID Funcional</th>
                                        <th scope="col">RG</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Graduação</th>
                                        <th scope="col">Situação</th>
                                        <th scope="col">Acesso Sistema Saúde</th>
                                        <th scope="col">Tipo Acesso</th>
                                    </tr>
                                </thead>
                                <tbody>';

        //Sql
        $sql = "SELECT sac_efetivo.identidade_funcional, sac_efetivo.rg, sac_efetivo.nome, sac_graduacao.graduacao, ";
        $sql .= "sac_situacao.situacao, sac_fundo_saude.acesso_sistema_saude, sac_fundo_saude.tipo_acesso FROM sac_efetivo ";
        $sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
        $sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
        $sql .= "LEFT JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg ";
        $sql .= "WHERE 1=1 ";
        $sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";
        //$sql .= "LIMIT 100";

        $res = mysql_query($sql, $conec);
        $linhas = mysql_num_rows($res);
        $dados = mysql_fetch_array($res);


        if ($linhas > 0) {
            $linhasini = 1;
            while ($linhasini <= $linhas) {
				$identidade_funcional = $dados['identidade_funcional'];
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];

				$acesso_sistema_saude = $dados['acesso_sistema_saude'];
				if ($acesso_sistema_saude == 1) {
					$acesso_sistema_saude = 'SIM';
				} else {
					$acesso_sistema_saude = 'NÃO';
				}

				$tipo_acesso = $dados['tipo_acesso'];
				if ($tipo_acesso == 0) {
					$tipo_acesso = 'NEG';
				} else if ($tipo_acesso == 1) {
					$tipo_acesso = 'INT';
				} else if ($tipo_acesso == 2) {
					$tipo_acesso = 'AMB';
				} else {
					$tipo_acesso = 'NEG';
				}

				$relatorio_html .= '<tr>
									<td>' . utf8_encode($identidade_funcional) . '</td>
									<td>' . utf8_encode($rg) . '</td>
									<td>' . utf8_encode($nome) . '</td>
									<td>' . utf8_encode($graduacao) . '</td>
									<td>' . utf8_encode($situacao) . '</td>
									<td>' . utf8_encode($acesso_sistema_saude) . '</td>
									<td>' . utf8_encode($tipo_acesso) . '</td>
								</tr>';

				$linhasini++;
				$dados = mysql_fetch_array($res);
            }
        }

        $relatorio_html .= '        </tbody>
                                </table>
                            </div>';

        echo $relatorio_html;
    }

    //Relatório ID=2 : Acesso ao sistema de saúde (Desconto)
    if ($relatorio_id == 2) {
        $relatorio_html = '<div class="table-responsive px-3 py-3 bg-white">
							<div class="text-center text-primary pb-3">
							'.$relatorio_nome_tooltip.'
							<br>
							<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
							</div>
                            <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
                                <thead>
                                    <tr>
                                    	<th scope="col">ID Funcional</th>
                                        <th scope="col">RG</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Graduação</th>
                                        <th scope="col">Situação</th>
                                        <th scope="col">Acesso Sistema Saúde</th>
                                        <th scope="col">Tipo Acesso</th>
                                        <th scope="col">Desconto</th>
                                    </tr>
                                </thead>
                                <tbody>';

        //Sql
        $sql = "SELECT sac_efetivo.identidade_funcional, sac_efetivo.rg, sac_efetivo.nome, sac_graduacao.graduacao, ";
        $sql .= "sac_situacao.situacao, sac_fundo_saude.acesso_sistema_saude, sac_fundo_saude.tipo_acesso FROM sac_efetivo ";
        $sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
        $sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
        $sql .= "LEFT JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg ";
        $sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";
        //$sql .= "LIMIT 100";

        $res = mysql_query($sql, $conec);
        $linhas = mysql_num_rows($res);
        $dados = mysql_fetch_array($res);


        if ($linhas > 0) {
            $linhasini = 1;
            while ($linhasini <= $linhas) {
                $identidade_funcional = $dados['identidade_funcional'];
                $rg = $dados['rg'];
                $nome = $dados['nome'];
                $graduacao = $dados['graduacao'];
                $situacao = $dados['situacao'];

				$desconto_militar = 0;

				$acesso_sistema_saude = $dados['acesso_sistema_saude'];
                if ($acesso_sistema_saude == 0) {
                	$acesso_sistema_saude = 'NÃO';
                } else if ($acesso_sistema_saude == 1) {
                	$acesso_sistema_saude = 'SIM';
					$desconto_militar = 10;
                } else {
                	$acesso_sistema_saude = utf8_decode('SEM FUNDO SAÚDE');
                }

                $tipo_acesso = $dados['tipo_acesso'];
                if ($tipo_acesso == 0) {
                	$tipo_acesso = 'NEG';
                } else if ($tipo_acesso == 1) {
                	$tipo_acesso = 'INT';
                } else if ($tipo_acesso == 2) {
                	$tipo_acesso = 'AMB';
                } else {
					$tipo_acesso = 'SEM TIPO ACESSO';
                }

                //Buscar quantidade de dependentes que acessam o fundo de saúde
                $sql2 = "SELECT count(*) as dependente_desconto FROM `sac_dependentes` WHERE rg='".$rg."' AND acesso_sistema_saude_dependente='1'";
                $res2 = mysql_query($sql2, $conec);
                $linhas2 = mysql_num_rows($res2);
                $dados2 = mysql_fetch_array($res2);

                if ($linhas2 == 1) {
                    $desconto = $desconto_militar + $dados2['dependente_desconto'];
                } else {
                    $desconto = $desconto_militar;
                }

                $relatorio_html .= '<tr>
                                        <td>' . utf8_encode($identidade_funcional) . '</td>
                                        <td>' . utf8_encode($rg) . '</td>
                                        <td>' . utf8_encode($nome) . '</td>
                                        <td>' . utf8_encode($graduacao) . '</td>
                                        <td>' . utf8_encode($situacao) . '</td>
                                        <td>' . utf8_encode($acesso_sistema_saude) . '</td>
                                        <td>'.utf8_encode($tipo_acesso).'</td>
                                        <td>'.utf8_encode($desconto).'</td>
                                    </tr>';

                $linhasini++;
                $dados = mysql_fetch_array($res);
            }
        }

        $relatorio_html .= '        </tbody>
                                </table>
                            </div>';

        echo $relatorio_html;
    }

    //Relatório ID=3 : Quantitativo de Militares Grupo I e Grupo II
	if ($relatorio_id == 3) {
		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white">
							<div class="text-center text-primary pb-3">
							'.$relatorio_nome_tooltip.'
							<br>
							<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
							</div>
                            <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
                                <thead>
                                    <tr>
                                        <th scope="col">Unidade</th>
                                        <th scope="col">Cel</th>
                                        <th scope="col">Ten Cel</th>
                                        <th scope="col">Maj</th>
                                        <th scope="col">Cap</th>
                                        <th scope="col">1 Ten</th>
                                        <th scope="col">2 Ten</th>
                                        <th scope="col">Asp</th>
                                        <th scope="col">Sub Ten</th>
                                        <th scope="col">1 Sgt</th>
                                        <th scope="col">2 Sgt</th>
                                        <th scope="col">3 Sgt</th>
                                        <th scope="col">Cb</th>
                                        <th scope="col">Sd</th>
									</tr>
                                </thead>
                                <tbody>';

		//Sql
		$sql = "SELECT * FROM sac_unidades ";
		$sql .= "ORDER BY unidade ";
		//$sql .= "LIMIT 100";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);


		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$codigo_unidade = $dados['codigo_unidade'];
				$unidade = $dados['unidade'];

				$relatorio_html .= '<tr>
                                        <td>' . utf8_encode($unidade) . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '01') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '02') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '03') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '04') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '05') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '06') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '07') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '11') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '12') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '13') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '14') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '15') . '</td>
                                        <td>' . total_militares_graduacao($codigo_unidade, '16') . '</td>
                                    </tr>';

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		$relatorio_html .= '        </tbody>
                                </table>
                            </div>';

		echo $relatorio_html;
	}

	//Relatório ID=4 : Acesso ao sistema de saúde
	if ($relatorio_id == 4) {
		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white">
							<div class="text-center text-primary pb-3">
							'.$relatorio_nome_tooltip.'
							<br>
							<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
							</div>
                            <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Funcional</th>
                                        <th scope="col">RG</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Graduação</th>
                                        <th scope="col">Situação</th>
                                        <th scope="col">Dependente</th>
                                        <th scope="col">Nascimento</th>
                                        <th scope="col">Parentesco</th>
                                        <th scope="col">Acesso Sistema Saúde</th>
                                        <th scope="col">Tipo Acesso</th>
                                    </tr>
                                </thead>
                                <tbody>';

		//Sql
		$sql = "SELECT sac_efetivo.identidade_funcional, sac_efetivo.rg, sac_efetivo.nome, sac_graduacao.graduacao, ";
		$sql .= "sac_situacao.situacao, sac_dependentes.dependente, sac_dependentes.data_nascimento, sac_dependentes_parentescos.parentesco, ";
		$sql .= "sac_dependentes.acesso_sistema_saude_dependente, sac_dependentes.tipo_acesso, sac_dependentes.excluido FROM sac_efetivo ";
		$sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
		$sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
		$sql .= "LEFT JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg ";
		$sql .= "LEFT JOIN sac_dependentes_parentescos ON sac_dependentes_parentescos.codigo_parentesco=sac_dependentes.codigo_parentesco ";
		$sql .= "WHERE sac_dependentes.excluido!=1 ";
		$sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome, sac_dependentes.dependente ";
		//$sql .= "LIMIT 100";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);


		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$identidade_funcional = $dados['identidade_funcional'];
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];
				$dependente = $dados['dependente'];
				$parentesco = $dados['parentesco'];

				$data_nascimento = $dados['data_nascimento'];
				$data_nascimento = date_create(substr($data_nascimento, 0, 10));
				$data_nascimento = date_format($data_nascimento, "d/m/Y");

				$acesso_sistema_saude_dependente = $dados['acesso_sistema_saude_dependente'];
				if ($acesso_sistema_saude_dependente == 1) {
					$acesso_sistema_saude_dependente = 'SIM';
				} else {
					$acesso_sistema_saude_dependente = 'NÃO';
				}

				$tipo_acesso = $dados['tipo_acesso'];
				if ($tipo_acesso == 0) {
					$tipo_acesso = 'NEG';
				} else if ($tipo_acesso == 1) {
					$tipo_acesso = 'INT';
				} else if ($tipo_acesso == 2) {
					$tipo_acesso = 'AMB';
				} else {
					$tipo_acesso = 'NEG';
				}

				$relatorio_html .= '<tr>
                                        <td>' . utf8_encode($identidade_funcional) . '</td>
                                        <td>' . utf8_encode($rg) . '</td>
                                        <td>' . utf8_encode($nome) . '</td>
                                        <td>' . utf8_encode($graduacao) . '</td>
                                        <td>' . utf8_encode($situacao) . '</td>
                                        <td>' . utf8_encode($dependente) . '</td>
                                        <td>' . utf8_encode($data_nascimento) . '</td>
                                        <td>' . utf8_encode($parentesco) . '</td>
                                        <td>' . utf8_encode($acesso_sistema_saude_dependente) . '</td>
                                        <td>' . utf8_encode($tipo_acesso) . '</td>
                                    </tr>';

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		$relatorio_html .= '        </tbody>
                                </table>
                            </div>';

		echo $relatorio_html;
	}

	//Relatório ID=5 : Atualizar Militares x Fundo de Saúde
	if ($relatorio_id == 5) {
		//Sql
		$sql = "SELECT * FROM sac_fundo_saude ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_1_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg = $dados['rg'];
				$cancelar_desconto = $dados['cancelar_desconto'];
				$acesso_sistema_saude = $dados['acesso_sistema_saude'];
				$tipo_acesso = $dados['tipo_acesso'];

				//Verificar se tem efetivo
				$sql_x = "SELECT rg FROM sac_efetivo ";
				$sql_x .= "WHERE rg='".$rg."'";

				$res_x = mysql_query($sql_x, $conec);
				$linhas_x = mysql_num_rows($res_x);

				if ($linhas_x == 0) {
					if ($registros_excluir == 1) {
						$sql_d = "DELETE FROM sac_fundo_saude WHERE rg='".$rg."' ";
						mysql_query($sql_d, $conec);
					} else {
						$relatorio_html_tab_1_conteudo .= '<tr>
															<td>' . utf8_encode($rg) . '</td>
															<td>' . utf8_encode($cancelar_desconto) . '</td>
															<td>' . utf8_encode($acesso_sistema_saude) . '</td>
															<td>' . utf8_encode($tipo_acesso) . '</td>
														</tr>';
					}
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		//Sql
		$sql = "SELECT sac_efetivo.identidade_funcional, sac_efetivo.rg, sac_efetivo.nome, sac_graduacao.graduacao, ";
		$sql .= "sac_situacao.situacao FROM sac_efetivo ";
		$sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
		$sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
		$sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";
		//$sql .= "LIMIT 100";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_2_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];

				//Verificar se tem fundo de saude
				$sql_x = "SELECT rg FROM sac_fundo_saude ";
				$sql_x .= "WHERE rg='".$rg."'";

				$res_x = mysql_query($sql_x, $conec);
				$linhas_x = mysql_num_rows($res_x);

				if ($linhas_x == 0) {
					if ($registros_incluir == 1) {
						$sql_i = "INSERT INTO sac_fundo_saude (rg, cancelar_desconto, acesso_sistema_saude, tipo_acesso) ";
						$sql_i .= "VALUES ('$rg', '1', '0', '0')";

						mysql_query($sql_i, $conec);
					} else {
						$relatorio_html_tab_2_conteudo .= '<tr>
													<td>' . utf8_encode($rg) . '</td>
													<td>' . utf8_encode($nome) . '</td>
													<td>' . utf8_encode($graduacao) . '</td>
													<td>' . utf8_encode($situacao) . '</td>
												</tr>';
					}
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_1_conteudo != '') {
			if ($registros_excluir == 1) {
				$botao_excluir = '';
			} else {
				$botao_excluir = '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-outline-danger opacity-50 btnGerarRelatorio" data-registros_incluir="0" data-registros_atualizar="0" data-registros_excluir="1" data-id="'.$relatorio_id.'" data-nome="'.utf8_encode($relatorio_nome).'" data-nome_tooltip="'.utf8_encode($relatorio_nome_tooltip).'" data-descricao="'.utf8_encode($relatorio_descricao).'">Excluir Registros</button>';
			}

			$relatorio_html_tab_1 .= '<div class="text-center text-success pb-3">
										Sem Efetivo
										' . $botao_excluir . '
									  </div>
										<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
											<thead>
												<tr>
													<th scope="col">RG</th>
													<th scope="col">DESCONTO</th>
													<th scope="col">ACESSO</th>
													<th scope="col">TIPO</th>
												</tr>
											</thead>
											<tbody>' . $relatorio_html_tab_1_conteudo . '</tbody>
										</table>';
		} else {
			$relatorio_html_tab_1 = '<div class="text-center text-success pb-3">
										Sem Efetivo
										<br>
										<span class="text-center text-dark">Nenhum registro para atualizar.</span>
									  </div>';
		}

		if ($relatorio_html_tab_2_conteudo != '') {
			if ($registros_incluir == 1) {
				$botao_incluir = '';
			} else {
				$botao_incluir = '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-outline-success opacity-50 btnGerarRelatorio" data-registros_incluir="1" data-registros_atualizar="0" data-registros_excluir="0" data-id="'.$relatorio_id.'" data-nome="'.utf8_encode($relatorio_nome).'" data-nome_tooltip="'.utf8_encode($relatorio_nome_tooltip).'" data-descricao="'.utf8_encode($relatorio_descricao).'">Incluir Registros</button>';
			}

			$relatorio_html_tab_2 .= '<div class="text-center text-success pb-3">
										Sem Fundo de Saúde
										'.$botao_incluir.'
									  </div>
									  <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
									  	<thead>
									  		<tr>
									  			<th scope="col">RG</th>
												<th scope="col">Nome</th>
												<th scope="col">Graduação</th>
												<th scope="col">Situação</th>
											</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_2_conteudo.'</tbody>
									  </table>';
		} else {
			$relatorio_html_tab_2 = '<div class="text-center text-success pb-3">
										Sem Fundo de Saúde
										<br>
										<span class="text-center text-dark">Nenhum registro para atualizar.</span>
									  </div>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
							</div>
							<div class="row">
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-5">'.$relatorio_html_tab_1.'</div>
								<div class="bg-white col-12 col-md-1">&nbsp;</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-6">'.$relatorio_html_tab_2.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=6 : Copiar Militares da DGP
	if ($relatorio_id == 6) {
		//Sql
		$sql = "SELECT dados.codigo, dados.rg, dados.nome_pess, dados.situacao, dados.graduacao, dados.obm_atual, obms.cod_dgf, dados.nome_guerra, dados.cpf, ";
		$sql .= "dados.quadro, dados.alistamento, dados.bol_data_de_alistamento, dados.comportamento, dados.data_de_nascimento, dados_complementares.filiacao_mae, ";
		$sql .= "dados.id_func, dados.temporario, dados_complementares.filiacao_pai, dados_complementares.sexo, dados_complementares.pasep, ";
		$sql .= "dados_complementares.estado_civil, dados_complementares.naturalidade, dados_complementares.nacionalidade, dados_complementares.titulo_de_eleitor, ";
		$sql .= "dados_complementares.zona, dados_complementares.secao, dados_complementares.grau_de_instrucao, dados_complementares.endereco, dados_complementares.numero, ";
		$sql .= "dados_complementares.complemento, dados_complementares.bairro, dados_complementares.cep, dados_complementares.cidade, dados_complementares.estado, ";
		$sql .= "dados_complementares.telefone_residencial, dados_complementares.telefone_celular, dados_complementares.telefone_funcional, dados_complementares.cor, ";
		$sql .= "dados_complementares.altura, dados_complementares.grau_de_instrucao, dados_complementares.num_calca, dados_complementares.num_quepe, ";
		$sql .= "dados_complementares.num_camisa, dados_complementares.num_calcado, dados_complementares.num_coturno, dados_complementares.atividade FROM dados ";
		$sql .= "INNER JOIN obms ON obms.cod_item=dados.obm_atual ";
		$sql .= "INNER JOIN dados_complementares ON dados_complementares.codigo=dados.codigo ";
		$sql .= "WHERE situacao='01' ";
		$sql .= "ORDER BY situacao, graduacao, rg ";

		$res = mysql_query($sql, $conec_dgp);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg_dgp = $dados['rg'];
				$rg_dgf = "00/".substr($rg_dgp,0,4).".".substr($rg_dgp,4,3);
				$nome_dgp = $dados['nome_pess'];
				$graduacao_dgf = $dados['graduacao'];
				$situacao_dgf = $dados['situacao'];

				//Verificar se tem efetivo
				$sql_x = "SELECT rg FROM sac_efetivo ";
				$sql_x .= "WHERE rg='".$rg_dgf."'";

				$res_x = mysql_query($sql_x, $conec);
				$linhas_x = mysql_num_rows($res_x);

				if ($linhas_x == 0) {
					if ($registros_incluir == 1) {
						//formatar bol dgp
						$bol_dgp = '';

						list($numero, $data) = explode("-", $dados['bol_data_de_alistamento']);
						if (strlen($numero) == 1) {$numero = '00' . $numero;}
						if (strlen($numero) == 2) {$numero = '0' . $numero;}

						list($dia, $mes, $ano) = explode("/", $data);
						if (strlen($dia) == 1) {$dia = '0' . $dia;}
						if (strlen($mes) == 1) {$mes = '0' . $mes;}
						if (strlen($ano) == 2) {if ($ano > 11) {$ano = '19' . $ano;} else{$ano = '20' . $ano;}}

						if ((strlen($numero) == 3) and (strlen($dia) == 2) and (strlen($mes) == 2) and (strlen($ano) == 4)) {$bol_dgp = $numero . '-' . $dia . '/' . $mes . '/' . $ano;}

						if ($bol_dgp == '') {$bol_dgp = '111-11/11/1111';}

						$rg = $rg_dgf;
						$situacao = $dados['situacao'];
						$quadro = $dados['quadro'];
						$boletimsituacao = $bol_dgp;
						$boletimquadro = $bol_dgp;
						$graduacao = $dados['graduacao'];
						$boletimpromocao = $bol_dgp;
						$nome = $dados['nome_pess'];
						$nomeguerra = $dados['nome_guerra'];
						$dataingresso = $dados['alistamento'];
						$boletimingresso = $bol_dgp;
						$unidade = buscar_codigo_unidade($dados['cod_dgf']);
						if ($unidade == '') {$unidade = 'B 0193';}
						$boletimmovimentacao = $bol_dgp;
						$codigo_prestando_servico = buscar_codigo_unidade($dados['cod_dgf']);
						if ($codigo_prestando_servico == '') {$codigo_prestando_servico = 'B 0193';}
						$boletim_prestando_servico = $bol_dgp;
						$datanascimento = $dados['data_de_nascimento'];
						$sexo = substr($dados['sexo'], 0, 1);
						$aniversario = substr($dados['data_de_nascimento'],5, 2).substr($dados['data_de_nascimento'],8, 2);
						$comportamento = 'BOM';
						$pai = $dados['filiacao_pai'];
						$mae = $dados['filiacao_mae'];
						$cpf = $dados['cpf'];
						$pasep = limparString($dados['pasep']);
						$tituloeleitor = limparString($dados['titulo_de_eleitor']);
						$tituloeleitorzona = $dados['zona'];
						$tituloeleitorsecao = $dados['secao'];
						$nacionalidade = $dados['nacionalidade'];
						$naturalidade = $dados['naturalidade'];
						$identidadefuncional = limparString($dados['id_func']);
						$endereco = $dados['endereco'];
						$numero = $dados['numero'];
						$complemento = $dados['complemento'];
						$cep = limparString($dados['cep']);
						$bairro = $dados['bairro'];
						$municipio = $dados['cidade'];
						$estado = $dados['estado'];
						$telefone = limparString($dados['telefone_residencial']);
						$telefone2 = '';
						$celular = limparString($dados['telefone_celular']);
						$celular2 = limparString($dados['telefone_funcional']);
						$altura = $dados['altura'];
						$vinculo = 1;

						$grau_escolaridade_id = $dados['grau_de_instrucao'];
						$medida_calca = $dados['num_calca'];
						$medida_quepe = $dados['num_quepe'];
						$medida_camisa = $dados['num_camisa'];
						$medida_calcado = $dados['num_calcado'];
						$medida_coturno = $dados['num_coturno'];
						$atividade = $dados['atividade'];
						$temporario = $dados['temporario'];

						$sql_i = "INSERT INTO sac_efetivo (rg, codigo_situacao, codigo_quadro, codigo_graduacao, boletim_promocao, nome, nome_guerra, sexo, data_ingresso, boletim_ingresso, codigo_unidade, boletim_movimentacao, data_nascimento, aniversario, estado_civil, comportamento, pai, mae, cpf, pasep, titulo_eleitoral, titulo_eleitoral_zona, titulo_eleitoral_secao, nacionalidade_id, naturalidade_id, identidade_funcional, vinculo, boletim_situacao, boletim_quadro, altura, militar_novo, codigo_prestando_servico, boletim_prestando_servico, grau_escolaridade_id, medida_calca, medida_quepe, medida_camisa, medida_calcado, medida_coturno, atividade, temporario) ";
						$sql_i .= "VALUES ('$rg', '$situacao', '$quadro', '$graduacao', '$boletimpromocao', '$nome', '$nomeguerra', '$sexo', '$dataingresso', '$boletimingresso', '$unidade', '$boletimmovimentacao', '$datanascimento', '$aniversario', '$estadocivil', '$comportamento', '$pai', '$mae', '$cpf', '$pasep', '$tituloeleitor', '$tituloeleitorzona', '$tituloeleitorsecao', '$nacionalidade', '$naturalidade', '$identidadefuncional', '$vinculo', '$boletimsituacao', '$boletimquadro', '$altura', 'imp', '$codigo_prestando_servico', '$boletim_prestando_servico', '$grau_escolaridade_id', '$medida_calca', '$medida_quepe', '$medida_camisa', '$medida_calcado', '$medida_coturno', '$atividade', '$temporario')";

						$res_i = mysql_query($sql_i, $conec);

						if ($res_i) {
							//inserir endereco
							$sql_i2 = "INSERT INTO sac_enderecos (rg, endereco, numero, complemento, cep, bairro, municipio, estado, telefone, telefone2, celular, celular2) ";
							$sql_i2 .= "VALUES ('$rg', '$endereco', '$numero', '$complemento', '$cep', '$bairro', '$municipio', '$estado', '$telefone', '$telefone2', '$celular', '$celular2')";

							$res_i2 = mysql_query($sql_i2,$conec);

							//inserir fundo de saude
							$sql_fs = "SELECT * FROM sac_fundo_saude ";
							$sql_fs .= "WHERE rg='".$rg."' ";

							$res_fs = mysql_query($sql_fs,$conec);
							$linhas_fs = mysql_num_rows($res_fs);

							if ($linhas_fs <= 0) {
								$sql_fs2 = "INSERT INTO sac_fundo_saude (rg, cancelar_desconto, acesso_sistema_saude, tipo_acesso) ";
								$sql_fs2 .= "VALUES ('$rg', '1', '0', '0')";

								$res_fs2 = mysql_query($sql_fs2,$conec);
							}
						}
					} else {
						$relatorio_html_tab_conteudo .= '<tr>
															<td>' . utf8_encode($rg_dgf) . '</td>
															<td>' . utf8_encode($nome_dgp) . '</td>
															<td>' . utf8_encode(buscar_graduacao($graduacao_dgf)) . '</td>
															<td>' . utf8_encode(buscar_situacao($situacao_dgf)) . '</td>
														</tr>';
					}
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_conteudo != '') {
			if ($registros_incluir == 1) {
				$botao_incluir = '';
			} else {
				$botao_incluir = '&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-outline-success opacity-50 btnGerarRelatorio" data-registros_incluir="1" data-registros_atualizar="0" data-registros_excluir="0" data-id="'.$relatorio_id.'" data-nome="'.utf8_encode($relatorio_nome).'" data-nome_tooltip="'.utf8_encode($relatorio_nome_tooltip).'" data-descricao="'.utf8_encode($relatorio_descricao).'">Incluir Registros</button>';
			}

			$relatorio_html_tab = '<div class="text-success pb-3">'.$botao_incluir.'</div>
									  <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
									  	<thead>
									  		<tr>
									  			<th scope="col">RG</th>
												<th scope="col">Nome</th>
												<th scope="col">Graduação</th>
												<th scope="col">Situação</th>
											</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_conteudo.'</tbody>
									  </table>';
		} else {
			$relatorio_html_tab = '<div class="text-center text-dark pb-3">Nenhum registro para atualizar.</div>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-12">'.$relatorio_html_tab.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=7 : Militares Ativos sem Férias para a última referência
	if ($relatorio_id == 7) {
		//Pegar última referência
		$sql = "SELECT referencia FROM sac_ferias ";
		$sql .= "ORDER BY referencia DESC ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$referencia = $dados['referencia'];

		//Sql
		$sql = "SELECT sac_efetivo.rg, sac_efetivo.nome, sac_unidades.unidade, sac_situacao.situacao, sac_graduacao.graduacao FROM sac_efetivo ";
		$sql .= "INNER JOIN sac_unidades ON sac_unidades.codigo_unidade=sac_efetivo.codigo_unidade ";
		$sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
		$sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
		$sql .= "WHERE sac_efetivo.codigo_situacao='01' OR sac_efetivo.codigo_situacao='11' ";
		$sql .= "ORDER BY sac_unidades.unidade, sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$unidade = $dados['unidade'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];

				//Verificar se tem ferias
				$sql_x = "SELECT rg FROM sac_ferias ";
				$sql_x .= "WHERE rg='".$rg."' AND referencia='".$referencia."'";

				$res_x = mysql_query($sql_x, $conec);
				$linhas_x = mysql_num_rows($res_x);

				if ($linhas_x == 0) {
					$relatorio_html_tab_conteudo .= '<tr>
														<td>' . utf8_encode($unidade) . '</td>
														<td>' . utf8_encode($rg) . '</td>
														<td>' . utf8_encode($nome) . '</td>
														<td>' . utf8_encode($graduacao) . '</td>
														<td>' . utf8_encode($referencia) . '</td>
													</tr>';
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_conteudo != '') {
			$relatorio_html_tab = '<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
										<thead>
									  		<tr>
									  			<th scope="col">Unidade</th>
									  			<th scope="col">RG</th>
												<th scope="col">Nome</th>
												<th scope="col">Graduação</th>
												<th scope="col">Referência</th>
											</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_conteudo.'</tbody>
									  </table>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-12">'.$relatorio_html_tab.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=8 : Militares com acesso indevido ao sistema de saúde
	if ($relatorio_id == 8) {
		//negar acesso ao sistema de saude para o militar e seus dependentes (DAS SITUACOES ABAIXO)
		//03	EXCLUÍDO
		//08	DEMITIDO
		//26	EXCLUSÃO INCAP. MORAL OU A BEM DA DISCIPLINA
		//28	EXCLUSÃO EX-OFFÍCIO
		//30	DEMISSÃO A PEDIDO
		//31	DEMISSÃO EX-OFFÍCIO
		//33	EXCLUSÃO DO SERVIÇO ATIVO
		//09	EXTRAVIADO
		//24	DESERTOR
		//32	PERDA DO POSTO E DA PATENTE
		//34	RESERVA NÃO REMUNERADA
		//35	ANULAÇÃO DE INCORPORAÇÃO DE PRAÇA
		//36	EX-MILITAR DO CBMERJ

		$codigos_situacoes = "'03', '08', '26', '28', '30', '31', '33', '09', '24', '32', '34', '35', '36'";

		//Sql
		$sql = "SELECT sac_efetivo.rg, sac_efetivo.nome, sac_situacao.situacao, sac_graduacao.graduacao FROM sac_efetivo ";
		$sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo.codigo_situacao ";
		$sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo.codigo_graduacao ";
		$sql .= "WHERE sac_efetivo.codigo_situacao IN(".$codigos_situacoes.") ";
		$sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];

				$colocar_grade = 0;

				$militar_acesso_indevido = 0;
				$dependente_acesso_indevido = 0;

				//acesso sistema saude do militar
				$sql_x = "SELECT * FROM sac_fundo_saude WHERE rg='".$rg."'";
				$res_x = mysql_query($sql_x, $conec);
				$linhas_x = mysql_num_rows($res_x);
				$dados_x = mysql_fetch_array($res_x);

				if ($dados_x['cancelar_desconto'] == 0 or $dados_x['acesso_sistema_saude'] == 1 or $dados_x['tipo_acesso'] != 0) {
					$colocar_grade = 1;
					$militar_acesso_indevido++;

					if ($registros_atualizar == 1) {
						$sql_a = "UPDATE sac_fundo_saude SET cancelar_desconto=1, acesso_sistema_saude=0, tipo_acesso=0 WHERE rg='".$rg."'";
						mysql_query($sql_a, $conec);
					}
				}

				//buscar dependentes do militar
				$sql_x = "SELECT * FROM sac_dependentes WHERE rg='".$rg."' ";
				$res_x = mysql_query($sql_x,$conec);
				$linhas_x = mysql_num_rows($res_x);
				$dados_x = mysql_fetch_array($res_x);

				if ($linhas_x > 0) {
					$linhasini_x = 1;
					while ($linhasini_x <= $linhas_x) {
						$codigo = $dados_x['codigo'];
						$decisao_judicial = $dados_x['decisao_judicial'];
						$acesso_sistema_saude_dependente = $dados_x['acesso_sistema_saude_dependente'];
						$tipo_acesso = $dados_x['tipo_acesso'];

						if ($decisao_judicial != 'SIM') {
							if ($acesso_sistema_saude_dependente == 1 or $tipo_acesso != 0) {
								$colocar_grade = 1;
								$dependente_acesso_indevido++;

								if ($registros_atualizar == 1) {
									$sql_a = "UPDATE sac_dependentes SET excluido='1', acesso_sistema_saude_dependente='0', tipo_acesso='0' WHERE codigo='".$codigo."'";
									mysql_query($sql_a, $conec);
								}
							}
						}

						$linhasini_x ++;
						$dados_x = mysql_fetch_array($res_x);
					}
				}

				if ($colocar_grade == 1) {
					if ($registros_atualizar == 0) {
						$relatorio_html_tab_conteudo .= '<tr>
															<td>' . utf8_encode($rg) . '</td>
															<td>' . utf8_encode($nome) . '</td>
															<td>' . utf8_encode($graduacao) . '</td>
															<td>' . utf8_encode($situacao) . '</td>
															<td>' . 'Militar: '.$militar_acesso_indevido . '<br>Dependente: '.$dependente_acesso_indevido . '</td>
														</tr>';
					}
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_conteudo != '') {
			if ($registros_atualizar == 1) {
				$botao_atualizar = '';
			} else {
				$botao_atualizar = '<button type="button" class="btn btn-sm btn-outline-danger opacity-50 btnGerarRelatorio" data-registros_incluir="0" data-registros_atualizar="1" data-registros_excluir="0" data-id="'.$relatorio_id.'" data-nome="'.utf8_encode($relatorio_nome).'" data-nome_tooltip="'.utf8_encode($relatorio_nome_tooltip).'" data-descricao="'.utf8_encode($relatorio_descricao).'">Atualizar Registros</button>';
			}

			$relatorio_html_tab = '<div class="text-center text-success pb-3">'.$botao_atualizar.'</div>
									<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
										<thead>
									  		<tr>
									  			<th scope="col">RG</th>
												<th scope="col">Nome</th>
												<th scope="col">Graduação</th>
												<th scope="col">Situação</th>
												<th scope="col">Acesso Indevido</th>
											</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_conteudo.'</tbody>
									  </table>';
		} else {
			$relatorio_html_tab = '<div class="text-center text-dark pb-3">Nenhum registro para atualizar.</div>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-12">'.$relatorio_html_tab.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=9 : Militares ativos por unidades (Cartão de Natal)
	if ($relatorio_id == 9) {
		//Sql
		$sql = "SELECT sac_efetivo_CARTAO_NATAL_2023.rg, sac_efetivo_CARTAO_NATAL_2023.nome, sac_efetivo_CARTAO_NATAL_2023.cpf, sac_efetivo_CARTAO_NATAL_2023.data_nascimento, sac_unidades.unidade, sac_prestando_servico.unidade_prestando_servico as prestando_servico, sac_situacao.situacao, sac_graduacao.graduacao FROM sac_efetivo_CARTAO_NATAL_2023 ";
		$sql .= "LEFT JOIN sac_unidades ON sac_unidades.codigo_unidade=sac_efetivo_CARTAO_NATAL_2023.codigo_unidade ";
		$sql .= "LEFT JOIN sac_prestando_servico ON sac_prestando_servico.codigo_prestando_servico=sac_efetivo_CARTAO_NATAL_2023.codigo_prestando_servico ";
		$sql .= "INNER JOIN sac_situacao ON sac_situacao.codigo_situacao=sac_efetivo_CARTAO_NATAL_2023.codigo_situacao ";
		$sql .= "INNER JOIN sac_graduacao ON sac_graduacao.codigo_graduacao=sac_efetivo_CARTAO_NATAL_2023.codigo_graduacao ";
		$sql .= "WHERE sac_efetivo_CARTAO_NATAL_2023.codigo_situacao='01' OR sac_efetivo_CARTAO_NATAL_2023.codigo_situacao='11' ";
		$sql .= "ORDER BY sac_unidades.unidade, sac_prestando_servico.unidade_prestando_servico, sac_efetivo_CARTAO_NATAL_2023.codigo_graduacao, sac_efetivo_CARTAO_NATAL_2023.rg, sac_efetivo_CARTAO_NATAL_2023.nome ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg = $dados['rg'];
				$nome = $dados['nome'];
				$nome_24 = substr($nome, 0, 24);
				$cpf = $dados['cpf'];
				$cpf = limparString($cpf);
				$cpf = str_pad($cpf, 10, 0, STR_PAD_LEFT);
				$data_nascimento = $dados['data_nascimento'];
				$unidade = $dados['unidade'];
				$prestando_servico = $dados['prestando_servico'];
				$graduacao = $dados['graduacao'];
				$situacao = $dados['situacao'];

				$relatorio_html_tab_conteudo .= '<tr>
													<td>' . utf8_encode($unidade) . '</td>
													<td>' . utf8_encode($prestando_servico) . '</td>
													<td>' . utf8_encode($rg) . '</td>
													<td>' . utf8_encode($nome) . '</td>
													<td>' . utf8_encode($nome_24) . '</td>
													<td>' . utf8_encode($cpf) . '</td>
													<td>' . utf8_encode($data_nascimento) . '</td>
													<td>' . utf8_encode($graduacao) . '</td>
												</tr>';

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_conteudo != '') {
			$relatorio_html_tab = '<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
										<thead>
									  		<tr>
									  			<th scope="col">Unidade</th>
									  			<th scope="col">Prestando Serviço</th>
									  			<th scope="col">RG</th>
												<th scope="col">Nome</th>
												<th scope="col">Nome 24</th>
												<th scope="col">CPF</th>
												<th scope="col">Nascimento</th>
												<th scope="col">Graduação</th>
											</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_conteudo.'</tbody>
									  </table>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-12">'.$relatorio_html_tab.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=10 : Atualizar Militares com a DGP
	if ($relatorio_id == 10) {
		//Sql
		$sql = "SELECT sac_efetivo.* FROM sac_efetivo ";
		$sql .= "WHERE 1=1 ";

		if ($rel10_codigo_situacao != 99) {
			$sql .= "AND codigo_situacao='".$rel10_codigo_situacao."'";
		}

		$sql .= "ORDER BY sac_efetivo.codigo_situacao, sac_efetivo.codigo_graduacao, sac_efetivo.rg, sac_efetivo.nome ";

		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		$relatorio_html_tab_conteudo = '';

		if ($linhas > 0) {
			$linhasini = 1;
			while ($linhasini <= $linhas) {
				$rg_dgf = trim($dados['rg']);
				$rg_dgp = substr($rg_dgf,3,4).substr($rg_dgf,8,3);
				$nome_dgf = trim($dados['nome']);

				$identidade_funcional_dgf = trim($dados['identidade_funcional']);
				$identidade_funcional_dgf = str_replace(' ', '', $identidade_funcional_dgf);
				$identidade_funcional_dgf = str_pad($identidade_funcional_dgf, 10, 0, STR_PAD_LEFT);

				$codigo_graduacao_dgf = trim($dados['codigo_graduacao']);
				$boletim_promocao_dgf = trim($dados['boletim_promocao']);
				$data_promocao_dgf = trim($dados['data_promocao']);

				$codigo_situacao_dgf = trim($dados['codigo_situacao']);
				$boletim_situacao_dgf = trim($dados['boletim_situacao']);
				$data_situacao_dgf = trim($dados['data_situacao']);

				//Verificar na DGP
				$sql_d = "SELECT dados.codigo, dados.rg, dados.nome_pess, dados.situacao, dados.graduacao, dados.obm_atual, obms.cod_dgf, dados.nome_guerra, dados.cpf, ";
				$sql_d .= "dados.quadro, dados.alistamento, dados.bol_data_de_alistamento, dados.comportamento, dados.data_de_nascimento, dados_complementares.filiacao_mae, ";
				$sql_d .= "dados.id_func, dados.temporario, dados_complementares.filiacao_pai, dados_complementares.sexo, dados_complementares.pasep, ";
				$sql_d .= "dados_complementares.estado_civil, dados_complementares.naturalidade, dados_complementares.nacionalidade, dados_complementares.titulo_de_eleitor, ";
				$sql_d .= "dados_complementares.zona, dados_complementares.secao, dados_complementares.grau_de_instrucao, dados_complementares.endereco, dados_complementares.numero, ";
				$sql_d .= "dados_complementares.complemento, dados_complementares.bairro, dados_complementares.cep, dados_complementares.cidade, dados_complementares.estado, ";
				$sql_d .= "dados_complementares.telefone_residencial, dados_complementares.telefone_celular, dados_complementares.telefone_funcional, dados_complementares.cor, ";
				$sql_d .= "dados_complementares.altura, dados_complementares.grau_de_instrucao, dados_complementares.num_calca, dados_complementares.num_quepe, ";
				$sql_d .= "dados_complementares.num_camisa, dados_complementares.num_calcado, dados_complementares.num_coturno, dados_complementares.atividade, ";
				$sql_d .= "promocoes.datas_das_promocoes as promocao_data, promocoes.ao_posto_de as promocao_posto_graduacao, promocoes.num_boletim as promocao_numero_boletim, ";
				$sql_d .= "promocoes.bol_data as promocao_data_boletim FROM dados ";
				$sql_d .= "INNER JOIN obms ON obms.cod_item=dados.obm_atual ";
				$sql_d .= "INNER JOIN dados_complementares ON dados_complementares.codigo=dados.codigo ";
				$sql_d .= "LEFT JOIN promocoes ON promocoes.codigo=dados.codigo ";
				$sql_d .= "WHERE rg='".$rg_dgp."' ";
				$sql_d .= "ORDER BY promocoes.datas_das_promocoes DESC, promocoes.bol_data DESC ";
				$sql_d .= "LIMIT 1 ";

				$res_d = mysql_query($sql_d, $conec_dgp);
				$linhas_d = mysql_num_rows($res_d);
				$dados_d = mysql_fetch_array($res_d);

				if ($linhas_d == 1) {
					$nome_dgp = trim($dados_d['nome_pess']);

					$identidade_funcional_dgp = trim($dados_d['id_func']);
					$identidade_funcional_dgp = str_replace(' ', '', $identidade_funcional_dgp);
					$identidade_funcional_dgp = str_pad($identidade_funcional_dgp, 10, 0, STR_PAD_LEFT);

					$codigo_graduacao_dgp = trim($dados_d['graduacao']);
					$boletim_promocao_dgp = trim($dados_d['promocao_numero_boletim'].'-'.formatadata(2, $dados_d['promocao_data_boletim']));
					$data_promocao_dgp = trim($dados_d['promocao_data']);

					$codigo_situacao_dgp = trim($dados_d['situacao']);
					$boletim_situacao_dgp = trim($dados_d['situacao_numero_boletim'].'-'.formatadata(2, $dados_d['situacao_data_boletim']));
					$data_situacao_dgp = trim($dados_d['situacao_data']);

					$campo_diferente = 0;

					//Verificar se campo escolhido ($rel10_campo_diferente) está diferente entre DGF/DGP
					if ($rel10_campo_diferente == '01') {
						if ($identidade_funcional_dgf != $identidade_funcional_dgp) {
							$campo_diferente = 1;
							$campo_nome = 'identidade_funcional';
							$campo_valor = $identidade_funcional_dgp;
						}
					}
					if ($rel10_campo_diferente == '02') {
						if ($nome_dgf != $nome_dgp) {
							$campo_diferente = 1;
							$campo_nome = 'nome';
							$campo_valor = $nome_dgp;
						}
					}
					if ($rel10_campo_diferente == '03') {
						if ($codigo_situacao_dgf != $codigo_situacao_dgp) {
							$campo_diferente = 1;
							$campo_nome = 'codigo_situacao';
							$campo_valor = $codigo_situacao_dgp;
						}
					}
					if ($rel10_campo_diferente == '04') {
						if ($codigo_graduacao_dgf != $codigo_graduacao_dgp) {
							$campo_diferente = 1;
							$campo_nome = 'codigo_graduacao';
							$campo_valor = $codigo_graduacao_dgp;
						}
					}
					if ($rel10_campo_diferente == '05') {
						if ($data_promocao_dgf != $data_promocao_dgp) {
							$campo_diferente = 1;
							$campo_nome = 'data_promocao';
							$campo_valor = $data_promocao_dgp;
						}
					}

					//Registro diferente
					if ($campo_diferente == 1) {
						if ($registros_atualizar == 1) {
							$sql_a = "UPDATE sac_efetivo_xxxxxxxxxxxxxxxxxxxxx SET ".$campo_nome."='".$campo_valor."' WHERE rg='".$rg_dgf."'";
							mysql_query($sql_a, $conec);
						} else {
							$relatorio_html_tab_conteudo .= '<tr>';
							$relatorio_html_tab_conteudo .= '<td>' . utf8_encode($rg_dgf) . '<br>' . utf8_encode($nome_dgf) . '</td>';

							if ($rel10_campo_diferente == '01') {
								$relatorio_html_tab_conteudo .= '<td>' . '<strong>F: </strong>'.utf8_encode($identidade_funcional_dgf) . '<br>' . '<strong>P: </strong>'.utf8_encode($identidade_funcional_dgp) . '</td>';
							}
							if ($rel10_campo_diferente == '02') {
								$relatorio_html_tab_conteudo .= '<td>' . '<strong>F: </strong>'.utf8_encode($nome_dgf) . '<br>' . '<strong>P: </strong>'.utf8_encode($nome_dgp) . '</td>';
							}
							if ($rel10_campo_diferente == '03') {
								$relatorio_html_tab_conteudo .= '<td>' . '<strong>F: </strong>'.utf8_encode(buscar_situacao($codigo_situacao_dgf)) . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boletim: '.$boletim_situacao_dgf . '<br>' . '<strong>P: </strong>'.utf8_encode(buscar_situacao($codigo_situacao_dgp)) . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boletim: '.$boletim_situacao_dgp . '</br>';
							}
							if ($rel10_campo_diferente == '04') {
								$relatorio_html_tab_conteudo .= '<td>' . '<strong>F: </strong>'.utf8_encode(buscar_graduacao($codigo_graduacao_dgf)) . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boletim: '.$boletim_promocao_dgf . '<br>' . '<strong>P: </strong>'.utf8_encode(buscar_graduacao($codigo_graduacao_dgp)) . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boletim: '.$boletim_promocao_dgp . '</td>';
							}
							if ($rel10_campo_diferente == '05') {
								$relatorio_html_tab_conteudo .= '<td>' . '<strong>F: </strong>'.$data_promocao_dgf.'<br>' . '<strong>P: </strong>'.$data_promocao_dgp.'</td>';
							}

							$relatorio_html_tab_conteudo .= '</tr>';
						}
					}
				}

				$linhasini++;
				$dados = mysql_fetch_array($res);
			}
		}

		if ($relatorio_html_tab_conteudo != '') {
			if ($registros_atualizar == 1) {
				$botao_atualizar = '';
			} else {
				$botao_atualizar = '<button type="button" class="btn btn-sm btn-outline-danger opacity-50 btnGerarRelatorio" data-registros_incluir="0" data-registros_atualizar="1" data-registros_excluir="0" data-id="'.$relatorio_id.'" data-nome="'.utf8_encode($relatorio_nome).'" data-nome_tooltip="'.utf8_encode($relatorio_nome_tooltip).'" data-descricao="'.utf8_encode($relatorio_descricao).'">Atualizar Registros</button>';
			}

			$relatorio_html_tab = '<div class="text-center text-success pb-3">'.$botao_atualizar.'</div>
									<table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
										<thead>
									  		<tr>
									  			<th scope="col">RG/Nome DGF</th>';

			if ($rel10_campo_diferente == '01') {
				$relatorio_html_tab .= '<th scope="col">ID DGF/DGP</th>';
			}
			if ($rel10_campo_diferente == '02') {
				$relatorio_html_tab .= '<th scope="col">Nome DGF/DGP</th>';
			}
			if ($rel10_campo_diferente == '03') {
				$relatorio_html_tab .= '<th scope="col">Situação DGF/DGP</th>';
			}
			if ($rel10_campo_diferente == '04') {
				$relatorio_html_tab .= '<th scope="col">Graduação DGF/DGP</th>';
			}
			if ($rel10_campo_diferente == '05') {
				$relatorio_html_tab .= '<th scope="col">Data Promoção DGF/DGP</th>';
			}

			$relatorio_html_tab .= '		</tr>
										</thead>
										<tbody>'.$relatorio_html_tab_conteudo.'</tbody>
									  </table>';
		} else {
			$relatorio_html_tab = '<div class="text-center text-dark pb-3">Nenhum registro para atualizar.</div>';
		}

		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white col-12">
								<div class="text-center text-primary pb-3">
									'.$relatorio_nome_tooltip.'
									<br>
									<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
								</div>
								<div class="table-responsive px-3 py-3 bg-white col-12 col-md-12">'.$relatorio_html_tab.'</div>
							</div>';

		echo $relatorio_html;
	}

	//Relatório ID=11 : Militares e Dependentes - Acesso ao sistema de saúde (Totais)
	if ($relatorio_id == 11) {
		$relatorio_html = '<div class="table-responsive px-3 py-3 bg-white">
							<div class="text-center text-primary pb-3">
							'.$relatorio_nome_tooltip.'
							<br>
							<a href="#" class="small text-danger" onclick="fecharRelatoriosVisualisar();">Fechar</a>
							</div>
                            <table class="table table-nowrap table-hover table-striped table-bordered pt-4 class-datatable-2" style="font-size: 11px;">
                                <thead>
                                    <tr>
                                    	<th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th colspan="2" nowrap="true">Acesso Sistema Saúde</th>
                                        <th>&nbsp;</th>
                                        <th colspan="2" nowrap="true">Acesso Sistema Saúde</th>
                                        <th>&nbsp;</th>
                                        <th colspan="2" nowrap="true">Acesso Sistema Saúde</th>
									</tr>
                                    <tr>
                                    	<th nowrap="true">Situação do Militar</th>
                                        <th nowrap="true">Militares</th>
                                        <th nowrap="true">SIM</th>
                                        <th nowrap="true">NÃO</th>
                                        <th nowrap="true">Dependentes</th>
                                        <th nowrap="true">SIM</th>
                                        <th nowrap="true">NÃO</th>
                                        <th nowrap="true">Pessoas</th>
                                        <th nowrap="true">SIM</th>
                                        <th nowrap="true">NÃO</th>
									</tr>
                                </thead>
                                <tbody>';

		//Variaveis de totais gerais''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$total_militares = 0;
		$total_militares_acesso_sim = 0;
		$total_militares_acesso_nao = 0;
		$total_dependentes = 0;
		$total_dependentes_acesso_sim = 0;
		$total_dependentes_acesso_nao = 0;
		$total_pessoas = 0;
		$total_pessoas_acesso_sim = 0;
		$total_pessoas_acesso_nao = 0;
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Grupo Situações: 01-ATIVO // 11-ATIVO - DECISÃO JUDICIAL''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$grupo_situacoes = 'Ativos';
		$militares = 0;
		$militares_acesso_sim = 0;
		$militares_acesso_nao = 0;
		$dependentes = 0;
		$dependentes_acesso_sim = 0;
		$dependentes_acesso_nao = 0;

		//Sql Militares
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares = $dados['qtd'];}

		//Sql Militares Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11') AND acesso_sistema_saude=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_sim = $dados['qtd'];}

		//Sql Militares Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11') AND acesso_sistema_saude=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_nao = $dados['qtd'];}

		//Sql Dependentes
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes = $dados['qtd'];}

		//Sql Dependentes Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11') AND acesso_sistema_saude_dependente=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_sim = $dados['qtd'];}

		//Sql Dependentes Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('01','11') AND acesso_sistema_saude_dependente=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_nao = $dados['qtd'];}

		$relatorio_html .= '<tr>
								<td>'.$grupo_situacoes.'</td>
								<td>'.$militares.'</td>
								<td>'.$militares_acesso_sim.'</td>
								<td>'.$militares_acesso_nao.'</td>
								<td>'.$dependentes.'</td>
								<td>'.$dependentes_acesso_sim.'</td>
								<td>'.$dependentes_acesso_nao.'</td>
								<td>'.($militares + $dependentes).'</td>
								<td>'.($dependentes_acesso_sim + $dependentes_acesso_sim).'</td>
								<td>'.($dependentes_acesso_nao + $dependentes_acesso_nao).'</td>
							</tr>';

		//Variaveis de totais gerais
		$total_militares += $militares;
		$total_militares_acesso_sim += $militares_acesso_sim;
		$total_militares_acesso_nao += $militares_acesso_nao;
		$total_dependentes += $dependentes;
		$total_dependentes_acesso_sim += $dependentes_acesso_sim;
		$total_dependentes_acesso_nao += $dependentes_acesso_nao;
		$total_pessoas += $militares + $dependentes;
		$total_pessoas_acesso_sim += $militares_acesso_sim + $dependentes_acesso_sim;
		$total_pessoas_acesso_nao += $militares_acesso_nao + $dependentes_acesso_nao;
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Grupo Situações: 02-INATIVO // 14-REFORMADO ART. 105 I // 20-RESERVA REMUNERADA A PEDIDO // 21-REFORMADO
		// 22-RESERVA REMUNERADA // 23-RESERVA REMUNERADA EX-OFFÍCIO
		$grupo_situacoes = 'Inativos';
		$militares = 0;
		$militares_acesso_sim = 0;
		$militares_acesso_nao = 0;
		$dependentes = 0;
		$dependentes_acesso_sim = 0;
		$dependentes_acesso_nao = 0;

		//Sql Militares
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares = $dados['qtd'];}

		//Sql Militares Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23') AND acesso_sistema_saude=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_sim = $dados['qtd'];}

		//Sql Militares Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23') AND acesso_sistema_saude=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_nao = $dados['qtd'];}

		//Sql Dependentes
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes = $dados['qtd'];}

		//Sql Dependentes Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23') AND acesso_sistema_saude_dependente=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_sim = $dados['qtd'];}

		//Sql Dependentes Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('02','14','20','21','22','23') AND acesso_sistema_saude_dependente=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_nao = $dados['qtd'];}

		$relatorio_html .= '<tr>
								<td>' . $grupo_situacoes.'</td>
								<td>'.$militares.'</td>
								<td>'.$militares_acesso_sim.'</td>
								<td>'.$militares_acesso_nao.'</td>
								<td>'.$dependentes.'</td>
								<td>'.$dependentes_acesso_sim.'</td>
								<td>'.$dependentes_acesso_nao.'</td>
								<td>'.($militares + $dependentes).'</td>
								<td>'.($dependentes_acesso_sim + $dependentes_acesso_sim).'</td>
								<td>'.($dependentes_acesso_nao + $dependentes_acesso_nao).'</td>
							</tr>';

		//Variaveis de totais gerais
		$total_militares += $militares;
		$total_militares_acesso_sim += $militares_acesso_sim;
		$total_militares_acesso_nao += $militares_acesso_nao;
		$total_dependentes += $dependentes;
		$total_dependentes_acesso_sim += $dependentes_acesso_sim;
		$total_dependentes_acesso_nao += $dependentes_acesso_nao;
		$total_pessoas += $militares + $dependentes;
		$total_pessoas_acesso_sim += $militares_acesso_sim + $dependentes_acesso_sim;
		$total_pessoas_acesso_nao += $militares_acesso_nao + $dependentes_acesso_nao;
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Grupo Situações: 03-EXCLUÍDO // 04-FALECIDO // 05-PENSIONISTA // 06-LICENCIADO // 07-INATIVO CIVIL // 08-DEMITIDO
		// 09-EXTRAVIADO // 15-PENSIONISTA PROVISÓRIO // 16-PENSIONISTA ESPECIAL // 17-PENSIONISTA RIOPREVIDÊNCIA // 24-DESERTOR
		// 25-LICENCIAMENTO A PEDIDO // 26-EXCLUSÃO INCAP. MORAL OU A BEM DA DISCIPLINA // 27-LICENCIAMENTO EX-OFFÍCIO
		// 28-EXCLUSÃO EX-OFFÍCIO // 30-DEMISSÃO A PEDIDO // 31-DEMISSÃO EX-OFFÍCIO // 32-PERDA DO POSTO E DA PATENTE
		// 33-EXCLUSÃO DO SERVIÇO ATIVO // 34-RESERVA NÃO REMUNERADA // 35-ANULAÇÃO DE INCORPORAÇÃO DE PRAÇA // 36-EX-MILITAR DO CBMERJ
		// 37-MATRÍCULA TRANCADA - CFO // 99 	ATUALIZAR
		$grupo_situacoes = 'Situações que não devem ter acesso ao Sistema de Saúde';
		$militares = 0;
		$militares_acesso_sim = 0;
		$militares_acesso_nao = 0;
		$dependentes = 0;
		$dependentes_acesso_sim = 0;
		$dependentes_acesso_nao = 0;

		//Sql Militares
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares = $dados['qtd'];}

		//Sql Militares Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99') AND acesso_sistema_saude=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_sim = $dados['qtd'];}

		//Sql Militares Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99') AND acesso_sistema_saude=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$militares_acesso_nao = $dados['qtd'];}

		//Sql Dependentes
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99');";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes = $dados['qtd'];}

		//Sql Dependentes Acesso SIM
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99') AND acesso_sistema_saude_dependente=1;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_sim = $dados['qtd'];}

		//Sql Dependentes Acesso NÃO
		$sql = "SELECT count(sac_efetivo.rg) as qtd FROM sac_efetivo INNER JOIN sac_fundo_saude ON sac_fundo_saude.rg=sac_efetivo.rg INNER JOIN sac_dependentes ON sac_dependentes.rg=sac_efetivo.rg WHERE codigo_situacao IN('03','04','05','06','07','08','09','15','16','17','24','25','26','27','28','30','31','32','33','34','35','36','37','99') AND acesso_sistema_saude_dependente=0;";
		$res = mysql_query($sql, $conec);
		$linhas = mysql_num_rows($res);
		$dados = mysql_fetch_array($res);

		if ($linhas == 1) {$dependentes_acesso_nao = $dados['qtd'];}

		$relatorio_html .= '<tr>
								<td>' . $grupo_situacoes.'</td>
								<td>'.$militares.'</td>
								<td>'.$militares_acesso_sim.'</td>
								<td>'.$militares_acesso_nao.'</td>
								<td>'.$dependentes.'</td>
								<td>'.$dependentes_acesso_sim.'</td>
								<td>'.$dependentes_acesso_nao.'</td>
								<td>'.($militares + $dependentes).'</td>
								<td>'.($dependentes_acesso_sim + $dependentes_acesso_sim).'</td>
								<td>'.($dependentes_acesso_nao + $dependentes_acesso_nao).'</td>
							</tr>';

		//Variaveis de totais gerais
		$total_militares += $militares;
		$total_militares_acesso_sim += $militares_acesso_sim;
		$total_militares_acesso_nao += $militares_acesso_nao;
		$total_dependentes += $dependentes;
		$total_dependentes_acesso_sim += $dependentes_acesso_sim;
		$total_dependentes_acesso_nao += $dependentes_acesso_nao;
		$total_pessoas += $militares + $dependentes;
		$total_pessoas_acesso_sim += $militares_acesso_sim + $dependentes_acesso_sim;
		$total_pessoas_acesso_nao += $militares_acesso_nao + $dependentes_acesso_nao;
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		//Crianto linha com toais gerais''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		$relatorio_html .= '<tr>
								<td>&nbsp;</td>
								<td>'.$total_militares.'</td>
								<td>'.$total_militares_acesso_sim.'</td>
								<td>'.$total_militares_acesso_nao.'</td>
								<td>'.$total_dependentes.'</td>
								<td>'.$total_dependentes_acesso_sim.'</td>
								<td>'.$total_dependentes_acesso_nao.'</td>
								<td>'.$total_pessoas.'</td>
								<td>'.$total_pessoas_acesso_sim.'</td>
								<td>'.$total_pessoas_acesso_nao.'</td>
							</tr>';
		//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

		$relatorio_html .= '        </tbody>
                                </table>
                            </div>';

		echo $relatorio_html;
	}
}
?>