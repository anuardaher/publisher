<template>
    <v-card
    class="mx-auto ma-4"
    max-width="350"
    >
    <v-img
      height="200px"
      :src=value.img
    >
    </v-img>
    <v-card-title>{{ value.title }}</v-card-title>
    <v-card-text>
      <span>{{ value.author }}</span><br>
      <span class="text--primary">
        <span>
          {{ minimizeText(value.text)}}</span>
      </span>
    </v-card-text>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'card',
    props: {
     value: {
       type: Object,
       default: () => ({})
     },
    },
    methods: {
      minimizeText (text) {
        return text ? text.slice(0,50).concat('...') : '';
      }
    }
}
</script>