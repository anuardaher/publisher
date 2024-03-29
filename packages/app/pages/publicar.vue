<template>
  <div>
    <v-row align="center" justify="center">
      <v-col align="center" cols="12">
        <v-btn
          min-width="150"
          rounded
          color="success"
          @click="publish"
          :disabled="checkFields"
          >🚀 Publicar</v-btn
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-n8">
      <v-col xl="6" md="8" lg="8" sm="12">
        <client-only>
          <div class="editor">
            <v-file-input
              v-model="coverImgFile"
              light
              accept="image/*"
              label="Imagem de capa"
              prepend-icon="mdi-image"
              showSize
              :rules="[rules.imageSize]"
            ></v-file-input>
            <v-combobox
              dense
              prepend-icon="mdi-tag"
              v-model="tags"
              chips
              clearable
              label="Selecione temas"
              multiple
              :rules="[rules.tagsSize]"
            />
            <v-divider class="my-2"></v-divider>
            <v-card
              outlined
              tile
              class="mx-auto pa-4 text-editor"
              max-width="100%"
              min-height="300"
            >
              <v-textarea
                v-model="title"
                rows="1"
                auto-grow
                rounded
                class="text-title ml-n4 mb-n8"
                placeholder="Escreva um título..."
                :rules="[rules.titleMaxLength]"
              ></v-textarea>
              <v-textarea
                v-model="subtitle"
                rows="1"
                auto-grow
                rounded
                class="text-subtitle ml-n4"
                placeholder="Escreva um subtítulo..."
                :rules="[rules.subtitleMaxLength]"
              ></v-textarea>
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
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
                  <button
                    class="menubar__button mx-1"
                    @click="commands.horizontal_rule"
                  >
                    <v-icon>mdi-color-helper</v-icon>
                  </button>

                  <button class="menubar__button mx-1" @click="commands.undo">
                    <v-icon>mdi-undo-variant</v-icon>
                  </button>

                  <button class="menubar__button mx-1" @click="commands.redo">
                    <v-icon>mdi-redo-variant</v-icon>
                  </button>
                </div>
              </editor-menu-bar>
              <editor-content
                class="editor__content ma-2 my-4"
                :editor="editor"
              />
            </v-card>
          </div>
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EventBus from '../event-bus'
import Utils from '../utils/utils.js'
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
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  middleware({ store, redirect }) {
    if (!store.getters.state) {
      redirect('/login')
      return EventBus.$emit('callSnackbar', {
        color: 'warning',
        text: 'Você precisa estar logado para publicar'
      })
    }
  },
  head() {
    return {
      title: 'Publicar',
      meta: []
    }
  },
  data() {
    return {
      editor: null,
      valid: true,
      dialog: false,
      title: '',
      subtitle: '',
      tags: [],
      text: '',
      preview: '',
      coverImgFile: null,
      coverImgLink: null,
      imgFile: null,
      imgLink: null,
      rules: {
        required: (value) => !!value || 'Campo Obrigatório',
        minLength: (value) => value.length >= 5 || 'Mínimo de 5 caracteres.',
        titleMaxLength: (value) =>
          value.length <= 80 || 'Máximo de 80 caracteres.',
        subtitleMaxLength: (value) =>
          value.length <= 200 || 'Máximo de 200 caracteres.',
        imageSize: (value) =>
          !value ||
          value.size < 1000000 ||
          'A imagem deve ter o máximo de 1 MB.',
        tagsSize: (value) =>
          value.length <= 5 || 'Você pode escolher até 5 tags.'
      }
    }
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1)
    },
    async publish() {
      const article = {
        title: this.title,
        subtitle: this.subtitle,
        preview: this.preview,
        tags: this.tags,
        text: this.text,
        author: {
          id: this.$store.getters.userId
        },
        img: await this.inputCoverImage()
      }
      try {
        const post = await this.$axios.$post('/articles', article)
        this.$router.push(this.normalizeLink(post))
        return EventBus.$emit('callSnackbar', {
          color: 'success',
          text: 'Sua publicação será analisada antes de ser publicada.'
        })
      } catch (error) {
        let errorMessage = error.response
          ? error.response.data
          : 'Erro inesperado. Tente novamente mais tarde.'
        return EventBus.$emit('callSnackbar', {
          color: 'error',
          text: errorMessage.error
            ? errorMessage.error
            : 'Erro inesperado. Tente novamente mais tarde.'
        })
      }
    },
    async inputCoverImage() {
      if (!this.coverImgFile) return
      let fd = new FormData()
      fd.append('file', this.coverImgFile)
      try {
        const response = await this.$axios.post('/articles/coverImage', fd)
        return response.data ? response.data.path : null
      } catch (error) {
        console.error(error)
        return
      }
    },
    normalizeLink(post) {
      return Utils.normalizeLink(post)
    }
  },
  computed: {
    checkFields() {
      return (
        !this.title || this.text.length < 200 || this.tags.length > 2 || false
      )
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },

  mounted() {
    this.editor = new Editor({
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
        new History()
      ],
      content: '<p> Começe a escrever seu texto aqui 👋</p>',
      onUpdate: ({ getHTML, getJSON }) => {
        this.text = getHTML()
        const preview = getJSON()
        const paragraph = preview.content.find((element) => {
          return (
            element.content &&
            element.type === 'paragraph' &&
            element.content.find((el) => {
              return el.text && el.text.length > 50
            })
          )
        })
        if (paragraph && paragraph.content) {
          this.preview = paragraph.content.find(
            (element) => element.text && element.text.length > 50
          ).text
        } else {
          this.preview = this.subtitle ? this.subtitle : ''
        }
      }
    })
  }
}
</script>

<style>
.text-editor img {
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
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}
.editor__content p {
  font-size: 18px;
}
.editor__content > * {
  width: 100%;
}
.editor__content p img {
  max-width: 100%;
  max-height: 700px;
}
</style>
