<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" :color="color" top multi-line>
      {{ text }}
      <v-btn dark text @click="snackbar = false"> Fechar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import EventBus from '../../event-bus.js'

export default {
  data: () => ({
    snackbar: false,
    text: '',
    color: ''
  }),
  mounted() {
    EventBus.$on('callSnackbar', (snackbar) => {
      this.text = snackbar.text
      this.color = snackbar.color
      this.snackbar = !this.snackbar
    })
  }
}
</script>
