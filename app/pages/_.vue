<template>
  <v-container>
    <v-row>
      <h1 class="display-3 ma-2 mx-auto">Página não encontrada</h1>
    </v-row>
     <v-row>
      <h1 class="display-3 ma-2 mx-auto">😥</h1>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData ({ redirect }) {
    return redirect('/artigos')
  }
}
</script>