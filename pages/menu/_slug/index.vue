<template>
  <div>
    <Menu
      :categories="categories"
      :restaurant="restaurant"
      :subCategories="subCategories"
      :featureCategories="featureCategories"
      :items="items"
      :tableList="tableList"
    />
    <modal v-model="errorModel">
      <p class="text-center text-9xl">😔</p>
      <p class="text-xl text-rose-500 text-center">{{ socialLogin }}</p>
      <div class="mt-4 flex items-center sm:-mx-2 gap-3">
        <Button
          class="w-full tracking-wide flex-1"
          @click.native.prevent="login"
        >
          Try again
        </Button>
        <Button
          variant="red"
          type="button"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="closeModal"
        >
          Cancel
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
    return { title: `${this.restaurant.name} - ${this.pageTitle}` };
  },
  data() {
    return {
      items: [],
      categories: [],
      subCategories: [],
      featureCategories: [],
      tableList: [],
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
  async asyncData({ route, error, store }) {
    try {
      const { params } = route;
      let res = await axios.get(store.state.baseUrl + "/api/menu", {
        params,
      });
      if (res.data.table) {
        const {
          restaurant,
          categories,
          subCategories,
          items,
          table,
          featureCategories,
          tableList,
        } = res.data;
        return {
          restaurant,
          categories,
          subCategories,
          items,
          table,
          tableList,
          featureCategories,
          socialLogin: null,
        };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      error({ statusCode: 500, message: "Something wrong. Please try again" });
    }
  },
  mounted() {
    this.setInitialData({ restaurant: this.restaurant, table: this.table });
    const { additionalMode, email } = this.$route.query;
    if (additionalMode && email) {
    } else {
      this.setCartItems();
    }
    this.checkError();
  },
  methods: {
    ...mapActions("cart", ["setInitialData", "setCartItems"]),
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
