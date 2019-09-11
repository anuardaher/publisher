<template>
  <v-container>
    <v-row align='center' justify='center'>
      <v-col
      md="8"
      lg="6"
      sm="12">
        <v-card 
        tile 
        class="pa-2"
        outlined>
        <v-row align='center' justify='center'>
          <v-avatar 
          class="ma-2"
           v-if="$store.getters.userHasImage"
           size='90'>
            <img
            :src="$store.getters.userHasImage"
            alt="John"
            >
          </v-avatar>
          <v-avatar
          class="ma-2"
          v-if="!$store.getters.userHasImage" 
          :color="$store.getters.userColor"
          size="90">
            <span 
            class="white--text display-2"
            v-text="$store.getters.inicialLetterName">
            </span>
          </v-avatar>
        </v-row>
        <v-row align='center' justify='center'>
          <v-chip small class="">Advogado</v-chip>
        </v-row>
        <v-row align='center' justify='center'>
          <span 
          class="display-1 mt-4"
          v-text='$store.getters.fullName'></span>
        </v-row>
        <v-row align='center' justify='center'>
          <span class="subtitle-1 mt-1">
            <v-icon>mdi-map-marker</v-icon>
              Goiânia (GO)
          </span>
        </v-row>
        <v-row align='center' justify='center'>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn 
              class='my-4' 
              outlined 
              tile 
              :color='$store.getters.userColor'
              v-on="on"
              >
                <v-icon class="ma-2" small>mdi-pencil-plus</v-icon>
                Editar Perfil
              </v-btn>
              </template>
            <v-card>
              <v-card-title>
                <span class="headline">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Legal first name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Legal last name*"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Password*" type="password" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
       </v-card>
      </v-col>
    </v-row>
     <v-row align='center' justify='center'>
      <v-col
      md="8"
      lg="6"
      sm="12"
      >
        <v-card 
        tile 
        class="pa-2"
        outlined
        >
        <div class='text-center'>
          <span 
          class="title"
          v-if='articles && articles.length < 1'
          >
          Você ainda não possui publicações
          </span>
        </div>
        <v-list 
        two-line 
        subheader
        v-if='articles.length > 0'
        >
          <v-subheader inset>Publicações ({{articles.length}})</v-subheader>

          <v-list-item
          v-for="article in articles"
          :key='article._id'
          @click="$router.push(`/publicacao/${article.id}`)"
          >
            <v-list-item-avatar
            v-if="$vuetify.breakpoint.smAndUp">
              <v-icon
                class="grey lighten-1 white--text"
              >mdi-file-document-box</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="article.attributes.title"></v-list-item-title>
              <v-list-item-subtitle v-text="article.attributes.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action-text
            @click.stop="changeArticleStatus(article.attributes.active , article.id)"
            >
              {{article.attributes.active ? 'Publicado' : 'Ocultado' }}
              <v-switch              
              v-model='article.attributes.active'
              color='success'              
              ></v-switch>
            </v-list-item-action-text>
          </v-list-item>
        </v-list>
       </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import AppTabs from './AppTabs.vue';
import EventBus from '../event-bus.js'
import ArticleService from '../services/ArticleService.js'

export default {
  components: {
  },
  metaInfo() {
    return {
      title: "Perfil",
      meta: [],      
    }
  },
  data: () => ({
    articles: [],
    loading: [],
    dialog: false,
  }),
  methods: {
    async getArticles() {
      const options = {
        data: { 'author.id': this.$store.getters.userId },
        projection: { text: 0},
        options: { 
          sort: {
            createdAt: -1
          }},
      }
      try {
        const { data } = await ArticleService.load(options);
        this.articles = data ? data : [];
        EventBus.$emit('callProgressBar');
      } catch (error) {
        EventBus.$emit('callProgressBar');
        EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar publicações. Tente mais tarde.',
      });
      }
    },
    async changeArticleStatus(status, id ,index) {
      const options = {active: status};
      try {
        const response = await ArticleService.update(options, id)
        if (response.status != 200) {
          return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Erro ao alterar status da publicação. Tente mais tarde.',
          });
        }
        return EventBus.$emit('callSnackbar', {
            color: 'success',
            text: 'Publicação alterada com sucesso.',
          });
    } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao alterar status da publicação. Tente mais tarde.',
        });
      }
    },
  },
  created () {
    this.getArticles();
  },
  mounted() {
    EventBus.$emit('callProgressBar');
  }
};
</script>
