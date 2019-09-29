<template>
  <v-container>
    <v-row >
      <h1 class="display-1 ma-2 mx-auto">NOTÍCIAS</h1>
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
import Card from '../components/Card';
import AppTabs from '../components/AppTabs';
import EventBus from '../event-bus.js';
import utils from '../utils/utils.js';

export default {
  components: {
    Card,
  },
  head() {
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
    async loadData(infinityScroll) {
      const options = {
      data: { type: "noticia", active: true },
      projection: {text: 0},
      options: { 
        limit: 5,
        skip: this.skip,
        sort: {
          createdAt: -1
        }},
    }
    try {
      const notices = await this.$axios.$get('/articles', { params: options })
      if (notices.length == 0) return this.totalOfNotices = true;
       if (infinityScroll) {
        this.notices = this.notices.concat(notices);
      } else  {
        this.notices = notices
      }
      this.skip = this.notices.length;
    } catch (error) {
      return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar artigos. Tente mais tarde.',
      });
      } 
    },
    bottomVisible() {
      if (utils.isTheBottomOfThePage())
      // Se já tiver acabado os posts, não requisita mais
        if (!this.totalOfNotices) {
          this.loadData(true)
        }
    },
  },
  created() {
    this.loadData()
  },
};
</script>
