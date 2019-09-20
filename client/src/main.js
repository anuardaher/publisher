import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import socialSharing from 'vue-social-sharing';
import VueMeta from 'vue-meta';
import VueTimeago from 'vue-timeago';

Vue.config.productionTip = false;
Vue.use(socialSharing);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'pt-BR', // Default locale
  locales: {
    'pt-BR': require('date-fns/locale/pt')
  },
  converter(date, locale, { includeSeconds, addSuffix = true }) {
    const distanceInWordsStrict = require('date-fns/distance_in_words_strict')
    return distanceInWordsStrict(Date.now(), date, { locale, addSuffix, includeSeconds });
  }
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app');


