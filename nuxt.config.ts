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
    oauth:{
      google:{
        clientId: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_ID',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_SECRET'
      },
      facebook:{
        clientId: process.env.FACEBOOK_CLIENT_ID || 'FACEBOOK_ID',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'FACEBOOK_SECRET'
      },
      azureAD:{
        clientId: process.env.AZURE_AD_CLIENT_ID || 'AZURE_AD_ID',
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET || 'AZURE_AD_SECRET',
        tenantId: process.env.AZURE_AD_TENANT_ID || 'AZURE_AD_TENANT_ID'
      },
      github:{
        clientId: process.env.GITHUB_CLIENT_ID || 'GITHUB_ID',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || 'GITHUB_SECRET'
      }
    }
  },
  
  modules: [
    ["@nuxtjs/google-fonts",{families:{Kanit: [100,200,300,400,500,600,700,800,900]}}],
    "nuxt-monaco-editor",
    '@vueuse/nuxt',
    "@sidebase/nuxt-auth"
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
  }
})