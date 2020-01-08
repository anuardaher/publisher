<template>
  <v-card class="pa-2" @click="$router.push(`/${lawyer.username}`)">
    <v-row justify="center">
      <UserImage
      :img="lawyer.img"
      size="60"
      :author="lawyer.firstname"
      letterStyle="headline"
      />
    </v-row>
    <v-row justify="center">
       <v-chip class="mt-1" label small>{{ lawyer.profession }}</v-chip>
    </v-row>
    <v-row justify="center">
      <h1 
      class="title mt-3 px-4 text-center"
      v-text='`${lawyer.firstname} ${lawyer.lastname}`'>
      </h1>
    </v-row>
    <v-row justify="center">
      <span class="subtitle-1 text-center">
        <v-icon>mdi-map-marker</v-icon>
        <span v-text="`${lawyer.address.city} – ${lawyer.address.country}`"></span>
      </span>
    </v-row>
  </v-card>
</template>

<script>
import UserImage from '../utils/UserImage'
export default {
  components: {
    UserImage
  },
  props: {
    lawyer: {
      type: Object,
      default: {},
      required: true
    }
  }
}
</script>

<style>

</style>