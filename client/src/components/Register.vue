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
                <v-toolbar-title>CADASTRO</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <div class="text-center">
                    <v-btn
                      @click="facebook"
                      tile
                      color="#3b5998"
                      dark>
                      <v-icon class="mr-2">mdi-facebook</v-icon>
                      CADASTRE COM FACEBOOK
                    </v-btn>
                  </div>
                <v-form v-model="valid">
                  <v-text-field
                    label="Nome"
                    v-model="firstname"
                    prepend-icon="person"
                    type="text"
                    required
                    :rules='[rules.required, rules.counter]'
                  ></v-text-field>

                  <v-text-field
                    label="Sobrenome"
                    v-model="lastname"
                    prepend-icon="person"
                    type="text"
                    required
                    :rules='[rules.required, rules.counter]'
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                    required
                    :rules='[rules.required, rules.email]'
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    label="Senha"
                    v-model="password"
                    prepend-icon="lock"
                    :type='show1 ? "text" : "password"'
                    required
                    :rules='[rules.required, rules.passwordLength]'
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    @click:append="show2 = !show2"
                    :type='show2 ? "text" : "password"'
                    label="Confirme sua Senha"
                    v-model="passwordValidation"
                    prepend-icon="lock"
                    required
                    :rules='[rules.required, rules.passwordMatch]'
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
               <span class="ml-3">Já tem conta? 
                  <a @click="$router.push('login', () => {})">Entre!</a>
                </span>
                <v-spacer></v-spacer>
                <v-btn @click="register"
                 :disabled="!valid"
                  color="primary"
                  class="mr-1">Enviar</v-btn>
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
      title: "Cadastre-se",
      meta: []
    }
  },
  data() {
    return {
      valid: true,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordValidation: '',
      error: null,
      show1: false,
      show2: false,
      rules: {
          required: value => !!value || 'Campo Obrigatório',
          counter: value => value.length <= 20 || 'Máximo de 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-mail inválido'
          },
          passwordMatch: value => value == this.password || 'Digite a mesma senha do campo acima',
          passwordLength: value => value.length >= 8 || 'Mínimo de 8 caracteres'
        },
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        console.log(response);
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/feed');
      } catch (error) {
        this.error = error.response.data ? error.response.data.error : 'Erro Inesperado';
      }
    },
    async facebook() {
      try {
        window.location.href = `http://${VUE_APP_SERVER_HOST}/auth/facebook`;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
