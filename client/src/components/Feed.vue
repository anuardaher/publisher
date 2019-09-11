<template>
  <v-container>
    <v-row >
      <h1 class="ma-2 mx-auto">FEED</h1>
    </v-row>
    <v-row
    align="center"
    justify="center">
      <v-col
      xl="10"
      lg="9"
      md="8"
      sm='7'
      cols="12"
      v-for="article in articles"
      :key="article.id">
       <Card
        :value="article.attributes"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from './Card.vue';
import AppTabs from './AppTabs.vue';
import ArticleService from '../services/ArticleService.js';
import EventBus from '../event-bus.js'

export default {
  components: {
    Card,
  },
  metaInfo() {
    return {
      title: "Home",
      meta: []
    }
  },
  data: () => ({
    articles: [],
  }),
  async created () {
    const options = {
        data: { active: true },
        projection: { text: 0},
        options: { 
          limit: 5,
          sort: {
            createdAt: -1
          }},
      }
    try {
      const articles = await ArticleService.load(options);
      this.articles = articles ? articles.data : [];
      EventBus.$emit('callProgressBar');
    } catch (error) {
      EventBus.$emit('callProgressBar');
      EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar publicações. Tente mais tarde.',
      });
    };
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
};
</script>
