<template>
  <div>
    <v-row align="center" justify="center">
      <v-col
      md="8"
      lg="6"
      sm='10'
      xs="12">
        <v-sheet
          tile
          :class="sheetClass"
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
            <span class="subtitle-1">{{article.subtitle}}</span>
          </v-row>
          <v-row class="mt-2" align="center">
            <!-- <v-btn icon @click="thumbsUp">
              <v-icon :color='thumbColor'>mdi-heart</v-icon>
            </v-btn>
            <span v-show="thumbs > 0"> {{thumbs}}</span>
            <v-spacer></v-spacer> -->
            <social-sharing 
              :url="getPostUrl"
              :title="article.title"
              :description="article.subtitle"
              :quote="article.subtitle"
              :hashtags="covertTagsToString"
              twitter-user="ucadvogados"
              inline-template>
              <div class="social-icons">
                <network network="facebook">
                  <button class="mdi mdi-facebook mdi-24px"></button>
                </network>
                 <network network="twitter">
                  <button class="mdi mdi-twitter mdi-24px"></button>
                </network>
                 <network network="linkedin">
                  <button class="mdi mdi-linkedin mdi-24px"></button>
                </network>
              </div>
            </social-sharing>
          </v-row>
          <v-divider class='mb-4'></v-divider>
          <v-row>
            <span>Publicado por <b>{{author}}</b></span>
            <v-spacer></v-spacer>
            <span>{{date}}</span>
          </v-row>
          <v-row class="my-4" align="center" justify="center">
            <v-img
              v-if="img"
              :src='img'
              aspect-ratio="2"
              max-width="100%"
            >
            </v-img>
          </v-row>
          <v-row class="text-body" v-html="article.text">
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
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
        { 'property': 'og:description', 'content': this.article.subtitle, 'vmid': 'og:description'},
        { 'property': 'og:image', 'content': this.getImageUrl(this.img), 'vmid': 'og:image'},
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
      thumbColor: null,
    }
  },
  methods: {
    async getArticle() {
      try {
        const {data} = await ArticleService.findById(this.$route.params.id);
        this.article = data ? data.attributes : '';
        this.tags = this.article.tags;
        this.author = this.article.author.name;
        this.img = this.getImageUrl(this.article.img);
        this.date = this.convertDate(this.article.createdAt);
    } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao carregar publicação.'
        });
      } finally {
        EventBus.$emit('callProgressBar');
      }
    },
    thumbsUp() {
      this.thumbs++
      this.thumbColor = 'red';
    },
    convertDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleString();
    },
    getImageUrl(path) {
      if (!path) return
      return `http://${process.env.VUE_APP_LOCAL_IMAGE_HOST}${path}`;
    },
  },
  computed: {
  covertTagsToString() {
    if (this.tags) {
      const tags = this.tags.map((tag) => tag.name);
      const formatedTags = tags.toString().replace(/\s/g, '');
      return formatedTags;
    }
    return '';
  },
  sheetClass () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 'sheet-mobile'
          case 'sm': return 'sheet-mobile'
          default: return 'sheet'
        }
      },
  getPostUrl() {
    return `http://${process.env.VUE_APP_CLIENT_HOST}/publicacao/${this.$route.params.id}`;
  }
},
  created() {
    this.getArticle();
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
}
</script>

<style>
.sheet {
  padding: 40px 80px 40px 80px;
}
.sheet-mobile {
  padding: 15px 25px 15px 25px;
}
.text-body > h1, h2, h3, h4, h5, ol, ul {
  width: 100%;
}

.text-body p {
  font-size: 18px;
}

.text-body p img {
  max-width: 100%;
  max-height: 700px;
}

.social-icons .mdi {
  margin-left: 7px;
  margin-right: 7px;
  color: #0000008a;
}
</style>
