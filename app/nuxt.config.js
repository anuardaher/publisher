module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'UC Advogados',
    title: 'UC Advogados',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Blog, jornal, noticias e orientações jurídicas para alunos, profissionais e interessados sobre as diversas áreas do direito.' },
      { hid: 'keywords', name: 'keywords', content: 'direito, advogados, constituição, lei, noticias, artigos, consumidor, direito administrativo, direito constitucional, direito civil, direito penal, direito tributário'},
      { hid: 'language', name: 'language', content: 'Portuguese'},
      { hid: 'og:locale', property: 'og:locale', content: 'pt-BR'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage', mode: 'client' },
    '@plugins/vuetify',
    '@plugins/timeago',
    '@plugins/socialSharing'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],

  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/api/v1',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3001/api/v1'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   
    extend (config, ctx) {
    }
  }
}
