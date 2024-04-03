<?php
include_once "../../../libphp/conexao.php";
include_once "../../../libphp/antiinjection.php";
include_once "functions.php";

//Session
session_start();

$opcao = $_POST['opcao'];

//Opção 1 (Login: Campo Select relatorio_usuario_id)
if ($opcao == 1) {
    $sql = "SELECT sac_efetivo.nome, sac_relatorios_usuarios.id, sac_relatorios_usuarios.rg FROM sac_efetivo ";
    $sql .= "INNER JOIN sac_relatorios_usuarios ON sac_relatorios_usuarios.rg=sac_efetivo.rg ";
    $sql .= "ORDER BY sac_efetivo.nome ";

    $res = mysql_query($sql, $conec);
    $linhas = mysql_num_rows($res);
    $dados = mysql_fetch_array($res);

    $retorno = '<option value="">Selecione...</option>';

    if ($linhas > 0) {
        $linhasini = 1;
        while ($linhasini <= $linhas) {
            $relatorio_usuario_id = $dados['id'];
            $nome = $dados['nome'];
            $rg = $dados['rg'];

            //Retorno
            $retorno .= '<option value="'.$relatorio_usuario_id.'">'.$nome.'</option>';

            $linhasini++;
            $dados = mysql_fetch_array($res);
        }
    }

    echo $retorno;
}

//Opção 2 (Login: Verificar as credenciais do usuário)
if ($opcao == 2) {
    //Dados recebidos
    $relatorio_usuario_id = antiinjection($_POST['relatorio_usuario_id']);
    $email = antiinjection($_POST['email']);
    $rg = antiinjection($_POST['rg']);
    $senha = antiinjection($_POST['senha']);

    //formatar rg
    if (strlen($rg) == 7) {$rg = '00/' . substr($rg, 0, 4) . '.' . substr($rg, 4, 3);}
    if (strlen($rg) == 6) {$rg = '00/0' . substr($rg, 0, 3) . '.' . substr($rg, 3, 3);}
    if (strlen($rg) == 5) {$rg = '00/00' . substr($rg, 0, 2) . '.' . substr($rg, 2, 3);}
    if (strlen($rg) == 4) {$rg = '00/000' . substr($rg, 0, 1) . '.' . substr($rg, 1, 3);}
    if (strlen($rg) == 3) {$rg = '00/0000' . '.' . substr($rg, 0, 3);}
    if (strlen($rg) == 2) {$rg = '00/0000.0' . substr($rg, 0, 2);}
    if (strlen($rg) == 1) {$rg = '00/0000.00' . substr($rg, 0, 1);}

    $sql = "SELECT sac_efetivo.rg, sac_efetivo.nome, sac_usuarios.usuario, sac_usuarios.senha, sac_usuarios.bloqueado, ";
	$sql .= "sac_relatorios_usuarios.id as relatorio_usuario_id, sac_relatorios_usuarios.email FROM sac_usuarios ";
    $sql .= "INNER JOIN sac_efetivo ON sac_efetivo.rg = sac_usuarios.rg ";
    $sql .= "INNER JOIN sac_relatorios_usuarios ON sac_relatorios_usuarios.rg=sac_efetivo.rg ";
    $sql .= "WHERE sac_relatorios_usuarios.id='".$relatorio_usuario_id."' AND sac_efetivo.rg='".$rg."' ";

    $res = mysql_query($sql, $conec);
    $linhas = mysql_num_rows($res);
    $dados = mysql_fetch_array($res);

    $retorno = 'Erro: Acesso.';

    if ($linhas == 1) {
		//verificar se email esta correto
		if ($email == $dados['email']) {
			//verificar se senha esta correta
			if (md5($senha) == $dados['senha']) {
				if ($dados["bloqueado"] == 0) {
					$_SESSION['usu_logado'] = 'sim';
					$_SESSION['usu_relatorio_usuario_id'] = $dados['relatorio_usuario_id'];
					$_SESSION['usu_usuario'] = utf8_encode($dados['usuario']);
					$_SESSION['usu_rg'] = $dados['rg'];
					$_SESSION['usu_nome'] = utf8_encode($dados['nome']);

					//Variáveis de acessos aos relatorios
					montar_variaveis_acessos_relatorios($_SESSION['usu_relatorio_usuario_id']);

					$retorno = 'OK';
				} else {
					$retorno = 'Erro: Usuário bloqueado.';
				}
			} else {
				$retorno = 'Erro: Usuário e/ou senha inválido.';
			}
		} else {
			$retorno = 'Erro: E-mail não encontrado.';
		}
	} else {
		$retorno = 'Erro: Usuário não encontrado.';
	}

    echo $retorno;
}

//Opção 3 (Login: Buscar Valor Session)
if ($opcao == 3) {
    //Defina o cabeçalho conteúdo é JSON
    header('Content-Type: application/json');

    if ($_SESSION['usu_logado'] == 'sim') {
        $retorno = array(
            'logado' => $_SESSION['usu_logado'],
            'relatorio_usuario_id' => $_SESSION['usu_relatorio_usuario_id'],
            'usuario' => $_SESSION['usu_usuario'],
            'rg' => $_SESSION['usu_rg'],
            'nome' => $_SESSION['usu_nome']
        );


        $retorno = json_encode($retorno);
    } else {
        $retorno = array('logado' => 'nao');

        $retorno = json_encode($retorno);
    }

    echo $retorno;
}

//Opção 4 (Logout)
if ($opcao == 4) {
	$_SESSION['usu_logado'] = '';
    $_SESSION['usu_relatorio_usuario_id'] = '';
    $_SESSION['usu_usuario'] = '';
    $_SESSION['usu_rg'] = '';
    $_SESSION['usu_nome'] = '';

	//Variáveis de acessos aos relatorios
	montar_variaveis_acessos_relatorios(0);

	echo '';
}
?>