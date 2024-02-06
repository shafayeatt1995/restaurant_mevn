<template>
  <div>
    <form @submit.prevent="updateProfile">
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="flex justify-end mt-3">
        <Button type="submit" :loading="loading">Update Profile</Button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "SettingsProfile",
  data() {
    return {
      form: {
        name: this.$auth.user.name || "",
      },
      errors: {},
      loading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Profile name",
          name: "name",
          label: { id: "name", title: "Profile Name" },
        },
      ];
    },
  },
  methods: {
    async updateProfile() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$userApi.updateProfile(this.form);
        await this.$auth.fetchUser();
        this.$nuxt.$emit("success", "Profile updated successfully");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
