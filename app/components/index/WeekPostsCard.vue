<template>
<client-only>
  <v-col
	xl="3"
	lg="3"
	md="3"
	>
		<v-card class="fixed pa-4" outlined>
			<v-row class="mx-auto" justify="center" align="center">
				<h1 class="title text-center mb-2">Mais discutidos da semana 🔥</h1>
			</v-row>
			<v-row>
				<ol class="ma-2">
					<li	class="mb-2 body-1"
					v-for="article in articles"
					:key="article._id">
						<a :href="normalizeLink(article)">
						{{ article.title }}
						</a>
					</li>					
				</ol>
			</v-row>
		</v-card>
	</v-col>
</client-only>
</template>

<script>
import utils from '../../utils/utils.js';

export default {
	data: () => ({
		articles: []
	}),
	methods: {
		async	getWeekArticles () {
			try {			
				this.articles = await this.$axios.$post('/articles/week-posts')
			} catch (error) {
				return EventBus.$emit('callSnackbar', {
        color: 'error',
        text: 'Erro ao carregar artigos da semana. Tente mais tarde.',
			});
			console.error(error.message)
			}
		}, normalizeLink(article) {
			return utils.normalizeLink(article)
		}
	},
	mounted() {
		this.getWeekArticles();
	}
}
</script>

<style>
</style>