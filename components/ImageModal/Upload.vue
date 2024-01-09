<template>
  <div class="mt-5">
    <vue-dropzone
      id="myDropzone"
      ref="myDropzone"
      :options="dropzoneOptions"
      @vdropzone-queue-complete="onSuccess"
    >
      <template v-slot:dz-preview="previewArgs"> </template>
    </vue-dropzone>
    <div class="flex justify-end mt-3">
      <Button variant="white" @click.native.prevent="modal = false">
        Close
      </Button>
    </div>
  </div>
</template>
<script>
let vueDropzone;
if (process.client) {
  vueDropzone = require("vue2-dropzone");
}
import { mapActions } from "vuex";
export default {
  name: "UploadImage",
  ssr: false,
  components: { vueDropzone },
  data() {
    return {
      dropzoneOptions: {
        url: `/api/user/image`,
        headers: {
          authorization: document.cookie
            .split(";")
            .reduce(
              (acc, cookie) =>
                (([name, value]) => (
                  (acc[name.trim()] = decodeURIComponent(value)), acc
                ))(cookie.split("=")),
              {}
            )["auth._token.cookie"],
        },
        paramName: "image",
        acceptedFiles: "image/*",
        maxFilesize: 2,
        maxFiles: 50,
        dictMaxFilesExceeded: "You can't upload more than 20 images at a time",
        dictDefaultMessage: `<div class="flex flex-col items-center" ><p class="text-8xl text-green-600"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" fill="currentColor"/></svg></p>
        <br /> Click or drop file here to upload. Max file size 2 MB.</div>`,
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
    ...mapActions("image", ["reset"]),
    onSuccess() {
      this.reset();
    },
  },
};
</script>

<style>
.dz-error-message {
  display: none !important;
}

@-webkit-keyframes passing-through {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30%,
  70% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    -moz-transform: translateY(-40px);
    -ms-transform: translateY(-40px);
    -o-transform: translateY(-40px);
    transform: translateY(-40px);
  }
}

@-moz-keyframes passing-through {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30%,
  70% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    -moz-transform: translateY(-40px);
    -ms-transform: translateY(-40px);
    -o-transform: translateY(-40px);
    transform: translateY(-40px);
  }
}

@keyframes passing-through {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30%,
  70% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    -moz-transform: translateY(-40px);
    -ms-transform: translateY(-40px);
    -o-transform: translateY(-40px);
    transform: translateY(-40px);
  }
}

@-webkit-keyframes slide-in {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }
}

@-moz-keyframes slide-in {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
    transform: translateY(40px);
  }

  30% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }
}

.dropzone,
.dropzone * {
  box-sizing: border-box;
}

.dropzone {
  min-height: 150px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: white;
  padding: 20px 20px;
}

.dropzone.dz-clickable {
  cursor: pointer;
}

.dropzone.dz-clickable * {
  cursor: default;
}

.dropzone.dz-clickable .dz-message,
.dropzone.dz-clickable .dz-message * {
  cursor: pointer;
}

.dropzone.dz-started .dz-message {
  display: none;
}

.dropzone.dz-drag-hover {
  border-style: solid;
}

.dropzone.dz-drag-hover .dz-message {
  opacity: 0.5;
}

.dropzone .dz-message {
  text-align: center;
  margin: 2em 0;
}

.dropzone .dz-preview {
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 16px;
  min-height: 100px;
}

.dropzone .dz-preview:hover {
  z-index: 1000;
}

.dropzone .dz-preview:hover .dz-details {
  opacity: 1;
}

