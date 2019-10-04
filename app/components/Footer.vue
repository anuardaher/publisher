<template>
  <v-footer
      dark
      padless
  >
    <v-card
    flat
    tile
    class="flex primary white--text text-center"
    >
    <v-card-text>
        <v-btn
        v-for="icon in icons"
        :key="icon.name"
        class="mx-4 white--text"
        icon
        @click='openSocialMedia(icon.link)'
        >
        <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
    </v-card-text>

    <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>UC Advogados</strong>
    </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
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
      ],
    }),
    methods: {
      openSocialMedia(link) {
        window.open(link, '_blank')
      }
    }
  }
</script>

