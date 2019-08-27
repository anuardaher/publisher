<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import EventBus from '../../event-bus.js';

  export default {
    data: () => ({
      snackbar: false,
      text: ' Cadastre-se!',
    }),
    mounted () {
     EventBus.$on('callSnackbar', (text) => {
      this.text = text;
      this.snackbar = !this.snackbar;

    });
  },
  }
</script>