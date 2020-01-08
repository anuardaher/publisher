<template>
  <v-footer
      dark
      padless
      class="pa-2"
  >
    <v-card
    flat
    tile
    class="flex primary white--text text-center"
    >
      <v-row justify="center">
        <v-col md="4" cols="12" lg="4" sm="10">
          <span class="headline">Categorias</span>
          <v-row
          class="ma-4"
          justify="center"
          v-for="categoria in categorias"
          :key="categoria">
            <v-btn text>
              <span class="body-1">{{categoria}}</span><br/>
            </v-btn>
          </v-row>
          <v-row justify="center"> 
            <v-col cols='12' md='12' lg="10" xl="8" sm="10">
              <SearchBar/> 
            </v-col>
          </v-row>
        </v-col>
        <v-col md="4" cols="12" sm="10">
          <span class="headline">Contato</span>
          <ContactForm/>
        </v-col>
        <v-col md="4" cols="12" lg="4" sm="10">
          <span class="headline">Endereço</span>
          <v-row justify="center">
            <span class="body-1 ma-4">Rua Arco do Triunfo, 29, Setor Village Garavelo, Aparecida de Goiânia – GO, 74968-538</span>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15276.54861217019!2d-49.2525772!3d-16.8195507!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfab9c4c80bf47735!2sUC%20Advogados!5e0!3m2!1spt-BR!2sbr!4v1578084864031!5m2!1spt-BR!2sbr" :width="resizeGoogleMap" height="250" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
          </v-row>
        </v-col>
      </v-row>
    <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>UC Advogados</strong>
    </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  import ContactForm from './contact/ContactForm'
  import SearchBar from './utils/SearchBar'

  export default {
    components: {
      ContactForm,
      SearchBar,
    },
    data: () => ({
      categorias: ["Home", "Serviços", "Blog", "Advogados", "Contato"],
      icons: [
        {
          name: 'mdi-facebook',
          link: 'https://www.facebook.com/UC.advogado/'
        },
         {
          name: 'mdi-twitter',
          link: 'https://twitter.com/UAdvogados'
        },
         {
          name: 'mdi-linkedin',
          link: 'https://www.linkedin.com/in/uc-advogados-73599113b/'
        },
         {
          name:'mdi-instagram',
          link: 'https://www.instagram.com/uc.advogados'
        },
         {
          name:'mdi-youtube',
          link: 'https://www.youtube.com/channel/UCkpbWPMj1mASdIO6B7pfSqw'
        },
      ],
    }),
    methods: {
      openSocialMedia(link) {
        window.open(link, '_blank')
      }
    },
    computed: {
      resizeGoogleMap () {
        switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '320'
        case 'sm': return '650'
        case 'md': return '300'
        case 'lg': return '400'
        case 'xl': return '550'
        default: return '450'
      }
      }
    }
  }
</script>

