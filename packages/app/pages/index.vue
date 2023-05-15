<template>
  <div :class="$vuetify.breakpoint.width < '400' ? 'px-0' : null">
    <v-row justify="center">
      <v-col lg="3" md="3" sm="10" cols="12">
        <client-only>
          <ProfileCard class="fixed" v-if="$vuetify.breakpoint.mdAndUp" />
        </client-only>
      </v-col>
      <v-col lg="5" xl="4" md="6" sm="10" cols="12">
        <div v-if="articles.length > 0">
          <Card
            v-for="article in articles"
            :key="article._id"
            :value="article"
            v-scroll="bottomVisible"
          />
        </div>
        <div
          class="text-center"
          v-else-if="articles.length == 0 && !isLoadingArticles"
        >
          <div class="text-h1 mb-4">🥱</div>
          <div class="text-body">
            Nenhuma publicação foi feita até o momento.
          </div>
        </div>
      </v-col>
      <v-col lg="3" md="3" cols="12">
        <WeekPostsCard class="fixed" v-if="$vuetify.breakpoint.mdAndUp" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from '../components/Card'
import ProfileCard from '../components/index/ProfileCard'
import WeekPostsCard from '../components/index/WeekPostsCard'
import EventBus from '../event-bus.js'
import utils from '../utils/utils.js'

export default {
  components: {
    Card,
    ProfileCard,
    WeekPostsCard
  },
  head() {
    return {
      title: 'Artigos e noticias em um só lugar',
      meta: []
    }
  },
  data: () => ({
    show: false,
    articles: [],
    isLoadingArticles: false,
    skip: 0,
    totalOfArticles: false,
    showInformationDialog: false,
    user: { address: {} },
    countrys: [],
    citys: [],
    perfils: [
      'Advogado',
      'Bacharel em Direito',
      'Estudante de Direito',
      'Administrador',
      'Contador',
      'Assistente Administrativo',
      'Representante Comercial',
      'Engenheiro Civil',
      'Corretor de Imóveis',
      'Procurador e Advogado Público',
      'Político',
      'Outros'
    ]
  }),
  methods: {
    async loadData() {
      if (this.isLoadingArticles) return
      this.isLoadingArticles = !this.isLoadingArticles
      const params = {
        data: { type: 'artigo', active: true },
        projection: { text: 0 },
        options: {
          limit: 5,
          skip: this.skip,
          sort: {
            createdAt: -1
          }
        }
      }
      try {
        let articles = await this.$axios.$get('/articles', { params })
        this.totalOfArticles =
          articles.length < params.options.limit ? true : false
        this.articles = this.articles.concat(articles)
        this.skip = this.articles.length
      } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao carregar artigos. Tente mais tarde.'
        })
      } finally {
        this.isLoadingArticles = !this.isLoadingArticles
      }
    },
    bottomVisible() {
      if (utils.isTheBottomOfThePage())
        if (!this.totalOfArticles) {
          // Se já tiver acabado os posts, não requisita mais
          this.loadData()
        }
    }
  },
  created() {
    this.loadData()
  }
}
</script>
<style>
.fixed {
  position: -webkit-sticky;
  position: sticky;
  top: 82px;
}
</style>
