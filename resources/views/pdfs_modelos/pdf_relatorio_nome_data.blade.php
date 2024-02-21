<!-- Nome e Data -->
@if($relatorio_nome != '' or $relatorio_data != '')
<table width="100%" style="font-size: 12px;">
    <tr>
        <th align="left" width="50%" style="vertical-align: middle; height:30px;">{{$relatorio_nome}}</th>
        <th align="right" width="50%" style="vertical-align: middle; height:30px;">{{\App\Facades\SuporteFacade::getDataExtenso($relatorio_data)}}.</th>
    </tr>
</table>
@endif
