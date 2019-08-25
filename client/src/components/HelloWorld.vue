<template>
  <v-container fluid >
    <v-row >
      <h1 class="ma-4 mx-auto">ARTIGOS</h1>
    </v-row>
    <v-row>
       <Card
        v-for="article in articles"
        :key="article.title"
        :value="article"/>
    </v-row>
    <v-divider></v-divider>
     <v-row>
      <h1 class="ma-4 mx-auto">NOTÍCIAS</h1>
    </v-row>
     <v-row>
       <!--Noticias-->
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
      title: 'Como surgiu o Universo?',
      author: 'João de Deus',
      data: '02/05/2017',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`
    }, {
      title: 'Programando em Javascript',
      author: 'Anuar Daher',
      data: '15/01/2015',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`,
      img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
    },
    {
      title: 'VueJS: Maravilhoso Framework Front-end',
      author: 'Lucas de Assis',
      data: '01/12/2014',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`
    },
    {
      title: 'UC Advogados: Vai Vingar?',
      author: 'Uelton Costa',
      data: '02/05/2019',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Proin vulputate vitae elit et elementum. Integer varius porta nibh,
        at hendrerit lacus pulvinar at.`
    }],
  }),
};
</script>
