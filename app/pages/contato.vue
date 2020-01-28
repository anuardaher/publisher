<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="10" lg="8" xl="6">
        <v-row justify="center">
          <v-col cols="12" md="6"> <ContactForm /> </v-col>
          <v-col cols="12" md="6"> <SocialMedia/> </v-col>
        </v-row>
      </v-col>
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