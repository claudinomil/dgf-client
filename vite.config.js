import { viteStaticCopy } from 'vite-plugin-static-copy'

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    optimizeDeps: {
        exclude: ['jspdf']
    },
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
                //Welcome
                {src: 'resources/assets_template/css/welcome_styles.css', dest: 'assets'},
                {src: 'resources/assets_template/libs/aos/aos.css', dest: 'assets'},
                {src: 'resources/assets_template/libs/aos/aos.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/boxicons/css/boxicons.css', dest: 'assets'},
                {src: 'resources/assets_template/libs/glightbox/css/glightbox.css', dest: 'assets'},
                {src: 'resources/assets_template/libs/glightbox/js/glightbox.js', dest: 'assets'},
                {src: 'resources/assets_template/js/welcome_main.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/swiper/swiper-bundle.min.css', dest: 'assets'},
                {src: 'resources/assets_template/libs/swiper/swiper-bundle.min.js', dest: 'assets'},

                {src: 'resources/assets_template/css/bootstrap.css', dest: 'assets'},
                {src: 'resources/assets_template/css/app.css', dest: 'assets'},
                {src: 'resources/assets_template/css/icons.css', dest: 'assets'},
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
                {src: 'resources/assets_template/libs/jspdf/jspdf.js', dest: 'assets'},
                {src: 'resources/assets_template/libs/jspdf/jspdf_autotable.js', dest: 'assets'},
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
                {src: 'resources/assets_template/js/scripts_welcome.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_efetivo_militares.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ferramentas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_grupos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_notificacoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_profiles.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_relatorios.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_cobrancas.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_configuracoes.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_militares.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_orgaos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_pagamentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_recebimentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_ressarcimento_referencias.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_template_init.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_users.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_alimentacao_tipos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_alimentacao_planos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_alimentacao_remanejamentos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_alimentacao_unidades.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_alimentacao_quantitativos.js', dest: 'assets'},
                {src: 'resources/assets_template/js/scripts_sad_militares_informacoes.js', dest: 'assets'},

                {src: 'resources/assets_template/images/users/avatar-0.png', dest: 'assets/images/users'},
                {src: 'resources/assets_template/images/sad_militares_informacoes/foto-0.png', dest: 'assets/images/sad_militares_informacoes'},
                {src: 'resources/assets_template/images/error-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_favicon.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_dark_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_layout_light_menu_min.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_login.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_relatorio.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/profile-img.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_logo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_logo_topo.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_login.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_home_preto.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/welcome_home_branco.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/image_logo_email.png', dest: 'assets/images'},
                {src: 'resources/assets_template/images/logo_governo_rj.png', dest: 'assets/images'},

                {src: 'resources/assets_template/pdfs/cobrancas/pdf.pdf', dest: 'assets/pdfs/cobrancas'},
                {src: 'resources/assets_template/pdfs/relatorios/pdf.pdf', dest: 'assets/pdfs/relatorios'},

                {src: 'resources/assets_template/fonts/boxicons.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/boxicons.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/dripicons-v2.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-brands-400.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-regular-400.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.svg', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/fa-solid-900.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.woff', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/materialdesignicons-webfont.woff2', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.eot', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.ttf', dest: 'fonts'},
                {src: 'resources/assets_template/fonts/summernote.woff', dest: 'fonts'},

                {src: 'resources/assets_template/php/proxy_receitaws.php', dest: 'assets/php'},
            ]
        })
    ]
});


// *** Colocar no manifest.json ***
//
// "resources/assets_template/css/welcome_styles.css": {
//     "file": "assets/welcome_styles.css",
//     "isEntry": true,
//     "src": "resources/assets_template/css/welcome_styles.css"
// },
// "resources/assets_template/css/bootstrap.css": {
//     "file": "assets/bootstrap.css",
//     "isEntry": true,
//     "src": "resources/assets_template/css/bootstrap.css"
// },
// "resources/assets_template/libs/aos/aos.css": {
//     "file": "assets/aos.css",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/aos/aos.css"
// },
// "resources/assets_template/libs/aos/aos.js": {
//     "file": "assets/aos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/aos/aos.js"
// },
// "resources/assets_template/libs/boxicons/css/boxicons.css": {
//     "file": "assets/boxicons.css",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/boxicons/css/boxicons.css"
// },
// "resources/assets_template/libs/glightbox/css/glightbox.css": {
//     "file": "assets/glightbox.css",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/glightbox/css/glightbox.css"
// },
// "resources/assets_template/libs/glightbox/js/glightbox.js": {
//     "file": "assets/glightbox.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/glightbox/js/glightbox.js"
// },
// "resources/assets_template/js/welcome_main.js": {
//     "file": "assets/welcome_main.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/welcome_main.js"
// },
// "resources/assets_template/libs/swiper/swiper-bundle.min.css": {
//     "file": "assets/swiper-bundle.min.css",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/swiper/swiper-bundle.min.css"
// },
// "resources/assets_template/libs/swiper/swiper-bundle.min.js": {
//     "file": "assets/swiper-bundle.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/swiper/swiper-bundle.min.js"
// },
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
// "resources/assets_template/libs/jspdf/jspdf.js": {
//     "file": "assets/jspdf.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jspdf/jspdf.js"
// },
// "resources/assets_template/libs/jspdf/jspdf_autotable.js": {
//     "file": "assets/jspdf_autotable.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/jspdf/jspdf_autotable.js"
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
// "resources/assets_template/js/scripts_welcome.js": {
//     "file": "assets/scripts_welcome.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_welcome.js"
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
// "resources/assets_template/js/scripts_alimentacao_tipos.js": {
//     "file": "assets/scripts_alimentacao_tipos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_alimentacao_tipos.js"
// },
// "resources/assets_template/js/scripts_alimentacao_planos.js": {
//     "file": "assets/scripts_alimentacao_planos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_alimentacao_planos.js"
// },
// "resources/assets_template/js/scripts_alimentacao_remanejamentos.js": {
//     "file": "assets/scripts_alimentacao_remanejamentos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_alimentacao_remanejamentos.js"
// },
// "resources/assets_template/js/scripts_alimentacao_unidades.js": {
//     "file": "assets/scripts_alimentacao_unidades.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_alimentacao_unidades.js"
// },
// "resources/assets_template/js/scripts_alimentacao_quantitativos.js": {
//     "file": "assets/scripts_alimentacao_quantitativos.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_alimentacao_quantitativos.js"
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
// "resources/assets_template/js/scripts_sad_militares_informacoes.js": {
//     "file": "assets/scripts_sad_militares_informacoes.js",
//     "isEntry": true,
//     "src": "resources/assets_template/js/scripts_sad_militares_informacoes.js"
// },
// "resources/assets_template/libs/apexcharts/apexcharts.min.js": {
//     "file": "assets/apexcharts.min.js",
//     "isEntry": true,
//     "src": "resources/assets_template/libs/apexcharts/apexcharts.min.js"
// },
