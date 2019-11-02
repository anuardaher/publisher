<template>
  <div>
		<social-sharing
			:url="postUrl"
			:title="article.title"
			:description="article.subtitle"
			:quote="article.subtitle"
			:hashtags="covertTagsToString"
			twitter-user="ucadvogados"
			inline-template>
			<div class="social-icons ml-auto">
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on }">
						<v-btn
							text
							v-on="on"
						>
						<v-icon color="grey">mdi-share</v-icon>
							<span v-if="!$vuetify.breakpoint.xsOnly">Compartilhar</span>
						</v-btn>
					</template>
					<v-list style="display: flex">
						<v-list-item>
							<network network="facebook">
								<button class="mdi mdi-facebook mdi-24px"></button>
							</network>
						</v-list-item>
						<v-list-item>
							<network network="twitter">
								<button class="mdi mdi-twitter mdi-24px"></button>
							</network>		
						</v-list-item>
						<v-list-item>
							<network network="linkedin">
								<button class="mdi mdi-linkedin mdi-24px"></button>
							</network>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</social-sharing>
  </div>
</template>

<script>
import Utils from '../../utils/utils'

export default {
	data: () => ({
		BASE_URL: process.env.BASE_URL,
	}),
	props: {
     article: {
       type: Object,
       default: () => {}
     },
  },
	computed: {
		 covertTagsToString() {
      if (this.article.tags) {
        const tags = this.article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, '');
        return formatedTags;
      }
    },
    postUrl() {
      return  `${this.BASE_URL}${Utils.normalizeLink(this.article)}`
    },
	}
}
</script>

<style>

</style>