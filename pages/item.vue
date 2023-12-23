<template>
  <Item :editMode="editMode" />
</template>

<script>
export default {
  name: "ItemPage",
  auth: false,
  data() {
    return {
      editMode: true,
    };
  },
  mounted() {
    // this.setEditMode();
  },
  methods: {
    setEditMode() {
      const { editMode, token } = this.$route.query;

      const fullToken = window.localStorage.getItem("auth._token.cookie");
      if (fullToken && editMode && token) {
        const extractToken = fullToken.split(" ")[1];
        if (extractToken === token && editMode === "true") {
          this.editMode = true;
        }
      }
    },
  },
};
</script>
