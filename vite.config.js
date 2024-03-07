import { viteStaticCopy } from 'vite-plugin-static-copy'

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                {src: 'resources/assets_template/css/bootstrap.css', dest: 'assets'},
                {src: 'resources/assets_template/css/app.css', dest: 'assets'},
                {src: 'resources/assets_template/css/bootstrap-dark.css', dest: 'assets'},
                {src: 'resources/assets_template/css/app-dark.css', dest: 'assets'},

                {src: 'resources/assets_template/libs/jquery/jquery.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/bootstrap/bootstrap.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-validation/jquery-validation.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-validation/jquery-validation-pt-br.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/metismenu/metismenu.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/simplebar/simplebar.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/node-waves/node-waves.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/sweetalert2/sweetalert2.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/select2/select2.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/datatables/datatables.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/apexcharts/apexcharts.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jszip/jszip.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/pdfmake/pdfmake.min.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jquery-mask/jquery.mask.min.js', dest: 'assets'},

                {src: 'resources/assets_template/js/app.min.js', dest: 'assets'},
                {src: 'resources/assets_template/js/cruds.js', dest: 'assets'},
                {src: 'resources/assets_template/js/cruds_functions.js', dest: 'assets'},
                {src: 'resources/assets_template/js/functions.js', dest: 'assets'},
                {src: 'resources/assets_template/js/functions_graficos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/jquery-masks.js', dest: 'assets'},
                {src: 'resources/assets_template/js/jquery-validation-methods.js', dest: 'assets'},
                {src: 'resources/assets_template/js/main.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_dashboards2.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_efetivo_militares.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ferramentas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_grupos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_notificacoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_profiles.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_relatorios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_cobrancas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_configuracoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_dashboards.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_militares.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_orgaos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_pagamentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_recebimentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_referencias.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_relatorios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_template_init.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_users.js', dest: 'assets'},

                {src: 'resources/assets_template/images/users/avatar-0.png', dest: 'assets/images/users'},
                {src: 'resources/assets_template/images/error-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_favicon.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_login.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_relatorio.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/megamenu-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/profile-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_logo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_email.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/logo_governo_rj.png', dest: 'assets/images'},

                {src: 'resources/assets_template/pdfs/cobrancas/pdf.pdf', dest: 'assets/pdfs/cobrancas'},
                {src: 'resources/assets_template/pdfs/relatorios/pdf.pdf', dest: 'assets/pdfs/relatorios'}
            ]
        })
    ]
});