.dropzone .dz-preview.dz-file-preview .dz-image {
  border-radius: 20px;
  background: #999;
  background: linear-gradient(to bottom, #eee, #ddd);
}

.dropzone .dz-preview.dz-file-preview .dz-details {
  opacity: 1;
}

.dropzone .dz-preview.dz-image-preview {
  background: white;
}

.dropzone .dz-preview.dz-image-preview .dz-details {
  -webkit-transition: opacity 0.2s linear;
  -moz-transition: opacity 0.2s linear;
  -ms-transition: opacity 0.2s linear;
  -o-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}

.dropzone .dz-preview .dz-remove {
  font-size: 14px;
  text-align: center;
  display: block;
  cursor: pointer;
  border: none;
}

.dropzone .dz-preview .dz-remove:hover {
  text-decoration: underline;
}

.dropzone .dz-preview:hover .dz-details {
  opacity: 1;
}

.dropzone .dz-preview .dz-details {
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  font-size: 13px;
  min-width: 100%;
  max-width: 100%;
  padding: 2em 1em;
  text-align: center;
  color: rgba(0, 0, 0, 0.9);
  line-height: 150%;
}

.dropzone .dz-preview .dz-details .dz-size {
  margin-bottom: 1em;
  font-size: 16px;
}

.dropzone .dz-preview .dz-details .dz-filename {
  white-space: nowrap;
}

.dropzone .dz-preview .dz-details .dz-filename:hover span {
  border: 1px solid rgba(200, 200, 200, 0.8);
  background-color: rgba(255, 255, 255, 0.8);
}

.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
  border: 1px solid transparent;
}

.dropzone .dz-preview .dz-details .dz-filename span,
.dropzone .dz-preview .dz-details .dz-size span {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0 0.4em;
  border-radius: 3px;
}

.dropzone .dz-preview:hover .dz-image img {
  -webkit-transform: scale(1.05, 1.05);
  -moz-transform: scale(1.05, 1.05);
  -ms-transform: scale(1.05, 1.05);
  -o-transform: scale(1.05, 1.05);
  transform: scale(1.05, 1.05);
  -webkit-filter: blur(8px);
  filter: blur(8px);
}

.dropzone .dz-preview .dz-image {
  border-radius: 20px;
  overflow: hidden;
  width: 120px;
  height: 120px;
  position: relative;
  display: block;
  z-index: 10;
}

.dropzone .dz-preview .dz-image img {
  display: block;
}

.dropzone .dz-preview.dz-success .dz-success-mark {
  -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
  -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
  -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
  -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
  animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
}

.dropzone .dz-preview.dz-error .dz-error-mark {
  opacity: 1;
  -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
  -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
  -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
  -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
  animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
}

.dropzone .dz-preview .dz-success-mark,
.dropzone .dz-preview .dz-error-mark {
  pointer-events: none;
  opacity: 0;
  z-index: 500;
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  margin-left: -27px;
  margin-top: -27px;
}

.dropzone .dz-preview .dz-success-mark svg,
.dropzone .dz-preview .dz-error-mark svg {
  display: block;
  width: 54px;
  height: 54px;
}

