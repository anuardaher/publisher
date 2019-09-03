import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import socialSharing from 'vue-social-sharing';
import VueMeta from 'vue-meta'

Vue.config.productionTip = false;
Vue.use(socialSharing);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');


