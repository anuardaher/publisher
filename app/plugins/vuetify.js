import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#436892',
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
