<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col align="center" cols='12'>
        <div>
          <v-btn :color="$store.getters.userColor" @click="publish" dark>🚀 Publicar</v-btn>
        </div>
      </v-col>        
    </v-row>
    <v-row align="center" justify="center">
      <span class="gray--text headline mt-2">Qual será o tipo de publicação?</span><br/>
    </v-row>
    <v-row align="center" justify="center"> 
      <v-radio-group  class="mx-auto" v-model="postType" row>
        <v-radio label="Artigo" value="article"></v-radio>
        <v-radio label="Notícia" value="notice"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row align="center" justify="center" class="mt-n8">
      <v-col 
      md="8"
      lg="6"
      sm="12">
      <div class="editor">
        <v-file-input
          v-model='coverImgFile'
          light
          accept="image/*"
          label="Insira uma imagem de capa"
          prepend-icon="mdi-image"
        ></v-file-input>
        <v-combobox
          dense
          prepend-icon="mdi-tag"
          v-model="tags"
          :items="tagList"
          item-text="name"
          chips
          clearable
          label="Selecione temas"
          multiple
        >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item.name }}</strong>&nbsp;
          </v-chip>
        </template>
        </v-combobox>
        <v-divider class='my-2'></v-divider>
        <v-sheet
          tile
          class="mx-auto  pa-4 text-editor"
          max-width="100%"
          min-height='300'
        >
          <v-textarea
          v-model="title"
          rows="1"
          auto-grow
          rounded
          class="text-title ml-n4 mb-n8"
          placeholder="Escreva um título..."
          ></v-textarea>
          <v-textarea
          v-model="subtitle"
          rows="1"
          auto-grow
          rounded
          class="text-subtitle ml-n4"
          placeholder="Escreva um subtítulo..."
          ></v-textarea>
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, on }">
            <div class="menubar">
              <button
                class="menubar__button mr-1"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <v-icon>mdi-format-bold</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
              >
                <v-icon>mdi-format-italic</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
              >
                <v-icon>mdi-format-clear</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >
                <v-icon>mdi-format-underline</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
              >
                <v-icon>mdi-code-braces</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
              >
                <v-icon>mdi-format-paragraph</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                H1
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >
                H2
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >
                H3
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
              >
                <v-icon>mdi-format-quotes-close</v-icon>
              </button>
              
            <v-dialog v-model="dialog" max-width="500px">
             <template v-slot:activator="{ on }">
                <button
                  class="menubar__button mx-1"
                  v-on='on'
                  >
                  <v-icon>mdi-image</v-icon>
                </button>
              </template>
            <v-card>
              <v-card-title>
                <span class="headline">Imagem</span>
              </v-card-title>
              <v-card-text>
                <span class='subtitle-1'>Você também pode arrastar a imagem para o campo de texto.</span>
                <v-container>
                  <v-row>
                  <v-file-input
                    v-model='imgFile'
                    light
                    accept="image/*"
                    label="Escolha uma imagem"
                    prepend-icon="mdi-image"
                    @change='inputImage(commands.image)'
                  ></v-file-input>
                  </v-row>
                  <v-row align='center' justify='center'>
                  <span class='subtitle-1'>Ou então...</span>
                  </v-row>
                  <v-row>
                  <v-text-field
                  v-model='imgLink'
                  text
                  prepend-icon="mdi-link"
                  light
                  label='Insira um endereço de imagem'
                  @change='inputImageLink(commands.image)'>
                  </v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
              <button
                class="menubar__button mx-1"
                @click="commands.horizontal_rule"
              >
                <v-icon>mdi-color-helper</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                @click="commands.undo"
              >
                <v-icon>mdi-undo-variant</v-icon>
              </button>

              <button
                class="menubar__button mx-1"
                @click="commands.redo"
              >
                <v-icon>mdi-redo-variant</v-icon>
              </button>
            </div>
          </editor-menu-bar>
          <editor-content class="editor__content ma-2 my-4" :editor="editor" />
        </v-sheet>
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '../event-bus';
import readFile from '../utils/convertFile.js';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions'
import ArticleService from '../services/ArticleService.js';
import TagsService from '../services/TagsService.js';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    
  },
  metaInfo() {
    return {
      title: "Publicar",
      meta: []
    }
  },
  data() {
    return {
      dialog: false,
      title: '',
      subtitle: '',
      postType: 'article',
      tags: [],
      tagList: [],
      text: '',
      coverImgFile: null,
      coverImgLink: null,
      imgFile: null,
      imgLink: null,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
        ],
        content: '<p> Começe a escrever seu texto aqui 👋</p>',
        onUpdate: ({ getHTML }) => {
          this.text = getHTML();
        }
      }),
    }
  },
  methods: {
    remove(item) {
        this.tags.splice(this.tags.indexOf(item), 1)
      },
    async publish(){
      const article = {
        title: this.title,
        subtitle: this.subtitle,
        tags: this.tags,
        text: this.text,
        type: this.postType,
        author:{
          id: this.$store.getters.userId,
          name: this.$store.getters.fullName,
        },
        img: await this.inputCoverImage(),
      }
      if (!article.img) {
        return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Não foi possível salvar a imagem da capa. Tente novamente.'
      });
      }
      try {
        const response = await ArticleService.publish(article);
        EventBus.$emit('callSnackbar', {
        color: 'success',
        text: 'Publicação realizada com sucesso!',
      });
        this.$router.push('/');
      } catch(error) {
        let errorMessage = error.response ? error.response.data : 'Erro inesperado. Tente novamente mais tarde.'
        EventBus.$emit('callSnackbar', {
        color: 'error',
        text: errorMessage.error ? errorMessage.error : 'Erro inesperado. Tente novamente mais tarde.'
      });
      };
    },
    async inputImage(command) {
      if (!this.imgFile) return;
      try {
        const imgLink = await readFile.convertToBase64(this.imgFile);
        command({ 'src': imgLink});
        this.imgFile = null;     
        this.dialog = !this.dialog; 
      } catch (error) {
      }
    },
    inputImageLink(command) {
      if (!this.imgLink) return;
      command({ 'src': this.imgLink});
      this.imgLink = null;     
      this.dialog = !this.dialog;
    },
    async inputCoverImage() {
      if (!this.coverImgFile) return;
      let fd = new FormData();
      fd.append('file', this.coverImgFile);
      try {
        const response = await ArticleService.uploadImage(fd);
        return response.data ? response.data.path : null;
      } catch (error) {
      }
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  async created() {
    try {
      const {data} = await TagsService.load();
      this.tagList = data ? data : [];
    } catch (error) {
     EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar temas.'
      });
    }
  }
}
</script>

<style>

  .text-editor img{
    max-width: 100%;
  }
  .v-textarea textarea {
    line-height: 24px !important;
  }
  .text-title {
    font-size: 26px;
    font-weight: 800;
    text-align: center;
  }
  .text-subtitle {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }

</style>
