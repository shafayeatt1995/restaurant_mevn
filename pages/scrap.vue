<template>
  <div class="mx-auto w-[1050px] h-[800px]">
    <form @submit.prevent="extract">
      <input class="border" v-model="url" />
      <Button>Extract</Button>
    </form>

    <div>
      <p>{{ product }}</p>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      url: "https://menu.instalacarte.com/menu/s/en/EUROPEAN-BAKERY/pastry/cheese/raspberry-cheesecake-mini/",
      product: {
        name: "",
        description: "",
        price: "",
      },
    };
  },
  methods: {
    async extract() {
      try {
        const response = await this.$commonApi.proxy({ url: this.url });
        const doc = new DOMParser().parseFromString(response, "text/html");
        console.log(doc);
        const name = doc.querySelector(
          ".product-page__product-name.text-overflow"
        );
        const description = doc.querySelector(
          ".product-page__product-description"
        );
        const price = doc.querySelector(".product-page__product-price.no-wrap");
        this.product.name = name ? name.innerHTML : "";
        this.product.description = description ? description.innerHTML : "";
        this.product.price = price ? price.innerHTML.split(" ")[0] ?? "" : "";
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
