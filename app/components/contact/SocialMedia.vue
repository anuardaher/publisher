<template>
  <div>
    <h3 class="headline text-center">Contato</h3>
    <p class="body-1 text-center">Deixe sua mensagem e nos siga nas redes sociais!</p>
    <v-row class="pa-1" justify="center">
      <v-btn class="mr-2" color="#4064ad" rounded dark @click="openTab('https://web.facebook.com/UCAdvogado/')">
        <v-icon class="mr-2">mdi-facebook-box</v-icon>
        <span>2.5K</span>
      </v-btn>
      <v-btn class="mr-2" color="#d41a42" rounded dark @click="openTab('https://www.instagram.com/uc.advogados/')">
        <v-icon class="mr-2">mdi-instagram</v-icon>
        <span>86K</span>
      </v-btn>
      <v-btn class="mr-2" color="#1da1f2" rounded dark @click="openTab('https://twitter.com/UAdvogados')">
        <v-icon class="mr-2">mdi-twitter</v-icon>
        <span>5</span>
      </v-btn>
    </v-row>
    <v-row class="pa-1" justify="center"> 
      <v-btn class="mr-2" color="#0271ae" rounded dark @click="openTab('https://www.linkedin.com/in/uc-advogado/')">
        <v-icon class="mr-2">mdi-linkedin-box</v-icon>
        <span>500</span>
      </v-btn>
      <v-btn class="mr-2" color="#d62824" rounded dark @click="openTab('https://www.youtube.com/c/UCAdvogados')">
        <v-icon class="mr-2">mdi-youtube</v-icon>
        <span>152</span>
      </v-btn>
      <v-btn class="mr-2" color="#2ea4d4" rounded dark @click="openTab('https://t.me/ucadvogados')">
        <v-icon class="mr-2">mdi-telegram</v-icon>
        <span>1K</span>
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col class="mt-2 mx-auto" cols="12" sm="5" md="8">
        <div class="float-left ma-2">
          <v-icon large>mdi-phone</v-icon>
        </div>
        <div>
          <span><b>Telefone</b></span><br/>
          <span>(62) 3238-5687</span>
        </div>         
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="mt-2" cols="12" sm="5" md="8">
        <div class="float-left ma-2">
          <v-icon large class="float-left">mdi-cellphone</v-icon>
        </div>
        <div>
          <span><b>Whatsapp</b></span><br/>
          <span>(62) 98563-3378</span>
        </div>         
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="mt-2" cols="12" sm="5" md="8">
        <div class="float-left ma-2">
          <v-icon large class="float-left">mdi-email</v-icon>
        </div>
        <div>
          <span><b>Email</b></span><br/>
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

<style>

</style>