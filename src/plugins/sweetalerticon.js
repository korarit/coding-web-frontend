import SweetalertIcon from 'vue-sweetalert-icons';


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('sweetalert-icons', SweetalertIcon, {})
})
