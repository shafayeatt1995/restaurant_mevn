<template>
  <div>
    <h1>Ami index page anik</h1>
    <nuxt-link :to="{ name: 'dashboard' }" class="text-blue-500">
      Goto dashboard
    </nuxt-link>
    <br />
    <nuxt-link
      :to="{
        name: 'menu-slug-table',
        params: { slug: '1c', table: 'table-1-lx' },
      }"
      class="text-blue-500"
    >
      Goto Item page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "DemoPage",
  auth: false,
};
</script>
