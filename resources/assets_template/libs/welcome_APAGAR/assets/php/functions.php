<?php

//Session
session_start();

/*
 * Montar as variaveis de sessão para acesso aos relatorios do usuário
 */
function montar_variaveis_acessos_relatorios($relatorio_usuario_id) {
	global $conec;

	//Varrer relatorios
	$sql = "SELECT * FROM sac_relatorios ";

	$res = mysql_query($sql, $conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas > 0) {
		$linhasini = 1;
		while ($linhasini <= $linhas) {
			$relatorio_id = $dados['id'];
			$nome_session = 'usu_acesso_relatorio_'.$relatorio_id;

			//Verificar acesso
			$sql_a = "SELECT * FROM sac_relatorios_usuarios_acessos ";
			$sql_a .= "WHERE relatorio_usuario_id='".$relatorio_usuario_id."' AND relatorio_id='".$relatorio_id."'";

			$res_a = mysql_query($sql_a, $conec);
			$linhas_a = mysql_num_rows($res_a);

			$_SESSION[$nome_session] = 'nao';

			if ($linhas_a == 1) {$_SESSION[$nome_session] = 'sim';}

			$linhasini++;
			$dados = mysql_fetch_array($res);
		}
	}
}

//total de militares na graduacao
function total_militares_graduacao($codigo_unidade, $codigo_graduacao) {
	global $conec;

	$sql = "SELECT * FROM sac_efetivo ";
	$sql .= "WHERE codigo_situacao='01' AND codigo_unidade='".$codigo_unidade."' AND codigo_graduacao='".$codigo_graduacao."' ";

	$res = mysql_query($sql, $conec);
	$linhas = mysql_num_rows($res);

	return $linhas;
}

//buscar nome da situacao
function buscar_situacao($cod) {
	global $conec;

	$sql = "SELECT situacao FROM sac_situacao ";
	$sql .= "WHERE codigo_situacao='".$cod."' ";
	$res = mysql_query($sql,$conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['situacao'];} else {return '';}
}

//buscar codigo_unidade
function buscar_codigo_unidade($unidade_id) {
	global $conec;

	$sql = "SELECT codigo_unidade FROM sac_unidades ";
	$sql .= "WHERE unidade_id='".$unidade_id."' ";
	$res = mysql_query($sql,$conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['codigo_unidade'];} else {return '';}
}

//buscar nome do quadro
function buscar_quadro($cod) {
	global $conec;

	$sql = "SELECT quadro_especialidade FROM sac_quadro ";
	$sql .= "WHERE codigo_quadro='".$cod."' ";
	$res = mysql_query($sql,$conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['quadro_especialidade'];} else {return '';}
}

//buscar nome da graduacao
function buscar_graduacao($cod) {
	global $conec;

	$sql = "SELECT graduacao FROM sac_graduacao ";
	$sql .= "WHERE codigo_graduacao='".$cod."' ";
	$res = mysql_query($sql,$conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['graduacao'];} else {return '';}
}

//buscar nome da unidade
function buscar_unidade($cod) {
	global $conec;

	$sql = "SELECT unidade FROM sac_unidades ";
	$sql .= "WHERE codigo_unidade='".$cod."' ";
	$res = mysql_query($sql,$conec);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['unidade'];} else {return '';}
}

//buscar nome da unidade dgp
function buscar_unidade_dgp($cod) {
	global $conec_dgp;

	$sql = "SELECT obm FROM obms ";
	$sql .= "WHERE cod_item='".$cod."' ";
	$res = mysql_query($sql,$conec_dgp);
	$linhas = mysql_num_rows($res);
	$dados = mysql_fetch_array($res);

	if ($linhas == 1) {return $dados['obm'];} else {return '';}
}

//funcao para retirar caracteres especiais
function limparString($string) {
	$string = str_replace('-', '', $string);
	$string = str_replace('/', '', $string);
	$string = str_replace('.', '', $string);

	return $string;
}

//funcao para retirar plic
function limparPlic($string) {
	$string = str_replace("'", '', $string);

	return $string;
}

//funcao para retirar acentos
function retirar_acentos_cedilhas($string) {
	$string = str_replace('Ç', 'C', $string);
	$string = str_replace('Á', 'A', $string);
	$string = str_replace('É', 'E', $string);
	$string = str_replace('Í', 'I', $string);
	$string = str_replace('Ó', 'O', $string);
	$string = str_replace('Ú', 'U', $string);
	$string = str_replace('Ã', 'A', $string);
	$string = str_replace('Õ', 'O', $string);
	$string = str_replace('Â', 'A', $string);
	$string = str_replace('Ê', 'E', $string);
	$string = str_replace('Ô', 'O', $string);

	$string = str_replace('º', '', $string);

	return $string;
}

//validar cpf
function validar_cpf($cpf) {
	$cpf_validar = substr($cpf,0,9);
	$soma=0; $n=11;
	for ($i=0;$i<=9;$i++) {
		$n=$n-1;
		$soma=$soma+(substr($cpf_validar,$i,1)*$n);
	};

	$resto= $soma % 11;
	if ($resto<2) {$cpf_validar=$cpf_validar."0";} else {$cpf_validar=$cpf_validar.(11-$resto);};

	//Segunda parte da validacao do CPF
	$soma=0; $n=12;
	for ($i=0;$i<=10;$i++) {
		$n=$n-1;
		$soma=$soma+(substr($cpf_validar,$i,1)*$n);
	};

	$resto= $soma % 11;
	if ($resto<2) {$cpf_validar=$cpf_validar."0";} else {$cpf_validar=$cpf_validar.(11-$resto);}

	if ($cpf_validar==$cpf) {
		return 1; //cpf valido
	} else {
		return 0; //CPF Inválido
	};
}

//abreviar nome
function abreviar_nome($nome) {
	$partes_nome = explode (" ",trim($nome));
	$total = count($partes_nome);
	//$vetor_ignora = array('DE', 'DA', 'DAS', 'DO', 'DOS');

	foreach ($partes_nome as $indice =>$palavras) {
		//nao permite que seja abreviado o primeiro, nem o ultimo nome
		if ($indice!=0 and $indice!=($total-1)) {
			//verifica se 'de', 'do' ou otras ligacoes estão presentes no nome
			if (($palavras != 'DE') and ($palavras != 'DA') and ($palavras != 'DAS') and ($palavras != 'DO') and ($palavras != 'DOS')) {
				$nome_abrv.= " ". strtoupper(substr($palavras,0,1)).".";
			} else {
				$nome_abrv.= " ". $palavras;
			}
		}
	}

	$abreviado = ucfirst($partes_nome[0])." ".$nome_abrv." ".ucfirst($partes_nome[$total-1]);

	return $abreviado;
}

//calcular idade hoje
function idade_hoje($dt_nasc) {
	//yyyy-mm-dd
	list($ano, $mes, $mes) = explode('-', $dt_nasc);
	$hoje = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
	$nascimento = mktime( 0, 0, 0, $mes, $dia, $ano);
	$idade = floor((((($hoje - $nascimento) / 60) / 60) / 24) / 365.25);
	return $idade;
}

function formatadata($tipo, $data) {
	//para gravar no banco
	if (($tipo == 1) && ($data != '')) {
		$dataconvertida = substr($data,6,4) . "-" . substr($data,3,2) . "-" . substr($data,0,2);
		return $dataconvertida;
	}

	//para mostrar na tela
	if (($tipo == 2) && ($data != '')) {
		$dataconvertida = substr($data,8,2) . "/" . substr($data,5,2) . "/" . substr($data,0,4);
		return $dataconvertida;
	}
}