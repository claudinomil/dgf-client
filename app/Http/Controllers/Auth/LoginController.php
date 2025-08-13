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

        //Buscando dados Api_Data() - Verificar se email já foi confirmado
        $this->responseApi(1, 10, 'users/confirm/' . $request->email, '', '', '');

        //Usuário confirmado
        if ($this->code == 2000) {
            $response = Http::post(env('API_URL') . 'api/auth/login', [
                'email' => $request['email'],
                'password' => $request['password']
            ]);

            //dd($response->json());

            //Se o retorno for um Error
            if ($response['success'] === false) {
                $error = $response['message'];

                //Verificar para onde retorno
                if (isset($request['ctrl_welcome'])) {
                    $usuarioLogado = 0;

                    return view('welcome', compact('error', 'usuarioLogado'));
                } else {
                    return view('auth.login', compact('error'));
                }
            }

            //Gravar access_token em ums session
            session(['access_token' => $response['data']['access_token']]);
            //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            //Ver de onde está acessando 'userLogged_access_device' (mobile, tablet, desktop)
            SuporteFacade::setUserAcessDevice();

            //Dados do Usuário Logado
            session(['se_userLoggedData' => $this->content[0]]);

            //Redirecionar Usuário para início do Sistema
            //return redirect('dashboards');
            return redirect('');
        }

        //E-mail não confirmado
        if ($this->code == 2004) {
            $email = $request->email;

            //Ir para a view de confirmação
            return redirect('/confirm-email')->with('email', $email);
        }

        //E-mail não encontrado
        if ($this->code == 2005) {
            $error = 'E-mail não encontrado!';

            //Verificar para onde retorno
            if (isset($request['ctrl_welcome'])) {
                $usuarioLogado = 0;

                return view('welcome', compact('error', 'usuarioLogado'));
            } else {
                return view('auth.login', compact('error'));
            }
        }
    }

    public function logout()
    {
        //Buscando dados Api_Data() - Fazer Logout
        $this->responseApi(1, 7, '', '', '', '');

        return redirect('/');
    }
}
