import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Feed from './views/Feed.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Perfil from './views/Perfil.vue';
import Publicar from './views/Publicar.vue';
import Artigos from './views/Artigos.vue';
import Noticias from './views/Noticias.vue';
import Publicacao from './views/Publicacao.vue';
import EventBus from './event-bus.js';
import AuthService from './services/AuthenticationService.js';
Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  if (!store.getters.state) {
    EventBus.$emit('callSnackbar', {
      text: 'Você precisa estar logado para efetuar essa operação.',
      color: 'warning',
    });
    next('/login');
  } else {
    next();
  }
};

const socialAuthenticated = async (to, from, next) => {
  if (!to.query.user) return isAuthenticated(to, from, next);
  try {
    const {data} = await AuthService.socialLogin(to.query.user);
    store.dispatch('setToken', data.token);
    store.dispatch('setUser', data.user);
    next('/feed');
  } catch (error) {
    next('/');
  }
}

const router = new Router({
  routes: [
    {
      path: '/', redirect: '/artigos'
    },
    {
      path: '/feed',
      name: 'feed',
      component: Feed,
      beforeEnter: socialAuthenticated
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/publicar',
      name: 'publicar',
      component: Publicar,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/artigos',
      name: 'artigos',
      component: Artigos,
    },
    {
      path: '/noticias',
      name: 'noticias',
      component: Noticias,
    },
    {
      path: '/publicacao/:id',
      name: 'publicacao',
      component: Publicacao,
    },
  ],
});

export default router;
