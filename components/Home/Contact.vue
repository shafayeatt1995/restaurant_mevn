<template>
  <section class="bg-white py-10 relative" id="contact">
    <div class="container px-6 mx-auto relative z-[2]">
      <div class="flex justify-center items-center flex-col">
        <h1 class="mt-2 text-4xl font-bold text-gray-700">
          Get in
          <span class="underline decoration-green-500 text-green-500"
            >touch</span
          >
        </h1>
        <p class="text-gray-600 text-center">
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
            <p class="mb-2 text-sm text-gray-500">
              Our friendly team is here to help.
            </p>
            <a href="mailto:info@scaneating.com" class="text-green-500"
              >info@scaneating.com</a
            >
            <br />
            <a href="mailto:shafayet@scaneating.com" class="text-green-500"
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
            <p class="mb-2 text-sm text-gray-500">
              Our friendly team is here to help.
            </p>
            <a
              href="https://wa.me/01301546040/?text=Hello"
              target="_blank"
              class="text-green-500"
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
            <p class="mb-2 text-sm text-gray-500">
              Come say hello at our office HQ.
            </p>
            <p class="text-green-500">Kirtipur, Naogaon, Dhaka</p>
            <p class="text-green-500">Staff Quarter, Dhanmondi, Dhaka</p>
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
            <p class="mb-2 text-sm text-gray-500">24/7 from 10am to 11:00pm.</p>

            <a href="tel:01728293635" class="text-green-500">01728-293635</a>
            <br />
            <a href="tel:01645478912" class="text-green-500">01645-478912</a>
          </div>
        </div>
        <div
          class="px-2 lg:px-4 py-6 rounded-xl md:p-8 backdrop-blur-md bg-gray-200/50"
        >
          <form>
            <div class="-mx-2 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600"
                  >First Name</label
                >
                <input
                  type="text"
                  placeholder="Shafayet "
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40 bg-white/60"
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600"
                  >Last Name</label
                >
                <input
                  type="text"
                  placeholder="Al-Anik"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40 bg-white/60"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block mb-2 text-sm text-gray-600"
                >Email or Phone</label
              >
              <input
                type="text"
                placeholder="shafayetalanik@gmail.com"
                class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40 bg-white/60"
              />
            </div>

            <div class="w-full mt-4">
              <label class="block mb-2 text-sm text-gray-600">Message</label>
              <textarea
                class="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40 bg-white/60"
                placeholder="Message"
              ></textarea>
            </div>

            <button
              class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
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
};
</script>
