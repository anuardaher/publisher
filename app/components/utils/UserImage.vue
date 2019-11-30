<template>
  <div>
    <v-avatar
    :size="size"
    color="grey"
    >
        <v-img
        v-if="img"
        :src="imageUrl(img)"
        :alt="author.firstname"
        ></v-img>
        <span v-if="!img" :class="`white--text ${letterStyle}`">
            {{ getFirstLetter }}
        </span> 
    </v-avatar>     
  </div>
</template>

<script>
export default {
    data: () => ({
        BASE_URL: process.env.BASE_URL,
    }),
    props: {
        img: String,
        size: String,
        author: String,
        letterStyle: String
    },
    methods: {
        imageUrl (path) {
            if (!path) return ""
            if (/https/.test(path))
                return path
            return `${this.BASE_URL}/${path}`
        },
    },
    computed: {
        getFirstLetter() {
            if (!this.author) return ""
            return this.author.charAt(0).toUpperCase()
        }
    }
}
</script>

<style>

</style>