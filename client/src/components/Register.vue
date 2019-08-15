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
            cols="12"
            sm="8"
            md="4"
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
                    <v-btn class="ma-2"
                      tile
                      color="#3b5998"
                      dark>CADASTRE-SE COM FACEBOOK
                    </v-btn>

                    <v-btn class="ma-2"
                      tile
                      color="#009de9"
                      dark>CADASTRE-SE COM LINKEDIN
                    </v-btn>
                  </div>
                <v-form>
                  <v-text-field
                    label="Nome"
                    v-model="firstname"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Sobrenome"
                    v-model="lastname"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                    label="Senha"
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    label="Confirme sua Senha"
                    v-model="passwordValidation"
                    prepend-icon="lock"
                    type="password"
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
                <v-spacer></v-spacer>
                <v-btn @click="register" color="primary">OK</v-btn>
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
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordValidation: '',
      error: null,
    };
  },
  methods: {
    async register() {
      debugger;
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
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data ? error.response.data.error : 'Erro Inesperado';
      }
    },
  },
};
</script>
