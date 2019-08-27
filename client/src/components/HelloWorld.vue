<template>
  <v-container fluid >
    <v-row >
      <h1 class="ma-4 mx-auto">PRINCIPAIS ARTIGOS</h1>
    </v-row>
    <v-row
    align="center"
    justify="center">
      <v-col
      xs="12"
      sm="12"
      md="3"
      v-for="article in articles"
      :key="article.title">
       <Card
        :value="article"/>
      </v-col>
    </v-row>
     <v-row>
      <h1 class="ma-4 mx-auto">ÚLTIMAS NOTÍCIAS</h1>
    </v-row>
     <v-row
      align="center"
      justify="center">
      <v-col
      xs="12"
      sm="12"
      md="3"
      v-for="article in articles"
      :key="article.title">
       <Card
        :value="article"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  data: () => ({
    articles: [{
      title: 'Programando em Javascript',
      author: 'Anuar Daher',
      data: '15/01/2015',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`,
      img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      tag: {
        name:'Back-end',
        color: "blue",
        },
    },
    {
      title: 'VueJS: Framework Front-end',
      author: 'Lucas de Assis',
      data: '01/12/2014',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`,
      img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
      tag: {
        name:'Front-end',
        color: "red",
        },
    },
    {
      title: 'UC Advogados: Vai Vingar?',
      author: 'Uelton Costa',
      data: '02/05/2019',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`,
      img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
      tag: {
        name:'Advocacia',
        color: "green",
        },
    }],
  }),
  computed: {
  }
};
</script>
