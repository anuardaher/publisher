<template>
  <v-app>
    <!-- Menu do usuário -->
    <AppDrawer/>
    <!-- Cabeçalho da aplicação -->
    <AppBar/>
    <!-- Conteúdo gerido pelas rotas -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- Rodapé -->
    <v-footer app>
      <Snackbar/>
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppDrawer from './components/utils/AppDrawer.vue';
import Snackbar from './components/utils/Snackbar.vue';

export default {
  name: 'App',
  components: {
    AppBar,
    AppDrawer,
    Snackbar,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
};
</script>
