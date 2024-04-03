<?php
include_once "../../../libphp/conexao.php";

//Session
session_start();

$opcao = $_POST['opcao'];

//Opção 1 (Incluir registro na tabela sac_relatorios_percentagens)
if ($opcao == 1) {
    $relatorio_id = $_POST['relatorio_id'];

    $relatorio_usuario_id = $_SESSION['usu_relatorio_usuario_id'];

    $sql = "INSERT INTO sac_relatorios_percentagens (relatorio_id, relatorio_usuario_id, data) ";
    $sql .= "VALUES ('".$relatorio_id."', '".$relatorio_usuario_id."', '".date('Y-m-d')."')";
    $res = mysql_query($sql, $conec);
}

//Opção 2 (Montar gráfico de percentuais)
if ($opcao == 2) {
    //Pegando quantidade total de registros
    $sql = "SELECT * FROM sac_relatorios_percentagens";

    $res = mysql_query($sql, $conec);
    $linhas = mysql_num_rows($res);

    $quantidade_total = $linhas;

    //Montando linhas do gráfico
    $sql = "SELECT sac_relatorios.nome, count(sac_relatorios_percentagens.relatorio_id) as quantidade_relatorio FROM sac_relatorios ";
    $sql .= "INNER JOIN sac_relatorios_percentagens ON sac_relatorios_percentagens.relatorio_id=sac_relatorios.id ";
    $sql .= "GROUP BY sac_relatorios_percentagens.relatorio_id ";
    $sql .= "ORDER BY quantidade_relatorio DESC ";

    $res = mysql_query($sql, $conec);
    $linhas = mysql_num_rows($res);
    $dados = mysql_fetch_array($res);

    $retorno = '';

    if ($linhas > 0) {
        $linhasini = 1;
        while ($linhasini <= $linhas) {
            $nome = $dados['nome'];
            $quantidade_relatorio = $dados['quantidade_relatorio'];

            //Calculando percentual
            $percentual_relatorio = ($quantidade_relatorio * 100) / $quantidade_total;
            $percentual_relatorio = number_format($percentual_relatorio, 2, '.', '');

            //Retorno
            $retorno .= '<div class="progress">
                            <span class="skill">'.utf8_encode($nome).' - <span class="text-success small" style="text-transform: lowercase !important;">'.$quantidade_relatorio.' acessos</span> <i class="val">'.$percentual_relatorio.'%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="'.$percentual_relatorio.'" aria-valuemin="0" aria-valuemax="'.$quantidade_total.'"></div>
                            </div>
                        </div>';

            $linhasini++;
            $dados = mysql_fetch_array($res);
        }
    }

    echo $retorno;
}
?>