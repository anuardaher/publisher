<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class=""
        fluid
      >
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
                  <div class="text-center">
                     <v-btn
                      tile
                      color="#3b5998"
                      dark>
                      <v-icon class="mr-2">mdi-facebook</v-icon>
                      ENTRE COM FACEBOOK
                      </v-btn>
                  </div>
                <v-form v-model='valid'>
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
                @click="login" :disabled='!valid'>Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import AuthenticationService from '../services/AuthenticationService';

export default {
  metaInfo() {
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
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/feed');
      } catch (error) {
        if (!error.response) {
          this.error = 'Erro Inesperado'
        } else {
          this.error = error.response.data ? error.response.data.error : 'Erro Inesperado';
        }
      }
    },
  },
};
</script>
