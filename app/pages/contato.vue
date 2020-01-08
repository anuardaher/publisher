<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="6" xl="4"> <ContactForm /> </v-col>
      <v-col cols="12" md="6" xl="3"> <SocialMedia/> </v-col>
    </v-row>
  </div>
</template>

<script>
import ContactForm from '../components/contact/ContactForm'
import SocialMedia from '../components/contact/SocialMedia'

export default {
  components: {
    ContactForm,
    SocialMedia
  }
}
</script>

<style>

</style>