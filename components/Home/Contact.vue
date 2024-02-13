<template>
  <section class="bg-white py-10 relative" id="contact">
    <div class="container px-6 mx-auto relative z-[2]">
      <div class="flex justify-center items-center flex-col">
        <h1 class="mt-2 text-4xl font-bold text-gray-800">
          Get in
          <span class="underline decoration-green-600 text-green-600"
            >touch</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Feel free to contact us with your questions, feedback, or inquiries.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 rounded-xl backdrop-blur-md bg-gray-200/40"
        >
          <div class="rounded-xl p-4 backdrop-blur-lg bg-white/60">
            <span
              class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
            >
              <font-awesome-icon :icon="['far', 'envelope']" class="text-3xl" />
            </span>

            <h2 class="mt-4 text-base font-medium text-gray-800">Email</h2>
            <p class="mb-4 text-sm text-gray-700">
              Our friendly team is here to help.
            </p>
            <a href="mailto:info@scaneating.com" class="text-gray-800"
              >info@scaneating.com</a
            >
            <br />
            <a href="mailto:shafayet@scaneating.com" class="text-gray-800"
              >shafayet@scaneating.com</a
            >
          </div>

          <div class="rounded-xl p-4 backdrop-blur-lg bg-white/60">
            <span
              class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
            >
              <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-3xl" />
            </span>

            <h2 class="mt-4 text-base font-medium text-gray-800">Live chat</h2>
            <p class="mb-4 text-sm text-gray-700">
              Our friendly team is here to help.
            </p>
            <a
              href="https://wa.me/01301546040/?text=Hello"
              target="_blank"
              class="text-gray-800"
              >Start chat <font-awesome-icon :icon="['far', 'comment-dots']"
            /></a>
          </div>

          <div class="rounded-xl p-4 backdrop-blur-lg bg-white/60">
            <span
              class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
            >
              <font-awesome-icon
                :icon="['fas', 'map-location-dot']"
                class="text-3xl"
              />
            </span>

            <h2 class="mt-4 text-base font-medium text-gray-800">Office</h2>
            <p class="mb-4 text-sm text-gray-700">
              Come say hello at our office HQ.
            </p>
            <p class="text-gray-800">Kirtipur, Naogaon, Dhaka</p>
            <p class="text-gray-800">Staff Quarter, Dhanmondi, Dhaka</p>
          </div>

          <div class="rounded-xl p-4 backdrop-blur-lg bg-white/60">
            <span
              class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
            >
              <font-awesome-icon
                :icon="['fas', 'phone-volume']"
                class="text-3xl"
              />
            </span>

            <h2 class="mt-4 text-base font-medium text-gray-800">Phone</h2>
            <p class="mb-4 text-sm text-gray-700">24/7 from 10am to 11:00pm.</p>

            <a href="tel:01728293635" class="text-gray-800">01728-293635</a>
            <br />
            <a href="tel:01645478912" class="text-gray-800">01645-478912</a>
          </div>
        </div>
        <div
          class="px-2 lg:px-4 py-6 rounded-xl md:p-8 backdrop-blur-md bg-gray-200/50"
        >
          <form @submit.prevent="submit">
            <Input
              v-for="(field, i) in inputFields"
              :key="i"
              :field="field"
              v-model="form"
              :errors="errors"
            />

            <button
              class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-800 focus:ring-opacity-50"
              type="submit"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 z-[1] hidden lg:block">
      <Wave />
    </div>
  </section>
</template>
<script>
import Wave from "~/static/images/wave.svg";
export default {
  name: "Contact",
  components: { Wave },
  data() {
    return {
      form: { name: "", email: "", message: "" },
      errors: {},
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Full name",
          name: "name",
          label: { id: "name", title: "Full Name" },
        },
        {
          type: "text",
          placeholder: "Email or Phone",
          name: "email",
          label: { id: "email", title: "Email or Phone" },
        },
        {
          type: "textarea",
          placeholder: "Message",
          name: "message",
          label: { id: "message", title: "Message" },
          textarea: { cols: "5", rows: "5" },
        },
      ];
    },
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$commonApi.requestContact(this.form);
        this.form = { name: "", email: "", message: "" };
        this.$nuxt.$emit("success", "We received your message successfully");
      } catch (error) {
        console.error(error);
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
