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
      <ProgressBar/>
      <v-container fluid>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>
    <!-- Rodapé -->
    <v-footer app>
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppDrawer from './components/utils/AppDrawer.vue';
import Snackbar from './components/utils/Snackbar.vue';
import ProgressBar from './components/utils/ProgressBar.vue';
import WhatsappButton from './components/utils/WhatsappButton'

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Site',
    // all titles will be injected into this template
    titleTemplate: '%s | UC Advogados'
  },
  components: {
    AppBar,
    AppDrawer,
    Snackbar,
    ProgressBar,
    WhatsappButton,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
};
</script>
