document.addEventListener("DOMContentLoaded", function(event) {
    if (document.getElementById('crudPrefixPermissaoSubmodulo')) {
        //Variáveis
        var prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;

        if (typeof prefixPermissaoSubmodulo !== "undefined" && prefixPermissaoSubmodulo != '') {
            if (prefixPermissaoSubmodulo != 'dashboards' && prefixPermissaoSubmodulo != 'logos' && prefixPermissaoSubmodulo != 'ressarcimento_cobrancas' && prefixPermissaoSubmodulo != 'relatorios') {
                //Header
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                //Table
                crudTable(prefixPermissaoSubmodulo);

                //Configurações Gerais
                // //Select2
                // if ($('select').hasClass('select2')) {$('.select2').select2({dropdownParent: $('#crudForm')});}
                // if ($('select').hasClass('select2-limiting')) {$('.select2-limiting').select2({maximumSelectionLength:2, dropdownParent: $('#crudForm')});}
                // if ($('select').hasClass('select2-search-disable')) {$('.select2-search-disable').select2({minimumResultsForSearch:1/0, dropdownParent: $('#crudForm')});}
            }
        }
    }
});
