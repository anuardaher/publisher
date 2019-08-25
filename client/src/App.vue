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
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppDrawer from './components/AppDrawer.vue';

export default {
  name: 'App',
  components: {
    AppBar,
    AppDrawer,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
};
</script>
