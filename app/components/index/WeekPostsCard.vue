<template>
<client-only>
		<v-card class="pa-4" outlined>
			<v-row class="mx-auto" justify="center" align="center">
				<h1 class="title text-center mb-2">Mais discutidos da semana</h1>
			</v-row>
			<v-row>
				<ol class="ma-2">
					<li	class="mb-2 body-2"
					v-for="article in articles"
					:key="article._id">
						<a style="text-decoration: none" :href="normalizeLink(article)">
						{{ article.title }}
						</a>
					</li>					
				</ol>
			</v-row>
		</v-card>
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