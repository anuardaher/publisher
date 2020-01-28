<template>
  <client-only>
    <v-btn
      class="publish"
      @click="$router.push('/publicar')"
      fixed
      dark
      fab
      right
      color="primary"
      :small="isMobile"
      v-if="isMobile"
      >
      🚀
    </v-btn>
  </client-only>
</template>

<script>
export default {
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint.smAndDown
      }
    }
}
</script>

<style>
.publish {
  bottom: 65px;
}
</style>