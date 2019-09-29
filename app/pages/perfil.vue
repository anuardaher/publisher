<template>
  <v-container>
    <v-row align='center' justify='center'>
      <v-col
      md="8"
      lg="6"
      sm="12">
        <v-card 
        class="pa-2"
        outlined>
        <v-row align='center' justify='center'>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-avatar 
              class="ma-2"
              size='100'
              color="grey">
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                >
                  <v-btn @click='editImageDialog = true' text class="mt-12">
                    <span class="caption">editar</span>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
                <img
                 v-if="$store.getters.userHasImage"
                :src="$store.getters.userHasImage"
                alt="John"
                >
                <span 
                 v-if="!$store.getters.userHasImage" 
                class="white--text display-2"
                v-text="$store.getters.inicialLetterName">
                </span>
              </v-avatar>
            </template>
          </v-hover>
          <v-dialog v-model="editImageDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Imagem</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-file-input
                    v-model='profileImage'
                    light
                    accept="image/*"
                    label="Escolha uma imagem"
                    prepend-icon="mdi-image"
                    showSize
                    :rules='[rules.profileImageSize]'
                  ></v-file-input>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color='red darken-1' @click='editImageDialog = false'>Fechar</v-btn>
                <v-btn text color='primary'
                 :disabled='rules.profileImageButton(profileImage)'
                 @click="editProfileImage">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row align='center' justify='center'>
          <v-chip small>{{ $store.getters.profession }}</v-chip>
        </v-row>
        <v-row align='center' justify='center'>
          <span 
          class="display-1 mt-4"
          v-text='$store.getters.fullName'></span>
        </v-row>
        <v-row align='center' justify='center'>
          <span class="subtitle-1 mt-1">
            <v-icon>mdi-map-marker</v-icon>
              <span v-text="$store.getters.fullLocation"></span>
          </span>
        </v-row>
        <v-row align='center' justify='center'>
          <v-dialog v-model="perfilDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn 
              class='my-4' 
              outlined 
              tile 
              color='primary'
              v-on="on"
              >
                <v-icon class="ma-2" small>mdi-pencil-plus</v-icon>
                Editar Perfil
              </v-btn>
              </template>
            <v-card>
              <v-toolbar dense color="primary" dark>
                <v-toolbar-title>Perfil do Usuário</v-toolbar-title>
              </v-toolbar>
              <v-tabs center-active>
                <v-tab>
                  <v-icon left>mdi-account</v-icon>
                  Perfil
                </v-tab>
                <v-tab v-if='$store.getters.provider == "cadastro"'>
                  <v-icon left>mdi-lock</v-icon>
                  Senha
                </v-tab>
                <v-tab v-if='$store.getters.role == "admin"'>
                  <v-icon left>mdi-tag</v-icon>
                  Tags
                </v-tab>
                <v-tab-item>
                  <v-card-title>
                    <span class="headline">Informações Pessoais</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                          label="Nome" 
                          required
                          v-model='user.firstname'></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field 
                          label="Sobrenome"
                          required
                          v-model='user.lastname'></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                          readonly
                          filled
                          label="Email" 
                          required
                          v-model='user.email' 
                          ></v-text-field>
                        </v-col>
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
                    <v-btn color="red darken-1" text @click="perfilDialog = false">Fechar</v-btn>
                    <v-btn color="primary"
                     text 
                     @click="editUserProfile"
                     >Salvar
                     </v-btn>
                  </v-card-actions>
                </v-tab-item>
                <v-tab-item>
                  <v-card-title>
                    <span class="headline">Mudar senha</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form v-model='passwordForm'>
                        <v-row>
                          <v-col cols='12'>
                            <v-text-field
                            :append-icon="showPassword1 ? 'visibility' : 'visibility_off'"
                            @click:append="showPassword1 = !showPassword1"
                            label="Senha atual"
                            v-model="password.old"
                            prepend-icon="lock"
                            :type='showPassword1 ? "text" : "password"'
                            required
                            :rules='[rules.required, rules.passwordLength]'
                          ></v-text-field>
                          </v-col>
                          <v-col cols='12'>
                            <v-text-field
                            :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
                            @click:append="showPassword2 = !showPassword2"
                            :type='showPassword2 ? "text" : "password"'
                            label="Nova senha"
                            v-model="password.new"
                            prepend-icon="lock"
                            required
                            :rules='[rules.required, rules.passwordLength]'
                            ></v-text-field>
                          </v-col>
                          <v-col cols='12'>
                            <v-text-field
                            :append-icon="showPassword3 ? 'visibility' : 'visibility_off'"
                            @click:append="showPassword3 = !showPassword3"
                            :type='showPassword3 ? "text" : "password"'
                            label="Confirme sua nova senha"
                            v-model="password.validator"
                            prepend-icon="lock"
                            required
                            :rules='[rules.required, rules.passwordMatch]'
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-1" text @click="perfilDialog = false">Fechar</v-btn>
                    <v-btn 
                    color="primary" 
                    text 
                    @click="editUserPassword"
                    :disabled="!passwordForm">
                    Salvar
                    </v-btn>
                  </v-card-actions>
                </v-tab-item>
                <v-tab-item>
                    <v-card-title>
                    <span class="headline">Inserir tags</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                       <v-combobox
                          v-model="tags"
                          :loading='tagsLoading'
                          hide-selected
                          hint="Máximo de 5 tags"
                          label="Tags"
                          multiple
                          persistent-hint
                          small-chips
                          clearable
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>
                                  Digite e aperte <kbd>enter</kbd> para criar uma nova tag
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-1" text @click="perfilDialog = false">Fechar</v-btn>
                    <v-btn 
                    color="primary" 
                    text 
                    @click="saveTags"
                    :disabled="tags.length < 1 || tags.length > 5">
                    Salvar
                    </v-btn>
                </v-card-actions>
                </v-tab-item>
              </v-tabs>
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
        class="pa-2"
        outlined
        >
        <div class='text-center'>
          <v-progress-circular
          v-if="loading"
          :size="50"
          color="primary"
          indeterminate
          ></v-progress-circular>
          <span 
          class="title"
          v-if='!loading'
          >
          {{articleStatus}}
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
          @click="$router.push(`${article.attributes.type}/${article.attributes.title.replace(/[ ]/g,'-' )}/${article.id}`, () => {})"
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

            <v-list-item-action @click.stop="showDeleteDialog(article.id)"> 
              <v-icon>mdi-delete</v-icon>                   
            </v-list-item-action>
          </v-list-item>
            <v-dialog v-model="confirmDialog" persistent max-width="320px">
              <v-card>
                <v-card-title class="headline">Excluir publicação?</v-card-title>
                <v-card-text>Ao excluir, todas as informações dessa publicação serão perdidas.</v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" text @click="confirmDialog = false">Não</v-btn>
                  <v-btn color="error" text @click="deleteArticle(articleId)">Excluir</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>           
          </v-list>
       </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppTabs from '../components/AppTabs.vue'
