<template>
<NuxtLink to="/publicar">
  <v-btn
    fixed
    dark
    fab
    bottom
    right
    color="primary"
    :small="isMobile"
    >
    <v-icon :large="!isMobile">mdi-square-edit-outline</v-icon>
  </v-btn>
</NuxtLink>
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