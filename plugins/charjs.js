import { Radar } from 'vue-chartjs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('RadarChart', Radar, {})
})
