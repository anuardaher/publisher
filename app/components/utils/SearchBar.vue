<template>
  <client-only>
  <v-autocomplete
    ref="search"
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    class="ma-4"
    hide-no-data
    hide-details
    :label="showSearchText"
    single-line
    return-object
    item-text='title'
    clearable
    transition="fade-transition"
    >
      <template v-slot:item="{ item }"> 
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1 white--text"
            >mdi-file-document-box</v-icon>
          </v-list-item-avatar>
          <v-list-item-content 
          @click="$router.push(normalizeLink(item), () => {})">
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.subtitle.slice(0, 40).concat('...')"></v-list-item-subtitle>
          </v-list-item-content>
      </template>
    </v-autocomplete>
    </client-only>
</template>

<script>
import EventBus from '../../event-bus'
import Utils from '../../utils/utils'

export default {
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: {},
  }),
   watch: {
      search (val) {
        val && val !== this.select && this.searchPosts(val)
      },
    },
  methods: {
    async searchPosts(value) {
      if (value.length < 3) return;
      this.loading = true;
      try {
         const data = await this.$axios.$post('/articles/search', {
          data: { title: value },
          projection: { text: 0 },
          options: { limit: 5 },
        });
        this.items = data ? data : [];
      } catch (error) {
        EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar pesquisa. Tente mais tarde.',
      });
      } finally {
          this.loading = false;
      }
    },
    normalizeLink(post) {
        return Utils.normalizeLink(post)
      },
  },
  computed: {
    showSearchText () {
      return this.$vuetify.breakpoint.xs ? null : 'Pesquise'
    }
  },
}
</script>