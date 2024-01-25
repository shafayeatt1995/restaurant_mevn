<template>
  <div>
    <h1>Ami index page anik</h1>
    <nuxt-link :to="{ name: 'dashboard' }" class="text-blue-500">
      Goto dashboard
    </nuxt-link>
    <br />
    <nuxt-link
      :to="{ name: 'menu-slug-table', params: { slug: '1c', table: '1fg' } }"
      class="text-blue-500"
    >
      Goto Item page
    </nuxt-link>
    <div>
      <button @click="printDocument()">demo print</button>
    </div>
  </div>
</template>

<script>
// import printJS from "print-js";

export default {
  name: "DemoPage",
  auth: false,
  methods: {
    printDocument() {
      // const res = await this.$orderApi.print({ name: "anik" });
      // console.log(res);
      // const content =
      //   "<html><head><title>Your Document</title></head><body><p>Hello, this is your document.</p></body></html>";
      // // Customize print options if needed
      // const options = {
      //   printable: content,
      //   type: "html",
      //   targetStyles: ["*"],
      //   documentTitle: "Your Document",
      // };
      // // Trigger the print without browser print prompt
      // printJS(options);
    },
  },
};
</script>
