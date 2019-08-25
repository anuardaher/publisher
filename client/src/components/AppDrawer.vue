<template>
    <v-navigation-drawer
    v-model="drawer"
    temporary
    right
    app
    height='400px'
    touchless
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
        @click="$router.push(item.route, () => {})"
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
</template>

<script>
import EventBus from '../event-bus.js';

export default {
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
  mounted () {
    const self = this;
    EventBus.$on('callMenu', () => {
      this.drawer = !this.drawer;
    });
  },
  computed: {
    getName() {
      return this.$store.getters.getFullName;
    },
  },
};
</script>