.dropzone .dz-preview.dz-processing .dz-progress {
  opacity: 1;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -ms-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.dropzone .dz-preview.dz-complete .dz-progress {
  opacity: 0;
  -webkit-transition: opacity 0.4s ease-in;
  -moz-transition: opacity 0.4s ease-in;
  -ms-transition: opacity 0.4s ease-in;
  -o-transition: opacity 0.4s ease-in;
  transition: opacity 0.4s ease-in;
}

.dropzone .dz-preview:not(.dz-processing) .dz-progress {
  -webkit-animation: pulse 6s ease infinite;
  -moz-animation: pulse 6s ease infinite;
  -ms-animation: pulse 6s ease infinite;
  -o-animation: pulse 6s ease infinite;
  animation: pulse 6s ease infinite;
}

.dropzone .dz-preview .dz-progress {
  opacity: 1;
  z-index: 1000;
  pointer-events: none;
  position: absolute;
  height: 16px;
  left: 50%;
  top: 50%;
  margin-top: -8px;
  width: 80px;
  margin-left: -40px;
  background: rgba(255, 255, 255, 0.9);
  -webkit-transform: scale(1);
  border-radius: 8px;
  overflow: hidden;
}

.dropzone .dz-preview .dz-progress .dz-upload {
  background: #333;
  background: linear-gradient(to bottom, #666, #444);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0;
  -webkit-transition: width 300ms ease-in-out;
  -moz-transition: width 300ms ease-in-out;
  -ms-transition: width 300ms ease-in-out;
  -o-transition: width 300ms ease-in-out;
  transition: width 300ms ease-in-out;
}

.dropzone .dz-preview.dz-error .dz-error-message {
  display: block;
}

.dropzone .dz-preview.dz-error:hover .dz-error-message {
  opacity: 1;
  pointer-events: auto;
}

.dropzone .dz-preview .dz-error-message {
  pointer-events: none;
  z-index: 1000;
  position: absolute;
  display: block;
  display: none;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease;
  -moz-transition: opacity 0.3s ease;
  -ms-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  font-size: 13px;
  top: 130px;
  left: -10px;
  width: 140px;
  background: #be2626;
  background: linear-gradient(to bottom, #be2626, #a92222);
  padding: 0.5em 1.2em;
  color: white;
}

.dropzone .dz-preview .dz-error-message:after {
  content: "";
  position: absolute;
  top: -6px;
  left: 64px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #be2626;
}

.vue-dropzone {
  border: 2px solid #e5e5e5;
  font-family: Arial, sans-serif;
  letter-spacing: 0.2px;
  color: #777;
  transition: 0.2s linear;
}

.vue-dropzone:hover {
  background-color: #f6f6f6;
}

.vue-dropzone > i {
  color: #ccc;
}

.vue-dropzone > .dz-preview .dz-image {
  border-radius: 0;
  width: 100%;
  height: 100%;
}

.vue-dropzone > .dz-preview .dz-image img:not([src]) {
  width: 200px;
  height: 200px;
}

.vue-dropzone > .dz-preview .dz-image:hover img {
  transform: none;
  -webkit-filter: none;
}

.vue-dropzone > .dz-preview .dz-details {
  bottom: 0;
  top: 0;
  color: #fff;
  background-color: rgba(33, 150, 243, 0.8);
  transition: opacity 0.2s linear;
  text-align: left;
}

.vue-dropzone > .dz-preview .dz-details .dz-filename {
  overflow: hidden;
}

.vue-dropzone > .dz-preview .dz-details .dz-filename span,
.vue-dropzone > .dz-preview .dz-details .dz-size span {
  background-color: transparent;
}

.vue-dropzone > .dz-preview .dz-details .dz-filename:not(:hover) span {
  border: none;
}

.vue-dropzone > .dz-preview .dz-details .dz-filename:hover span {
  background-color: transparent;
  border: none;
}

.vue-dropzone > .dz-preview .dz-progress .dz-upload {
  background: #ccc;
}

.vue-dropzone > .dz-preview .dz-remove {
  position: absolute;
  z-index: 30;
  color: #fff;
  margin-left: 15px;
  padding: 10px;
  top: inherit;
  bottom: 15px;
  border: 2px #fff solid;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1.1px;
  opacity: 0;
}

.vue-dropzone > .dz-preview:hover .dz-remove {
  opacity: 1;
}

.vue-dropzone > .dz-preview .dz-error-mark,
.vue-dropzone > .dz-preview .dz-success-mark {
  margin-left: auto;
  margin-top: auto;
  width: 100%;
  top: 35%;
  left: 0;
}

.vue-dropzone > .dz-preview .dz-error-mark svg,
.vue-dropzone > .dz-preview .dz-success-mark svg {
  margin-left: auto;
  margin-right: auto;
}

.vue-dropzone > .dz-preview .dz-error-message {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  width: 100%;
  text-align: center;
}

.vue-dropzone > .dz-preview .dz-error-message:after {
  display: none;
}
</style>
