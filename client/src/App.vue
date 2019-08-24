<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
          <span @click="$router.push('/')">UC ADVOGADOS</span>
      </v-toolbar-title>
      <span class='mr-4'></span>
      <v-toolbar-items>
         <v-btn text @click="$router.push('/artigos')">
            ARTIGOS
        </v-btn>
        <v-btn text @click="$router.push('/noticias')">
            NOTÍCIAS
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="$router.push('/publicar')">
          PUBLICAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('registrar')"
        v-if="!$store.state.isUserLoggedIn">
          REGISTRAR
        </v-btn>
        <v-btn
        text
        @click="$router.push('login')"
        v-if="!$store.state.isUserLoggedIn">
          ENTRAR
        </v-btn>
      </v-toolbar-items>
      <span class='mr-4'></span>
      <v-btn
        icon
        large
        @click.stop="drawer = !drawer"
        v-if="$store.state.isUserLoggedIn"
        class="mr-2"
      >
      <v-avatar item>
      <img
        src="https://randomuser.me/api/portraits/men/78.jpg"
        alt="John"
      >
      </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      app
      height='400px'
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{getName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       <template v-slot:append>
        <div class="pa-2">
          <v-btn dark block @click="logout">Sair</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
       <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    items: [
      { title: 'Minha Conta', icon: 'person', route: '/perfil' },
      { title: 'Publicar', icon: 'edit', route: '/publicar' },
      { title: 'Artigos', icon: 'question_answer', route: '/artigos' },
      { title: 'Noticias', icon: 'mdi-newspaper', route: '/noticias' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push('/');
      this.drawer = !this.drawer;
    },
  },
  computed: {
    getName() {
      return this.$store.getters.getFullName;
    },
  },
};
</script>
