<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        ref="loader"
        class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg flex justify-center items-center flex-col-reverse overflow-hidden"
        v-show="orderAnimation"
      >
        <p class="text-3xl w-full text-center py-5 px-4 mb-60">
          Your order receive successfully
        </p>
      </div>
    </transition>

    <div class="w-full mx-auto fixed bottom-0 z-40 left-0 right-0">
      <div
        ref="swipeContainer"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        class="flex justify-between items-center bg-black text-white py-4 px-5 rounded-t-3xl cursor-pointer gap-3"
        @click="show = $nuxt.isOffline ? false : !show"
      >
        <p class="text-xl" v-if="$nuxt.isOffline">
          You are offline. Please check your internet connection
        </p>
        <p class="text-xl" v-else-if="totalQuantity > 0">
          Order
          {{ totalQuantity }} for ৳{{ subTotalPrice - totalDiscount }}
        </p>
        <p class="text-xl" v-else>Order</p>
        <p class="text-2xl">
          <transition name="fade" mode="out-in">
            <i
              class="fas fa-wifi"
              @click.stop="show = false"
              v-if="$nuxt.isOffline"
            />
            <i
              class="fas fa-xmark"
              @click.stop="show = false"
              v-else-if="show"
            />
            <TableIcon
              v-else-if="form.orderType === 'Dine in'"
              class="text-white whitespace-nowrap w-8"
            />
            <ParcelIcon v-else class="text-white whitespace-nowrap w-8" />
          </transition>
        </p>
      </div>
      <div
        class="h-[75vh] bg-white transition-all duration-300 overflow-y-auto overflow-x-hidden"
        :class="
          show
            ? 'mb-0'
            : showAnimation
            ? 'mb-[-55vh]'
            : totalQuantity > 0 || !!existOrder
            ? 'mb-[-75vh]'
            : 'mb-[-85vh]'
        "
      >
        <div class="h-full pt-5" v-if="cartItems && cartItems.length">
          <div class="flex justify-center items-center gap-4">
            <img
              loading="lazy"
              alt="logo"
              :src="restaurant.logo"
              class="max-w-14 max-h-14"
            />
            <h1 class="text-xl">{{ restaurant.name }}</h1>
          </div>
          <!-- <div class="flex justify-center gap-10">
            <Button
              :variant="option.name === form.orderType ? 'green' : 'white'"
              v-for="(option, key) in orderTypeOptions"
              :key="key"
              @click.native.prevent="form.orderType = option.name"
            >
              <p class="mr-2 font-bold">
                {{ option.name }}
              </p>
              <component :is="option.icon" class="w-6 h-6" />
            </Button>
          </div> -->
          <div class="px-4">
            <div class="border-t-2 border-gray-300 border-dashed my-3"></div>
            <table class="w-full">
              <tbody>
                <tr class="mb-4">
                  <td class="py-2 font-medium text-lg">Qty</td>
                  <td class="py-2 text-center">
                    <div class="font-medium text-lg">Name</div>
                  </td>
                  <td></td>
                  <td class="no-wrap font-medium">
                    <p class="text-lg">Price</p>
                  </td>
                </tr>
                <tr v-for="(cart, key) in cartItems" :key="`cart-${key}`">
                  <td class="py-2">{{ cart.qty }}x</td>
                  <td class="py-2">
                    <div class="font-medium">
                      {{ cart.name }}
                    </div>
                    <div class="flex flex-col text-gray-500">
                      <small
                        v-for="(choice, index) in cart.choice"
                        :key="`choice-${index}`"
                      >
                        + {{ choice.name }}
                      </small>
                    </div>
                    <div class="flex flex-col text-gray-500">
                      <small
                        v-for="(addon, index) in cart.addon"
                        :key="`addon-${index}`"
                      >
                        + {{ addon.name }}
                      </small>
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-2 mr-2">
                      <div
                        class="flex justify-center items-center text-2xl cursor-pointer h-10 w-10 rounded-full bg-gray-100"
                        @click="increaseCartItems(key)"
                      >
                        +
                      </div>
                      <div
                        class="flex justify-center items-center text-2xl cursor-pointer h-10 w-10 rounded-full bg-gray-100"
                        @click="decreaseCartItems(key)"
                      >
                        -
                      </div>
                    </div>
                  </td>
                  <td class="no-wrap">
                    <p class="text-right">৳{{ singleItemPrice(key) }}</p>
                    <p
                      class="text-right mt-[-8px]"
                      v-if="singleItemDiscount(key) > 0"
                    >
                      <small class="text-rose-500"
                        >(৳{{ singleItemDiscount(key) }})</small
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="border-t-2 border-gray-300 border-dashed my-3"></div>
            <!-- <div class="flex justify-between font-medium text-lg">
              <p>Total:</p>
              <p>৳{{ subTotalPrice }}</p>
            </div>
            <div class="flex justify-between text-md text-rose-500">
              <p>Discount:</p>
              <p>৳{{ totalDiscount }}</p>
            </div> -->
            <!-- <div class="border-t-2 border-gray-300 border-dashed my-3"></div> -->
            <div class="flex justify-between font-medium text-xl">
              <p>Total:</p>
              <p>৳{{ subTotalPrice - totalDiscount }}</p>
            </div>
            <!-- <div class="border-t-2 border-gray-300 border-dashed my-3"></div> -->
            <!-- <Input
              v-for="(field, i) in inputFields"
              :key="i"
              :field="field"
              v-model="form"
              :errors="errors"
            /> -->
            <div class="mt-5">
              <small class="text-gray-400">
                By clicking Order, you confirm your age is 18+ and you agree to
                the terms
              </small>
            </div>
            <Input
              v-for="(field, i) in inputFields"
              :key="i"
              :field="field"
              v-model="form"
              :errors="errors"
            />
            <p class="text-center text-red-500 font-medium my-3">
              {{ errorMessage }}
            </p>
            <p
              class="text-center text-red-500 font-medium"
              v-if="demoMode === 'true'"
            >
              You can't order in demo mode
            </p>
            <div class="flex justify-center py-5">
              <Button
                class="px-9 py-3"
                @click.native.prevent="$nuxt.isOffline ? '' : submit()"
                :loading="loading"
                :disabled="$nuxt.isOffline || demoMode === 'true'"
                >Place order</Button
              >
            </div>
          </div>
        </div>
        <div v-else-if="existOrder">
          <p class="text-gray-700 text-center text-xl mt-5">
            If your food is finished then click the button for request your bill
          </p>
          <div class="flex flex-col justify-center items-center mt-5">
            <img
              loading="lazy"
              src="/images/eating.png"
              class="w-1/2"
              alt="eating image"
            />
            <Button @click.native.prevent="requestBill" class="mt-5"
              >Request your bill</Button
            >
          </div>
        </div>
        <div class="h-full flex flex-col justify-center items-center" v-else>
          <img
            loading="lazy"
            src="/images/not-found.png"
            alt="not found image"
          />
          <p class="text-2xl mt-2 text-gray-700">Nothing to order</p>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="show"
        @click="show = false"
        class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-30 w-full mx-auto bg-green"
      ></div>
    </transition>
  </div>
