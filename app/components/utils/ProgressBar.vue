<template>
  <v-progress-linear
  :active="loading"
  :indeterminate="loading"
  absolute
  bottom
  color="blue accent-4"
  ></v-progress-linear>
</template>

<script>
import EventBus from '../../event-bus.js';

export default {
  data: () => ({
      loading: false,
  }),
  mounted() {
    EventBus.$on('callProgressBar', () => {
      this.loading = !this.loading;
    });
  },
}
</script>