<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Fake order protection</p>
      <ToggleSwitch
        v-model="authOrder"
        @click.native.prevent="toggleProtection"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "SettingsSetting",
  data() {
    return {
      authOrder: this.$auth?.user?.restaurant?.authOrder || false,
    };
  },
  methods: {
    async toggleProtection() {
      try {
        await this.$managerApi.toggleProtection();
        this.authOrder = !this.authOrder;
        this.$nuxt.$emit(
          "success",
          `Fake order protection is ${this.authOrder ? "Enabled" : "Disabled"}`
        );
      } catch (error) {
        console.error(error);
        this.$nuxt.$emit(
          "error",
          `Fake order protection is not ${
            this.authOrder ? "Enabled" : "Disabled"
          }`
        );
      }
    },
  },
};
</script>
