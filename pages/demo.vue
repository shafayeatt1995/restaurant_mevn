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
  </div>
</template>

<script>
// import printJS from "print-js";

export default {
  name: "DemoPage",
  auth: false,
};
</script>
