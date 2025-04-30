@extends('layouts.app-without-nav')

@section('title') Login @endsection

@section('body')
    <body style="background-color: #2a3042;">
@endsection

@section('content')
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="bg-primary bg-soft">
                            <div class="row">
                                <div class="col-7">
                                    <div class="text-primary p-4">
                                        <img src="{{ asset('build/assets/images/image_logo_login.png') }}">
                                    </div>
                                </div>
                                <div class="col-5 align-self-end">
                                    <img src="{{ asset('build/assets/images/profile-img.png') }}" alt="" class="img-fluid">
                                    <div class="text-dark text-center">Fazer Login</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <div class="p-0">
                                <!-- Erros -->
                                @if (isset($error) and $error != '')
                                    <div class="alert alert-danger mt-1">{{ $error }}</div>
                                @endif

                                @if (Session::has('message'))
                                    <div class="alert alert-success" role="alert">
                                        {{ Session::get('message') }}
                                    </div>
                                @endif

                                <form method="POST" class="form-horizontal" action="{{ url('login') }}">
                                    @csrf

                                    <div class="mt-3 mb-3">
                                        <label for="email" class="form-label">E-mail</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Entre com o Usuário" required autofocus value="">
                                        @error('email') <div class="text-danger">{{ $message }}</div> @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Senha</label>
                                        <div class="input-group auth-pass-inputgroup">
                                            <input type="password" class="form-control" id="password" name="password" placeholder="Entre com a Senha" aria-label="Password" aria-describedby="password-addon" required value="">
                                            <button class="btn btn-light " type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                        </div>
                                        @error('password') <div class="text-danger">{{ $message }}</div> @enderror
                                    </div>
                                    <div class="mt-5 d-grid">
                                        <button class="btn btn-primary waves-effect waves-light" type="submit">Login</button>
                                    </div>

                                    @if (Route::has('forget.password.get'))
                                        <div class="mt-4 text-center">
                                            <a href="{{ route('forget.password.get') }}" class="text-muted"><i class="mdi mdi-lock me-1"></i> Esqueceu sua senha?</a>
                                        </div>
                                    @endif

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
