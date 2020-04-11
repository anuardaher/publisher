<template>
  <div class="ma-1">
    <h3 class="headline">Contato</h3>
    <p class="body-1">Deixe sua mensagem e nos siga nas redes sociais!</p>
    <v-row class="pa-1">
      <v-btn class="mr-2 social" color="#4064ad" rounded dark @click="openTab('https://web.facebook.com/UCAdvogado/')">
        <v-icon class="mr-2">mdi-facebook</v-icon>
        <span class="body-2">2.5K</span>
      </v-btn>
      <v-btn class="mr-2 social" color="#d41a42" rounded dark @click="openTab('https://instagram.com/uc_juris/')">
        <v-icon class="mr-2">mdi-instagram</v-icon>
        <span class="body-2">86K</span>
      </v-btn>
      <v-btn class="mr-2 social" color="#1da1f2" rounded dark @click="openTab('https://twitter.com/uc_advogados')">
        <v-icon class="mr-2">mdi-twitter</v-icon>
        <span class="body-2">5</span>
      </v-btn>
    </v-row>
    <v-row class="pa-1"> 
      <v-btn class="mr-2 social" color="#0271ae" rounded dark @click="openTab('https://www.linkedin.com/in/uc-advogado/')">
        <v-icon class="mr-2">mdi-linkedin</v-icon>
        <span class="body-2">500</span>
      </v-btn>
      <v-btn class="mr-2 social" color="#d62824" rounded dark @click="openTab('https://www.youtube.com/c/UCAdvogados')">
        <v-icon class="mr-2">mdi-youtube</v-icon>
        <span class="body-2">152</span>
      </v-btn>
      <v-btn class="mr-2 social" color="#2ea4d4" rounded dark @click="openTab('https://t.me/ucadvogados')">
        <v-icon class="mr-2">mdi-telegram</v-icon>
        <span class="body-2">1K</span>
      </v-btn>
    </v-row>
    <v-row>
      <v-col class="mb-n2" cols="12" sm="3" md="12">
        <v-icon large>mdi-phone</v-icon>
        <span><b>Telefone</b></span>
        <div>
          <span>(62) 98563-3378</span>
        </div>         
      </v-col>
      <v-col class="mb-n2" cols="12" sm="3" md="12">
        <v-icon large>mdi-cellphone</v-icon>
          <span><b>Whatsapp</b></span>
        <div>
          <span>(62) 98563-3378</span>
        </div>         
      </v-col>
      <v-col class="mb-n2" cols="12" sm="3" md="12">
        <v-icon large>mdi-email</v-icon>
        <span><b>Email</b></span>
        <div>
          <span>advogadosuc@gmail.com</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
methods: {
  openTab(link) {
    window.open(link, '_blank')
  }
}
}
</script>

<style scoped>
.social {
  width: 90px
}
</style>