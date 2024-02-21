<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;

class EnviarEmailController extends Controller
{
    public function primeiro_acesso($email, $senha)
    {
        $senha = substr($senha, 11, 10);

        //Enviando e-mail
        Mail::send('emails.primeiro_acesso', ['email' => $email, 'senha' => $senha], function ($message) use($email) {
            $message->to($email);
            $message->subject('PrimeiroAcesso');
        });
    }
}
