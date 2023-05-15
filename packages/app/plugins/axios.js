export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    $axios.setHeader('Authorization', `Bearer ${store.getters.token}`)
  })
}
