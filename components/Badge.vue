<template>
  <div
    class="inline-flex items-center px-3 py-1 rounded-full gap-x-2"
    :class="variantClass"
  >
    <font-awesome-icon v-if="icon" :icon="icon" />
    <h2 class="text-sm font-normal">{{ title }}</h2>
    <font-awesome-icon v-if="backIcon" :icon="backIcon" />
  </div>
</template>
<script>
export default {
  name: "BadgeGreen",
  props: {
    variant: { type: String, default: "green" },
    title: String,
    icon: Array,
    backIcon: Array,
  },
  computed: {
    variantClass() {
      if (this.variant === "green") {
        return "text-green-500 bg-green-100/60";
      } else if (this.variant === "complete") {
        return "text-green-500 bg-green-100/60";
      } else if (this.variant === "blue") {
        return "text-blue-500 bg-blue-100/60";
      } else if (this.variant === "gray") {
        return "text-gray-500 bg-gray-100/60";
      } else if (this.variant === "pink") {
        return "text-pink-500 bg-pink-100/60";
      } else if (this.variant === "yellow") {
        return "text-yellow-500 bg-yellow-100/60";
      } else if (this.variant === "purple") {
        return "text-purple-500 bg-purple-100/60";
      } else if (this.variant === "red") {
        return "text-red-500 bg-red-100/60";
      } else if (this.variant === "amber") {
        return "text-amber-500 bg-amber-100/60";
      } else if (this.variant === "pending") {
        return "text-amber-500 bg-amber-100/60";
      } else if (this.variant === "active") {
        return "text-sky-500 bg-sky-100/60";
      } else if (this.variant === "sky") {
        return "text-sky-500 bg-sky-100/60";
      } else if (this.variant === "rose") {
        return "text-rose-500 bg-rose-100/60";
      } else if (this.variant === "cancel") {
        return "text-rose-500 bg-rose-100/60";
      } else if (this.variant === "white") {
        return "text-grey-700 bg-white border border-gray-100";
      }
    },
  },
};
</script>
