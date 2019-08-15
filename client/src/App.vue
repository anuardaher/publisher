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
          <router-link :to="'register'" tag='button'>
            <v-btn text>
              <span class="mr-2">REGISTRAR</span>
             </v-btn>
          </router-link>
          <router-link :to="'login'" tag='button'>
          <v-btn text>
            <span class="mr-2">ENTRAR</span>
           </v-btn>
          </router-link>
          <span class="mr-2">
            <v-avatar color="indigo">
            <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </span>
    </v-app-bar>

    <v-content>
       <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
