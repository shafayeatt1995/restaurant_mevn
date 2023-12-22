<template>
  <div>
    <h1>Ami index page</h1>
    <nuxt-link :to="{ name: 'dashboard' }" class="text-blue-500">
      Goto dashboard
    </nuxt-link>
    <br />
    <nuxt-link :to="{ name: 'item' }" class="text-blue-500">
      Goto Item page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  auth: false,
};
</script>
