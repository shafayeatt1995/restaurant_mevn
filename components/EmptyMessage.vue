<template>
  <div class="flex flex-col w-full items-center">
    <div class="p-3 mx-auto text-Gray-900 bg-gray-100 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
    <h1 class="mt-3 text-lg text-gray-600">{{ title }}</h1>
    <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
      <Button @click.native.prevent="$emit('action')" v-if="buttonText">
        <font-awesome-icon
          v-if="icon"
          :icon="icon"
          class="text-xl mr-2"
          :class="iconClass"
        />
        <span>{{ buttonText }}</span>
      </Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmptyMessage",
  props: { title: String, buttonText: String, icon: Array, iconClass: String },
};
</script>
