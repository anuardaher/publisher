<template>
  <client-only placeholder="Loading...">
    <v-row align="center" justify="center">
      <v-col xl="11" md="11" lg="11" sm="12">
        <v-card class="pa-2" outlined>
          <v-tabs center-active>
            <v-tab>
              <v-icon left>mdi-account</v-icon>
              Usuários
            </v-tab>
            <v-tab>
              <v-icon left>mdi-post</v-icon>
              Posts Pendentes
            </v-tab>
            <v-tab-item>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Procurar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="users"
                  :search="search"
                >
                  <template v-slot:item.createdAt="{ item }">
                    {{ new Date(item.createdAt).toLocaleDateString() }}
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-col class="mx-auto" xl="6" lg="8" sm="12">
                <v-card outlined>
                  <v-list>
                    <v-subheader inset
                      >Publicações ({{ articles.length }})</v-subheader
                    >
                    <div v-if="articles.length < 1" class="mx-auto text-center">
                      <span class="body-1 ma-4"
                        >Nenhuma publicação pendente.</span
                      >
                    </div>
                    <v-list-item v-for="article in articles" :key="article._id">
                      <v-list-item-avatar v-if="$vuetify.breakpoint.smAndUp">
                        <v-icon class="grey lighten-1 white--text"
                          >mdi-file-document-box</v-icon
                        >
                      </v-list-item-avatar>
                      <v-list-item-content
                        @click="$router.push(normalizeLink(article), () => {})"
                      >
                        <a>
                          <v-list-item-title
                            v-text="article.title"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-text="article.subtitle"
                          ></v-list-item-subtitle>
                        </a>
                      </v-list-item-content>
                      <v-list-item-action
                        @click.stop="showActiveDialog(article._id)"
                      >
                        <v-btn icon>
                          <v-icon color="green">mdi-check</v-icon>
                        </v-btn>
                      </v-list-item-action>
                      <v-list-item-action
                        @click.stop="showDeleteDialog(article._id)"
                      >
                        <v-btn icon>
                          <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-tab-item>
          </v-tabs>
        </v-card>
        <v-dialog v-model="deleteDialog" persistent max-width="320px">
          <v-card>
            <v-card-title class="headline">Excluir publicação?</v-card-title>
            <v-card-text
              >Ao excluir, todas as informações dessa publicação serão
              perdidas.</v-card-text
            >
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text @click="deleteDialog = false"
                >Não</v-btn
              >
              <v-btn color="error" text @click="deleteArticle(articleId)"
                >Excluir</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="activeDialog" persistent max-width="320px">
          <v-card>
            <v-card-title class="headline">Ativar publicação?</v-card-title>
            <v-card-text
              >Ao ativar essa publicação, ela ficará acessível aos outros
              usuários.</v-card-text
            >
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text @click="activeDialog = false"
                >Não</v-btn
              >
              <v-btn color="green" text @click="activeArticle(articleId)"
                >Ativar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import Utils from '../utils/utils'
import EventBus from '../event-bus'

export default {
  middleware({ store, redirect }) {
    store.getters.role == 'admin' ? null : redirect('/')
  },
  data: () => ({
    articles: [],
    loading: false,
    deleteDialog: false,
    activeDialog: false,
    articleId: null,
    users: [],
    search: '',
    headers: [
      { text: 'Nome', value: 'firstname' },
      { text: 'Sobrenome', value: 'lastname' },
      { text: 'Usuário', value: 'username' },
      { text: 'E-mail', value: 'email' },
      { text: 'Profissão', value: 'profession' },
      { text: 'Cidade', value: 'address.city' },
      { text: 'Estado', value: 'address.country' },
      { text: 'Registrado por', value: 'provider' },
      { text: 'Criação', value: 'createdAt' }
    ]
  }),
  methods: {
    async getUsers() {
      const options = {
        data: {},
        projection: { password: 0, salt: 0 }
      }
      try {
        const { data } = await this.$axios.get('/users', { params: options })
        this.users = data
      } catch (error) {
        console.error(error.message)
      }
    },
    async getArticles() {
      this.loading = true
      const options = {
        data: { active: false },
        options: {
          sort: {
            createdAt: -1
          }
        }
      }
      try {
        const articles = await this.$axios.$get('/articles', {
          params: options
        })
        this.articles = articles ? articles : []
      } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao carregar publicações. Tente mais tarde.'
        })
      } finally {
        this.loading = false
      }
    },
    async deleteArticle(id) {
      try {
        await this.$axios.$delete(`/articles/${id}`)
        EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Publicação excluída com sucesso.'
        })
        return this.getArticles()
      } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao excluir publicação Tente mais tarde.'
        })
      } finally {
        this.deleteDialog = false
      }
    },
    async activeArticle(id) {
      try {
        await this.$axios.$put(`/articles/${id}`, { $set: { active: true } })
        EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Artigo publicado com sucesso.'
        })
        return this.getArticles()
      } catch (error) {
        console.error(error.message)
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao publicar artigo. Tente mais tarde.'
        })
      } finally {
        this.activeDialog = false
      }
    },
    showDeleteDialog(id) {
      this.deleteDialog = true
      this.articleId = id
    },
    showActiveDialog(id) {
      this.activeDialog = true
      this.articleId = id
    },
    normalizeLink(post) {
      return Utils.normalizeLink(post)
    }
  },
  created() {
    this.getUsers()
    this.getArticles()
  }
}
</script>

<style></style>
