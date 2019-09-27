<template>
    <v-card
    class="mx-auto disable-events"
    max-width="600"
    hover
    tag='div'
    max-height="100%"
    nuxt
    @click="$router.push(`${value.type}/${value.title.replace(/[ ]/g,'-' )}/${value._id}`, () => {})"
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
      :url="getPostUrl(value._id)"
      :title="value.title"
      :description="value.subtitle"
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
      getPostUrl(id) {
        return `${process.env.BASE_URL}/publicacao/${id}`;
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
</style>