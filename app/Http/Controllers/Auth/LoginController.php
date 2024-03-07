<?php

namespace App\Http\Controllers\Auth;

use App\Facades\SuporteFacade;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LoginController extends Controller
{
    //Variaveis de Retorno da API
    public $message;
    public $code;
    public $validation;
    public $content;

    public function login()
    {
        return view('auth.login');
    }

    public function loginApi(Request $request)
    {
        //Validando dados
        $request->validate(
            [
                'email' => 'required|email',
                'password' => 'required',
            ],
            [
                'email.required' => 'Digite seu E-mail.',
                'email.email' => 'E-mail inválido',
                'password.required' => 'Digite sua Senha.'
            ]
        );

        //Buscando dados Api_Data() - Confirmar Usuário que está tentando se Logar
        $this->responseApi(1, 10, 'users/confirm_user_login/' . $request->email, '', '', '');

        //Usuário confirmado
        if ($this->code == 2000) {
            //CHAMADA DO PASSPORT COM 'grant_type' => 'password'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            /*
             * Criar Client na API: php artisan passport:client --password
             * Não precisa de Authorization, envia direto as credenciais
             * Vai na API e retorna o Access Token
            */
            $response = Http::post(env('PASSPORT_API_URL') . 'oauth/token', [
                'grant_type' => 'password',
                'client_id' => env('PASSPORT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_CLIENT_SECRET'),
                'username' => $request['email'],
                'password' => $request['password'],
                'scope' => 'claudino',
            ]);

            //dd($response->json());

            //Se o retorno for um Error
            if (isset($response['error'])) {
                $error = $response['message'];

                return view('auth.login', compact('error'));
            }

            //Gravar access_token em ums session
            session(['access_token' => $response['access_token']]);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Ver de onde está acessando 'userLogged_access_device' (mobile, tablet, desktop)
            SuporteFacade::setUserAcessDevice();

            //Dados do Usuário Logado
            session(['se_userLoggedData' => $this->content[0]]);

            //Redirecionar Usuário para início do Sistema
            return redirect('dashboards');
        }

        //Usuário não confirmado
        if ($this->code == 2001) {
            $email = $request->email;

            //Ir para a view de confirmação
            return redirect('/confirm-email')->with('email', $email);
        }

        //Erros de Acesso do Usuário
        if ($this->code == 2002) {
            $error = $this->message;

            return view('auth.login', compact('error'));
        }
    }

    public function logout()
    {
        //Buscando dados Api_Data() - Fazer Logout
        $this->responseApi(1, 7, '', '', '', '');

        return view('welcome');
    }
}
