<template>
  <v-card>
    <v-footer color="thirdy" padless>
      <v-card flat tile width="100%" class="thirdy text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.name"
            class="mx-4"
            icon
            @click="openTab(icon.link)"
          >
            <v-icon :color="icon.color" size="24px">{{ icon.name }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} —
          <a class="text-decoration-none" href="https://anuardaher.com"
            ><strong>Anuar Daher</strong></a
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        name: 'mdi-github',
        link: 'https://github.com/anuardaher',
        color: 'black'
      },
      {
        name: 'mdi-telegram',
        link: 'https://t.me/anuardaher',
        color: 'light-blue'
      },
      {
        name: 'mdi-linkedin',
        link: 'https://www.linkedin.com/in/anuar-daher-015691104/',
        color: '#0077b5'
      }
    ]
  }),
  methods: {
    openTab(link) {
      window.open(link, '_blank')
    }
  }
}
</script>
