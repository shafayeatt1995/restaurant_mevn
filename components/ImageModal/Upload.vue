<template>
  <div class="mt-5">
    <vue-dropzone
      id="myDropzone"
      ref="myDropzone"
      :options="dropzoneOptions"
      @vdropzone-success="onSuccess"
    >
      <template v-slot:dz-preview="previewArgs"> </template>
    </vue-dropzone>
    <div class="flex justify-end mt-3">
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
        @click="modal = false"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
let vueDropzone;
if (process.client) {
  vueDropzone = require("vue2-dropzone");
}
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "Upload",
  ssr: false,
  components: { vueDropzone },
  data() {
    return {
      dropzoneOptions: {
        url: `${process.env.API_URL}/api/user/dropzone`,
        headers: {
          authorization: document.cookie
            .split(";")
            .reduce(
              (acc, cookie) =>
                (([name, value]) => (
                  (acc[name.trim()] = decodeURIComponent(value)), acc
                ))(cookie.split("=")),
              {}
            )["auth._token.laravelJWT"],
        },
        paramName: "image",
        acceptedFiles: "image/*",
        maxFilesize: 2, // MB
        maxFiles: 20,
        addRemoveLinks: true,
        dictMaxFilesExceeded: "You can't upload more than 20 images at a time",
        dictDefaultMessage: `<div class="flex flex-col items-center" ><p class="text-8xl text-green-500"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" fill="currentColor"/></svg></p>
        <br /> Drop File Here To Upload. Max File Size 2 MB.</div>`,
      },
    };
  },
  computed: {
    modal: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onSuccess() {
      $nuxt.$emit("success", "Images uploaded successfully");
    },
  },
};
</script>
