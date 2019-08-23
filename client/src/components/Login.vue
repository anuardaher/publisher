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
                <v-toolbar-title>LOGIN</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <div class="text-center">
                     <v-btn class="ma-2"
                      tile
                      color="#3b5998"
                      dark>ENTRE COM FACEBOOK
                      </v-btn>

                     <v-btn class="ma-2"
                      tile
                      color="#009de9"
                      dark>ENTRE COM LINKEDIN</v-btn>
                  </div>
                <v-form>
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
                <v-btn color="primary"
                @click="login">OK</v-btn>
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
  props: {
    source: String,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
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
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        this.error = error.response.data ? error.response.data.error : 'Erro Inesperado';
      }
    },
  },
};
</script>
