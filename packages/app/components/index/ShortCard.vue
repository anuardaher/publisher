<template>
  <v-card
  class="mx-auto"
  max-width="344"
  min-height="250"
  @click.native="$router.push(normalizeLink(article))"
  >
    <v-img
      :src="getImageUrl(article.img)"
      height="120"
    ></v-img>
    <v-card-title>
      <span class="body-1"><b>{{ minimizeText(article.title) }}</b></span>
    </v-card-title>
    <span class="date ml-4 subtitle-1"><timeago :datetime='article.createdAt'></timeago></span> 
  </v-card>
</template>

<script>
import Utils from '../../utils/utils.js'

export default {
  props: {
    article: Object
  },
  methods: {
     minimizeText (text) {
        return text.length > 80 ? text.slice(0,80).concat('...') : text;
      },
      getImageUrl(path) {
        if (!path) return '/publisher.jpg'
        if (/https/.test(path))
          return path
        return `${process.env.BASE_URL}/${path}`;
      },
      normalizeLink(post) {
        return Utils.normalizeLink(post)
      }
  }
}
</script>

<style scoped>

</style>