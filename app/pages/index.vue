<template>
  <div :class="$vuetify.breakpoint.width < '400' ? 'px-0' : null">
    <v-row
    justify="center">
      <ProfileCard v-if="$vuetify.breakpoint.mdAndUp"/>
      <v-col
      xl="4"
      lg="5"
      md="6"
      sm='10'
      cols="12"
      >
        <Card
        v-for="article in articles"
        :key="article._id"
        :value="article"
        v-scroll='bottomVisible'
        />
      </v-col>
      <WeekPostsCard v-if="$vuetify.breakpoint.mdAndUp"/>
      <v-dialog persistent v-model="showInformationDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Antes de iniciarmos...</span>
        </v-card-title>
        <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select
                v-model='user.profession'
                :items='perfils'
                label="Ocupação"
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
  </div>
</template>

<script>
import Card from '../components/Card';
import ProfileCard from '../components/index/ProfileCard'
import WeekPostsCard from '../components/index/WeekPostsCard'
import EventBus from '../event-bus.js';
import utils from '../utils/utils.js';

export default {
  components: {
    Card,
    ProfileCard,
    WeekPostsCard,
  },
   head() {
    return {
      title: "Artigos e noticias do mundo jurídico em um só lugar",
      meta: []
    }
  },
  data: () => ({
    articles: [],
    isLoadingArticles: false,
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
  methods: {
    async authSocialLogin() {
    try {
      if (this.$route.query && this.$route.query.user) {
      const { data } = await this.$axios.get(`/auth/socialLogin/${this.$route.query.user}`);
      this.$store.dispatch('setToken', data.token);
      this.$store.dispatch('setUser', data.user);
      this.$router.push('/')
      }
    } catch (e) {
        console.log(e)
        this.$router.push('/error')
      }
    },
    async loadData(infinityScroll) {
      if (this.isLoadingArticles) return
      this.isLoadingArticles = !this.isLoadingArticles
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
      let articles = await this.$axios.$get('/articles', { params: options })
      if (articles.length == 0) return this.totalOfArticles = true;
      this.articles = this.articles.concat(articles)  
      this.skip = this.articles.length;
    } catch (error) {
      return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar artigos. Tente mais tarde.',
      });
    } finally {
      this.isLoadingArticles = !this.isLoadingArticles
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
        this.$store.dispatch('setUser', data);
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
    this.authSocialLogin();
    this.checkUserInformation();
  },
};
</script>
<style>
.fixed {
	position:	-webkit-sticky;
	position: sticky;
	top: 96px;
}
</style>
