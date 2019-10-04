let development = process.env.NODE_ENV !== 'production'
let URL = development ? 'http://localhost:3001' : 'https://ucadvogados.anuardaher.com'
const axios = require('axios')

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
      { hid: "description", name: 'description', content: 'Blog, jornal, noticias e orientações jurídicas para alunos, profissionais e interessados sobre as diversas áreas do direito.' },
      { hid: "keywords", name: 'keywords', content: 'direito, advogados, constituição, lei, noticias, artigos, consumidor, direito administrativo, direito constitucional, direito civil, direito penal, direito tributário'},
      { hid: "og:img", property: 'og:img', content: `${URL}/ucadvogados.jpg`},
      { hid: "og:image:secure_url", property: 'og:image:secure_url', content: `${URL}/ucadvogados.jpg`}
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

  //sitemap

  sitemap: {
    hostname: URL,
    gzip: true,
    exclude: [
      '/perfil',
      '/index',
      '/notfound',
      '/error'

    ],
    routes: async () => {
      const { data } = await axios.get(`${URL}/api/v1/articles`, {params: {
        projection: { _id: 1, type: 1, title: 1 }
      }})
      return data.map(post => `/${post.type}/${post.title.replace(/[ ]/g,'-' )}/${post._id}`)
    }
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
