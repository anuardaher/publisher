<template>
  <div>
    <v-avatar :size="size" color="thirdy" class="user-avatar">
      <v-img v-if="img" :src="img" :alt="author.firstname"></v-img>
      <span v-else :class="`primary--text ${letterStyle}`">
        {{ getFirstLetter }}
      </span>
    </v-avatar>
  </div>
</template>

<script>
export default {
  data: () => ({
    BASE_URL: process.env.BASE_URL,
  }),
  props: {
    img: String,
    size: String,
    author: String,
    letterStyle: String,
  },
  computed: {
    getFirstLetter() {
      if (!this.author) return "";
      return this.author.charAt(0).toUpperCase();
    },
  },
};
</script>

<style>
.user-avatar {
  border: 1px solid;
}
</style>
