<template>
  <div>
    <v-card
      v-if="!$store.getters.state"
      class="pa-6"
      outlined
      min-height="482"
      color="fivety"
      rounded
      raised
    >
      <v-row justify="center" align="center">
        <v-avatar color="thirdy" size="150" class="mb-1">
          <span class="logo text-h1 primary--text">AD</span>
        </v-avatar>
      </v-row>
      <v-row justify="center" align="center">
        <h1 class="headline text-center">
          Bem-vindo!
        </h1>
      </v-row>
      <v-row justify="center" align="center">
        <h2 class="body-1 text-center ma-4">
          Crie, publique e compartilhe conteúdo aqui e em suas redes sociais.
        </h2>
      </v-row>
      <v-row justify="center" align="center">
        <div class="ma-4">
          <v-row justify="center" align="center">
            <NuxtLink to="/login" class="text-decoration-none my-1">
              <v-btn color="secondary" dark rounded min-width="170">
                <v-icon class="ma-2">mdi-login</v-icon>
                ENTRAR
              </v-btn>
            </NuxtLink>
            <NuxtLink to="/registrar" class="text-decoration-none my-1">
              <v-btn color="secondary" dark rounded min-width="170">
                <v-icon class="ma-2">mdi-pencil-plus</v-icon>
                CADASTRAR
              </v-btn>
            </NuxtLink>
          </v-row>
        </div>
      </v-row>
    </v-card>
    <v-card
      v-if="$store.getters.state"
      class="fixed pa-6"
      outlined
      rounded
      raised
      color="fivety"
      min-height="482"
    >
      <v-row justify="center" align="center">
        <UserImage
          size="150"
          :img="$store.getters.userHasImage"
          :author="$store.getters.fullName"
          letterStyle="headline"
        />
      </v-row>
      <v-row align="center" justify="center">
        <v-chip class="mt-1" small>{{ $store.getters.profession }}</v-chip>
      </v-row>
      <v-row justify="center" align="center">
        <span class="body-2 mt-3">Bem-vindo</span>
      </v-row>
      <v-row justify="center" align="center">
        <h1 class="title mt-n2 text-center">
          {{ $store.getters.fullName }}
        </h1>
      </v-row>
      <v-row align="center" justify="center">
        <span class="body-2 mt-3 text-center">
          <v-icon>mdi-map-marker</v-icon>
          <span>{{ $store.getters.fullLocation }}</span>
        </span>
      </v-row>
      <div class="mt-12 mx-4">
        <v-row class="d-block" justify="center" align="center">
          <div class="my-2 text-center">
            <NuxtLink
              :to="`/${$store.getters.username}`"
              class="text-decoration-none"
            >
              <v-btn rounded dark min-width="210" color="secondary">
                <v-icon left>mdi-account</v-icon>
                Meu Perfil
              </v-btn>
            </NuxtLink>
          </div>
          <div class="my-2 text-center">
            <NuxtLink to="/publicar" class="text-decoration-none">
              <v-btn rounded dark min-width="210" color="secondary">
                <v-icon left>mdi-square-edit-outline</v-icon>
                Criar Publicação
              </v-btn>
            </NuxtLink>
          </div>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import UserImage from "../utils/UserImage";
export default {
  components: {
    UserImage,
  },
  methods: {
    openSocialMedia(link) {
      window.open(link, "_blank");
    },
  },
};
</script>
