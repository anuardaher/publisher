<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col 
      md="6"
      lg="6"
      sm="12">
        <v-sheet
          tile
          class="pa-10"
          max-width="100%"
          elevation="4"
        >
          <v-row class="mb-1" v-if="tags">
            <v-chip
              v-for="tag in tags"
              :key="tag._id"
              class="ma-1"
            >
              <strong>{{ tag.name  }}</strong>&nbsp;
            </v-chip>
          </v-row>
          <v-row>
            <h1>{{article.title}}</h1>
          </v-row>
          <v-row>
            <span>{{article.subtitle}}</span>
          </v-row>
          <v-row class="mt-2" align="center">
            <v-btn icon @click="thumbsUp">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <span v-show="thumbs > 0"> {{thumbs}}</span>
            <v-spacer></v-spacer>
            <social-sharing 
              :url="getPostUrl"
              :title="article.title"
              :description="article.subtitle"
              :quote="article.subtitle"
              :hashtags="covertTagsToString"
              twitter-user="vuejs"
              inline-template>
              <div>
                <network network="facebook">
                  <span class="">Facebook</span>
                </network>
              </div>
            </social-sharing>
            <v-btn icon class="mx-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </v-row>
          <v-divider class='mb-4'></v-divider>
          <v-row>
            <span>Publicado por <b>{{author}}</b></span>
            <v-spacer></v-spacer>
            <span>{{date}}</span>
          </v-row>
          <v-row class="my-4" align="center" justify="center">
            <v-img
              :src='img'
              :max-width='fontSize'
            >
            </v-img>
          </v-row>
          <v-row class="text-body" v-html="article.text">
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '../event-bus';
import ArticleService from '../services/ArticleService.js';

export default {
  metaInfo() {
    return {
      title: this.article.title,
      meta: [
        { 'property': 'og:title', 'content': this.article.title, 'vmid': 'og:title'},
        { 'property': 'og:description', 'content': this.article.subtile, 'vmid': 'og:description'},
        { 'property': 'og:image', 'content': this.img, 'vmid': 'og:image'},
      ]
    }
  },
  data() {
    return {
      article: '',
      tags: null,
      thumbs: 0,
      author: '',
      img: '',
      date: '',
    }
  },
  methods: {
    thumbsUp() {
      this.thumbs++
    },
    convertDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleString();
    },
    getImageUrl(path) {
        return `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}${path}`;
      },
  },
  computed: {
  fontSize() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return '100%';
      case 'sm': return '80%';
      case 'md': return '70%';
      default: return '60%';
    }
  },
  covertTagsToString() {
    if (this.tags) {
      const tags = this.tags.map((tag) => tag.name);
      const formatedTags = tags.toString().replace(/\s/g, '');
      return formatedTags;
    }
    return '';
  },
  getPostUrl() {
    return `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/publicacao/${this.$route.params.id}`;
  }
},
  async created() {
    try {
      const {data} = await ArticleService.findById(this.$route.params.id);
      this.article = data ? data.attributes : '';
      this.tags = this.article.tags;
      this.author = this.article.author.name;
      this.img = this.getImageUrl(this.article.img);
      this.date = this.convertDate(this.article.createdAt);
      EventBus.$emit('callProgressBar');
    } catch (error) {
      EventBus.$emit('callProgressBar');
      EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar publicação.'
      });
    }
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
}
</script>

<style>
.text-body h1, h2, h3, h4, h5, ul, ol {
  width: 100%;
}
.text-body p {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
