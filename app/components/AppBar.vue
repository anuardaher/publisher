<template>
  <client-only>
  <v-app-bar color="primary" app flat dark>
    <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
    <v-app-bar-nav-icon
      class="d-flex d-md-none"
      @click.stop="callMenu"
    > </v-app-bar-nav-icon>
    <a href="/">
      <div><v-img src="logo.png" width="70" aspect-ratio="1.7"></v-img></div>
    </a>
    <div class="d-none d-sm-flex">
      <v-btn :small="$vuetify.breakpoint.mdAndDown" text @click="$router.push('/', () => {})">Home </v-btn>
      <v-btn :small="$vuetify.breakpoint.mdAndDown" text @click="$router.push('/servicos', () => {})">Serviços </v-btn>
      <v-btn :small="$vuetify.breakpoint.mdAndDown" text @click="$router.push('/blog', () => {})">Blog </v-btn>
      <v-btn :small="$vuetify.breakpoint.mdAndDown" text @click="$router.push('/advogados', () => {})">Associe-se </v-btn>
      <v-btn :small="$vuetify.breakpoint.mdAndDown" text @click="$router.push('/contato', () => {})">Contato </v-btn>
    </div>
    <v-btn icon @click="openSearchBar()">
      <v-icon>search</v-icon>
    </v-btn>
    <div><SearchBar v-if="showSearchBar" ref="procurar"/></div>
    <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>
    <v-btn
    :small="$vuetify.breakpoint.xs" 
    v-if="!showSearchBar" 
    class="d-none d-md-flex mx-1" 
    color="green"
    dark @click="$router.push('/publicar', () => {})">
    Publicar
    </v-btn>
    <v-btn
    icon 
    v-if="!showSearchBar" 
    class="d-flex d-md-none" 
    dark @click="$router.push('/publicar', () => {})">
      <span class="title">🚀</span>
    </v-btn>
    <div v-if="!showSearchBar" class="pa-3 d-none d-md-flex">
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
    <div v-if="!showSearchBar">
      <v-btn
        text
        @click="$router.push('/login', () => {})"
        v-if="!$store.state.isUserLoggedIn"
      >
      ENTRAR
      </v-btn>
    </div>
    <v-btn
    class="mx-2"
    icon
    @click.stop="userPhotoAction"
    v-if="$store.state.isUserLoggedIn && !showSearchBar"
    size="40px"
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
       size="40px">
        <span class="white--text headline">{{$store.getters.inicialLetterName}}</span>
      </v-avatar>
    </v-btn>
    <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
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
    showSearchBar: false,
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
    },
    openSearchBar () {
      this.showSearchBar = true
      this.$nextTick(() => {
        const element = this.$refs.procurar.$el.children[0].children[0].children[0].children[1]
        element.focus()
        element.addEventListener("blur", event => this.closeSearchBar())
      })
    },
    closeSearchBar () {
      this.showSearchBar = false
    },
    userPhotoAction () {
      if (this.$vuetify.breakpoint.smAndDown) {
         return this.$router.push("/blog")
      }
      return this.callMenu()
    }
  },
};
</script>
