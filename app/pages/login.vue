<template>
      <div>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            xs="12"
            md="6"
            lg="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>LOGIN</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <div class="text-center mb-4">
                     <v-btn
                      tile
                      color="#3b5998"
                      dark
                      @click="facebook">
                      <v-icon class="mr-2">mdi-facebook</v-icon>
                      ENTRE COM FACEBOOK
                      </v-btn>
                  </div>
                <v-form 
                v-model='valid' 
                @keyup.native.enter="valid && login">
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                    :rules='[rules.required, rules.email]'
                  ></v-text-field>

                  <v-text-field
                    label="Senha"
                    v-model="password"
                    prepend-icon="lock"
                    :rules='[rules.required]'
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    @click:append="show = !show"
                    :type='show ? "text" : "password"'
                    @keyup.enter="login"
                  ></v-text-field>
                   <div class="text-center">
                    <v-alert
                      dense
                      outlined
                      type="error"
                      v-html="error"
                      v-if="error"
                    >
                    </v-alert>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span class="ml-3">Não tem uma conta? 
                  <a @click="$router.push('registrar', () => {})">Registre-se!</a>
                </span>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                @click="login" 
                :disabled='!valid'
                type='submit'>Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
</template>

<script>
import EventBus from '../event-bus.js';

export default {
  head() {
    return {
      title: "Login",
      meta: []
    }
  },
  props: {
    source: String,
  },
  data() {
    return {
      show: false,
      valid: true,
      email: '',
      password: '',
      error: null,
      rules: {
          required: value => !!value || 'Campo Obrigatório',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-mail inválido'
          },
        },
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.$post('/auth/login', {
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.token);
        this.$store.dispatch('setUser', response.user);
        this.$router.push('/');
      } catch (error) {         
          if (!error.response) {
            return this.error = 'Erro Inesperado'
          } 
            return this.error = error.response.data ? error.response.data.error : 'Erro Inesperado';
        }
      },
    facebook() {
      window.location.href = `${process.env.BASE_URL}/api/v1/auth/facebook`;
     },
    },
  };
</script>
