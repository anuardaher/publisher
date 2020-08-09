<template>
  <v-form v-model="isValid" class="ma-4">
    <v-row>
      <v-text-field v-model="name" :rules="[rules.required, rules.length]" placeholder="Nome"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field v-model="email" :rules="[rules.required, rules.email]" placeholder="E-mail"></v-text-field>
    </v-row>
    <v-row>
      <v-textarea v-model="message" :rules="[rules.required]" placeholder="Mensagem"></v-textarea>
    </v-row>
    <v-row>
      <v-btn @click="sendMessage()" :loading="isLoading" :disabled="!isValid || isLoading" color="primary" block> Enviar </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import EventBus from '../../event-bus'

export default {
  data: () => ({
    name: '',
    email: '',
    message: '',
    isValid: true,
    isLoading: false,
    rules: {
      length: value => value.length > 3 || "Nome deve ter mais de 3 letras.",
      required: value => !!value || '',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
      },
    },
  }),
  methods: {
    async sendMessage() {
      try {
        this.isLoading = true
        await this.$axios.$post('/mail/contact', {
          name: this.name, 
          email: this.email,
          message: this.message
          })
          this.name = ''
          this.email = ''
          this.message = ''
        return EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Mensagem enviada com sucesso. Responderemos em breve!',
        });
      } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro interno do servidor. Tente novamente mais tarde',
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style>

</style>