// *** Colocar no manifest.json ***
//
// "resources/assets_template/libs/jquery/jquery.min.js": {
//     "file": "assets/jquery.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jquery/jquery.min.js"
// },
// "resources/assets_template/libs/bootstrap/bootstrap.min.js": {
//     "file": "assets/bootstrap.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/bootstrap/bootstrap.min.js"
// },
// "resources/assets_template/libs/jquery-validation/jquery-validation.min.js": {
//     "file": "assets/jquery-validation.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jquery-validation/jquery-validation.min.js"
// },
// "resources/assets_template/libs/jquery-validation/jquery-validation-pt-br.js": {
//     "file": "assets/jquery-validation-pt-br.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jquery-validation/jquery-validation-pt-br.js"
// },
// "resources/assets_template/js/jquery-validation-methods.js": {
//     "file": "assets/jquery-validation-methods.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/jquery-validation-methods.js"
// },
// "resources/assets_template/libs/metismenu/metismenu.min.js": {
//     "file": "assets/metismenu.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/metismenu/metismenu.min.js"
// },
// "resources/assets_template/libs/simplebar/simplebar.min.js": {
//     "file": "assets/simplebar.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/simplebar/simplebar.min.js"
// },
// "resources/assets_template/libs/node-waves/node-waves.min.js": {
//     "file": "assets/node-waves.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/node-waves/node-waves.min.js"
// },
// "resources/assets_template/libs/sweetalert2/sweetalert2.min.js": {
//     "file": "assets/sweetalert2.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/sweetalert2/sweetalert2.min.js"
// },
// "resources/assets_template/libs/select2/select2.min.js": {
//     "file": "assets/select2.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/select2/select2.min.js"
// },
// "resources/assets_template/libs/datatables/datatables.min.js": {
//     "file": "assets/datatables.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/datatables/datatables.min.js"
// },
// "resources/assets_template/libs/jszip/jszip.min.js": {
//     "file": "assets/jszip.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jszip/jszip.min.js"
// },
// "resources/assets_template/libs/pdfmake/pdfmake.min.js": {
//     "file": "assets/pdfmake.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/pdfmake/pdfmake.min.js"
// },
// "resources/assets_template/libs/jquery-mask/jquery.mask.min.js": {
//     "file": "assets/jquery.mask.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jquery-mask/jquery.mask.min.js"
// },
// "resources/assets_template/js/jquery-masks.js": {
//     "file": "assets/jquery-masks.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/jquery-masks.js"
// },
// "resources/assets_template/js/app.min.js": {
//     "file": "assets/app.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/app.min.js"
// },
// "resources/assets_template/js/main.js": {
//     "file": "assets/main.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/main.js"
// },
// "resources/assets_template/js/cruds.js": {
//     "file": "assets/cruds.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/cruds.js"
// },
// "resources/assets_template/js/cruds_functions.js": {
//     "file": "assets/cruds_functions.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/cruds_functions.js"
// },
// "resources/assets_template/js/functions.js": {
//     "file": "assets/functions.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/functions.js"
// },
// "resources/assets_template/js/functions_graficos.js": {
//     "file": "assets/functions_graficos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/functions_graficos.js"
// },
// "resources/assets_template/js/scripts_template_init.js": {
//     "file": "assets/scripts_template_init.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_template_init.js"
// },
// "resources/assets_template/js/scripts_grupos.js": {
//     "file": "assets/scripts_grupos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_grupos.js"
// },
// "resources/assets_template/js/scripts_notificacoes.js": {
//     "file": "assets/scripts_notificacoes.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_notificacoes.js"
// },
// "resources/assets_template/js/scripts_dashboards.js": {
//     "file": "assets/scripts_dashboards.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_dashboards.js"
// },
// "resources/assets_template/js/scripts_dashboards2.js": {
//     "file": "assets/scripts_dashboards2.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_dashboards2.js"
// },
// "resources/assets_template/js/scripts_efetivo_militares.js": {
//     "file": "assets/scripts_efetivo_militares.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_efetivo_militares.js"
// },
// "resources/assets_template/js/scripts_ferramentas.js": {
//     "file": "assets/scripts_ferramentas.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ferramentas.js"
// },
// "resources/assets_template/js/scripts_users.js": {
//     "file": "assets/scripts_users.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_users.js"
// },
// "resources/assets_template/js/scripts_profiles.js": {
//     "file": "assets/scripts_profiles.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_profiles.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_configuracoes.js": {
//     "file": "assets/scripts_ressarcimento_configuracoes.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_configuracoes.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_referencias.js": {
//     "file": "assets/scripts_ressarcimento_referencias.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_referencias.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_relatorios.js": {
//     "file": "assets/scripts_ressarcimento_relatorios.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_relatorios.js"
// },
// "resources/assets_template/js/scripts_relatorios.js": {
//     "file": "assets/scripts_relatorios.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_relatorios.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_orgaos.js": {
//     "file": "assets/scripts_ressarcimento_orgaos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_orgaos.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_pagamentos.js": {
//     "file": "assets/scripts_ressarcimento_pagamentos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_pagamentos.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_militares.js": {
//     "file": "assets/scripts_ressarcimento_militares.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_militares.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_dashboards.js": {
//     "file": "assets/scripts_ressarcimento_dashboards.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_dashboards.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_cobrancas.js": {
//     "file": "assets/scripts_ressarcimento_cobrancas.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_cobrancas.js"
// },
// "resources/assets_template/js/scripts_ressarcimento_recebimentos.js": {
//     "file": "assets/scripts_ressarcimento_recebimentos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_ressarcimento_recebimentos.js"
// },
// "resources/assets_template/libs/apexcharts/apexcharts.min.js": {
//     "file": "assets/apexcharts.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/apexcharts/apexcharts.min.js"
// },
