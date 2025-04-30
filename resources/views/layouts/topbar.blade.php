<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
            <div class="navbar-brand-box">
                <a href="index" class="logo" id="aLogoDark">
                    <span class="logo-sm">
                        <img src="{{ asset('build/assets/images/image_logo_layout_dark_menu_min.png') }}" alt="" height="70" id="appImgLogoLayoutDarkMenuMin" style="margin-left: -23px;">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('build/assets/images/image_logo_layout_dark_menu.png') }}" alt="" height="35" id="appImgLogoLayoutDarkMenu">
                    </span>
                </a>

                <a href="index" class="logo" id="aLogoLight">
                    <span class="logo-sm">
                        <img src="{{ asset('build/assets/images/image_logo_layout_light_menu_min.png') }}" alt="" height="70" id="appImgLogoLayoutLightMenuMin" style="margin-left: -23px;">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('build/assets/images/image_logo_layout_light_menu.png') }}" alt="" height="50" id="appImgLogoLayoutLightMenu">
                    </span>
                </a>
            </div>

            <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                <i class="fa fa-fw fa-bars"></i>
            </button>

            <div class="d-none d-lg-block ms-2">&nbsp;</div>
        </div>
        <div class="d-flex">
            <div class="d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" title="Welcome" onclick="var url = window.location.protocol+'//'+window.location.host+'/'; if (window.location.hostname.indexOf('cbmerj.rj.gov') != -1) {url += 'dgf_sistema/';} window.location.href = url;">
                    <i class="bx bx-notepad"></i>
                </button>
            </div>

            @if (\App\Facades\Permissoes::permissao(['ferramentas_list']))
                @include('layouts.ferramentas')
            @endif

            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" title="Full Screen" data-bs-toggle="fullscreen">
                    <i class="bx bx-fullscreen"></i>
                </button>
            </div>

            @if (\App\Facades\Permissoes::permissao(['notificacoes_list']))
                @include('layouts.notificacoes')
            @endif

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user" src="{{session('se_userLoggedData.avatar')}}">
                    <span class="d-none d-xl-inline-block ms-1" key="t-henry">{{ucfirst(session('se_userLoggedData.name'))}}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    {{-- Menu Perfil --}}
                    <a href="#" class="dropdown-item py-3" data-bs-toggle="modal" data-bs-target=".modal-profile" onclick="userProfileData(2,{{session('se_userLoggedData.id')}});"><i class="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Perfil</span></a>

                    {{-- Menu Welcome --}}
                    <a href="{{route('welcome.index')}}" class="dropdown-item py-3"><i class="bx bx-notepad font-size-16 align-middle me-1"></i> <span>Welcome</span></a>

                    <div class="dropdown-divider"></div>

                    {{-- Menu Logout --}}
                    <a class="dropdown-item py-3 text-danger" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </div>

            @if(session('access_device') == 'desktop')
                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect">
                        <i class="bx bx-cog bx-spin"></i>
                    </button>
                </div>
            @endif

        </div>
    </div>
</header>