import EventBus from '../event-bus.js'
import utils from '../utils/utils.js'

export default {
  head() {
    return {
      title: "Perfil",
      meta: [],      
    }
  },
  data () {
    return {
      passwordForm: true,
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      password: {
        old: '',
        new: '',
        validator: ''
      },
      perfils: ['Advogado', 'Bacharel em Direito', 'Estudante de Direito', 'Administrador',
        'Contador', 'Assistente Administrativo', 'Representante Comercial',
        'Engenheiro Civil', 'Corretor de Imóveis', 'Procurador e Advogado Público',
        'Político', 'Outros'],
      articles: [],
      articleStatus: null,
      loading: false,
      perfilDialog: false,
      confirmDialog: false,
      editImageDialog: false,
      profileImage: null,
      user: { address: {}},
      articleId: null,
      citys: [],
      countrys: [],
      selectedCity: {},
      selectedCountry: {},
      tags: [],
      tagsLoading: false,
      rules: {
        required: value => !!value || 'Campo Obrigatório',
        passwordMatch: value => value == this.password.new || 'Digite a mesma senha do campo acima',
        passwordLength: value => value.length >= 8 || 'Mínimo de 8 caracteres',
        profileImageSize: value => !value || value.size < 1000000 || 'A imagem deve ter o máximo de 1 MB.',
        profileImageButton: value => !value || value.size > 1000000
        },
      };
    },
    fetch ({store, redirect, app}) {
      const cookie = app.$cookies.get('vuex')
      if (cookie) {
        store.dispatch('setUser', cookie.user)
        store.dispatch('setToken', cookie.token)
      }
      if (!store.getters.state || !cookie) {
        redirect('/login')
        return EventBus.$emit('callSnackbar', {
        color: 'warning',
        text: 'Você precisa estar logado',
        });
      } 
   },
    methods: {
    async getArticles() {
      this.loading = true;
      const options = {
        data: { 'author.id': this.$store.getters.userId },
        projection: { text: 0},
        options: { 
          sort: {
            createdAt: -1
          }},
      }
      try {
        const articles = await this.$axios.$get('/articles', { params: options });
        this.articles = articles ? articles : []
        this.articleStatus = this.articles.length < 1 ? 'Você ainda não possui publicações' : null
      } catch (error) {
          return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao carregar publicações. Tente mais tarde.',
        });
      } finally {
        this.loading = false;
      }
    },
    async deleteArticle(id) {
      try {
        const response = await this.$axios.$delete(`/articles/${id}`)
        EventBus.$emit('callSnackbar', {
            color: 'success',
            text: 'Publicação excluída com sucesso.',
          });
        return this.getArticles();
    } catch (error) {
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao excluir publicação Tente mais tarde.',
        });
      } finally {
        this.confirmDialog = false;
      }
    },
    setUser() {
      Object.assign(this.user, this.$store.getters.user);
      delete this.user.password;
      delete this.user.salt;
    },
    async editUserProfile() {
      try {
        const data = await this.$axios.$put(`/users/${this.user._id}`, this.user)
        this.$store.dispatch('setUser', data.attributes);
        return EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Usuário alterado com sucesso.',
        });
      } catch (error) {
          return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: 'Erro ao carregar publicações. Tente mais tarde.',
        });
      } finally {
          this.perfilDialog = false;
      }
    },
    async editUserPassword() {
      try {
        await this.$axios.$put(`/auth/${this.$store.getters.userId}`, {password: this.password});
        EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Senha alterada com sucesso. Entre novamente.',
        });
        return setTimeout(() => {
          this.$store.dispatch('setToken', null);
          this.$store.dispatch('setUser', null);
          this.$router.push('/artigos', () => {});
        }, 3000);
      } catch (error) {
        console.log(error);
          return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível alterar a senha.',
          });
        } finally {
            this.perfilDialog = false;
          }
    },
    async editProfileImage() {
      let fd = new FormData();
      fd.append('file', this.profileImage);
      try {
        const data = await this.$axios.$post(`/users/profileImage/${this.$store.getters.userId}`, fd, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        });
        this.$store.dispatch('setUser', data);
        EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Imagem alterada com sucesso.',
        });
      } catch (error) {
          return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível alterar a imagem.',
          });
      } finally {
          this.editImageDialog = false;
      }
    },
    showDeleteDialog(id) {
      this.confirmDialog = true;
      this.articleId = id;
    },
     async getLocationData(sigla) {
      try {
        const data = await utils.getLocationData(sigla)
        this.countrys = data.countrys ? data.countrys : [];
        this.citys = data.citys ? data.citys : [];
      } catch (error) {
        console.error(error);
         return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível obter a lista de Estados.',
          });
      }
    },
    async saveTags() {
      this.tagsLoading = true
      const promisses = this.tags.map((tag) => {
        return this.$axios.$post('/tags', {name: tag});
      })
      try {
        await Promise.all(promisses);
        this.tags = [];
        return EventBus.$emit('callSnackbar', {
            color: 'success',
            text: 'Tags salvas com sucesso.',
          });
      } catch (error) {
          return EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível salvar as tags.',
          });
        } finally {
            this.tagsLoading = false;
        }
    }
  },
  created () {
    this.getArticles();
    this.setUser();
    this.getLocationData(this.user.address.country);
  },
};
</script>
