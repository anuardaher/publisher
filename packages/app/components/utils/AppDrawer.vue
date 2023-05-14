<template>
  <client-only>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      app
      touchless
      height="auto"
    >
      <v-list-item>
        <v-list-item-content class="text-center">
          <NuxtLink
            v-if="$store.getters.state"
            :to="`/${$store.getters.username}`"
          >
            <div class="text-center">
              <UserImage
                size="80"
                :img="$store.getters.userHasImage"
                :author="$store.getters.fullName"
                letterStyle="headline"
              />
            </div>
            <v-list-item-content>
              <v-list-item-title>{{
                $store.getters.fullName
              }}</v-list-item-title>
              <span class="subtext">Ver meu perfil</span>
            </v-list-item-content>
          </NuxtLink>
          <NuxtLink to="/" v-else>
            <v-avatar class="my-2 text-center" color="thirdy" size="80">
              <span class="logo text-h4 primary--text">AD</span>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>Publisher</v-list-item-title>
              <span class="subtext">Publique e compartilhe conteúdo</span>
            </v-list-item-content>
          </NuxtLink>
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
      <v-list>
        <v-list-item>
          <v-list-item-content> </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <NuxtLink to="/publicar">
          <div class="pa-2">
            <v-btn rounded block color="primary">
              <v-icon left dark>mdi-square-edit-outline</v-icon>
              Publicar
            </v-btn>
          </div>
        </NuxtLink>
        <div class="pa-2" v-if="$store.state.isUserLoggedIn">
          <v-btn color="error" rounded dark block @click="logout">
            <v-icon left dark>mdi-login</v-icon>
            Sair
          </v-btn>
        </div>
        <div v-else class="pa-2">
          <NuxtLink to="/login">
            <v-btn color="green" rounded dark block>
              <v-icon left dark>mdi-login</v-icon>
              Entrar
            </v-btn>
          </NuxtLink>
        </div>
      </template>
    </v-navigation-drawer>
  </client-only>
</template>

<script>
import EventBus from "../../event-bus.js";
import UserImage from "./UserImage";

export default {
  components: {
    UserImage,
  },
  data: () => ({
    isMenuButton: false,
    drawer: null,
    loading: false,
    articles: [],
    select: null,
    search: null,
    items: [
      { title: "Blog", icon: "book", route: "/" },
      { title: "Contato", icon: "mdi-account-box", route: "/contato" },
    ],
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.searchPosts(val);
    },
  },
  methods: {
    openSocialMedia(link) {
      window.open(link, "_blank");
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/", () => {});
      this.drawer = !this.drawer;
    },
  },
  mounted() {
    EventBus.$on("callMenu", (event) => {
      this.drawer = !this.drawer;
      this.isMenuButton = event;
    });
  },
};
</script>
<style scoped>
.subtext {
  font-size: 12px;
  color: gray;
}
</style>
