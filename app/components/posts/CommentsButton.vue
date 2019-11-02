<template>
  <div>
		<v-btn class="ml-1" text @click.native="scrollTo('#facebook-comments')">
			<v-icon color="grey" class="mr-1">mdi-comment</v-icon>
			<span v-if="!$vuetify.breakpoint.xsOnly">Comentar</span>
		</v-btn>
  </div>
</template>

<script>
import Utils from '../../utils/utils'

export default {
	props: {
		article: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		normalizeLink() {
      return Utils.normalizeLink(this.article)
		},
		scrollTo: function (hashtag) {
			if (this.$route.path == "/") {
				this.$router.push(this.normalizeLink(this.article) + hashtag)
			} else {
					location.href = hashtag
			}
    }
	},
}
</script>

<style>

</style>