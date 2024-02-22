<template>
  <div
    class="flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-screen"
  >
    <div
      class="items-center hidden bg-cover bg-center lg:flex flex-1 px-10"
      :style="imageUrl"
    >
      <h2 class="text-gray-200 text-7xl text-center">
        Complete digital menu solution
      </h2>
    </div>
    <div class="px-6 py-8 md:px-8 flex items-center flex-1">
      <form class="w-full" @submit.prevent="login">
        <img loading="lazy" class="w-20" src="/logo.png" alt="logo" />

        <h1
          class="mt-3 text-2xl font-semibold text-gray-700 capitalize sm:text-3xl"
        >
          sign In
        </h1>
        <div class="flex justify-center" v-if="$route.query.demo === true">
          <div class="flex flex-col justify-center max-w-96">
            <div class="grid grid-cols-2 gap-10 border py-2 px-3 items-center">
              <p class="text-gray-700">Manager</p>
              <Button @click.native.prevent="demoSign('manager')"
                >sign In</Button
              >
            </div>
            <div class="grid grid-cols-2 gap-10 border py-2 px-3 items-center">
              <p class="text-gray-700">Waiter</p>
              <Button @click.native.prevent="demoSign('waiter')"
                >sign In</Button
              >
            </div>
          </div>
        </div>

        <Input
          v-for="(field, i) in fields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />

        <div class="mt-6">
          <Button
            class="w-full"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            Sign in
          </Button>

          <p class="mt-4 text-center text-gray-700">or sign in with</p>

          <button
            class="w-full flex items-center justify-center px-6 py-3 mt-4 text-gray-700 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
            @click="socialLogin"
            type="button"
          >
            <svg class="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span class="mx-2">Sign in with Google</span>
          </button>

          <div class="mt-6 text-center">
            <p class="text-gray-700 text-lg">
              Don’t have an account yet?
              <nuxt-link
                :to="{ name: 'auth-signup' }"
                class="text-green-500 hover:underline font-bold text"
              >
                Sign up
              </nuxt-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  auth: "guest",
  head() {
    return { title: "Login - " + this.pageTitle };
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          type: "text",
          placeholder: "Email or phone",
          icon: "far fa-envelope",
          name: "email",
        },
        {
          type: "password",
          placeholder: "Password",
          icon: "fas fa-lock",
          name: "password",
        },
      ],
      form: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapGetters(["pageTitle"]),
    imageUrl() {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      return `background-image: url('/images/slider/${randomNumber}.jpg');`;
    },
  },

  methods: {
    async login() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$auth.loginWith("cookie", { data: this.form });
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
    socialLogin() {
      window.open("/api/auth/social-login/google", "_self");
    },
    async demoSign(type) {
      if (type === "manager") {
        await this.$auth.loginWith("cookie", {
          data: { email: "manager@demo.com", password: "12345678" },
        });
      } else {
        await this.$auth.loginWith("cookie", {
          data: { email: "waiter@demo.com", password: "12345678" },
        });
      }
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
