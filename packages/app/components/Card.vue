<template>
  <v-card class="mx-auto mb-4" max-width="650" max-height="100%" nuxt>
    <v-card-text :class="value.img ? '' : 'mb-n4'">
      <v-btn
        v-if="showDeleteButton"
        class="float-right"
        icon
        @click="$emit('delete-article')"
      >
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
      <NuxtLink :to="`/${value.author.username}`" class="mr-2 float-left">
        <UserImage
          size="44"
          :img="value.author.img"
          :author="value.author.firstname"
          letterStyle="headline"
        />
      </NuxtLink>
      <div>
        <NuxtLink
          :to="`/${value.author.username}`"
          class="font-weight-bold grey--text text--darken-4"
        >
          {{ value.author ? `${value.author.firstname} ${value.author.lastname}` : "" }} </NuxtLink
        ><br />
        <span><timeago :datetime="value.createdAt"></timeago></span>
      </div>
    </v-card-text>
    <NuxtLink :to="normalizeLink(value)">
      <v-img height="200px" v-if="value.img" :src="value.img">
      </v-img>
      <v-card-title class="grey--text text--darken-4 text-h5">{{
        value.title
      }}</v-card-title>
      <v-card-text>
        <span
          class="my-2 grey--text text--darken-2"
          v-text="minimizeText(value.preview)"
        ></span>
      </v-card-text>
    </NuxtLink>
    <client-only>
      <v-row>
        <v-col cols="4">
          <LikeButton :article="value" />
        </v-col>
        <v-col cols="4">
          <CommentButton :article="value" />
        </v-col>
        <v-col cols="4">
          <ShareButton :article="value" />
        </v-col>
      </v-row>
    </client-only>
  </v-card>
</template>

<script>
import LikeButton from "../components/posts/LikeButton";
import ShareButton from "../components/posts/Sharebutton";
import CommentButton from "../components/posts/CommentsButton";
import EventBus from "../event-bus.js";
import Utils from "../utils/utils.js";
import UserImage from "../components/utils/UserImage";

export default {
  name: "card",
  components: {
    LikeButton,
    ShareButton,
    CommentButton,
    UserImage,
  },
  data: () => ({}),
  props: {
    value: {
      type: Object,
      default: {},
    },
    showDeleteButton: Boolean,
  },
  methods: {
    covertTagsToString(article) {
      if (article.tags) {
        const tags = article.tags.map((tag) => tag.name);
        const formatedTags = tags.toString().replace(/\s/g, "");
        return formatedTags;
      }
    },
    minimizeText(text) {
      return text ? text.slice(0, 150).concat("...") : "";
    },
    getPostUrl(post) {
      return `${process.env.BASE_URL}${Utils.normalizeLink(post)}`;
    },
    normalizeLink(post) {
      return Utils.normalizeLink(post);
    },
  },
};
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
