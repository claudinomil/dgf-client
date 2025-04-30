<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClaudinoManifest extends Command
{
    protected $signature = 'claudino:manifest';
    protected $description = 'Cria build/manifest.json e insere conteúdo no public/build/manifest.json';

    public function handle()
    {
        //Rodar o npm run build'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $this->info('Executando: npm run build');
        exec('npm run build', $outputBuild, $resultBuild);
        $this->line(implode("\n", $outputBuild));

        if ($resultBuild !== 0) {
            $this->error('Erro ao rodar npm run build');
            return 1;
        }

        $this->info('');
        $this->info('npm run build executado com sucesso');
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        //Copiar manifest_extra.json''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        $this->info('Copiando dados para o manifest.json');

        $manifestPath = public_path('build/manifest.json');
        $extraPath = 'manifest_extra.json';

        if (!file_exists($manifestPath)) {
            $this->error("Manifesto não encontrado: $manifestPath");
            return;
        }

        if (!file_exists($extraPath)) {
            $this->error("Arquivo de conteúdo extra não encontrado: $extraPath");
            return;
        }

        // Lê o conteúdo existente
        $linhas = file($manifestPath);

        // Remove a última linha (esperada ser "}")
        $ultimaLinha = array_pop($linhas);

        // Lê o conteúdo adicional do arquivo
        $conteudoExtra = file_get_contents($extraPath);

        // Garante que termina com vírgula, se necessário
        $ultimaLinhaAnterior = trim(end($linhas));
        if (substr($ultimaLinhaAnterior, -1) !== ',') {
            $linhas[count($linhas) - 1] = rtrim($linhas[count($linhas) - 1]) . ",\n";
        }

        // Adiciona o conteúdo novo e a última linha original
        $linhas[] = $conteudoExtra . "\n";
        $linhas[] = $ultimaLinha;

        // Escreve de volta no arquivo
        file_put_contents($manifestPath, implode('', $linhas));

        $this->info("Conteúdo adicionado com sucesso ao manifest.json.");
        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    }
}
