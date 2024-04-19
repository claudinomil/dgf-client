<div class="dropdown d-none d-lg-inline-block ms-1">
    <button type="button" class="btn header-item noti-icon waves-effect" title="Ferramentas" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="bx bx-customize"></i>
        <span class="badge bg-primary rounded-pill">{{count(session('se_userLoggedFerramentas'))}}</span>
    </button>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
        <div class="px-lg-2">
            <div class="row">
                @if(count(session('se_userLoggedFerramentas')) > 0)
                    @foreach(session('se_userLoggedFerramentas') as $ferramenta)
                        <div class="col-4 pb-2">
                            <a class="dropdown-icon-item border border-4" href="{{ $ferramenta['url'] }}" dataBsToggle="tooltip" dataBsPlacement="top" title="{{ $ferramenta['descricao'] }}" target="_blank"><i class="{{ $ferramenta['icon'] }} fa-2x"></i><span class="px-2">{{ $ferramenta['name'] }}</span></a>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
        <div class="p-2 border-top d-grid">
            <a class="btn btn-sm btn-link font-size-14 text-center" href="{{ route('ferramentas.index') }}">
                <i class="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">Ferramentas</span>
            </a>
        </div>
    </div>
</div>
