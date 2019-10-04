<template>
  <v-tabs
    fixed-tabs
    centered
    class="d-sm-none"
  >
    <v-tab
    @click="$router.push('/artigos', () => {})">
      Artigos
    </v-tab>
    <v-tab
    @click="$router.push('/noticias', () => {})">
      Notícias
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
    data: () => ({
    }),
    computed: {
    }
}
</script>
