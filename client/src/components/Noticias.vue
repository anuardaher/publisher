<template>
  <v-container>
    <v-row >
      <h1 class="ma-2 mx-auto">ÚLTIMAS NOTÍCIAS</h1>
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
      v-for="notice in notices"
      :key="notice.id">
       <Card
        :value="notice.attributes"
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
      title: "Notícias",
      meta: []
    }
  },
  data: () => ({
    notices: [],
  }),
  methods: {
    async loadData() {
       const options = {
        data: { type: "notice", active: true },
        projection: { text: 0},
        options: { 
          limit: 5,
          sort: {
            createdAt: -1
          }},
      }
    try {
      const notices = await ArticleService.load(options);
      this.notices = notices ? notices.data : [];
      EventBus.$emit('callProgressBar');
    } catch (error) {
      EventBus.$emit('callProgressBar');
      EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar notícias. Tente mais tarde.',
      });
    };
    }
  },
  created() {
   this.loadData();
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
};
</script>
