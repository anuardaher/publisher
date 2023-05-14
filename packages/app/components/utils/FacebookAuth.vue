<template>
  <div class="text-center mb-4">
    <v-btn
      color="#3b5998"
      dark
      rounded
      @click="checkLoginStatus()"
      :loaing="loading"
    >
      <v-icon class="mr-2">mdi-facebook</v-icon>
      {{ page == "login" ? "ENTRE" : "PREENCHA" }} COM FACEBOOK
    </v-btn>
  </div>
</template>

<script>
import EventBus from "../../event-bus.js";

export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  mounted() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/pt_BR/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    checkLoginStatus() {
      this.loading = true;
      FB.getLoginStatus((response) => {
        this.processLoginStatus(response);
      });
    },
    processLoginStatus(response) {
      if (response.status == "connected") {
        this.sendLogin(response);
      } else {
        FB.login(
          (response) => {
            if (response.status == "connected") this.sendLogin(response);
            else {
              return EventBus.$emit("callSnackbar", {
                color: "error",
                text: "O login não foi autorizado por você",
              });
            }
          },
          { scope: "public_profile,email" }
        );
      }
    },
    async sendLogin(email) {
      FB.api(
        "/me",
        { fields: "email,first_name,last_name,address,picture.type(large)" },
        async (response) => {
          if (response.error) throw new Error();
          if (this.page == "login") {
            try {
              this.loading = true;
              const data = await this.$axios.$post("/auth/login", {
                email: response.email,
                facebookId: response.id,
              });
              this.$store.dispatch("setToken", data.token);
              this.$store.dispatch("setUser", data.user);
              this.$router.push("/");
            } catch (error) {
              let message = error.response.data
                ? error.response.data
                : "Não foi possível fazer o login";
              return EventBus.$emit("callSnackbar", {
                color: "error",
                text: message,
              });
            } finally {
              this.loading = false;
            }
          } else {
            this.$emit("facebook-register", response);
          }
        }
      );
    },
  },
};
</script>

<style></style>
