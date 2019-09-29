<template>
  <v-container>
    <v-row >
      <h1 class="display-1 ma-2 mx-auto">ARTIGOS</h1>
    </v-row>
    <v-row
    align="center"
    justify="center"
    v-scroll='bottomVisible'>
      <v-col
      xl="10"
      lg="9"
      md="8"
      sm='7'
      cols="12"
      v-for="article in articles"
      :key="article.id">
       <Card
        :value="article.attributes"
        />
      </v-col>
       <v-dialog persistent v-model="showInformationDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Antes de iniciarmos...</span>
          </v-card-title>
          <v-card-text>
             <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                  v-model='user.profession'
                  :items='perfils'
                  label="Profissão"
                  type="password" 
                  required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    :items="countrys"
                    label="Estado"
                    item-text='sigla'
                    item-value='sigla'                            
                    required
                    v-model='user.address.country'
                    @change="getLocationData(user.address.country)"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-autocomplete
                    :items="citys"
                    label="Cidade"
                    item-text='nome'
                    item-value='nome'
                    v-model='user.address.city'
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color='primary'
              :disabled='!user.address.city || !user.address.city || !user.profession'
              @click="saveUserInformation">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card';
import AppTabs from '../components/AppTabs';
import EventBus from '../event-bus.js';
import utils from '../utils/utils.js';

export default {
  components: {
    Card,
  },
   head() {
    return {
      title: "Artigos",
      meta: []
    }
  },
  data: () => ({
    articles: [],
    skip: null,
    totalOfArticles: false,
    showInformationDialog: false,
    user: { address: {}},
    countrys: [],
    citys: [],
    perfils: ['Advogado', 'Bacharel em Direito', 'Estudante de Direito', 'Administrador',
        'Contador', 'Assistente Administrativo', 'Representante Comercial',
        'Engenheiro Civil', 'Corretor de Imóveis', 'Procurador e Advogado Público',
        'Político', 'Outros'],
  }),
  async fetch(context) {
    try {
      if (context.route.query && context.route.query.user) {
      const data = await context.app.$axios.get(`/auth/socialLogin/${context.route.query.user}`);
      store.dispatch('setToken', data.token);
      store.dispatch('setUser', data.user);
      }
    } catch (e) {
      context.error({statusCode: 500})
    }
  },
  methods: {
    async loadData(infinityScroll) {
      const options = {
      data: { type: "artigo", active: true },
      projection: {text: 0},
      options: { 
        limit: 5,
        skip: this.skip,
        sort: {
          createdAt: -1
        }},
    }
    try {
      const articles = await this.$axios.$get('/articles', { params: options })
      if (articles.length == 0) return this.totalOfArticles = true;
      if (infinityScroll) {
        this.articles = this.articles.concat(articles);
      } else  {
        this.articles = articles
      }
      this.skip = this.articles.length;
    } catch (error) {
      return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar artigos. Tente mais tarde.',
      });
    }
  },
     bottomVisible() {
      if (utils.isTheBottomOfThePage())
      // Se já tiver acabado os posts, não requisita mais
        if (!this.totalOfArticles) {
          this.loadData(true)
        }
    },
     async saveUserInformation() {
      try {
        const data = await this.$axios.$put(`/users/${this.$store.getters.userId}`, this.user);
        this.$store.dispatch('setUser', data.attributes);
        EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Suas informações foram atualizadas!',
        });
        this.showInformationDialog = false;
      } catch (error) {
         EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível atualizar suas informações.',
          });
      }
    },
   async getLocationData(sigla) {
     try {
      const data = await utils.getLocationData(sigla);
      this.countrys = data.countrys ? data.countrys : [];
      this.citys = data.citys ? data.citys : [];
     } catch (error) {
         return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Não foi possível buscar as localizações.',
        });
      }
    },
    checkUserInformation() {
      if (this.$store.getters.state) {
        if (!this.$store.state.user.address || !this.$store.state.user.profession) {
        this.showInformationDialog = true;
        this.getLocationData();
        }
      }
    }
  },
  created() {
    this.loadData();
    this.checkUserInformation();
  },
};
</script>
