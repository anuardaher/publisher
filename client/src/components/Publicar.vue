<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col align="center" md=4 sm=12>
        <v-avatar 
        v-if="$store.getters.userHasImage"
        size="56">
          <img
          src="https://randomuser.me/api/portraits/men/78.jpg"
          alt="John"
          >
        </v-avatar>
        <v-avatar 
        v-if="!$store.getters.userHasImage"
        color="red"
        size="56">
          <span class="white--text headline">{{$store.getters.inicialLetterName}}</span>
        </v-avatar>
        <span class="gray--text ml-2">{{$store.getters.fullName}}</span>        
      </v-col>
      <v-col align="center" md=4 sm=12>
        <v-spacer></v-spacer>
        <div class="my-2">
          <v-btn color="primary" dark>Publicar</v-btn>
        </div>
      </v-col>        
    </v-row>
    <v-row align="center" justify="center">
      <span class="gray--text headline mt-2">Qual será o tipo de publicação?</span><br/>
     </v-row>
    <v-row align="center" justify="center"> 
      <v-radio-group  class="mx-auto" v-model="postType" row>
        <v-radio label="Artigo" value="artigo"></v-radio>
        <v-radio label="Notícia" value="noticia"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row align="center" justify="center" class="mt-n8">
      <v-col 
      md="5"
      sm="12">
      <div class="editor">
        <v-divider class='my-2'></v-divider>
        <v-textarea
        rows="1"
        auto-grow
        row-height="22"
        rounded
        class="text-title ml-n4 mb-n8"
        placeholder="Escreva seu título..."
        ></v-textarea>
        <v-textarea
        rows="1"
        auto-grow
        row-height="22"
        rounded
        class="text-subtitle ml-n4"
        placeholder="Se desejar, escreva um subtítulo..."
        ></v-textarea>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar" >

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
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    
  },
  data() {
    return {
      titulo: null,
      postType: null,
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
        ],
        content: `
          <p>
           Escreva aqui seu texto! 👏
          </p>
        `,
      }),
    }
  },
  props: {
    title: {
      type: String,
      default: "Título default",
    },
    subtitle: {
      type: String,
      default: "Subtítulo default",
    }, 
  },
  computed: {
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>

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
