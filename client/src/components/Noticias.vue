<template>
  <v-container>
    <v-row >
      <h1 class="display-1 ma-2 mx-auto">ÚLTIMAS NOTÍCIAS</h1>
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
import EventBus from '../event-bus.js';
import utils from '../utils/utils.js';

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
    skip: null,
    totalOfNotices: false
  }),
  methods: {
    async loadData() {
       const options = {
        data: { type: "notice", active: true },
        projection: {text: 0},
        options: { 
          limit: 5,
          sort: {
            createdAt: -1
          }},
      }
    try {
      const { data } = await ArticleService.load(options);
      if (data.length == 0) return this.totalOfNotices = true;
      this.notices = this.notices.push(data);
      this.skip = this.notices.length;
    } catch (error) {
      return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar notícias. Tente mais tarde.',
      });
    } finally {
        EventBus.$emit('callProgressBar');
    }
    },
    bottomVisible() {
      if (utils.isTheBottomOfThePage())
      // Se já tiver acabado os posts, não requisita mais
        if (!this.totalOfNotices) {
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
