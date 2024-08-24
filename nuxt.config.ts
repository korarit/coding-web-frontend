// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/golbal.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig:{
    apiBase: process.env.API_BASE_URL || 'http://localhost:3000',
    turnstile:{
      secretKey: process.env.TURNSTILE_SECRET_KEY
    },
    public:{
      backendApi: process.env.API_BASE_URL || 'http://localhost:3000'
    }
  },
  
  modules: [
    ["@nuxtjs/google-fonts",{families:{Kanit: [100,200,300,400,500,600,700,800,900]}}],
    "nuxt-monaco-editor",
    '@vueuse/nuxt',
    "@sidebase/nuxt-auth",
    "@nuxtjs/turnstile",
    "dayjs-nuxt",
    'nuxt-tiptap-editor',
  ],
  monacoEditor:{
    languages: ['javascript', 'typescript', 'html', 'css', 'json', 'xml', 'python', 'java', 'php', 'markdown', 'yaml', 'sql', 'shell', 'plaintext'],
    features: ['coreCommands', 'find', 'format', 'quickCommand', 'quickOutline', 'quickHelp', 'suggestions', 'parameterHints', 'hover', 'links'],
    themes: ['vs-dark', 'vs-light', 'hc-black']
  },

  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'credentials',
      addDefaultCallbackUrl: true
    }
  },

  turnstile: { 
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },
  dayjs: {
    externalPlugins: [{
      name: 'timezone',
      package: 'dayjs/plugin/timezone',
    }]
  },
  tiptap:{
    prefix: 'Tiptap',
  }
})