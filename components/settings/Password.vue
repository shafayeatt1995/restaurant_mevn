<template>
  <div>
    <form @submit.prevent="updatePassword">
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="flex justify-end mt-3">
        <Button type="submit" :loading="loading">Update Password</Button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "SettingsPassword",
  data() {
    return {
      form: {
        old: "",
        new: "",
        confirm: "",
      },
      errors: {},
      loading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "password",
          placeholder: "Old Password",
          name: "old",
          label: { id: "old", title: "Old Password" },
        },
        {
          type: "password",
          placeholder: "New Password",
          name: "new",
          label: { id: "new", title: "New Password" },
        },
        {
          type: "password",
          placeholder: "Confirm Password",
          name: "confirm",
          label: { id: "confirm", title: "Confirm Password" },
        },
      ];
    },
  },
  methods: {
    async updatePassword() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$userApi.updatePassword(this.form);
        this.$nuxt.$emit("success", "Password updated successfully");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
