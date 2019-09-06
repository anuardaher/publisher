<template>
    <v-navigation-drawer
    v-model="drawer"
    temporary
    right
    app
    height='400px'
    touchless
>
    <v-list-item 
    v-if="$store.state.isUserLoggedIn"
    list
    @click="$router.push('/perfil', () => {})">
      <v-list-item-avatar
      :color="$store.getters.userColor">
        <span
         class="white--text headline pl-1"
         v-if="!$store.getters.userHasImage"
         >{{$store.getters.inicialLetterName}}
         </span>
        <v-img
          :src="$store.getters.userHasImage"
          v-if="$store.getters.userHasImage">
        </v-img>
      </v-list-item-avatar>

      <v-list-item-content>
          <v-list-item-title>{{$store.getters.fullName}}</v-list-item-title>
          <span class="subtext">Ver meu perfil</span>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>

    <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="$router.push(item.route, () => {})"
    >
        <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </v-list>
    <div class='pt-12'
     v-if="!$store.state.isUserLoggedIn">
      <div class="pa-2">
          <v-btn dark block
            @click="$router.push('login', () => {})">Entrar</v-btn>
      </div>
      <div class="pa-2">
          <v-btn dark block
            @click="$router.push('registrar', () => {})">Cadastrar</v-btn>
      </div>
    </div>
    <template
      v-slot:append
      v-if="$store.state.isUserLoggedIn">
    <div class="pa-2">
        <v-btn dark block @click="logout">Sair</v-btn>
    </div>
    </template>
</v-navigation-drawer>
</template>

<script>
import EventBus from '../../event-bus.js';

export default {
  data: () => ({
    drawer: null, 
    items: [
      { title: 'Home', icon: 'home', route: '/'},
      { title: 'Publicar', icon: 'edit', route: '/publicar' },
      { title: 'Artigos', icon: 'question_answer', route: '/artigos' },
      { title: 'Noticias', icon: 'mdi-newspaper', route: '/noticias' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push('/', () => {});
      this.drawer = !this.drawer;
    },
  },
  mounted () {
    EventBus.$on('callMenu', () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>
<style scoped>
.subtext {
  font-size: 12px;
  color: gray;
}
</style>
