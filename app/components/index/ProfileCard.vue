<template>
  <div>
    <v-card v-if="!$store.getters.state" class="pa-6" outlined>
      <v-row justify="center" align="center">
        <v-avatar size='80'>
          <v-img src="logopreto.png"></v-img>
        </v-avatar>			
      </v-row>
      <v-row justify="center" align="center">
        <h1 class="headline text-center">
          UC ADVOGADOS
        </h1>
      </v-row>
      <v-row justify="center" align="center">
        <h2 class="body-1 text-center ma-4">
          Publique conteúdos de qualidade e seja observado pela comunidade jurídica de todo o Brasil.
        </h2>
      </v-row>
      <v-row justify="center" align="center">
        <div class="ma-4">
          <v-row justify="center" align="center"> 
            <v-btn 
              class='my-1'
              block  
              tile 
              color='primary'
              @click="$router.push('/login')"
              >
                <v-icon class="ma-2" small>mdi-account</v-icon>
                ENTRAR
              </v-btn>
            <v-btn 
              class='my-1'
              block 
              tile
              color='primary'
              @click="$router.push(`/registrar`)"
              >
                <v-icon class="ma-2" small>mdi-pencil-plus</v-icon>
                CADASTRAR
              </v-btn>
          </v-row>
        </div>
      </v-row>
    </v-card>
    <v-card v-if="$store.getters.state" class="fixed pa-6" outlined>
      <v-row justify="center" align="center">
        <v-avatar 
        size='100'
        color="grey">
          <v-img
          v-if="$store.getters.userHasImage"
          :src="$store.getters.userHasImage"
          :alt="$store.getters.fullName"
          ></v-img>
          <span 
          v-if="!$store.getters.userHasImage" 
          class="white--text display-3"
          v-text="$store.getters.inicialLetterName">
          </span>
        </v-avatar>
      </v-row>
      <v-row align='center' justify='center'>
        <v-chip class="mt-1" small>{{ $store.getters.profession }}</v-chip>
      </v-row>
      <v-row justify="center" align="center"> 
        <span class="subtitle mt-2">Bem-vindo</span>
      </v-row>
      <v-row justify="center" align="center"> 
        <h1 class="title mt-n2 text-center">{{ $store.state.user.firstname }}</h1>
      </v-row>
      <v-row align='center' justify='center'>
      <span class="body-2 mt-1 text-center">
        <v-icon>mdi-map-marker</v-icon>
          <span>{{ $store.getters.fullLocation }}</span>
      </span>
    </v-row>
    <div class="ma-2 mx-4">
      <v-row justify="center" align="center"> 
        <v-btn 
          class='mt-4'
          block 
          outlined 
          tile 
          color='primary'
          @click="$router.push(`/${$store.getters.username}`)"
          >
            <v-icon class="ma-1" small>mdi-account</v-icon>
            <span class="body-2">Ver Meu Perfil</span>
        </v-btn>
        <v-btn 
          class='my-2'
          block 
          outlined 
          tile
          color='primary'
          @click="$router.push(`/publicar`)"
          >
            <v-icon class="ma-1" small>mdi-pencil-plus</v-icon>
           <span class="body-2"> Publicar </span>
          </v-btn>
      </v-row>
    </div>
    </v-card>
  </div>
</template>

<script>
export default {
	methods: {
		openSocialMedia(link) {
        window.open(link, '_blank')
      },
	}
}
</script>

<style>
</style>