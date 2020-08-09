<template>
  <div>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" md="6" lg="6" xl="5">
        <v-card class="elevation-12">
          <v-form v-model="valid" autocomplete="off">
            <v-toolbar color="secondary" dark flat>
              <v-toolbar-title>CADASTRO</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <div class="text-center">
                <v-btn @click="facebook" rounded color="#3b5998" dark>
                  <v-icon class="mr-2">mdi-facebook</v-icon>
                  CADASTRE COM FACEBOOK
                </v-btn>
              </div>
              <v-row class="mb-n4">
                <v-col :class="firstnameColSize" cols="12" md="6">
                  <v-text-field
                    label="Nome"
                    v-model="firstname"
                    prepend-icon="person"
                    type="text"
                    required
                    :rules="[rules.required, rules.counter]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6 " :class="lastnameColSize">
                  <v-text-field
                    label="Sobrenome"
                    v-model="lastname"
                    prepend-icon="person"
                    type="text"
                    required
                    :rules="[rules.required, rules.counter]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-n4">
                <v-col cols="12" md="6">
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                    required
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Ocupação"
                    v-model="profession"
                    :items="jobs"
                    prepend-icon="mdi-briefcase"
                    required
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="mb-n4">
                <v-col :class="firstnameColSize" cols="12" md="4">
                  <v-autocomplete
                    :items="countrys"
                    item-text="sigla"
                    item-value="sigla"
                    label="Estado"
                    v-model="address.country"
                    prepend-icon="mdi-city"
                    @change="getLocationData(address.country)"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="8 " :class="lastnameColSize">
                  <v-autocomplete
                    label="Cidade"
                    v-model="address.city"
                    :items="citys"
                    item-text="nome"
                    item-value="nome"
                    :loading="cityLoading"
                    prepend-icon="mdi-city"
                    :rules="[rules.required]"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row class="mb-n4">
                <v-col cols="12" md="6">
                  <v-text-field
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    label="Senha"
                    v-model="password"
                    prepend-icon="lock"
                    :type="show1 ? 'text' : 'password'"
                    required
                    :rules="[rules.required, rules.passwordLength]"
                    autocomplete="new-password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    @click:append="show2 = !show2"
                    :type="show2 ? 'text' : 'password'"
                    label="Confirme sua Senha"
                    v-model="passwordValidation"
                    prepend-icon="lock-check"
                    required
                    :rules="[rules.required, rules.passwordMatch]"
                    autocomplete="new-password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="6" >
                  <v-checkbox
                    color="success"
                    v-model="termo"
                    :rules="[
                      (v) => !!v || 'Você deve concordar com o termo de uso!',
                    ]"
                    required
                  >
                    <template slot="label">
                      Aceita os
                      <a
                        class="ml-1"
                        @click.stop
                        href="termos.html"
                        target="_blank"
                        >Termos de Uso</a
                      >?
                    </template>
                  </v-checkbox>
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
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                  block
                  rounded
                    @click="register"
                    :disabled="!valid"
                    color="success"
                    class="text-center"
                    >
                     <v-icon left dark>mdi-send</v-icon>
                    ENVIAR CADASTRO
                  </v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import utils from "../utils/utils.js";
import EventBus from "../event-bus.js";

export default {
  head() {
    return {
      title: "Cadastre-se",
      meta: [],
    };
  },
  data() {
    return {
      jobs: [
        "Advogado",
        "Bacharel em Direito",
        "Estudante de Direito",
        "Administrador",
        "Contador",
        "Assistente Administrativo",
        "Representante Comercial",
        "Engenheiro Civil",
        "Corretor de Imóveis",
        "Procurador e Advogado Público",
        "Político",
        "Outros",
      ],
      valid: true,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      profession: "",
      address: {},
      passwordValidation: "",
      termo: false,
      countrys: [],
      citys: [],
      error: null,
      show1: false,
      show2: false,
      cityLoading: false,
      rules: {
        required: (value) => !!value || "Campo Obrigatório",
        counter: (value) => value.length <= 20 || "Máximo de 20 caracteres",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido";
        },
        passwordMatch: (value) =>
          value == this.password || "Digite a mesma senha do campo acima",
        passwordLength: (value) =>
          value.length >= 8 || "Mínimo de 8 caracteres",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.$post("/auth/register", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          profession: this.profession,
          address: {
            country: this.address.country,
            city: this.address.city,
          },
        });
        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setUser", response.user);
        this.$router.push("/");
        return EventBus.$emit('callSnackbar', {
        color: 'success',
        text: 'Seu usuário foi criado com sucesso!',
      });
      } catch (error) {
        this.error = error.response
          ? error.response.data.error
          : "Erro Inesperado";
      }
    },
    facebook() {
      window.location.href = `${process.env.BASE_URL}/api/v1/auth/facebook`;
    },
    async getLocationData(sigla) {
      this.cityLoading = true;
      try {
        const data = await utils.getLocationData(sigla);
        this.countrys = data.countrys ? data.countrys : [];
        this.citys = data.citys ? data.citys : [];
      } catch (error) {
        return EventBus.$emit("callSnackbar", {
          color: "error",
          text: "Não foi possível obter a lista de Estados.",
        });
      } finally {
        this.cityLoading = false;
      }
    },
  },
  computed: {
    firstnameColSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pb-0";
        case "sm":
          return "pb-0";
        default:
          return "";
      }
    },
    lastnameColSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pt-0";
        case "sm":
          return "pt-0";
        default:
          return "";
      }
    },
  },
  created() {
    this.getLocationData();
  },
};
</script>
