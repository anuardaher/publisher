<template>
  <v-container>
    <v-row >
      <h1 class="display-1 ma-2 mx-auto">FEED</h1>
    </v-row>
    <v-row
    align="center"
    justify="center"
    v-scroll="bottomVisible">
      <v-col
      xl="10"
      lg="9"
      md="8"
      sm='7'
      cols="12"
      v-for="post in posts"
      :key="post.id">
       <Card
        :value="post.attributes"
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
import utils from '../utils/utils.js';

export default {
  components: {
    Card,
  },
  metaInfo() {
    return {
      title: "Feed",
      meta: []
    }
  },
  data: () => ({
    posts: [],
    skip: null,
    totalOfPosts: false,
  }),
  methods: {
    async loadFeed() {
      const options = {
        data: { active: true },
        projection: { text: 0},
        options: { 
          limit: 5,
          skip: this.skip,
          sort: {
            createdAt: -1
          }},
      }
      try {
        const { data } = await ArticleService.load(options);
        if (data.length == 0) return this.totalOfPosts = true;
        this.posts = this.posts.concat(data);
        this.skip = this.posts.length;
      } catch (error) {
          return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Erro ao carregar publicações. Tente mais tarde.',
          });
      } finally {
          EventBus.$emit('callProgressBar');
      }
    },
    bottomVisible() {
      if (utils.isTheBottomOfThePage())
      // Se já tiver acabado os posts, não requisita mais
        if (!this.totalOfPosts) {
          EventBus.$emit('callProgressBar');
          this.loadFeed()
        }
    },
  },
  created () {
    this.loadFeed({page: 0})
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
};
</script>
