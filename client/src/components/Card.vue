<template>
    <v-card
    class="mx-auto disable-events"
    max-width="600"
    hover
    tag='div'
    max-height="100%"
    >
    <div
    class="enable-events"
     @click="$router.push(`/publicacao/${value._id}`, () => {})">
      <v-img
        height="200px"
        v-if="value.img"
        :src='getImageUrl(value.img)'
      >
      </v-img>
      <v-card-title>{{ value.title }}</v-card-title>
    </div>
    <v-card-text>
      <span>{{ value.author.name }} – {{ convertDate(value.createdAt) }}</span><br/>
      <span class="text--primary" v-text='minimizeText(value.subtitle)'></span>
    </v-card-text>
    <v-card-actions>
      <v-btn class='enable-events' icon @click="thumbsUp">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span v-show="thumbs > 0"> {{thumbs}}</span>
      <v-spacer></v-spacer>
      <social-sharing 
      :url="getPostUrl(value._id)"
      :title="value.title"
      :description="value.subtitle"
      :quote="value.subtitle"
      :hashtags="covertTagsToString"
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
        return text ? text.slice(0,60).concat('...') : '';
      },
      thumbsUp () {
        if(this.$store.getters.state){
          this.thumbs++;
        }
        else {
          EventBus.$emit('callSnackbar', {
           text: `Você precisa estar logado para curtir uma publicação.`,
           color: 'warning'
          })
        }
      },
      getImageUrl(path) {
        if (!path) return
        return `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}${path}`;
      },
      convertDate(date) {
        const newDate = new Date(date);
        return newDate.toLocaleString();
      },
      getPostUrl(id) {
        return `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/publicacao/${id}`;
      },
    },
    computed: {
      covertTagsToString() {
        if (this.value.tags) {
          const tags = this.value.tags.map((tag) => tag.name);
          const formatedTags = tags.toString().replace(/\s/g, '');
          return formatedTags;
        }
        return '';
      },
    }
}
</script>

<style>
.disable-events {
  pointer-events: none;
}
.enable-events {
  pointer-events: painted;
}
.social-icons-card .mdi {
  margin-left: 5px;
  margin-right: 5px;
  color: #0000008a;
}
</style>