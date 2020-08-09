<template>
  <div>
    <v-avatar
    :size="size"
    color="thirdy"
    class="user-avatar"
    >
        <v-img
        v-if="img"
        :src="imageUrl(img)"
        :alt="author.firstname"
        ></v-img>
        <span v-else :class="`primary--text ${letterStyle}`">
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
            if (/http/.test(path))
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

.user-avatar {
    border: 1px solid;
}

</style>