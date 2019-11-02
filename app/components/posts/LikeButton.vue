<template>
	<div>
    <div class="mr-2">
      <v-btn class="" text :disabled="isLikeButtonLoading" @click="thumbsUp(article)">
        <v-icon class="mr-1" :color="isLiked(article) ? 'red' : 'grey'">mdi-heart</v-icon>
      <span v-if="!$vuetify.breakpoint.xsOnly">Curtir</span>
      </v-btn>
      <a class="body-2 mr-2" v-show="article.thumbs.length > 0" @click="showLikes(article)">{{article.thumbs.length}}</a>
    </div>
		<v-dialog v-model="likesDialog" scrollable max-width="400px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card :loading="isLikeListLoading">
        <v-card-title class="px-4 headline">
          <v-btn class="mr-5" icon @click="likesDialog = false">
            <v-icon size="40">mdi-keyboard-backspace</v-icon>
          </v-btn>
          Curtidas
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 400px;">
          <v-list two-line>
            <v-list-item
            v-for="user in likes"
            :key='user._id'
            >
              <v-list-item-avatar color="grey">
                <v-img
                  v-if="user.img"
                  :src="getImageUrl(user.img)"
                  :alt="user.firstname"
                ></v-img>
                <span v-if="!user.img" class="white--text headline">{{user.firstname.charAt(0).toUpperCase()}}</span>
              </v-list-item-avatar>
              <v-list-item-content @click="$router.push(`/${user.username}`, () => {})">
                <a>
                  <v-list-item-title v-text="`${user.firstname} ${user.lastname}`"></v-list-item-title>
                  <v-list-item-subtitle v-text="`${user.address.city} – ${user.address.country}`"></v-list-item-subtitle>
                </a>              
              </v-list-item-content>
              <v-list-item-action>          
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>        
	</div>
</template>

<script>
import EventBus from '../../event-bus.js';

export default {
	data: () => ({
		isLikeButtonLoading: false,
		likesDialog: false,
		likes: [],
		isLikeListLoading: false
	}),
	props: {
     article: {
       type: Object,
       default: () => {}
     },
    },
	methods: {
		async thumbsUp (article) {
      if (!this.$store.getters.state) {
        return EventBus.$emit('callSnackbar', {
            color: 'warning',
            text: 'Você precisa estar logado para curtir uma publicação.',
          });
      }
      try {
        this.isLikeButtonLoading = !this.isLikeButtonLoading
        let userIndex = article.thumbs.indexOf(this.$store.getters.userId)
        if (userIndex > -1) {          
          await this.$axios.$put(`/articles/${article._id}`, {
            "$pull": { "thumbs": this.$store.getters.userId}
          }, { progress: false })
          article.thumbs.splice(userIndex, 1)       
        } else {          
            await this.$axios.$put(`/articles/${article._id}`, {
              "$push": { "thumbs": this.$store.getters.userId}
            }, { progress: false })
            article.thumbs.push(this.$store.getters.userId)           
        }          
      } catch (error) {
          console.error(error)
            EventBus.$emit('callSnackbar', {
            color: 'error',
            text: 'Não foi possível curtir essa publicação. Tente mais tarde.',
          });
        } finally {
          this.isLikeButtonLoading = !this.isLikeButtonLoading
        }
      },
      isLiked(article) {
        return article.thumbs.some(id => id === this.$store.getters.userId)
      },
      async showLikes(article) {
        this.likesDialog = !this.likesDialog
        this.isLikeListLoading = !this.isLikeListLoading
        try {
          this.likes = await Promise.all(article.thumbs.map(user => {
            return this.$axios.$get(`/users/${user}`)
          }))
        } catch (error) {
          this.likesDialog = false
          console.error(error)
          EventBus.$emit('callSnackbar', {
              color: 'error',
              text: 'Não foi possível curtir essa publicação. Tente mais tarde.',
            });
        } finally {
          this.isLikeListLoading = !this.isLikeListLoading
        }
			},
			getImageUrl(path) {
        if (!path) return
        if (/https/.test(path))
          return path
        return `${process.env.BASE_URL}/${path}`;
      },
	}
}
</script>

<style>

</style>