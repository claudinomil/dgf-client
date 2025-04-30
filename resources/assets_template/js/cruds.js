document.addEventListener("DOMContentLoaded", function(event) {
    if (document.getElementById('crudPrefixPermissaoSubmodulo')) {
        //Variáveis
        var prefixPermissaoSubmodulo = document.getElementById('crudPrefixPermissaoSubmodulo').value;

        if (typeof prefixPermissaoSubmodulo !== "undefined" && prefixPermissaoSubmodulo != '') {
            if (prefixPermissaoSubmodulo != 'dashboards' && prefixPermissaoSubmodulo != 'logos' && prefixPermissaoSubmodulo != 'ressarcimento_cobrancas' && prefixPermissaoSubmodulo != 'relatorios') {
                //Table
                crudTable(prefixPermissaoSubmodulo);
            }
        }
    }
});
