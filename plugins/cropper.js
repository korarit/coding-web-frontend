import {CircleStencil, Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueCropper', Cropper)
    nuxtApp.vueApp.component('VueCircleStencil', CircleStencil)
});