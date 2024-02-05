<template>
  <div>
    <nav class="sticky top-0 bg-white shadow-md z-10">
      <div
        class="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center justify-between">
          <nuxt-link :to="{ name: 'index' }">
            <img
              loading="lazy"
              class="w-auto lg:h-8 h-7"
              src="/full-logo.png"
              alt="logo"
            />
          </nuxt-link>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button
              @click="isOpen = !isOpen"
              type="button"
              class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <font-awesome-icon :icon="['fas', 'align-justify']" />
            </button>
          </div>
        </div>

        <div
          :class="[
            isOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full',
          ]"
          class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md: md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center shadow-xl md:shadow-none"
        >
          <div class="flex flex-col md:flex-row md:mx-6">
            <a
              class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
              href="#home"
              >Home</a
            >
            <a
              class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
              href="#process"
              >Process</a
            >
            <a
              class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
              href="#feature"
              >Feature</a
            >
            <a
              class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
              href="#contact"
              >Contact</a
            >
          </div>

          <div class="flex justify-center md:block">
            <nuxt-link
              class="px-7 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
              :to="{ name: 'auth-login' }"
            >
              Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <header class="bg-white" id="home">
      <div class="relative overflow-hidden lg:h-[calc(100vh_-_60px)]">
        <div class="relative container px-4 py-8 lg:py-16 mx-auto h-full z-[2]">
          <div class="items-center flex h-full flex-col lg:flex-row">
            <div class="flex-1 flex flex-col justify-center">
              <div class="">
                <img src="/logo.png" class="h-20" />
                <h1
                  class="text-3xl font-bold text-gray-800 lg:text-5xl uppercase mt-2"
                >
                  Scan<span
                    class="text-green-500 underline decoration-green-500"
                    >Eating</span
                  >
                </h1>
                <h3 class="text-gray-700 text-xl lg:text-3xl">
                  A Complete Digital Menu Solution
                </h3>
                <p class="mt-3 text-gray-600 text-base lg:text-xl">
                  Take your restaurant one step further! It's time to dive into
                  the digital world. Give your customers a modern experience
                  with a menu they can access on their smartphones using a
                  simple QR code. No more paper menus – just scan, browse, and
                  order
                  <span class="text-2xl">😊</span>
                </p>
              </div>
              <div class="flex mt-5 gap-3">
                <NuxtLink
                  class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
                  :to="{
                    name: 'menu-slug-table',
                    params: { slug: '1c', table: 'table-1-lx' },
                  }"
                  target="_blank"
                >
                  Demo Menu
                </NuxtLink>
                <NuxtLink
                  class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
                  :to="{
                    name: 'auth-login',
                    query: { demo: true },
                  }"
                >
                  Demo Waiter
                </NuxtLink>
              </div>
            </div>

            <div
              class="flex items-center justify-center lg:flex-1 lg:w-1/2 lg:h-full animate-bouncy infinite mt-10 lg:mt-0"
            >
              <img
                class="max-w-full h-96 lg:h-[70vh] object-contain"
                src="/images/menu.webp"
                alt="menu image"
              />
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 z-[1] hidden lg:block">
          <Wave />
        </div>
      </div>
    </header>
    <section class="container px-4 py-4 mx-auto" id="process">
      <div class="flex flex-col justify-center items-center mt-10 mb-5">
        <h1 class="text-4xl text-gray-700 font-bold">
          How does it
          <span class="text-green-500 underline decoration-green-500">Work</span
          >?
        </h1>
        <p class="text-gray-600">
          Provide fantastic experience to your customers!
        </p>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-between text-gray-600 lg:mt-8"
      >
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold mb-3">1. Get QR</h3>
          <img loading="lazy" src="/images/qr.webp" class="max-w-64 h-auto" />
          <p class="text-gray-600 px-4 mt-3">
            Connect with us today and collect your QR code that perfectly
            matches the personality of your establishment.
          </p>
        </div>
        <div class="lg:flex justify-center items-center hidden">
          <img loading="lazy" src="/images/arrow-top.png" class="w-52" />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold mb-3">2. Add categories & items</h3>
          <img
            loading="lazy"
            src="/images/items.webp"
            class="max-w-64 h-auto"
          />
          <p class="text-gray-600 px-4 mt-3">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
        <div class="hidden lg:flex justify-center items-center">
          <img loading="lazy" src="/images/arrow-bottom.png" class="w-52" />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold mb-3">3. Start receiving orders</h3>
          <img
            loading="lazy"
            src="/images/order.webp"
            class="max-w-64 h-auto"
          />
          <p class="text-gray-600 px-4 mt-3">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
      </div>
    </section>
    <section class="py-10 bg-gray-50" id="feature">
      <div class="container px-4 py-4 mx-auto">
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-4xl text-gray-700 font-bold">
            Our
            <span class="text-green-500 underline decoration-green-500"
              >Feature</span
            >
          </h1>
        </div>
        <div class="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-5">
          <div
            class="px-3 border border-gray-100 bg-white rounded shadow hover:shadow-lg hover-up-2 transition duration-500 hover:translate-y-[-10px]"
            v-for="(feature, key) in features"
            :key="key"
          >
            <div class="pt-8 px-6 pb-6 text-center">
              <div class="mx-auto mb-4">
                <font-awesome-icon
                  :icon="feature.icon"
                  class="text-6xl text-green-500"
                />
              </div>
              <h3 class="mb-2 font-bold font-heading text-gray-700 text-lg">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ feature.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-10">
      <div class="container px-6 mx-auto">
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-4xl text-gray-700 font-bold text-center">
            Frequently Asked
            <span class="text-green-500 underline decoration-green-500"
              >Questions</span
            >
          </h1>
        </div>
        <hr class="my-6 border-gray-200" />
        <div v-for="(faq, key) in faqs" :key="key">
          <div>
            <button
              class="flex items-center focus:outline-none justify-between w-full"
            >
              <h1 class="pr-3 text-lg text-gray-700 text-left">
                How can I pay for my appointment ?
              </h1>
              <p class="text-green-500">
                <!-- <font-awesome-icon :icon="['fas', 'plus']" /> -->
                <font-awesome-icon :icon="['fas', 'minus']" />
              </p>
            </button>

            <div class="flex mt-8 md:mx-10">
              <span class="border border-green-500"></span>

              <div class="w-full px-4 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                eum quae. Harum officiis reprehenderit ex quia ducimus minima id
                provident molestias optio nam vel, quidem iure voluptatem,
                repellat et ipsa.
              </div>
            </div>
          </div>
          <hr class="my-8 border-gray-200" />
        </div>
      </div>
    </section>
    <section class="bg-gray-50 py-10 relative" id="contact">
      <div class="container px-6 mx-auto relative z-[2]">
        <div class="flex justify-center items-center flex-col">
          <h1 class="mt-2 text-4xl font-bold text-gray-700">
            Get in
            <span class="underline decoration-green-500 text-green-500"
              >touch</span
            >
          </h1>
        </div>

        <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 rounded-xl backdrop-blur-md bg-white/40"
          >
            <div class="rounded-xl p-4 backdrop-blur-lg bg-white/70">
              <span
                class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['far', 'envelope']"
                  class="text-3xl"
                />
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

            <div class="rounded-xl p-4 backdrop-blur-lg bg-white/70">
              <span
                class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['fab', 'whatsapp']"
                  class="text-3xl"
                />
              </span>

              <h2 class="mt-4 text-base font-medium text-gray-800">
                Live chat
              </h2>
              <p class="mb-2 text-sm text-gray-500">
                Our friendly team is here to help.
              </p>
              <a
                href="https://wa.me/01728293635"
                target="_blank"
                class="text-green-500"
                >Start chat <font-awesome-icon :icon="['far', 'comment-dots']"
              /></a>
            </div>

            <div class="rounded-xl p-4 backdrop-blur-lg bg-white/70">
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
              <p class="text-green-500">Staff Quarter, Dhanmondi, dhaka</p>
            </div>

            <div class="rounded-xl p-4 backdrop-blur-lg bg-white/70">
              <span
                class="p-3 text-green-600 rounded-full bg-green-100 w-16 h-16 flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'phone-volume']"
                  class="text-3xl"
                />
              </span>

              <h2 class="mt-4 text-base font-medium text-gray-800">Phone</h2>
              <p class="mb-2 text-sm text-gray-500">
                24/7 from 10am to 11:00pm.
              </p>

              <a href="tel:01728293635" class="text-green-500">01728-293635</a>
              <br />
              <a href="tel:01645478912" class="text-green-500">01645-478912</a>
            </div>
          </div>
          <div class="p-4 py-6 rounded-xl md:p-8 backdrop-blur-md bg-white/50">
            <form>
              <div class="-mx-2 md:items-center md:flex">
                <div class="flex-1 px-2">
                  <label class="block mb-2 text-sm text-gray-600"
                    >First Name</label
                  >
                  <input
                    type="text"
                    placeholder="Shafayet "
                    class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="flex-1 px-2 mt-4 md:mt-0">
                  <label class="block mb-2 text-sm text-gray-600"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    placeholder="Al-Anik"
                    class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="block mb-2 text-sm text-gray-600"
                  >Email address</label
                >
                <input
                  type="email"
                  placeholder="shafayetalanik@gmail.com"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="w-full mt-4">
                <label class="block mb-2 text-sm text-gray-600">Message</label>
                <textarea
                  class="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
    <footer class="bg-white shadow">
      <div
        class="container flex flex-col items-center justify-between px-6 lg:py-8 mx-auto lg:flex-row"
      >
        <nuxt-link :to="{ name: 'index' }">
          <img
            class="w-auto h-7"
            src="/full-logo.png"
            alt="logo"
            loading="lazy"
          />
        </nuxt-link>

        <div
          class="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0"
        >
          <a
            href="#home"
            class="text-gray-600 transition-colors duration-300 hover:text-green-500"
          >
            Home
          </a>

          <a
            href="#process"
            class="text-gray-600 transition-colors duration-300 hover:text-green-500"
          >
            Process
          </a>

          <a
            href="#feature"
            class="text-gray-600 transition-colors duration-300 hover:text-green-500"
          >
            Feature
          </a>
          <a
            href="#contact"
            class="text-gray-600 transition-colors duration-300 hover:text-green-500"
          >
            Contact
          </a>
        </div>

        <p class="mt-6 text-gray-500 lg:mt-0">
          © Copyright 2023
          <nuxt-link :to="{ name: 'index' }" class="underline">
            Scas<span class="text-green-500">Eating</span>.</nuxt-link
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Wave from "~/static/images/wave.svg";
export default {
  name: "indexPage",
  auth: false,
  components: { Wave },
  head() {
    return { title: `Home - ${this.pageTitle}` };
  },
  data() {
    return {
      isOpen: false,
      features: [
        {
          icon: ["fas", "qrcode"],
          title: "QR Code Scanning",
          body: "You can transform your menus into a true reflection of your brand identity. Customize everything from logos, photos, categories, items etc. Unleash your creativity and make your menus uniquely yours!",
        },
        {
          icon: ["fas", "pen-to-square"],
          title: "Menu Customization",
          body: "Empower restaurants with a user-friendly menu customization experience! Effortlessly add, update, or remove items, and easily categorize dishes for a seamless and personalized presentation. Take control of your menu with simplicity at your fingertips.",
        },
        {
          icon: ["far", "life-ring"],
          title: "Real-Time Updates",
          body: "Granting you a hassle-free experience, our software ensures real-time updates. Stay in the loop with instant notifications on menu changes, item availability, and order status. No more confusion—just a seamless and smooth experience for both customers and your dedicated restaurant staff.",
        },
        {
          icon: ["fas", "chart-pie"],
          title: "Analytics and Reporting",
          body: "Enhance your decision-making process with our analytics and reporting tools tailored for restaurant owners. Gain valuable insights into popular dishes, peak dining hours, and customer preferences. This data empowers you to make informed decisions, optimizing both your offerings and operations. To get started, incorporate the yarn add command, for instance, yarn add qr-code-scanner for efficient package installation.",
        },
        {
          icon: ["far", "bell"],
          title: "Notifications",
          body: "Keep a direct line to your customers by sending personalized notifications straight to their phones. Whether it's updates on special offers, new menu items, or order confirmations, stay connected and make their experience with your restaurant even more engaging.",
        },
        {
          icon: ["fas", "headset"],
          title: "CustomerSupport",
          body: "we're all about outstanding customer support. Our dedicated team is here to assist you promptly and effectively. We're not just offering a product or service – we're committed to ensuring your success with top-notch support every step of the way.",
        },
      ],
      faqs: [
        {
          question: "",
          answer: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["isMobile", "pageTitle"]),
  },
};
</script>

<style lang="scss" scoped>
@keyframes bouncy {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bouncy {
  animation: bouncy 4s infinite;
}
</style>
