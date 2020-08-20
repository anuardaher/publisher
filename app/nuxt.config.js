let development = process.env.NODE_ENV !== 'production'
let URL = development ? 'http://localhost:3001' : 'https://anuar-publisher-api.herokuapp.com/'
const siteMapRoutes = require('./utils/siteMapRoutes')

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
      { name:"robots", content:"index,follow" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'language', content: 'Portuguese'},
      { property: 'og:locale', content: 'pt_BR'},
      { property: 'fb:app_id', content: '365056554418853'},
      { property: 'og:ttl', content: '2419100'}, 
      { hid: "author", name:'author', content:"Uelton Costa"},      
      { hid: "description", name: 'description', content: `Demissão, como calcular hora extra, como fazer carteira de trabalho digital, 
      quem tem direito ao fgts, quem tem direito ao pis, coordenação geral de reconhecimento de direitos inss, tabela inss 2020, salário mínimo 2020, reforma da previdência, 
      advogados em Goiânia, advogados em aparecida de Goiânia, dano moral, ipva 2020, 
      fim da multa de 40%, seguro desemprego, calculo de rescisão, rescisão trabalhista` },
      { hid: "keywords", name: 'keywords', content: `direito, advogados, constituição, lei, noticias, artigos, consumidor, goiânia, goiás,
      direito constitucional,direito civil, direito penal, direito tributário, Demissão, como calcular hora extra, como fazer carteira de trabalho digital,
      quem tem direito ao fgts, quem tem direito ao pis, coordenação geral de reconhecimento de direitos inss, tabela inss 2020,
      salário mínimo 2020, reforma da previdência, advogados em Goiânia, advogados em aparecida de Goiânia, dano moral, ipva 2020, 
      fim da multa de 40%, seguro desemprego, calculo de rescisão, rescisão trabalhista`},
      { hid: "og:image", property: 'og:image', content: `${URL}/publisher.jpg`},
      { hid: "og:image:secure_url", property: 'og:image:secure_url', content: `${URL}/publisher.jpg`}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff", height: '4px' },
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
    '@plugins/socialSharing',
    '@plugins/axios'
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
    'cookie-universal-nuxt',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://publisher.com.br',
    exclude: [
      '/admin',
      '/error',
      '/notfound'
    ],
    routes: async () => { 
      const usersRoutes = await siteMapRoutes.getUsers(URL)
      const articlesRoutes = await siteMapRoutes.getArticles(URL)
      if (!usersRoutes || !articlesRoutes) return
      return usersRoutes.concat(articlesRoutes);
    }, 
    gzip: true,
  },
  env: {
    BASE_URL: URL
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/api/v1'
  },

  proxy: {
    '/api/v1': URL,
  },

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
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
