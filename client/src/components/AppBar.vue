<template>
    <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/', () => {})">UC ADVOGADOS</span>
    </v-toolbar-title>
    <span class='mr-4'></span>
    <v-toolbar-items>
        <v-btn text @click="$router.push('/artigos', () => {})">
        ARTIGOS
    </v-btn>
    <v-btn text @click="$router.push('/noticias', () => {})">
        NOTÍCIAS
    </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
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
    @click="$router.push('login')"
    v-if="!$store.state.isUserLoggedIn">
        ENTRAR
    </v-btn>
    </v-toolbar-items>
    <span class='mr-4'></span>
    <v-btn
    icon
    large
    @click.stop="callMenu"
    v-if="$store.state.isUserLoggedIn"
    class="mr-2"
    >
    <v-avatar item>
    <img
    src="https://randomuser.me/api/portraits/men/78.jpg"
    alt="John"
    >
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
        console.log('passei')
      EventBus.$emit('callMenu');
    },
  },
};
</script>
