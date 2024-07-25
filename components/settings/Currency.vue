<template>
  <div>
    <form @submit.prevent="updateCurrency">
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="flex justify-end mt-3">
        <Button type="submit" :loading="loading">Update Currency</Button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "SettingsCurrency",
  data() {
    return {
      form: {
        currency: this.$auth?.user?.restaurant?.currency || "$",
      },
      errors: {},
      loading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "select",
          placeholder: "Restaurant currency",
          name: "currency",
          label: { id: "currency", title: "Restaurant currency" },
          options: [
            { label: "Dollar $", value: "$" },
            { label: "Taka ৳", value: "৳" },
          ],
        },
      ];
    },
  },
  methods: {
    async updateCurrency() {
      try {
        this.loading = true;
        await this.$managerApi.updateCurrency(this.form);
        await this.$auth.fetchUser();
        this.$nuxt.$emit("success", "Currency successfully updated");
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
