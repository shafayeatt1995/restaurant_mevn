<template>
  <div>
    <div class="relative">
      <div class="flex space-x-3 border-b">
        <button
          v-for="(tab, idx) in tabsData"
          :key="idx"
          ref="tabButton"
          class="pt-2 pb-3"
          @click="setActiveTabIndex(idx)"
        >
          {{ tab.label }}
        </button>
      </div>
      <span
        class="absolute bottom-0 block h-1 bg-teal-500 transition-all duration-300"
        :style="{
          left: tabUnderlineLeft + 'px',
          width: tabUnderlineWidth + 'px',
        }"
      ></span>
    </div>
    <div class="py-4">
      <p>{{ tabsData[activeTabIndex].content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsData: [
        {
          label: "This Text",
          content:
            "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
        },
        {
          label: "That Text",
          content:
            "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
        },
      ],
      activeTabIndex: 0,
      tabUnderlineWidth: 0,
      tabUnderlineLeft: 0,
    };
  },
  mounted() {
    this.setTabPosition();
    window.addEventListener("resize", this.setTabPosition);
  },
  watch: {
    activeTabIndex() {
      this.setTabPosition();
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setTabPosition);
  },
  methods: {
    setActiveTabIndex(idx) {
      this.activeTabIndex = idx;
    },
    setTabPosition() {
      const currentTab = this.$refs.tabButton[this.activeTabIndex];
      this.tabUnderlineLeft = currentTab?.offsetLeft || 0;
      this.tabUnderlineWidth = currentTab?.clientWidth || 0;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
