<template>
  <v-app>
    <!-- Menu do usuário -->
    <AppDrawer />
    <!-- Cabeçalho da aplicação -->
    <AppBar />
    <!-- Conteúdo gerido pelas rotas -->
    <v-main>
      <WhatsappButton />
      <Snackbar />
      <v-container fluid>
        <v-scroll-x-transition :hide-on-leave="true">
          <router-view :key="$route.fullPath"></router-view>
        </v-scroll-x-transition>
      </v-container>
    </v-main>
    <!-- Rodapé -->
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import AppDrawer from "../components/utils/AppDrawer.vue";
import Snackbar from "../components/utils/Snackbar.vue";
import WhatsappButton from "../components/utils/WhatsappButton.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "App",
  head: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Site",
    // all titles will be injected into this template
    titleTemplate: "%s – Publisher",
  },
  components: {
    AppBar,
    AppDrawer,
    Snackbar,
    WhatsappButton,
    Footer,
  },
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>

<style>

.v-main {
  min-height: 70vh;
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

body {
  overflow-x: hidden;
}

a:hover {
  text-decoration: underline;
}

a:link {
  text-decoration: none;
}

.logo {
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
}
</style>
