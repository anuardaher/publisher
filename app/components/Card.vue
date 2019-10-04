<template>
    <v-card
    class="mx-auto disable-events"
    max-width="650"
    hover
    max-height="100%"
    active-class="none"
    nuxt
    @click.native="$router.push(`${value.type}/${value.title.replace(/[ ]/g,'-' )}/${value._id}`, () => {})"
    >
    <v-img
      height="200px"
      v-if="value.img"
      :src='getImageUrl(value.img)'
    >
    </v-img>
    <v-card-title>{{ value.title }}</v-card-title>
    
    <v-card-text>
      <span class="subtitle-2">{{ value.author ? value.author.name : '' }} – </span><timeago :datetime='value.createdAt'></timeago><br/>
      <span class="text--primary my-2" v-text='minimizeText(value.preview)'></span>
    </v-card-text>

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
        return `${process.env.BASE_URL}/${path}`;
      },
      getPostUrl(post) {
        return `${process.env.BASE_URL}/${post.type}/${post.title.replace(/[ ]/g,'-' )}/${post._id}`
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
.v-card:focus:not(.v-card--selected):after {
  background: none !important;
}
</style>