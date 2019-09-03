<template>
  <v-tabs
    fixed-tabs
    centered
    class="d-sm-none"
  >
    <v-tab 
    @click="$router.push('/', () => {})"
    class="ml-n2">
      {{getHomeButton}}
    </v-tab>
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
        getHomeButton () {
            if (this.$store.getters.state) {
                return 'Feed'
            }
            return 'Home'
        }
    }
}
</script>
