<template>
  <div class="overflow-hidden">
    <Item editMode />
    <!-- <iframe
      ref="myFrame"
      :src="address"
      class="lg:w-[450px] w-full mx-auto h-screen"
    ></iframe> -->
  </div>
</template>

<script>
export default {
  name: "Editor",
  // layout: "dashboard",
  middleware: "owner",
  head() {
    return { title: "Editor - " + process.env.APP_NAME };
  },
  data() {
    return { address: "" };
  },
  mounted() {
    this.setAddress();
  },
  methods: {
    setAddress() {
      const fullToken = window.localStorage.getItem("auth._token.cookie");
      if (fullToken) {
        const token = fullToken.split(" ")[1];
        const data = { token, editMode: true };
        this.address =
          window.location.origin + "/item?" + new URLSearchParams(data);
      }
    },
  },
};
</script>
