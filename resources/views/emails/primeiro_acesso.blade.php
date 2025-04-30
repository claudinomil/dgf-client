<!DOCTYPE html>
<html>
    <head>
        <title>{{env('APP_NAME')}}</title>
    </head>
    <body>
        <table width="100%">
            <tbody>
            <tr>
                <td align="">
                    <img src="{{ base64_encode(asset('build/assets/images/image_logo_email.png')) }}" alt="" height="100">
                </td>
            </tr>
            <tr>
                <td align="" style="color: deepskyblue; font-family: arial;">
                    <h3>Seu E-mail foi cadastrado como Usuário do Sistema de Controle e Acesso - DGF.</h3>
                </td>
            </tr>
            <tr>
                <td align="" style="color: black; font-family: arial;">
                    <h3>Dados para acesso:</h3>
                    <p>&nbsp;</p>
                    <p>Endereço: cbmerj.rj.gov.br/dgf_sistema</p>
                    <p>Usuário: {{$email}}</p>
                    <p>Senha: {{$senha}}</p>
                </td>
            </tr>
            </tbody>
        </table>
    </body>
</html>
