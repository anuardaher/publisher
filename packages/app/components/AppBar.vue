<template>
  <client-only>
    <v-app-bar color="secondary" app dense>
      <v-spacer />
      <NuxtLink class="mx-2" to="/">
       <v-avatar color="thirdy" size="40">
          <span class="logo text-h5 primary--text">AD</span>
        </v-avatar>
      </NuxtLink>
      <SearchBar ref="procurar" dark class="mx-6" />
      <div class="d-none d-md-flex">
        <v-btn
          :small="$vuetify.breakpoint.xs"
          class="d-none d-md-flex mx-12"
          color="primary"
          rounded
          @click="$router.push('/publicar', () => {})"
        >
          <v-icon left dark>mdi-square-edit-outline</v-icon>
          CRIAR PUBLICAÇÃO
        </v-btn>
        <div class="mx-6">
          <NuxtLink to="/login">
            <v-btn
              dark
              class="mx-2"
              rounded
              color="secondary"
              v-if="!$store.state.isUserLoggedIn"
            >
              <v-icon left dark>mdi-login</v-icon>
              ENTRAR
            </v-btn>
          </NuxtLink>
          <NuxtLink to="/registrar">
            <v-btn
              dark
              rounded
              color="secondary"
              v-if="!$store.state.isUserLoggedIn"
            >
              <v-icon left dark>mdi-pencil-plus</v-icon>
              CADASTRAR
            </v-btn>
          </NuxtLink>
        </div>
      </div>
      <div v-if="$store.getters.state" class="d-none d-sm-flex">
        <NuxtLink
          :to="`/${$store.getters.username}`"
        >
          <UserImage
            class="float-left"
            size="40"
            :img="$store.getters.userHasImage"
            :author="$store.getters.fullName"
            letterStyle="headline"
          />
        </NuxtLink>

        <div class="float-right ml-2">
          <NuxtLink
            :to="`/${$store.getters.username}`"
            class="white--text"
          >
            <div class="body-2">{{ $store.getters.firstName }}</div>
          </NuxtLink>
          <div class="caption"><a @click="logout" class="thirdy--text">sair da conta</a></div>
        </div>
      </div>
      <!-- </v-btn> -->
      <v-spacer />
      <v-app-bar-nav-icon
        dark
        class="d-flex d-md-none"
        @click.stop="callMenu()"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </client-only>
</template>

<script>
import SearchBar from "./utils/SearchBar";
import EventBus from "../event-bus";
import UserImage from "../components/utils/UserImage";

export default {
  components: {
    SearchBar,
    UserImage,
  },
  methods: {
    callMenu() {
      EventBus.$emit("callMenu");
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/", () => {});
    },
  },
};
</script>
