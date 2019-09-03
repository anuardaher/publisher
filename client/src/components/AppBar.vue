<template>
  <v-app-bar app dense>
    <v-toolbar-title 
    class="headline text-uppercase"
    @click="$router.push('/', () => {})">
        <span>UC ADVOGADOS</span>
    </v-toolbar-title>
    <span class='mr-4'></span>
    <v-toolbar-items class="d-none d-sm-flex">
      <v-btn text @click="$router.push('/', () => {})">
      {{getHomeButton}}
      </v-btn>
      <v-btn text @click="$router.push('/artigos', () => {})">
      ARTIGOS
      </v-btn>
      <v-btn text @click="$router.push('/noticias', () => {})">
      NOTÍCIAS
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon 
    class="d-flex d-sm-none"
    @click.stop="callMenu"
    v-if="!$store.state.isUserLoggedIn">
    </v-app-bar-nav-icon>
    <v-toolbar-items class='d-none d-sm-flex'>
        <v-btn text @click="$router.push('/publicar', () => {})">
        PUBLICAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('registrar', () => {})"
        v-if="!$store.state.isUserLoggedIn">
        REGISTRAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('login', () => {})"
        v-if="!$store.state.isUserLoggedIn">
        ENTRAR
        </v-btn>
    </v-toolbar-items>
    <span class='mr-2'></span>
    <v-btn
    icon
    @click.stop="callMenu"
    v-if="$store.state.isUserLoggedIn"
    class="mr-2"
    size="42px"
    >
      <v-avatar 
      v-if="$store.getters.userHasImage">
        <img
        src="https://randomuser.me/api/portraits/men/78.jpg"
        alt="John"
        >
      </v-avatar>
      <v-avatar
       v-if="!$store.getters.userHasImage" 
       :color="$store.getters.userColor"
       size="42px">
        <span class="white--text headline">{{$store.getters.inicialLetterName}}</span>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import EventBus from '../event-bus.js';

export default {
  data: () => ({
  }),
  methods: {
    callMenu: () => {
      EventBus.$emit('callMenu');
    },
  },
  computed: {
   getHomeButton () {
    if (this.$store.getters.state) {
        return 'Feed'
    }
    return 'Home'
    }
  }
};
</script>
