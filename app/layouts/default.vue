<template>
  <v-app> 
    <!-- Menu do usuário -->
    <AppDrawer/>
    <!-- Cabeçalho da aplicação -->
    <AppBar/>
    <!-- Conteúdo gerido pelas rotas -->
    <v-content>
      <WhatsappButton/>
      <Snackbar/>
      <v-container fluid>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>
    <!-- Rodapé -->
    <Footer/>
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar.vue';
import AppDrawer from '../components/utils/AppDrawer.vue';
import Snackbar from '../components/utils/Snackbar.vue';
import WhatsappButton from '../components/utils/WhatsappButton.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'App',
  head: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Site',
    // all titles will be injected into this template
    titleTemplate: '%s – UC Advogados'
  },
  components: {
    AppBar,
    AppDrawer,
    Snackbar,
    WhatsappButton,
    Footer,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
};
</script>
<style>
.v-content {
  background-image: radial-gradient( circle farthest-corner at 18.7% 37.8%,  rgba(250,250,250,1) 0%, rgba(225,234,238,1) 90% );
}

body {
  overflow-x: hidden
}
</style>
