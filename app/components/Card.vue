<template>
    <v-card
    class="mx-auto"
    max-width="650"
    max-height="100%"
    nuxt
    >
    <v-card-text :class="value.img ? '' : 'mb-n4'" >
      <a @click="$router.push(`/${value.author.username}`)" class="mr-2 float-left">
        <v-avatar 
        size="40px"
        v-if="value.author.img">
          <img
          :src="getImageUrl(value.author.img)"
          :alt="value.author.firstname"
          >
        </v-avatar>
        <v-avatar
        v-if="!value.author.img" 
        color="grey"
        size="40px">
          <span class="white--text headline">{{value.author.name.charAt(0).toUpperCase()}}</span>
        </v-avatar>
      </a>
      <div>
        <a @click="$router.push(`/${value.author.username}`)" class="text--primary font-weight-bold">{{ value.author ? value.author.name : '' }}</a><br>
        <span><timeago :datetime='value.createdAt'></timeago></span>   
      </div>                     
    </v-card-text>
    <a @click="$router.push(`/${value.type}/${value.title.replace(/[ ?]/g,'-' )}/${value._id}`, () => {})">
      <v-img
        height="200px"
        v-if="value.img"
        :src='getImageUrl(value.img)'
      >
      </v-img>
      <v-card-title>{{ value.title }}</v-card-title>
      
      <v-card-text>
        <span class="text--primary my-2" v-text='minimizeText(value.preview)'></span>
      </v-card-text>
    </a>

    <v-card-actions v-on:click.stop>
      <!-- <v-btn class='enable-events' icon @click="thumbsUp">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span v-show="thumbs > 0"> {{thumbs}}</span>
      <v-spacer></v-spacer> -->
      <social-sharing 
      :url="getPostUrl(value)"
      :title="value.title"
      :description="value.subtitle"
      :hashtags="covertTagsToString(value)"
      :quote="value.title"
      twitter-user="ucadvogados"
      inline-template>
      <div class="social-icons-card enable-events">
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
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from '../event-bus.js';

export default {
    name: 'card',
    data: () => {
      return {
        thumbs: 0,
      }
    },
    props: {
     value: {
       type: Object,
       default: () => ({})
     },
    },
    methods: {
      covertTagsToString(article) {
      if (article.tags) {
        const tags = article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, '');
        return formatedTags;
      }
    },
      minimizeText (text) {
        return text ? text.slice(0,150).concat('...') : '';
      },
      // thumbsUp () {
      //   if(this.$store.getters.state){
      //     this.thumbs++;
      //   }
      //   else {
      //     EventBus.$emit('callSnackbar', {
      //      text: `Você precisa estar logado para curtir uma publicação.`,
      //      color: 'warning'
      //     })
      //   }
      // },
      getImageUrl(path) {
        if (!path) return
        if (/https/.test(path))
          return path
        return `${process.env.BASE_URL}/${path}`;
      },
      getPostUrl(post) {
        return `${process.env.BASE_URL}/${post.type}/${post.title.replace(/[ ?]/g,'-' )}/${post._id}`
      },
    },
    computed: {
    }
}
</script>

<style>
.social-icons-card .mdi {
  margin-left: 10px;
  margin-right: 10px;
  color: #0000008a;
}
.v-card__title {
  word-break: normal;
}

</style>