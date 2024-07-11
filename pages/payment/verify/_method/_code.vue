<template>
  <div class="container mx-auto">
    <div class="h-[calc(100vh_-_250px)] flex justify-center items-center">
      <div class="text-center">
        <div class="relative w-[550px] mt-12" ref="verify"></div>
        <p class="font-medium text-2xl">
          Don't close the browser! We are verifying your payment
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { decode, getItem, initLottie } from "@/utils";

export default {
  name: "BookingVerifyPage",
  data() {
    return { errorMessage: "" };
  },
  async mounted() {
    this.verifyPayment();
    initLottie(this.$refs.verify, "/lottie/social-login.json");
  },
  methods: {
    async verifyPayment() {
      try {
        const { query, params } = this.$route;
        const { code, method } = params;
        if (method === "bkash") {
          const { restaurantID, otp, id_token } = JSON.parse(decode(code));
          const body = {
            restaurantID,
            otp,
            id_token,
            method,
            transactionNumber: query.paymentID,
          };
          await this.$managerApi.paymentVerify(body);
          this.redirect();
        }
      } catch (err) {
        console.error(err);
      }
    },
    redirect() {
      window.location.href = window.location.origin
        .replace(`${window.location.protocol}//`, "")
        .startsWith("bd.")
        ? `${window.location.origin}/dashboard`
        : `${window.location.protocol}//bd.${window.location.host}/dashboard`;
    },
  },
};
</script>
