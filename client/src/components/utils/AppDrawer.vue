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
         class="white--text headline"
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
     <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="articles"
      :search-input.sync="search"
      class="ma-4 d-flex d-md-none"
      hide-no-data
      hide-details
      label="Pesquise"
      append-icon='mdi-magnify'
      solo
      single-line
      item-text="title"
      return-object
      clearable
    >
     <template v-slot:item="{ item }"> 
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1 white--text"
            >mdi-file-document-box</v-icon>
          </v-list-item-avatar>
          <v-list-item-content 
          @click.stop="$router.push(`/publicacao/${item._id}`,() => {})">
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
      </template>
    </v-autocomplete>
    <div class='pt-6'
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
import ArticleService from '../../services/ArticleService.js';

export default {
  data: () => ({
    drawer: null, 
    loading: false,
    articles: [],
    select: null,
    search: null,
    items: [
      { title: 'Feed', icon: 'home', route: '/feed'},
      { title: 'Publicar', icon: 'edit', route: '/publicar' },
      { title: 'Artigos', icon: 'question_answer', route: '/artigos' },
      { title: 'Noticias', icon: 'mdi-newspaper', route: '/noticias' },
    ],
  }),
  watch: {
      search (val) {
        val && val !== this.select && this.searchPosts(val)
      },
    },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push('/', () => {});
      this.drawer = !this.drawer;
    },
    async searchPosts(value) {
      if (value.length < 3) return;
      this.loading = true;
      try {
        const { data } = await ArticleService.search({
          data: { title: value },
          projection: { text: 0 },
          options: { limit: 5 },
        });
        this.articles = data ? data : [];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
        EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar pesquisa. Tente mais tarde.',
      });
      }
    }
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
