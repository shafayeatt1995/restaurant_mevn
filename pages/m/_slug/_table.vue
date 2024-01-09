<template>
  <div>
    <Menu
      :categories="categories"
      :restaurant="restaurant"
      :subCategories="subCategories"
      :items="items"
    />
    <modal v-model="errorModel">
      <p class="text-center text-9xl">😔</p>
      <p class="text-xl text-rose-500 text-center">{{ socialLogin }}</p>
      <div class="mt-4 flex items-center sm:-mx-2 gap-3">
        <Button
          variant="white"
          type="button"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="closeModal"
        >
          Cancel
        </Button>
        <Button
          variant="green"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="login"
        >
          Try again
        </Button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "MenuPage",
  auth: false,
  head() {
    return { title: this.restaurant.name };
  },
  data() {
    return {
      items: [],
      categories: [],
      subCategories: [],
      restaurant: {},
      table: {},
      socialLogin: null,
    };
  },
  computed: {
    errorModel() {
      return !!this.socialLogin;
    },
  },
  async asyncData({ route, env, error }) {
    try {
      const { params } = route;
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      if (res.data.table) {
        const { restaurant, categories, subCategories, items, table } =
          res.data;
        return {
          restaurant,
          categories,
          subCategories,
          items,
          table,
          socialLogin: null,
        };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (e) {
      console.error(e);
      error({ statusCode: 500, message: "Internal Server Error" });
    }
  },
  mounted() {
    this.setInitialData({ restaurant: this.restaurant, table: this.table });
    this.checkError();
  },
  methods: {
    ...mapActions("cart", ["setInitialData"]),
    checkError() {
      const { query } = this.$route;
      if (query.error) {
        this.socialLogin = query.error;
      }
    },
    login() {
      window.localStorage.setItem(
        "socialLogin",
        JSON.stringify(this.$route.params)
      );
      window.open("/api/auth/social-login/google", "_self");
    },
    closeModal() {
      let url = window.location.href;
      if (url.includes("?")) {
        url = url.split("?")[0];
        history.replaceState(null, "", url);
      }
      this.socialLogin = null;
    },
  },
};
</script>
