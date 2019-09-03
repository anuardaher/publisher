<template>
    <v-card
    class="mx-auto"
    max-width="600"
    hover
    @click="$router.push(`/publicacao/${value._id}`, () => {})"
    >
    <v-img
      height="200px"
      :src='getImageUrl(value.img)'
    >
    </v-img>
    <v-card-title>{{ value.title }}</v-card-title>
    <v-card-text>
      <span>{{ value.author.name }} – {{ convertDate(value.createdAt) }}</span><br/>
      <span class="text--primary" v-text='minimizeText(value.subtitle)'></span>
    </v-card-text>
    <v-card-actions>
      <v-btn icon @click="thumbsUp">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span v-show="thumbs > 0"> {{thumbs}}</span>
      <v-spacer></v-spacer>
      <v-chip
      class="ma-2"
      label
      small
      >
      <v-icon left>mdi-label</v-icon>
      {{value.tags[0].name}}
    </v-chip>
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
        return `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}${path}`;
      },
      convertDate(date) {
        const newDate = new Date(date);
        return newDate.toLocaleString();
      }
    },
}
</script>