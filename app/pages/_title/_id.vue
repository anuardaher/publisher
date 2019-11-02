<template>
  <div class="article">
    <v-row align="center" justify="center">
      <v-col
      md="8"
      lg="6"
      sm='11'
      xs="12">
        <v-sheet
          tile
          :class="sheetClass"
          max-width="100%"
          elevation="4"
        >
          <v-row class="mb-1" v-if="article.tags">
            <v-chip
              small
              v-for="tag in article.tags"
              :key="tag._id"
              class="ma-1"
            >
              <strong>{{ tag.name  }}</strong>&nbsp;
            </v-chip>
          </v-row>
          <v-row>
            <h1 class="my-2 display-1">{{article.title}}</h1>
          </v-row>
          <v-row>
            <span class="my-2 body-1">{{article.subtitle}}</span>
          </v-row>
          <client-only>
            <v-row align="center" justify="center" class="mt-2">
              <LikeButton :article="article"/>
              <CommentButton :article="article"/>
              <ShareButton :article="article" />
            </v-row>
          </client-only>
          <v-divider class='mb-4'></v-divider>
          <v-row>
            <div class="mr-2 float-left">
              <v-avatar
              size="44px"
              v-if="article.author.img">
                <v-img
                :src="imageUrl(article.author.img)"
                :alt="article.author.firstname"
                ></v-img>
              </v-avatar>
              <v-avatar
              v-if="!article.author.img" 
              color="grey"
              size="44px">
                <span class="white--text headline">{{article.author.firstname.charAt(0).toUpperCase()}}</span>
              </v-avatar>              
            </div>
            <div>  
              <a 
              @click="$router.push(`/${article.author.username}`)" 
              class="text--primary font-weight-bold">
              {{ `${this.article.author.firstname} ${this.article.author.lastname}`}}
              </a><br/>
              <span><timeago :datetime='article.createdAt'></timeago></span>
            </div>                          
          </v-row>
          <v-row class="my-4" align="center" justify="center">
            <v-img
              v-if="article.img"
              :src='imageUrl(article.img)'
              aspect-ratio="1.5"
              :max-width="coverImageSize"
            >
            </v-img>
          </v-row>
          <v-row class="text-body" v-html="article.text"></v-row>
          <client-only>
            <v-row align="center" justify="center" class="my-2">
              <LikeButton :article="article"/>
              <ShareButton :article="article" />
            </v-row>
          </client-only>
          <client-only>
            <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" data-width='100%' src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v5.0&appId=365056554418853&autoLogAppEvents=1"></script>                     
            <v-row id="facebook-comments" align="center" justify="center">
              <div class="fb-comments" :data-href="BASE_URL + $route.path"  data-numposts="5"></div>
            </v-row>
          </client-only>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EventBus from '../../event-bus';
import LikeButton from '../../components/posts/LikeButton'
import ShareButton from '../../components/posts/Sharebutton.vue'
import CommentButton from '../../components/posts/CommentsButton'

export default {
  components: {
    LikeButton,
    ShareButton,
    CommentButton,
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: this.article.preview },
        { hid: 'author', name: 'author', content: `${this.article.author.firstname} ${this.article.author.lastname}` },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: this.postUrl},
        { hid: 'og:title', property: 'og:title', content: this.article.title},
        { hid: 'og:description', property: 'og:description', content: this.article.preview},
        { hid: 'og:site_name', property: 'og:site_name', content: 'UC Advogados'},
        { hid: 'og:image', property: 'og:image', content: this.imageUrl(this.article.img) },
        { hid: 'og:image:secure_url', property: 'og:image', content: this.imageUrl(this.article.img) },
        { hid: 'og:image:width', property: 'og:image:width', content: '400' },
        { hid: 'og:image:height', property: 'og:image:height', content: '300' },
        { hid: 'article:author', property: 'article:author', content: `${this.article.author.firstname} ${this.article.author.lastname}` },
        { hid: 'article:section' ,property: 'article:section', content: this.article.type},
        { hid: 'article:tag', property: 'article:tag', content: this.covertTagsToString },
        { hid: 'article:published', property: 'article:published_time', content: this.article.createdAt},
        { hid: 'twitter:card', name: 'twitter:card', value: 'summary' },
        { hid: 'twitter:site' ,name: 'twitter:site', content: '@ucadvogados' },
        { hid: 'twitter:title', name: 'article:tag', content: this.article.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.article.preview},
        { hid: 'twitter:image', name: 'twitter:image', content: this.imageUrl(this.article.img) },
      ]
    }
  },
  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      article: { author: { name: ''} },
      thumbs: 0,
      thumbColor: null,
    }
  },
  async asyncData({ $axios, params, redirect }) {
    try {
      const article = await $axios.$post(`/articles/post/${params.id}`);
      article.author = await $axios.$post(`/users/post/${article.author.id}`)
      return article ? { article } : redirect('/notfound')
  } catch (e) {
      console.error(e.message)
      redirect('/notfound')
    }
  },
  methods: {
     imageUrl (path) {
      if (!path) return
      if (/https/.test(path))
        return path
      return `${this.BASE_URL}/${path}`
    },
     initCreationFacebookComments(){
      FB.XFBML.parse() // Refres comments the XFBML
    },
  },
  computed: {
    covertTagsToString() {
      if (this.article.tags) {
        const tags = this.article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, '');
        return formatedTags;
      }
    },
    postUrl () {
      return  `${this.BASE_URL}/${this.$route.params.title}/${this.$route.params.id}`
    },
    sheetClass () { 
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'sheet-mobile'
        default: return 'sheet'
    }
  },
    coverImageSize () {
       switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '100%'
        case 'sm': return '100%'
        default: return '80%'
      }
    },
  },
  mounted () {
    window.fbAsyncInit = function() { FB.init({ appId: '365056554418853', cookie: true, xfbml: true, version: 'v5.0' }) };
    setTimeout(() => this.initCreationFacebookComments(), 1000);
    if (this.$route.hash) {
      setTimeout(() => location.href = this.$route.hash, 2000)
    }
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
@media only screen and (max-width: 600px) {
.text-body p {
  font-size: 18px !important;
}
}
.text-body p {
  font-size: 21px;
  word-break: break-word;
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
