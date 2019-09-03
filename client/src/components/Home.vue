<template>
  <v-container>
    <v-row >
      <h1 class="ma-2 mx-auto">PRINCIPAIS ARTIGOS</h1>
    </v-row>
    <v-row
    align="center"
    justify="center">
      <v-col
      cols="12"
      v-for="article in articles"
      :key="article.id">
       <Card
        :value="article.attributes"
        />
      </v-col>
    </v-row>
     <v-row>
      <h1 class="ma-4 mx-auto">ÚLTIMAS NOTÍCIAS</h1>
    </v-row>
     <v-row
      align="center"
      justify="center">
      <v-col
      cols="12">
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
        data: { type: "article", active: true },
        projection: { "text": 0}
      }
    try {
      const {data} = await ArticleService.load(options);
      this.articles = data ? data : [];
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
