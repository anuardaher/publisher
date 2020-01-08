<template>
	<div class="mr-2">
    <div class="text-center">
      <v-icon class="mr-n2" :color="isLiked(article) ? 'red' : 'grey'">mdi-heart</v-icon>
      <v-btn fab icon x-small class="body-2 mb-n2" v-show="article.thumbs.length > 0" @click.stop="showLikes(article)">
        {{article.thumbs.length}}
      </v-btn>
    </div>
    <div class="">
      <v-btn class="" text :disabled="isLikeButtonLoading" @click="thumbsUp(article)">        
        <span :class="$vuetify.breakpoint.xs ? 'caption' : null"> Curtir </span>
      </v-btn>
    </div>
		<v-dialog persistent v-model="likesDialog" scrollable max-width="400px" :fullscreen="$vuetify.breakpoint.xsOnly">
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
            return this.$axios.$get(`/users/${user}`, {params: {
              projection: {
                firstname: 1,
                lastname: 1,
                username: 1,
                img: 1,
                address: 1
                }
            }})
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