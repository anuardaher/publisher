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
            window.open('https://wa.me/556285633378?text=Olá,%20quero%20entrar%20com%20uma%20ação%20judicial,%20preciso%20de%20um%20advogado')
        }
    }
}
</script>