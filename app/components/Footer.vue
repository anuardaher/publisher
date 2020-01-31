<template>
  <v-footer
      dark
      padless
      class="pa-2"
  >
    <v-card
    flat
    tile
    class="flex primary white--text"
    >
      <v-row justify="center">
        <v-col class="ml-2" cols="12" sm="9" md="3" lg="2" xl="2">
          <span class="headline text-left">Categorias</span>
          <v-row
          class="mt-4"
          v-for="categoria in categorias"
          :key="categoria.name">
            <v-btn text @click="$router.push(categoria.path)">
              <span class="body-1">{{categoria.name}}</span><br/>
            </v-btn>
          </v-row>
          <v-row> 
            <v-col cols='12' md='12' lg="12" xl="10" sm="10">
              <SearchBar class="ml-n2"/> 
            </v-col>
          </v-row>
        </v-col>
        <v-col class="ml-2" cols="12" sm="9" md="4" lg="3" xl="3">
          <span class="headline">Contato</span>
          <ContactForm/>
        </v-col>
        <v-col class="ml-2" cols="12" sm="9" md="4" lg="3" xl="2" >
          <span class="headline">Endereço</span>
          <div class="my-2">
            <span class="body-1">Rua Arco do Triunfo, 29, Setor Village Garavelo, Aparecida de Goiânia – GO, 74968-538</span>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15276.54861217019!2d-49.2525772!3d-16.8195507!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfab9c4c80bf47735!2sUC%20Advogados!5e0!3m2!1spt-BR!2sbr!4v1578084864031!5m2!1spt-BR!2sbr" :width="resizeGoogleMap" height="260" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
        </v-col>
      </v-row>
    <v-card-text class="white--text text-center">
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
      categorias: [
        { name: "Home", path: '/' },
        { name: "Serviços", path: '/servicos' },  
        { name: "Blog", path: '/blog' },
        { name: "Advogados", path: '/advogados' }, 
        { name: "Contato", path: '/contato' }
        ],
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
        case 'xs': return '300'
        case 'sm': return '550'
        case 'md': return '250'
        case 'lg': return '280'
        case 'xl': return '300'
        default: return '350'
      }
      }
    }
  }
</script>

