{{--
Arquivo Blade para gerar Relatórios com uma tabela de registros como Conteúdo

@PARAMETROS EXIGIDOS

$topo : Topo do Relatório
$rodape : Rodapé do Relatório
$relatorio_nome : Nome do Relatório
$relatorio_data : Data do Relatório
$relatorio_parametros : Filtros do Relatório
$colunas_quantidade : Quantidade de colunas da Tabela de Registros
$colunas_titulos : Array com Títulos das colunas da Tabela de Registros
$colunas_campos : Array com Campos das colunas da Tabela de Registros
$colunas_styles : Array com Styles para as colunas da Tabela de Registros
$colunas_campos_formato : Array com Formatos para os campos das colunas da Tabela de Registros
    0 : Sem formato
    1 : Formatar para Moeda Brasil
    2 : Recebe um array e coloca um valor do array abaixo do outro
    3 : Formatar com todas as Letras Maiúsculas
    4 : Formatar com todas as Letras Minusculas
    5 : Formatar com todas as Primeiras Letras Maiúsculas
    6 : Formatar com blade para HTML
    7 : Formatar data para padrão Brasil
$registros : Array com Registros da Tabela de Registros
--}}

<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <title> {{env('APP_NAME')}} | @yield('page_title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
        <meta content="Themesbrand" name="author" />

        <!-- App favicon -->
        <link rel="shortcut icon" href="{{ asset('build/assets/images/image_favicon.png') }}" id="appFavicon">

        <style>
            @page {margin: 170px 50px 100px 50px;}
            header {position: fixed; top: -150px;    left: 0px; right: 0px; background-color: white; height: 150px;}
            footer {position: fixed; bottom: -130px; left: 0px; right: 0px; background-color: white; height: 100px;}
            p { page-break-after: always;}
            p:last-child { page-break-after: never;}

            /* Customização da Tabela */
            #tableCustom {
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;
                font-size: 11px;
            }
            #tableCustom td, #tableCustom th {
                border: 1px solid #ddd;
                padding: 8px;
            }
            #tableCustom tr:nth-child(even){background-color: #f2f2f2;}
            #tableCustom th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #483D8B;
                color: white;
            }
        </style>
    </head>
    <body>
        @include('pdfs_modelos.pdf_relatorio_topo')
        @include('pdfs_modelos.pdf_relatorio_rodape')
        @include('pdfs_modelos.pdf_relatorio_nome_data')
        @include('pdfs_modelos.pdf_relatorio_parametros')

        <!-- Conteúdo -->
        <table id="tableCustom">
            <tr>
                @for ($i=0; $i<$colunas_quantidade; $i++)
                    <th>{{$colunas_titulos[$i]}}</th>
                @endfor
            </tr>

            @foreach ($registros as $registro)
                <tr>
                    @for ($i=0; $i<$colunas_quantidade; $i++)
                        <td style="{{$colunas_styles[$i]}}">
                            @if($colunas_campos_formato[$i] == 0)
                                {{-- Sem formato --}}
                                {{$registro[$colunas_campos[$i]]}}
                            @elseif($colunas_campos_formato[$i] == 1)
                                {{-- Formatar para Moeda Brasil --}}
                                {{number_format($registro[$colunas_campos[$i]], '2', ',', '.')}}
                            @elseif($colunas_campos_formato[$i] == 2)
                                {{-- Recebe um array e coloca um valor do array abaixo do outro --}}
                                @php($ln=0)
                                @foreach($colunas_campos[$i] as $campo)
                                    @if($campo['formato'] == 0)
                                        {{-- Coloca o valor do campo da maneira que recebeu --}}
                                        {{$registro[$campo['campo']]}}
                                    @elseif($campo['formato'] == 1)
                                        {{-- Coloca o valor do campo com formato de Moeda Brasil --}}
                                        {{number_format($registro[$campo['campo']], '2', ',', '.')}}
                                    @elseif($campo['formato'] == 3)
                                        {{-- Formatar com todas as Letras Maiúsculas --}}
                                        {{mb_convert_case($registro[$campo['campo']], MB_CASE_UPPER, "UTF-8")}}
                                    @elseif($campo['formato'] == 4)
                                        {{-- Formatar com todas as Letras Minusculas --}}
                                        {{mb_convert_case($registro[$campo['campo']], MB_CASE_LOWER, "UTF-8")}}
                                    @elseif($campo['formato'] == 5)
                                        {{-- Formatar com todas as Primeiras Letras Maiúsculas --}}
                                        {{mb_convert_case($registro[$campo['campo']], MB_CASE_TITLE, "UTF-8")}}
                                    @elseif($campo['formato'] == 6)
                                        {{-- Formatar com blade para HTML --}}
                                        {!!$registro[$campo['campo']]!!}
                                    @elseif($campo['formato'] == 7)
                                        {{-- Formatar data para padrão Brasil --}}
                                        {!!\App\Facades\SuporteFacade::getDataFormatada(1, $registro[$campo['campo']])!!}
                                    @endif

                                    {!!'<br>'!!}

                                    @php($ln++)
                                @endforeach
                            @elseif($colunas_campos_formato[$i] == 3)
                                {{-- Formatar com todas as Letras Maiúsculas --}}
                                {{mb_convert_case($registro[$colunas_campos[$i]], MB_CASE_UPPER, "UTF-8")}}
                            @elseif($colunas_campos_formato[$i] == 4)
                                {{-- Formatar com todas as Letras Minusculas --}}
                                {{mb_convert_case($registro[$colunas_campos[$i]], MB_CASE_LOWER, "UTF-8")}}
                            @elseif($colunas_campos_formato[$i] == 5)
                                {{-- Formatar com todas as Primeiras Letras Maiúsculas --}}
                                {{mb_convert_case($registro[$colunas_campos[$i]], MB_CASE_TITLE, "UTF-8")}}
                            @elseif($colunas_campos_formato[$i] == 6)
                                {{-- Formatar com blade para HTML --}}
                                {!!$registro[$colunas_campos[$i]]!!}
                            @elseif($colunas_campos_formato[$i] == 7)
                                {{-- Formatar data para padrão Brasil --}}
                                {!!\App\Facades\SuporteFacade::getDataFormatada(1, $registro[$colunas_campos[$i]])!!}
                            @else
                                {{-- Coloca o valor do campo da maneira que recebeu --}}
                                {{$registro[$colunas_campos[$i]]}}
                            @endif
                        </td>
                    @endfor
                </tr>
            @endforeach
        </table>
    </body>
</html>
