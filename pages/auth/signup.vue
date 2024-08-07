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
      <form
        class="w-full"
        @submit.prevent="emailMode ? signup() : (emailMode = true)"
      >
        <nuxt-img
          format="webp"
          loading="lazy"
          decode="async"
          class="w-20"
          src="/logo.png"
          alt="logo"
        />

        <h1
          class="mt-3 text-2xl font-semibold text-gray-700 capitalize sm:text-3xl"
        >
          Create a new Account
        </h1>

        <div class="mt-8" />
        <slide-up-down :active="emailMode" :duration="300">
          <Input
            v-for="(field, i) in fields"
            :key="i"
            :field="field"
            v-model="form"
            :errors="errors"
          />
          <div class="mt-5">
            <small class="text-rose-700">
              <i
                >Currently email signup feature is turned off. please use google
                login</i
              >
            </small>
          </div>
        </slide-up-down>
        <div class="mt-6">
          <Button
            class="w-full"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            {{ emailMode ? "Sign Up" : "Sign Up with email" }}
          </Button>

          <p class="mt-4 text-center text-gray-700">or sign up with</p>

          <button
            class="w-full flex items-center justify-center px-6 py-3 mt-4 text-gray-700 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
            type="button"
            @click="socialLogin"
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

            <span class="mx-2">Sign up with Google (Recommended)</span>
          </button>

          <div class="mt-6 text-center">
            <p class="text-gray-700 text-lg">
              Already have a account?
              <nuxt-link
                :to="{ name: 'auth-login' }"
                class="text-green-500 hover:underline font-bold text"
              >
                Sign in
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
  name: "Signup",
  auth: "guest",
  head() {
    return { title: "Signup - " + this.pageTitle };
  },
  data() {
    return {
      loading: false,
      emailMode: false,
      errors: {},
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: null,
      },
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      return [
        {
          type: "text",
          placeholder: "Name",
          icon: "far fa-user",
          name: "name",
        },
        {
          type: "email",
          placeholder: "Email",
          icon: "far fa-envelope",
          name: "email",
        },
        {
          type: "password",
          placeholder: "Password",
          icon: "fas fa-lock",
          name: "password",
        },
        {
          type: "password",
          placeholder: "Confirm Password",
          icon: "fas fa-lock",
          name: "confirmPassword",
        },
      ];
    },
    imageUrl() {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      return `background-image: url('/images/slider/${randomNumber}.jpg');`;
    },
  },
  methods: {
    async signup() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$authApi.signup(this.form);
        await this.$auth.loginWith("cookie", { data: this.form });
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },

    socialLogin() {
      window.open("/api/auth/social-login/google", "_self");
    },
  },
};
</script>
