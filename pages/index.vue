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
              href="#faq"
              >FAQ</a
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
    <section class="bg-white" id="process">
      <div class="container px-4 py-4 mx-auto" id="process">
        <div class="flex flex-col justify-center items-center mt-10 mb-5">
          <h1 class="text-4xl text-gray-700 font-bold">
            How does it
            <span class="text-green-500 underline decoration-green-500"
              >Work</span
            >?
          </h1>
          <p class="text-gray-600 text-center">
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
            <h3 class="text-2xl font-semibold mb-3">
              2. Add categories & items
            </h3>
            <img
              loading="lazy"
              src="/images/items.webp"
              class="max-w-64 h-auto"
            />
            <p class="text-gray-600 px-4 mt-3">
              Fill your menu with a variety of categories, sub-categories,
              items, prices, discounts etc. We'll create the menu for you.
            </p>
          </div>
          <div class="hidden lg:flex justify-center items-center">
            <img loading="lazy" src="/images/arrow-bottom.png" class="w-52" />
          </div>
          <div class="flex flex-col justify-center items-center mb-8">
            <h3 class="text-2xl font-semibold mb-3">
              3. Start receiving orders
            </h3>
            <img
              loading="lazy"
              src="/images/order.webp"
              class="max-w-64 h-auto"
            />
            <p class="text-gray-600 px-4 mt-3">
              Fill your menu with a variety of categories, sub-categories,
              items, prices, discounts etc. We'll create the menu for you.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 bg-green-50" id="feature">
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
    <section class="bg-white py-10" id="faq">
      <div class="container px-6 mx-auto">
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-4xl text-gray-700 font-bold text-center">
            Frequently Asked
            <span class="text-green-500 underline decoration-green-500"
              >Questions</span
            >
          </h1>
        </div>
        <hr class="mt-8 border-gray-200" />
        <div v-for="(faq, key) in faqs" :key="key" class="py-4 border-b">
          <div>
            <button
              class="flex items-center focus:outline-none justify-between w-full"
              @click="activeFaq = activeFaq === key ? null : key"
            >
              <h1 class="pr-3 text-lg text-gray-700 text-left">
                {{ faq.question }}
              </h1>
              <p class="text-green-500">
                <font-awesome-icon
                  :icon="['fas', 'minus']"
                  v-if="key === activeFaq"
                />
                <font-awesome-icon :icon="['fas', 'plus']" v-else />
              </p>
            </button>

            <slide-up-down :active="key === activeFaq" :duration="300">
              <div class="flex pt-4 md:mx-10">
                <span class="border border-green-500"></span>

                <div
                  class="w-full px-4 text-gray-600"
                  v-html="faq.answer"
                ></div>
              </div>
            </slide-up-down>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-green-50 py-10 relative" id="contact">
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
                href="https://wa.me/01301546040/?text=Hello"
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
              <p class="text-green-500">Staff Quarter, Dhanmondi, Dhaka</p>
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
          <div
            class="px-2 lg:px-4 py-6 rounded-xl md:p-8 backdrop-blur-md bg-white/50"
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
    <footer class="bg-white shadow py-6 lg:my-0">
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
            href="#faq"
            class="text-gray-600 transition-colors duration-300 hover:text-green-500"
          >
            FAQ
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
            ScanEating.</nuxt-link
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
      activeFaq: null,
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
          question: "Do my customers need an app to scan a QR Code?",
          answer: `No, they can simply use their phone cameras.`,
        },
        {
          question: "Will all age groups know how to scan a QR Code?",
          answer: `QR Codes have become common, and most customers, regardless of age are familiar with their use. Additionally, most smartphones come with built-in QR Code scanners, eliminating the need for a separate app.`,
        },
        {
          question:
            "Can I upload a new menu in the future and re-use the same QR Code?",
          answer: `Our system supports dynamic QR Codes. It means the QR Code remains the same even when changing your menu. As a result, customers scanning the code will see your latest menu.`,
        },
        {
          question: `How can my 4 waiters view ScanEating orders?`,
          answer: `Generate separate login credentials for each of your waiters in your restaurant's admin panel. Instruct them to log in at scaneating.com using the provided details. This will enable them to access and view all received ScanEating orders.`,
        },
        {
          question: `Does ScanEating work with POS systems?`,
          answer: `ScanEating can seamlessly integrate with your POS system with the Active subscription package (coming soon). Menu items sync with POS and ScanEating orders push to your POS.`,
        },
        {
          question:
            "Why ScanEating app is not listed in the play store at the moment?",
          answer: `We utilize a progressive web application that functions similarly to a traditional app. You can easily install it on your smartphone by following these two steps:
        <ol class="list-disc">
          <li>
            For iOS Safari: Tap the "Share" button and choose "Add to Home Screen". Tap "Add" in the top right corner, and you will find our app icon on your Apple smartphone.
            </li>
          <li>
            For Android Chrome: Tap the "three dot" icon in the top right corner to access the menu. Select "Add to Home screen." Tap the "Add" button in the popup, and you will see our app icon on your Android smartphone.
            </li>
          </ol>`,
        },
        {
          question: "Can my QR code expire?",
          answer: `As long as you keep using our service, your QR code and ScanEating menu link will remain active indefinitely.`,
        },
        {
          question: "Would you be able to create a menu for me?",
          answer: `Yes, I can help you to create a menu for your restaurant. If you have specific requirements or features you'd like to include, please provide us for make a better menu for you.`,
        },
        {
          question:
            "What are the preferred image size and format for ScanEating?",
          answer: `For optimal display, we accept all popular image formats like jpeg, png, webp, etc.`,
        },
        {
          question:
            "Do I have to enable ordering or can I use ScanEating just for the menu?",
          answer: `You can simply turn off the ordering feature and use our platform solely for creating and displaying your menu.`,
        },
        {
          question:
            "Is it possible for customers to pay for their orders using credit cards, Bkash, Nagad or others?",
          answer: `No, we are in the process of integrating credit card and mobile payment systems such as credit cards, Bkash, Nagad, which will be available very soon.`,
        },
        {
          question: "Can I handle menu uploads myself?",
          answer: `Absolutely! ScanEating offers a user-friendly platform for effortlessly creating and customizing your menu.`,
        },
        {
          question: "Can one profile manage multiple restaurants?",
          answer: `Scaneating lets you manage several restaurants, each with unique menus (Coming soon).`,
        },
        // {
        //   question: "Can I quickly generate a menu?",
        //   answer: `Of course! Scaneating provides ready-to-use templates for quick menu creation, or you can design a unique one yourself.`,
        // },
        {
          question: "Can I create a menu without images?",
          answer: `A menu can not be created without photos since images are mandatory.`,
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: `Absolutely! You're free to cancel your subscription at any time.`,
        },
        {
          question: "Can I upgrade my account?",
          answer: `For now, you can contact with us. We are implementing auto upgrade process (Coming soon)`,
        },
        {
          question:
            "If you don't make a payment, will your menu and QR code remain active?",
          answer: `Your menu and QR Code will stay active for 15 more days, and there will adjust charges from your next payment.`,
        },
        {
          question: "What should be the size of the QR Codes?",
          answer: `The QR Code size depends on the phone's distance. For table placement, 4 cm should suffice. A larger size would be ideal for further distances, like at a counter.`,
        },
        {
          question: "Where should I place the QR Codes?",
          answer: `QR Code menus work for dine-in and pickup. Paste QR Codes on tables.`,
        },
        {
          question: "Will my smart menu download on my customers' smartphones?",
          answer: `No, ScanEating QR Codes don't force a PDF download. Customers browse the smart menu, place their orders, and exit the browser.`,
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
