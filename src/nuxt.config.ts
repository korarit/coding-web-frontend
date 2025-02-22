// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/golbal.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-sweetalert-icons/dist/style.css'
  ],
  pwa: {
    manifest: {
      name: 'Coding with Me',
      short_name: 'CWM',
      icons: [
        {
          src: '/logo-web-coding.png', // ใช้ path ตรงจาก public/
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/logo-web-coding.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      start_url: '/',
      display: 'fullscreen', // สำคัญสำหรับ TWA
      theme_color: '#ffffff',
      background_color: '#ffffff'
    },
    workbox:{
      swDest: 'service-worker.js',
    }
  },
  typescript: {
    strict: true
  },


  ssr: process.env.BUILD_MOBILE === 'true' ? false : true,


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig:{
    apiBase: process.env.API_BASE_URL || 'http://172.30.96.1:3089',
    turnstile:{
      secretKey: process.env.TURNSTILE_SECRET_KEY
    },
    public:{
      ablyApiKey: process.env.ABLY_API_KEY,
      backendApi: process.env.API_BASE_URL || 'http://172.30.96.1:3089',

      clientGoogleId: process.env.GOOGLE_CLIENT_ID,
      clientGoogleAndroidId: process.env.GOOGLE_CLIENT_ID_ANDROID,

      clientFacebookId: process.env.FACEBOOK_CLIENT_ID,

      clientAzureId: process.env.AZURE_AD_CLIENT_ID,
      clientAzureTenantId: process.env.AZURE_AD_TENANT_ID,
      AzureRedirectUri: process.env.AZURE_AD_REDIRECT_URI,

      clientGithubId: process.env.GITHUB_CLIENT_ID,

    }
  },
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },

  modules: [
    ["@nuxtjs/google-fonts",{families:{Kanit: [100,200,300,400,500,600,700,800,900]}}],
    "nuxt-monaco-editor",
    '@vueuse/nuxt',
    "@sidebase/nuxt-auth",
    "@nuxtjs/turnstile",
    "dayjs-nuxt",
    "@hypernym/nuxt-gsap",
    '@vite-pwa/nuxt',
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
    },
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: process.env.BASE_URL + '/api/auth',
    
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

  nitro:{
    routeRules:{
      '/**':{
        headers:{
          'Cross-Origin-Opener-Policy': 'unsafe-none',
        }
      }
    }
  },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

})