<template>
  <client-only>
  <v-app-bar color="primary" app flat dark :extended="resizeAppBar">
     <v-spacer></v-spacer>
     <a class="headline text-uppercase" @click="$router.push('/', () => {})">
      <span :class="$vuetify.breakpoint.xsOnly ? 'body-2 white--text mr-1' : 'headline white--text mr-1'">
        <i><b>UC</b>ADVOGADOS</i>
      </span>
    </a>
    <div><SearchBar/></div>
    <v-app-bar-nav-icon
      class="d-flex d-md-none"
      @click.stop="callMenu"
      v-if="!$store.state.isUserLoggedIn"
    >
    </v-app-bar-nav-icon>
    <v-btn class="mx-2 d-none d-md-flex" color="green" dark @click="$router.push('/publicar', () => {})">
      🚀 Publicar
    </v-btn>
    <div class="pa-3 d-none d-md-flex">
      <v-btn 
        v-for="btn in buttons"
        :key="btn.name"
        @click="openTab(btn.link)"
        class="mx-1"
        icon 
        small
      >
        <v-icon :color="btn.color">{{btn.name}}</v-icon>
      </v-btn>
    </div>
    <div class="d-none d-md-flex">
      <v-btn
        text
        @click="$router.push('/login', () => {})"
        v-if="!$store.state.isUserLoggedIn"
      >
      ENTRAR
      </v-btn>
    </div>
    <v-btn
    icon
    @click.stop="callMenu"
    v-if="$store.state.isUserLoggedIn"
    size="42px"
    >
      <v-avatar 
      v-if="$store.getters.userHasImage">
        <v-img
        :src="$store.getters.userHasImage"
        :alt="$store.getters.fullName"
        ></v-img>
      </v-avatar>
      <v-avatar
       v-if="!$store.getters.userHasImage" 
       color="grey"
       size="42px">
        <span class="white--text headline">{{$store.getters.inicialLetterName}}</span>
      </v-avatar>
    </v-btn>
    <v-spacer></v-spacer>
     <template v-slot:extension v-if="$vuetify.breakpoint.mdAndUp">
      <v-row justify="center">
        <v-col md="10" lg="8" xl="6">
          <v-tabs
            class="ml-n4"
            show-arrows
            optional
            center-active
            align-with-title
            background-color="transparent"
          >
            <v-tab @click="$router.push('/', () => {})">Home</v-tab>
            <v-tab @click="$router.push('/servicos', () => {})">Serviços</v-tab>
            <v-tab @click="$router.push('/blog', () => {})">Blog</v-tab>
            <v-tab @click="$router.push('/advogados', () => {})">Advogados</v-tab>
            <v-tab @click="$router.push('/contato', () => {})">Contato</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </template>
  </v-app-bar>
  </client-only>
</template>

<script>
import SearchBar from './utils/SearchBar'
import EventBus from '../event-bus'

export default {
  components: {
    SearchBar,
  },
  data: () => ({
    buttons: [
      {color: "#4064ad", name: "mdi-facebook-box", link: "https://web.facebook.com/UCAdvogado/"},
      {color: "#d41a42", name: "mdi-instagram", link: "https://www.instagram.com/uc.advogados/"},
      {color: "#1da1f2", name: "mdi-twitter", link: "https://twitter.com/UAdvogados"},
      {color: "#d62824", name: "mdi-youtube", link: "https://www.youtube.com/c/UCAdvogados"},
      {color: "#2ea4d4", name: "mdi-telegram", link: "https://t.me/ucadvogados"},
      {color: "#0271ae", name: "mdi-linkedin-box", link: "https://www.linkedin.com/in/uc-advogado/"}
    ],
  }),
  methods: {
    callMenu: () => {
      EventBus.$emit('callMenu');
    },
    openTab(link) {
      window.open(link, '_blank')
    }
  },
  computed: {
    resizeAppBar () {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) return false
      return true
    }
  }
};
</script>

<style scoped>
 .v-tab {
  opacity: 0.9 !important;
  color: #fff !important;
  }
</style>