</template>
<script>
import lottie from "lottie-web";
import { mapActions, mapGetters } from "vuex";
import TableIcon from "~/static/svg/table.svg";
import ParcelIcon from "~/static/svg/parcel.svg";

export default {
  name: "MenuCart",
  components: { TableIcon, ParcelIcon },
  props: {
    restaurant: Object,
    tableList: Array,
  },
  data() {
    return {
      show: false,
      orderTypeOptions: [
        { name: "Dine in", icon: TableIcon },
        { name: "Parcel", icon: ParcelIcon },
      ],
      form: {
        note: "",
        table: "",
        orderType: "Dine in",
      },
      errors: {},
      showAnimation: false,
      loading: false,
      orderAnimation: false,
      errorMessage: null,
      startY: 0,
      existOrder: null,
      click: true,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "restaurantID", "table"]),
    ...mapGetters(["activeSubscription", "manager"]),
    inputFields() {
      return [
        // {
        //   type: "textarea",
        //   placeholder: "Add note 🙏🏻...",
        //   name: "note",
        //   textarea: { cols: "4", rows: "4" },
        // },
        {
          hide: this.table._id !== "undefined",
          type: "select",
          placeholder: "Select a table",
          icon: "fas fa-table-cells",
          name: "table",
          options: this.tableList.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })),
        },
      ];
    },
    subTotalPrice() {
      return this.cartItems.reduce(
        (total, value) => total + this.calcPrice(value),
        0
      );
    },
    totalDiscount() {
      return this.cartItems.reduce(
        (total, value) => total + value.qty * value.discount,
        0
      );
    },
    totalQuantity() {
      return this.cartItems.reduce((total, value) => total + value.qty, 0);
    },
    demoMode() {
      return this.$route.query?.demo;
    },
    tableData() {
      if (this.table._id === "undefined") {
        return this.tableList.find(({ _id }) => _id === this.form.table);
      } else {
        return this.table;
      }
    },
  },
  created() {
    this.$nuxt.$on("addToCartAnimation", () => {
      this.showAnimation = true;
      setTimeout(() => {
        this.showAnimation = false;
      }, 550);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("addToCartAnimation");
  },
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.loader,
      renderer: "svg",
      loop: true,
      autoplay: true,

      path: "/lottie/hurrah.json",
    });
    this.getOrder();
  },
  methods: {
    ...mapActions("cart", [
      "increaseCartItems",
      "decreaseCartItems",
      "clearCart",
    ]),
    calcPrice(item) {
      const { qty, price, addon, choice } = item;

      const addonPrice = addon.reduce((total, value) => total + value.price, 0);
      const choicePrice = choice.reduce(
        (total, value) => total + value.price,
        0
      );
      return (price + addonPrice + choicePrice) * qty;
    },
    singleItemPrice(key) {
      return this.calcPrice(this.cartItems[key]);
    },
    singleItemDiscount(key) {
      const item = this.cartItems[key];
      return item.qty * item.discount;
    },
    async submit() {
      try {
        this.errors = {};
        if (this.activeSubscription) {
          if (this.table._id === "undefined" && this.form.table === "") {
            this.errors = { table: { msg: "Select a table" } };
          } else {
            if (this.$auth.loggedIn) {
              this.loading = true;
              this.errorMessage = null;
              const body = {
                restaurantID: this.restaurantID,
                tableID: this.tableData._id,
                userEmail: this.$auth.user?.email || "",
                userName: this.$auth.user?.name || "",
                tableName: this.tableData.name,
                orderItems: this.cartItems,
                ...this.form,
              };
              const { additionalMode, email, manualOrder } = this.$route.query;
              if (additionalMode && email) {
                body.additionalMode = true;
                body.externalUserEmail = email;
              }
              await this.$orderApi.createOrder(body);
              this.clearCart();
              if ((additionalMode && email) || manualOrder) {
                this.$router.push({ name: "dashboard-order" });
              } else {
                this.show = false;
                this.orderAnimation = true;
                setTimeout(() => {
                  this.orderAnimation = false;
                }, 4000);
                this.getOrder();
              }
            } else {
              if (confirm(`Please verify with your gmail?`)) {
                window.localStorage.setItem(
                  "socialLogin",
                  JSON.stringify(this.$route.params)
                );
                window.open("/api/auth/social-login/google", "_self");
              }
            }
          }
        } else {
          this.errorMessage = `${
            this.manager ? "You" : "This restaurant"
          } using free version, so ordering isn't available.`;
        }
      } catch (error) {
        if (error?.response?.data?.message) {
          this.errorMessage = error?.response?.data?.message;
        }
      } finally {
        this.loading = false;
      }
    },
    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
    },
    onTouchEnd(event) {
      if (event.changedTouches.length) {
        const endY = event.changedTouches[0].clientY;
        const deltaY = endY - this.startY;

        if (deltaY > 0) {
          this.handleSwipeDown();
        } else if (deltaY < 0) {
          this.handleSwipeUp();
        }
      }
    },
    handleSwipeUp() {
      this.show = true;
    },
    handleSwipeDown() {
      this.show = false;
    },
    async getOrder() {
      try {
        const { table: serial, slug } = this.$route.params;
        if (this.$auth.loggedIn && serial && slug) {
          const { order } = await this.$userApi.getOrder({ serial, slug });
          this.existOrder = order;
        }
      } catch (error) {}
    },
    async requestBill() {
      try {
        if (this.$auth.loggedIn) {
          const lastTimestamp = localStorage.getItem("disableRequest");
          if (lastTimestamp) {
            const currentTimestamp = Math.floor(
              new Date().getTime() / 1000 / 60
            );
            const Timestamp = Math.floor(
              new Date(lastTimestamp).getTime() / 1000 / 60
            );
            if (currentTimestamp - Timestamp > 5) {
              await this.$userApi.billRequest({
                serial: this.$route.params.table,
                slug: this.$route.params.slug,
              });
              localStorage.setItem("disableRequest", new Date());
            }
          } else {
            await this.$userApi.billRequest({
              serial: this.$route.params.table,
              slug: this.$route.params.slug,
            });
            localStorage.setItem("disableRequest", new Date());
          }
          this.$nuxt.$emit("success", "Your bill is being processing");
        } else {
          if (confirm(`Please verify with your gmail?`)) {
            window.localStorage.setItem(
              "socialLogin",
              JSON.stringify(this.$route.params)
            );
            window.open("/api/auth/social-login/google", "_self");
          }
        }
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.active-animation {
  animation: slideUpDown 1s ease-in-out;
}
@keyframes slideUpDown {
  0% {
    transform: translateX(0) translateY(0);
  }
  50% {
  }
  100% {
    opacity: 0;
    transform: translateX(135px) translateY(600px);
  }
}
</style>
