<template>
  <v-app-bar app dark color='primary'>
    <v-toolbar-title 
    class="headline text-uppercase"
    @click="$router.push('/artigos', () => {})">
          <v-img src="ucadvogadoslogo.png" max-width="65" max-height="55"></v-img>
    </v-toolbar-title>
    <span class='mr-4'></span>
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn text @click="$router.push('/artigos', () => {})">
      ARTIGOS
      </v-btn>
      <v-btn text @click="$router.push('/noticias', () => {})">
      NOTÍCIAS
      </v-btn>
    </v-toolbar-items>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class=" d-none d-md-flex mx-8"
      hide-no-data
      hide-details
      label="Pesquise"
      solo-inverted
      prepend-inner-icon="search"
      single-line
      return-object
      item-text='title'
      clearable
    >
      <template v-slot:item="{ item }"> 
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1 white--text"
            >mdi-file-document-box</v-icon>
          </v-list-item-avatar>
          <v-list-item-content 
          @click="$router.push(`${item.type}/${item.title.replace(/[ ?]/g,'-' )}/${item._id}`, () => {})">
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.subtitle.slice(0, 40).concat('...')"></v-list-item-subtitle>
          </v-list-item-content>
      </template>
    </v-autocomplete>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon 
    class="d-flex d-md-none ml-2  "
    @click.stop="callMenu"
    v-if="!$store.state.isUserLoggedIn">
    </v-app-bar-nav-icon>
    <v-toolbar-items class='d-none d-md-flex'>
        <v-btn text @click="$router.push('/publicar', () => {})">
        PUBLICAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('/registrar', () => {})"
        v-if="!$store.state.isUserLoggedIn">
        REGISTRAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('/login', () => {})"
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
        :src="$store.getters.userHasImage"
        alt="John"
        >
      </v-avatar>
      <v-avatar
       v-if="!$store.getters.userHasImage" 
       color="grey"
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
    loading: false,
    items: [],
    select: {},
    search: null

  }),
  watch: {
      search (val) {
        val && val !== this.select && this.searchPosts(val)
      },
    },
  methods: {
    callMenu: () => {
      EventBus.$emit('callMenu');
    },
    async searchPosts(value) {
      if (value.length < 3) return;
      this.loading = true;
      try {
         const data = await this.$axios.$post('/articles/search', {
          data: { title: value },
          projection: { text: 0 },
          options: { limit: 5 },
        });
        this.items = data ? data : [];
      } catch (error) {
        EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar pesquisa. Tente mais tarde.',
      });
      } finally {
          this.loading = false;
      }
    }
  },
};
</script>

<style>
</style>
