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
          <v-row class="mb-1" v-if="article.tags">
            <v-chip
              v-for="tag in article.tags"
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
              :url="getPostUrl()"
              :title="article.title"
              :description="article.preview"
              :quote="article.preview"
              :hashtags="covertTagsToString()"
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
            <span>Publicado por <b>{{article.author.name}}</b></span>
            <v-spacer></v-spacer>
            <timeago :datetime='article.createdAt'></timeago>
          </v-row>
          <v-row class="my-4" align="center" justify="center">
            <v-img
              v-if="article.img"
              :src='getImageUrl(article.img)'
              aspect-ratio="2"
              :max-width="coverImageSize"
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
import EventBus from '../../../event-bus';

export default {
  scrollToTop: true,
  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: this.article.preview },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: this.getPostUrl()},
        { hid: 'og:title', property: 'og:title', content: this.article.title},
        { hid: 'og:description', property: 'og:description', content: this.article.preview},
        { hid: 'og:site_name', property: 'og:site_name', content: 'UC Advogados'},
        { hid: 'og:image', property: 'og:image', content: this.getImageUrl(this.article.img) },
        { hid: 'og:image:secure_url', property: 'og:image', content: this.getImageUrl(this.article.img) },
        { hid: 'og:image:width', property: 'og:image:width', content: '400' },
        { hid: 'og:image:height', property: 'og:image:height', content: '300' },
        { hid: 'article:author', property: 'article:author', content: this.article.author.name },
        { hid: 'article:section' ,property: 'article:section', content: this.article.type},
        { hid: 'article:tag', property: 'article:tag', content: this.covertTagsToString()},
        { hid: 'article:published', property: 'article:published_time', content: this.article.createdAt},
      ]
    }
  },
  data() {
    return {
      article: { author: {} },
      thumbs: 0,
      thumbColor: null,
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const article = await $axios.$get(`/articles/${params.id}`);
      return { article: article.attributes }
  } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  methods: {
    getImageUrl() {
      if (!this.article.img) return ''
      return `${process.env.BASE_URL}/${this.article.img}`
    },
    covertTagsToString() {
      if (this.article.tags) {
        const tags = this.article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, '');
        return formatedTags;
      }
    },
    getPostUrl() {
      return `${process.env.BASE_URL}/${this.$route.params.type}/${this.$route.params.title}/${this.$route.params.id}`;
    }
  },
  computed: {
    sheetClass () { 
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'sheet-mobile'
        case 'sm': return 'sheet-mobile'
        default: return 'sheet'
    }
  },
    coverImageSize () {
       switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '100%'
        case 'sm': return '100%'
        default: return '80%'
    }
    }
},
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
