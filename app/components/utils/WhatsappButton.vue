<template>
  <v-btn
    @click="goToWhatsapp"
    fixed
    dark
    fab
    bottom
    right
    color="green"
    small
    >
    <v-icon>mdi-whatsapp</v-icon>
  </v-btn>  
</template>

<script>
export default {
    methods: {
        goToWhatsapp() {
            window.open('https://wa.me/556285633378?text=Olá.%20Cheguei%20aqui%20pelo%20UC%20Advogados%20e%20preciso%20de%20orientação%20jurídica')
        }
    }
}
</script>