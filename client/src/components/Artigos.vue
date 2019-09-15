<template>
  <v-container>
    <v-row >
      <h1 class="display-1 ma-2 mx-auto">ÚLTIMOS ARTIGOS</h1>
    </v-row>
    <v-row
    align="center"
    justify="center"
    v-scroll='bottomVisible'>
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
import EventBus from '../event-bus.js';
import utils from '../utils/utils.js';

export default {
  components: {
    Card,
  },
  metaInfo() {
    return {
      title: "Artigos",
      meta: []
    }
  },
  data: () => ({
    articles: [],
    skip: null,
    totalOfArticles: false
  }),
  methods: {
    async loadData() {
       const options = {
        data: { type: "article", active: true },
        projection: {text: 0},
        options: { 
          limit: 5,
          skip: this.skip,
          sort: {
            createdAt: -1
          }},
      }
    try {
      const { data } = await ArticleService.load(options);
      if (data.length == 0) return this.totalOfArticles = true;
      this.articles = this.articles.concat(data);
      this.skip = this.articles.length;
    } catch (error) {
      return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar artigos. Tente mais tarde.',
      });
    } finally {
         EventBus.$emit('callProgressBar');
    }
    },
     bottomVisible() {
      if (utils.isTheBottomOfThePage())
      // Se já tiver acabado os posts, não requisita mais
        if (!this.totalOfArticles) {
          EventBus.$emit('callProgressBar');
          this.loadData()
        }
    },
  },
  created() {
   this.loadData();
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
};
</script>
