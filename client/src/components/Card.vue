<template>
    <v-card
    class="mx-auto"
    max-width="350"
    hover
    >
    <v-img
      height="150px"
      :src=value.img
    >
    </v-img>
    <v-card-title>{{ value.title }}</v-card-title>
    <v-card-text>
      <span>{{ value.author }} – {{ value.data }}</span><br/>
      <span class="text--primary">
        <span>
          {{ minimizeText(value.text)}}</span>
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn icon @click="thumbsUp">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span v-show="thumbs > 0"> {{thumbs}}</span>
      <v-spacer></v-spacer>
      <v-chip
      class="ma-2"
      :color="value.tag.color"
      label
      text-color="white"
    >
      <v-icon left>label</v-icon>
      {{value.tag.name}}
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
        return text ? text.slice(0,50).concat('...') : '';
      },
      thumbsUp () {
        if(this.$store.getters.state){
          this.thumbs++;
        }
        else {
          EventBus.$emit(
            'callSnackbar',
            `Você precisa estar logado para curtir uma publicação.`);
        }
      },
    },
}
</script>