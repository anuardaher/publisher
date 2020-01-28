<template>
  <div class="home">
    <v-row justify="center">
      <v-col class="about" 
      md="6"
      lg="5"
      xl="4"
      sm="7"
      cols="12"
      >
        <h1 class="display-1 mb-4">UC Advogados</h1>
        <p class="body-1">
          Acreditamos no aperfeiçoamento da sociedade pelo Direito
          e na Advocacia compromissada com a ética, com a responsabilidade,
          com a excelência das soluções legais, com a satisfação dos nossos
          clientes e com a realização pessoal dos nossos integrantes.
        </p>
        <ul class="body-1">
          <li>Especialistas em Direito do Trabalho (verbas trabalhistas, rescisão indireta, assédio moral).</li>
          <li>Especialistas em Direito do Consumidor, Direito Previdenciário, Direito de Família.</li>
          <li>Especialização dos serviços, áreas segmentadas e direcionamento</li>
          <li>Orientações para empresas de médio e grande porte</li>
          <li>Soluções voltadas para correção e prevenção de riscos jurídicos</li>
        </ul>
      </v-col>
      <v-col class="contacts"
      sm="7"
      md="4"
      lg="3"
      xl="2"
      cols="12"
      >
        <SocialMedia/>      
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="blog" 
      sm="7"
      md="6"
      lg="5"
      xl="4"
      cols="12"
      >
        <v-row justify="center">
          <v-col
          md="6"
          cols="12"
          v-for="article in articles"
          :key="article._id"
          >
            <ShortCard
            :article="article"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="weekposts mt-3"
      lg="3" 
      sm="7"
      md="4"
      xl="2"
      cols="12">
        <WeekPosts/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WeekPosts from '../components/index/WeekPostsCard'
import ShortCard from '../components/index/ShortCard'
import SocialMedia from '../components/contact/SocialMedia'

export default {
  components: {
    WeekPosts,
    ShortCard,
    SocialMedia
  },
  data: () => ({
    articles: []
  }),
  async asyncData({$axios, redirect}) {
    const options = {
    data: { active: true },
    projection: {text: 0},
    options: {
      limit: 4,
      sort: {
          createdAt: -1
        },
      }
    }
    try {
      let articles = await $axios.$get('/articles', { params: options })
      return { articles }
    } catch (error) {
      redirect('/error')
    }
  },
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
    checkUserInformation() {
      if (this.$store.getters.state) {
        if (!this.$store.state.user.address || !this.$store.state.user.profession) {
        this.showInformationDialog = true;
        this.getLocationData();
        }
      }
    }
  },
  created () {
    this.authSocialLogin();
    this.checkUserInformation();
  }
}
</script>

<style scoped>

</style>