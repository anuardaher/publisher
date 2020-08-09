<template>
  <client-only>
    <v-card outlined min-height="482" color="fivety" rounded raised :loading="loadingArticles">
      <v-row justify="center" align="center" class="pa-4">
        <div class="text-center text-h5">🔥 NESSA SEMANA 🔥</div>
      </v-row>
      <v-card-text>
        <div class="ma-2">
          <ol v-if="articles.length > 0">
            <li
              class="mb-2 body-2"
              v-for="article in articles"
              :key="article._id"
            >
              <NuxtLink class="grey--text text--darken-2 text-decoration-none" :to="normalizeLink(article)">
                {{ article.title }}
              </NuxtLink>
            </li>
          </ol>
          <div class="text-center" v-else-if="!loadingArticles">
            <div class="text-h2 mb-4">🥱</div>
            <div class="text-body">
              Nenhuma publicação foi feita essa semana
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </client-only>
</template>

<script>
import utils from "../../utils/utils.js";

export default {
  data: () => ({
    articles: [],
    loadingArticles: false
  }),
  methods: {
    async getWeekArticles() {
      try {
        this.loadingArticles = true
        this.articles = await this.$axios.$post("/articles/week-posts");
      } catch (error) {
        return EventBus.$emit("callSnackbar", {
          color: "error",
          text: "Erro ao carregar artigos da semana. Tente mais tarde.",
        });
        console.error(error.message);
      } finally {
         this.loadingArticles = false
      }
    },
    normalizeLink(article) {
      return utils.normalizeLink(article);
    },
  },
  mounted() {
    this.getWeekArticles();
  },
};
</script>

<style></style>
