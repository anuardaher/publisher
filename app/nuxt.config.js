let development = process.env.NODE_ENV !== 'production'
let URL = development ? 'http://localhost:3001' : 'https://anuar-publisher-api.herokuapp.com/'
const siteMapRoutes = require('./utils/siteMapRoutes')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'Publisher',
    title: 'Publisher',
    meta: [
      { charset: 'utf-8' },
      { name:"robots", content:"index,follow" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'language', content: 'Portuguese'},
      { property: 'og:locale', content: 'pt_BR'},
      { property: 'og:ttl', content: '2419100'}, 
      { hid: "author", name:'author', content:"Anuar Daher"},      
      { hid: "description", name: 'description', content: `Aplicação para a criação de publicações e compartilhamento em redes socais` },
      { hid: "keywords", name: 'keywords', content: `publicação, sistema, software, app, publicações, redes sociais, compartilhamento, Anuar Daher, desenvolvimento
      programação`},
      { hid: "og:image", property: 'og:image', content: `${URL}/logo.png`},
      { hid: "og:image:secure_url", property: 'og:image:secure_url', content: `${URL}/logo.png`}
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
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://anuar-publish-app.herokuapp.com/',
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
    BASE_URL: URL,
    facebookAppId: 335321434267264
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
  },

  telemetry: false
}
