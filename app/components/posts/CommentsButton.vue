<template>
  <div class="mr-2">
    <div class="text-center">	
      <v-icon color="grey" class="">mdi-comment</v-icon> 
    </div>
		<v-btn class="" text @click.native="scrollTo('#facebook-comments')">
			<div><span :class="$vuetify.breakpoint.xs ? 'caption' : null">Comentar</span></div>
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
			if (this.$route.path == "/blog") {
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