<template>
  <div>This option is on our list and will be added shortly.</div>
</template>
<script>
export default {
  name: "SettingsDomain",
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
  methods: {},
};
</script>
