import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    lang: {
      locales: { pt },
      current: 'pt',
    },
    theme: {
      themes: {
        light: {
          primary: '#15202b',
          secondary: '#f2f5f6',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
