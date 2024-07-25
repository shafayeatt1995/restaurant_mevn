<template>
  <section class="bg-white py-10" id="faq">
    <div class="container px-6 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-800 font-bold text-center">
          Frequently Asked
          <span class="text-green-600 underline decoration-green-600"
            >Questions</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          We've got answers! Check out our FAQ section below for quick solutions
          to common queries.
        </p>
      </div>
      <hr class="mt-8 border-gray-200" />
      <div v-for="(faq, key) in faqs" :key="key" class="border-b">
        <div>
          <button
            class="flex items-center focus:outline-none justify-between w-full py-4"
            @click="activeFaq = activeFaq === key ? null : key"
          >
            <h2 class="pr-3 text-lg text-gray-800 text-left font-semibold">
              {{ faq.question }}
            </h2>
            <p class="text-green-600">
              <i class="fas fa-minus" v-if="key === activeFaq" />
              <i class="fas fa-plus" v-else />
            </p>
          </button>

          <slide-up-down :active="key === activeFaq" :duration="300">
            <div class="flex pb-4 md:mx-10">
              <span class="border border-green-600"></span>
              <div class="w-full px-4 text-gray-800" v-html="faq.answer"></div>
            </div>
          </slide-up-down>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "FAQ",
  data() {
    return {
      activeFaq: null,
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
        <ol>
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
            "If we don't make a payment, will your menu and QR code remain active?",
          answer: `Your menu and QR Code will not active`,
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
};
</script>
