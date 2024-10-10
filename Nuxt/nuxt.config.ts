// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/google-fonts',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
  ],
  ssr:false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.scss'],
  googleFonts: {
    families: {
      'JetBrains Mono': true,
    },
    download: true,
    base64: false,
    overwriting: true,
    outputDir: 'assets/fonts',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  image: { quality: 100 },
  runtimeConfig: {
    github: {
      github_domain: 'https://github.com',
      client_id: 'Ov23licPh7jMG2px0mbZ',
      client_secret: '6b025f3ff0ff159a9bf55aead49421c89ace5fdd',
      redirect: 'http:localhost:3000/auth/github/callback',
    },
    public: {},
  },
})
