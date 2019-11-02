<template>
    <v-card
    class="mx-auto"
    max-width="650"
    max-height="100%"
    nuxt
    >
    <v-card-text :class="value.img ? '' : 'mb-n4'" >
      <a @click="$router.push(`/${value.author.username}`)" class="mr-2 float-left">
        <v-avatar 
        size="40px"
        v-if="value.author.img">
          <v-img
          :src="getImageUrl(value.author.img)"
          :alt="value.author.firstname"
          ></v-img>
        </v-avatar>
        <v-avatar
        v-if="!value.author.img" 
        color="grey"
        size="40px">
          <span class="white--text headline">{{value.author.name.charAt(0).toUpperCase()}}</span>
        </v-avatar>
      </a>
      <div>
        <a
        @click="$router.push(`/${value.author.username}`)"
        class="text--primary font-weight-bold">
        {{ value.author ? value.author.name : '' }}
        </a><br>
        <span><timeago :datetime='value.createdAt'></timeago></span>   
      </div>                     
    </v-card-text>
    <a @click="$router.push(normalizeLink(value), () => {})">
      <v-img
        height="200px"
        v-if="value.img"
        :src='getImageUrl(value.img)'
      >
      </v-img>
      <v-card-title>{{ value.title }}</v-card-title>
      <v-card-text>
        <span class="text--primary my-2" v-text='minimizeText(value.preview)'></span>
      </v-card-text>
    </a>
    <client-only>
      <v-card-actions>
        <v-spacer></v-spacer>
        <LikeButton :article="value"/>
        <CommentButton :article="value"/>
        <ShareButton :article="value"/>
        <v-spacer></v-spacer>
      </v-card-actions>
    </client-only>
  </v-card>
</template>

<script>
import LikeButton from '../components/posts/LikeButton'
import ShareButton from '../components/posts/Sharebutton'
import CommentButton from '../components/posts/CommentsButton'
import EventBus from '../event-bus.js'
import Utils from '../utils/utils.js'

export default {
    name: 'card',
    components: {
      LikeButton,
      ShareButton,
      CommentButton,
    },
    data: () => ({
    }),
    props: {
     value: {
       type: Object,
       default: {}
     },
    },
    methods: {
      covertTagsToString(article) {
      if (article.tags) {
        const tags = article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, '');
        return formatedTags;
      }
    },
      minimizeText (text) {
        return text ? text.slice(0,150).concat('...') : '';
      },
      getImageUrl(path) {
        if (!path) return
        if (/https/.test(path))
          return path
        return `${process.env.BASE_URL}/${path}`;
      },
      getPostUrl(post) {
        return `${process.env.BASE_URL}${Utils.normalizeLink(post)}`
      },
      normalizeLink(post) {
        return Utils.normalizeLink(post)
      }
    },
    computed: {
    }
}
</script>

<style>
.social-icons-card .mdi {
  margin-left: 10px;
  margin-right: 10px;
  color: #0000008a;
}
.v-card__title {
  word-break: normal;
}

</style>