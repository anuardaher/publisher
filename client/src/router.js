import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Perfil from './views/Perfil.vue';
import Publicar from './views/Publicar.vue';
import Artigos from './views/Artigos.vue';
import Noticias from './views/Noticias.vue';

Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  if (!store.getters.state) {
    next('/login');
  } else {
    next();
  }
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
  ],
});

export default router;
