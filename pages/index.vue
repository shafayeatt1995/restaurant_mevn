<template>
  <div>
    <h1>Ami index page anik</h1>
    <nuxt-link :to="{ name: 'dashboard' }" class="text-blue-500">
      Goto dashboard
    </nuxt-link>
    <br />
    <nuxt-link
      :to="{ name: 'm-slug-table', params: { slug: '1c', table: '1n' } }"
      class="text-blue-500"
    >
      Goto Item page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  auth: false,
  async asyncData(context) {
    if (process.client) {
      console.log(context);
    }
  },
};
</script>
