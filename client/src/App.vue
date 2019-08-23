<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="'Home'" tag="button">
          <span>UC ADVOGADOS</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn text>
           <span class="mr-2">PUBLICAR</span>
          </v-btn>
          <router-link :to="'register'" tag='button' v-if="!$store.state.isUserLoggedIn">
            <v-btn text>
              <span class="mr-2">REGISTRAR</span>
             </v-btn>
          </router-link>
          <router-link :to="'login'" tag='button' v-if="!$store.state.isUserLoggedIn">
          <v-btn text>
            <span class="mr-2">ENTRAR</span>
          </v-btn>
          </router-link>
           <span class="mr-2" v-if="$store.state.isUserLoggedIn"
            @click.stop="drawer = !drawer">
              <v-avatar color="indigo">
                <v-icon dark>account_circle</v-icon>
              </v-avatar>
          </span>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      app
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
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
      { title: 'Home', icon: 'dashboard' },
      { title: 'Publicar', icon: 'question_answer' },
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
