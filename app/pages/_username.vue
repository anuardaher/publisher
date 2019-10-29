<template>
  <div>
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
                  v-if="hover && isTheLoggedUser"
                  absolute
                >
                  <v-btn @click='editImageDialog = true' text class="mt-12">
                    <span class="caption">editar</span>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
                <img
                 v-if="user.img"
                :src="imageUrl(user.img)"
                :alt="user.firstname"
                >
                <span 
                 v-if="!user.img" 
                class="white--text display-2"
                v-text="user.firstname.charAt(0).toUpperCase()">
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
                  <v-file-input
                    v-model='profileImage'
                    light
                    accept="image/*"
                    label="Escolha uma imagem"
                    prepend-icon="mdi-image"
                    showSize
                    :rules='[rules.profileImageSize]'
                  ></v-file-input>
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
          <v-chip small>{{ user.profession }}</v-chip>
        </v-row>
        <v-row align='center' justify='center'>
          <span 
          class="display-1 mt-4 px-4"
          v-text='`${user.firstname} ${user.lastname}`'></span>
        </v-row>
        <v-row align='center' justify='center'>
          <span class="subtitle-1 mt-1">
            <v-icon>mdi-map-marker</v-icon>
              <span v-text="`${user.address.city} – ${user.address.country}`"></span>
          </span>
        </v-row>
        <v-row align='center' justify='center' v-if="user.bio">          
             <span class="body-1 pa-4">
                <v-icon large>mdi-format-quote-open</v-icon>
               {{ user.bio }}
                <v-icon large>mdi-format-quote-close</v-icon> 
             </span>               
        </v-row>
        <v-row v-if="isTheLoggedUser" align='center' justify='center'>
          <v-dialog v-model="perfilDialog" persistent :fullscreen="$vuetify.breakpoint.xsOnly" max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn 
              class='my-2' 
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
                      <v-form v-model="userSettingsIsValid">
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field 
                            label="Nome" 
                            required
                            v-model='user.firstname'
                            :rules='[rules.required]'
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field 
                            label="Sobrenome"
                            required
                            v-model='user.lastname'
                            :rules='[rules.required]'
                            ></v-text-field>
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
                            <v-textarea
                            label="Conte um pouco sobre você"                            
                            v-model='user.bio'
                            outlined
                            counter
                            auto-grow
                            :rules='[rules.bioSize]'
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                            v-model='user.profession'
                            :items='perfils'
                            label="Profissão"
                            type="password" 
                            required
                            :rules='[rules.required]'
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-autocomplete
                              :items="countrys"
                              label="Estado"
                              item-text='sigla'
                              item-value='sigla'                            
                              :rules='[rules.required]'
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
                              :rules='[rules.required]'
                              v-model='user.address.city'
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-1" text @click="perfilDialog = false">Fechar</v-btn>
                    <v-btn color="primary"
                     text
                     :disabled="!userSettingsIsValid" 
                     @click="editUserProfile"
                     >Salvar
                     </v-btn>
                  </v-card-actions>
                </v-tab-item>
                <v-tab-item v-if='$store.getters.provider == "cadastro"'>
                  <v-card-title>
                    <span class="headline">Mudar senha</span>
                  </v-card-title>
                  <v-card-text>
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
                <v-tab-item v-if='$store.getters.role == "admin"'>
                    <v-card-title>
                    <span class="headline">Inserir tags</span>
                  </v-card-title>
                  <v-card-text>
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
          @click="$router.push(normalizeLink(article), () => {})"
          >
            <v-list-item-avatar
            v-if="$vuetify.breakpoint.smAndUp">
              <v-icon
                class="grey lighten-1 white--text"
              >mdi-file-document-box</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="article.title"></v-list-item-title>
              <v-list-item-subtitle v-text="article.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action v-if="isTheLoggedUser" @click.stop="showDeleteDialog(article._id)"> 
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
  </div>
</template>

<script>
import AppTabs from '../components/AppTabs.vue'
import EventBus from '../event-bus.js'
import Utils from '../utils/utils.js'

export default {
  head() {
    return {
      title: `${this.user.firstname} ${this.user.lastname}`,
      meta: [
        { hid: 'description', name: 'description', content: this.userDescription() },
        { hid: 'author', name: 'author', content: `${this.user.firstname} ${this.user.lastname}` },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: `${this.BASE_URL}/${this.user.username}`},
        { hid: 'og:title', property: 'og:title', content: `${this.user.firstname} ${this.user.lastname}`},
        { hid: 'og:description', property: 'og:description', content: this.userDescription()},
        { hid: 'og:site_name', property: 'og:site_name', content: 'UC Advogados'},
        { hid: 'og:image', property: 'og:image', content: this.imageUrl(this.user.img) },
        { hid: 'og:image:secure_url', property: 'og:image', content: this.imageUrl(this.user.img)},
        { hid: 'og:image:width', property: 'og:image:width', content: '400' },
        { hid: 'og:image:height', property: 'og:image:height', content: '300' },
        { hid: 'twitter:card', name: 'twitter:card', value: 'summary' },
        { hid: 'twitter:site' ,name: 'twitter:site', content: '@ucadvogados' },
        { hid: 'twitter:title', name: 'article:tag', content: `${this.user.firstname} ${this.user.lastname}` },
        { hid: 'twitter:description', name: 'twitter:description', content: this.userDescription() },
        { hid: 'twitter:image', name: 'twitter:image', content: this.imageUrl(this.user.img) },
      ]
    }
  },
  data () {
    return {
      BASE_URL: process.env.BASE_URL,
      userSettingsIsValid: true,
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
      user: { country: {}, address: {}},
      isTheLoggedUser: false,
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
        profileImageButton: value => !value || value.size > 1000000,
        bioSize: value => value.length <= 200 || 'Máximo de 200 caracteres'
        },
      };
    },
    fetch ({store, redirect, app}) {
      const cookie = app.$cookies.get('vuex')
      if (cookie) {
        store.dispatch('setUser', cookie.user)
        store.dispatch('setToken', cookie.token)
      }
   },
    async asyncData ({$axios, params, redirect}) {
      try {
        const { data } = await $axios.post(`/users/profile/${params.username}`)
        return { user: data }
      } catch (error) {
          console.error(error.message)
          redirect('/error')
      }
    },
    methods: {
    async getArticles() {
      this.loading = true;
      const options = {
        data: { 'author.id': this.user._id},
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
    checkUser() {
      if (this.user._id === this.$store.getters.userId) this.isTheLoggedUser = true;
    },
    async editUserProfile() {
      try {
        const data = await this.$axios.$put(`/users/${this.user._id}`, this.user)
        this.$store.dispatch('setUser', data);
        this.$router.go(this.$router.currentRoute)
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
          this.$router.push('/', () => {});
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
        this.$router.go(this.$router.currentRoute)
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
        const data = await Utils.getLocationData(sigla)
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
    },
    imageUrl (path) {
      if (!path) return
      if (/https/.test(path))
        return path
      return `${this.BASE_URL}/${path}`
    },
    userDescription() {
      return `${this.user.profession} em ${this.user.address.city} – ${this.user.address.country}`
    },
    normalizeLink(post) {
      return Utils.normalizeLink(post)
    }
  },
  created () {
    this.checkUser();
    this.getArticles();
    this.getLocationData(this.user.address.country);
  },
};
</script>
