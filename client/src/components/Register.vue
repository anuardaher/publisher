<template>
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
            sm='8'
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
                <v-form v-model="valid" autocomplete="off">
                  <v-row class="mb-n4">
                    <v-col :class='firstnameColSize' cols='12' md='6'>
                      <v-text-field
                        label="Nome"
                        v-model="firstname"
                        prepend-icon="person"
                        type="text"
                        required
                        :rules='[rules.required, rules.counter]'
                      ></v-text-field>
                    </v-col>
                    <v-col cols='12' md='6 ' :class='lastnameColSize'>
                      <v-text-field
                        label="Sobrenome"
                        v-model="lastname"
                        prepend-icon="person"
                        type="text"
                        required
                        :rules='[rules.required, rules.counter]'
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                    required
                    :rules='[rules.required, rules.email]'
                  ></v-text-field>
                  <v-select
                  label="Profissão"
                  v-model="profession"
                  :items='jobs'
                  prepend-icon="mdi-briefcase"
                  required
                  :rules='[rules.required]'
                  ></v-select>
                  <v-row class="my-n4">
                    <v-col :class='firstnameColSize' cols='12' md='4'>
                      <v-autocomplete
                        :items='contrys'
                        item-text='sigla'
                        return-object
                        label="Estado"
                        v-model="address.contry"
                        prepend-icon="mdi-city"                                             
                        @change="getCityData"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols='12' md='8 ' :class='lastnameColSize'>
                      <v-autocomplete
                        label="Cidade"
                        v-model="address.city"
                        :items='citys'
                        item-text='nome'
                        return-object
                        :loading='cityLoading'
                        prepend-icon="mdi-city"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-text-field
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    label="Senha"
                    v-model="password"
                    prepend-icon="lock"
                    :type='show1 ? "text" : "password"'
                    required
                    :rules='[rules.required, rules.passwordLength]'
                    browser-autocomplete="new-password"
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
                    browser-autocomplete="new-password"
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
</template>

<script>

import AuthenticationService from '../services/AuthenticationService';
import Api from '../services/Api.js';
import EventBus from '../event-bus.js'

export default {
  metaInfo() {
    return {
      title: "Cadastre-se",
      meta: []
    }
  },
  data() {
    return {
      jobs: ['Advogado', 'Bacharel em Direito', 'Estudante de Direito', 'Administrador',
      'Contador', 'Assistente Administrativo', 'Representante Comercial',
      'Engenheiro Civil', 'Corretor de Imóveis', 'Procurador e Advogado Público',
      'Político', 'Outros'],
      valid: true,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      profession: '',
      address: {},
      passwordValidation: '',
      contrys: [],
      citys: [],
      error: null,
      show1: false,
      show2: false,
      cityLoading: false,
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
        EventBus.$emit('callProgressBar');
        const response = await AuthenticationService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          profession: this.profession,
          // address: {
          //   country: this.address.sigla,
          //   city: this.address.nome
          // },
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/feed');
        return EventBus.$emit('callProgressBar');
      } catch (error) {
          EventBus.$emit('callProgressBar');
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
    async getContryData() {
      try {
        const { data } = await Api().get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        this.contrys = data ? data : [];
      } catch (error) {
        console.log(error);
      }
    },
    async getCityData() {
      this.cityLoading = true;
      if (!this.address.contry) return
      const id = this.address.contry.id;
      try {
        const { data } = await Api().get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
        this.citys = data ? data : [];
        this.cityLoading = false;
      } catch (error) {
          this.cityLoading = false;
      }
    },
  },
  computed: {
    firstnameColSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'pb-0'
        case 'sm': return 'pb-0'
        default: return ''
      }
    },
    lastnameColSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'pt-0'
        case 'sm': return 'pt-0'
        default: return ''
      }
    },
  },
  created() {
    this.getContryData();
  }
};
</script>
