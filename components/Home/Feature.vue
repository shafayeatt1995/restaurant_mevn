<template>
  <section class="py-10" id="feature">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-800 font-bold">
          Our
          <span class="text-green-600 underline decoration-green-600"
            >Feature</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Discover what sets us apart from the rest.
        </p>
      </div>
      <div class="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-5">
        <div
          class="px-3 border border-gray-100 bg-white shadow-lg hover-up-2 transition duration-500 hover:translate-y-[-10px] rounded-2xl"
          v-for="(feature, key) in features"
          :key="key"
        >
          <div class="pt-8 px-6 pb-6 text-center">
            <div class="mx-auto mb-4">
              <i :class="feature.icon" class="text-6xl text-green-600" />
            </div>
            <h2 class="mb-4 font-bold font-heading text-gray-800 text-2xl">
              {{ feature.title }}
            </h2>
            <p class="text-sm text-gray-800">
              {{ feature.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Feature",
  data() {
    return {
      features: [
        {
          icon: "fas fa-qrcode",
          title: "QR Code Scanning",
          body: "You can transform your menus into a true reflection of your brand identity. Customize everything from logos, photos, categories, items etc. Unleash your creativity and make your menus uniquely yours!",
        },
        {
          icon: "fas fa-pen-to-square",
          title: "Menu Customization",
          body: "Empower restaurants with a user-friendly menu customization experience! Effortlessly add, update, or remove items, and easily categorize dishes for a seamless and personalized presentation. Take control of your menu with simplicity at your fingertips.",
        },
        {
          icon: "far fa-life-ring",
          title: "Real-Time Updates",
          body: "Granting you a hassle-free experience, our software ensures real-time updates. Stay in the loop with instant notifications on menu changes, item availability, and order status. No more confusion—just a seamless and smooth experience for both customers and your dedicated restaurant staff.",
        },
        {
          icon: "fas fa-chart-pie",
          title: "Analytics and Reporting",
          body: "Enhance your decision-making process with our analytics and reporting tools tailored for restaurant owners. Gain valuable insights into popular dishes, peak dining hours, and customer preferences. This data empowers you to make informed decisions, optimizing both your offerings and operations. To get started, incorporate the yarn add command, for instance, yarn add qr-code-scanner for efficient package installation.",
        },
        {
          icon: "far fa-bell",
          title: "Notifications",
          body: "Keep a direct line to your customers by sending personalized notifications straight to their phones. Whether it's updates on special offers, new menu items, or order confirmations, stay connected and make their experience with your restaurant even more engaging.",
        },
        {
          icon: "fas fa-headset",
          title: "CustomerSupport",
          body: "we're all about outstanding customer support. Our dedicated team is here to assist you promptly and effectively. We're not just offering a product or service – we're committed to ensuring your success with top-notch support every step of the way.",
        },
      ],
    };
  },
};
</script>
