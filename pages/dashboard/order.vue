<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Order</h2>
      </div>
    </section>

    <section class="px-4">
      <div class="px-2 bg-white rounded-lg pt-2">
        <TabTitle
          :tabTitle="tabTitle"
          v-model="active"
          fullWidth
          class="flex-1"
        />
        <div class="flex flex-col lg:flex-row justify-between pt-3 gap-5">
          <TabTitle
            :tabTitle="tabOrderType"
            v-model="orderType"
            :fullWidth="isMobile"
          />
          <div class="flex gap-3 items-center">
            <DatePicker
              v-model="date"
              type="date"
              range
              placeholder="Select date range"
              prefix-class="performance-date-picker mx"
            />
            <font-awesome-icon
              v-if="date && date[0] != null && date[1] != null"
              :icon="['far', 'circle-xmark']"
              class="text-xl cursor-pointer text-green-500 block lg:hidden"
              @click="date = []"
            />
          </div>
        </div>
        <section>
          <div
            class="grid gap-3 my-3"
            :class="
              items.length > 3 || isMobile
                ? 'grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]'
                : 'grid-cols-[repeat(auto-fit,_minmax(300px,_350px))]'
            "
          >
            <div
              class="rounded-lg p-3 text-gray-700 relative cursor-pointer"
              :class="getClass(item.status)"
              v-for="(item, i) in items"
              :key="i"
              @click="openOrderDetails(item)"
            >
              <small
                class="absolute right-3 top-1"
                :class="item.new ? 'text-green-500' : 'text-gray-400'"
                >{{ item.new ? "New" : i + 1 }}</small
              >
              <p class="font-normal">
                Table No: <span class="font-bold">{{ item.tableName }}</span>
              </p>
              <p class="font-normal">
                Order type:
                <span class="font-bold">{{ item.orderType }}</span>
              </p>
              <p class="font-normal">
                Order No:
                <span class="font-bold">#{{ item.orderNumber }}</span>
              </p>
              <p class="font-normal">
                Order Date:
                <span class="font-bold">{{
                  item.created_at | normalDate2
                }}</span>
              </p>
              <p class="font-normal" v-if="manager">
                Waiter name:
                <span class="font-bold">{{ item.waiterName || "#" }}</span>
              </p>
              <p class="font-normal">
                Customer name:
                <span class="font-bold">{{ item.userName || "#" }}</span>
              </p>
            </div>
          </div>
          <div class="flex justify-center items-center" v-if="loading">
            <loading />
          </div>
          <div
            class="flex items-center text-center h-96 bg-white"
            v-else-if="items.length === 0"
          >
            <EmptyMessage title="No order found" />
          </div>
          <Observer @load="fetchItems" v-if="items.length > 0">
            <Spinner
              class="text-green-600 h-7 w-7"
              v-if="items % perPage === 0"
            />
          </Observer>
        </section>
      </div>
    </section>

    <Modal v-model="modal" v-if="modal">
      <div class="flex justify-between items-center">
        <h3
          class="text-lg font-medium leading-6 text-gray-600 capitalize"
          id="modal-title"
        >
          Order details
        </h3>
        <CloseButton @click.native.prevent="modal = false" />
      </div>
      <hr class="my-3" />
      <table class="flex flex-col flex-1 text-gray-700">
        <tr class="flex mb-2 text-lg font-semibold">
          <th class="pr-3">Qty</th>
          <th class="flex-1">Name</th>
          <th class="pl-3">Price</th>
        </tr>
        <tr
          v-for="(cart, key) in orderDetails.orderItems"
          :key="`cart-${key}`"
          class="flex mb-2"
        >
          <td class="pr-3">{{ cart.qty }}x</td>
          <td class="flex-1">
            <p class="font-medium text-wrap">
              {{ cart.name }}
              <span v-if="cart.choice?.name">({{ cart.choice?.name }})</span>
            </p>
            <p class="flex flex-col text-gray-500">
              <small
                v-for="(addon, index) in cart.addon"
                :key="`addon-${index}`"
              >
                + {{ addon.name }}
              </small>
            </p>
          </td>
          <td class="pl-3">
            <p class="text-right">৳{{ singleItemPrice(cart) }}</p>
            <p class="text-right mt-[-8px]" v-if="singleItemDiscount(cart) > 0">
              <small class="text-rose-500"
                >(৳{{ singleItemDiscount(cart) }})</small
              >
            </p>
          </td>
        </tr>
        <hr class="mt-1" />
        <div class="flex justify-between my-2">
          <p>Total Qty: {{ orderDetails.totalQty }}x</p>
          <div class="flex flex-col">
            <p class="text-right">
              Total Price: ৳{{ orderDetails.totalPrice }}
            </p>
            <p class="text-rose-500 text-right">
              Total discount: ৳{{ orderDetails.totalDiscount }}
            </p>
          </div>
        </div>
        <hr />
        <div class="flex justify-center my-2 text-base">
          Net Price: ৳{{ orderDetails.netPrice }}
        </div>
      </table>
      <div
        class="mt-4 flex flex-col-reverse lg:flex-row items-center sm:-mx-2 gap-3"
      >
        <Button
          v-if="
            orderDetails.status === 'active' ||
            orderDetails.status === 'pending'
          "
          variant="red"
          type="button"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="cancelOrder"
          :loading="cancelLoading"
          ><font-awesome-icon :icon="['fas', 'xmark']" /> Cancel order
        </Button>
        <Button
          v-if="orderDetails.status === 'pending'"
          variant="green"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="acceptOrder"
          :loading="acceptLoading"
        >
          <font-awesome-icon :icon="['fas', 'check']" class="mr-1" />
          Accept order
        </Button>
        <Button
          v-else-if="orderDetails.status === 'active'"
          variant="green"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="completeOrder"
          :loading="acceptLoading"
        >
          <font-awesome-icon :icon="['fas', 'check']" class="mr-1" />
          Complete order
        </Button>
        <Button
          v-else
          variant="red"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="modal = false"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" />
          Close
        </Button>
        <Button
          v-if="orderDetails.status === 'complete'"
          variant="green"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="modal = false"
        >
          <font-awesome-icon :icon="['fas', 'print']" />
          Print Order
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "Order",
  layout: "dashboard",
  middleware: "managerOrWaiter",
  components: { DatePicker },
  directives: { clickOutside: vClickOutside.directive },
  head() {
    return { title: "Order - " + this.pageTitle };
  },
  data() {
    return {
      modal: false,
      active: "All order",
      orderType: "All",
      date: [],
      items: [],
      perPage: 50,
      loading: true,
      cancelLoading: false,
      acceptLoading: false,
      errors: {},
      dropdown: null,
      refreshTrigger: 0,
      orderDetails: {},
    };
  },
  computed: {
    ...mapGetters(["isMobile", "pageTitle", "manager"]),
    tabTitle() {
      return [
        { title: "All order", status: null, icon: ["fas", "bars-staggered"] },
        {
          title: "Pending order",
          status: "pending",
          icon: ["fas", "clock"],
          iconClass: "text-amber-500",
        },
        {
          title: "Active order",
          status: "active",
          icon: ["fas", "pizza-slice"],
          iconClass: "text-sky-500",
        },
        {
          title: "Complete order",
          status: "complete",
          icon: ["fas", "circle-check"],
          iconClass: "text-green-500",
        },
        {
          title: "Cancel order",
          status: "cancel",
          icon: ["fas", "circle-xmark"],
          iconClass: "text-rose-500",
        },
      ];
    },
    tabOrderType() {
      return [{ title: "All" }, { title: "Dine in" }, { title: "Parcel" }];
    },
  },
  watch: {
    date() {
      this.refetch();
    },
    active() {
      this.refetch();
    },
    orderType() {
      this.refetch();
    },
  },
  created() {
    this.$nuxt.$on("order-notification-socket-data", (data) => {
      if (data) {
        this.items = [{ ...data, new: true }, ...this.items];
      }
    });
  },
  mounted() {
    this.fetchItems();
    this.intervalId = setInterval(() => {
      this.refreshTrigger++;
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    this.$nuxt.$off("order-notification-socket-data");
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        const { status } = this.tabTitle.find(
          ({ title }) => title === this.active
        );
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          date: this.date,
          status,
          orderType: this.orderType,
        };
        if (Number.isInteger(params.page)) {
          const { orders } = await this.$mowApi.fetchOrder(params);
          this.items = this.items.concat(orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(status, i) {
      try {
        await this.$mowApi.updateOrderStatus({ status });
        this.items[i].status = status;
      } catch (error) {
        console.error(error);
      }
    },
    refetch() {
      this.loading = false;
      this.cancelLoading = false;
      this.acceptLoading = false;
      this.items = [];
      this.orderDetails = {};
      this.fetchItems();
    },
    reset() {
      this.loading = false;
      this.cancelLoading = false;
      this.acceptLoading = false;
      this.orderDetails = {};
    },
    calcPrice(item) {
      const { qty, price, addon, choice } = item;

      const addonPrice = addon.reduce((total, value) => total + value.price, 0);
      return (price + addonPrice + (choice.price || 0)) * qty;
    },
    singleItemPrice(data) {
      return this.calcPrice(data);
    },
    singleItemDiscount(item) {
      return item.qty * item.discount;
    },
    toggleDropdown(index) {
      this.dropdown = index;
    },
    getBadgeVariant(status) {
      if (status === "pending") {
        return "amber";
      } else if (status === "active") {
        return "sky";
      } else if (status === "complete") {
        return "green";
      } else if (status === "cancel") {
        return "rose";
      }
    },
    getClass(status) {
      if (status === "pending") {
        return "bg-amber-100 hover:bg-amber-200";
      } else if (status === "active") {
        return "bg-sky-100 hover:bg-sky-200";
      } else if (status === "complete") {
        return "bg-green-100 hover:bg-green-200";
      } else if (status === "cancel") {
        return "bg-rose-100 hover:bg-rose-200";
      }
    },
    openOrderDetails(item) {
      this.orderDetails = item;
      this.modal = true;
    },
    async cancelOrder() {
      try {
        if (confirm("Are you sure, you want to cancel?")) {
          this.cancelLoading = true;
          const status = "cancel";
          await this.$userApi.cancelOrder({
            _id: this.orderDetails._id,
            status,
            currentStatus: this.orderDetails.status,
          });
          this.$nuxt.$emit("success", "Order canceled");
          this.modal = false;
          this.updateStatus(this.orderDetails._id, status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.cancelLoading = false;
      }
    },
    async acceptOrder() {
      try {
        this.acceptLoading = true;
        const status = "active";
        await this.$userApi.acceptOrder({
          _id: this.orderDetails._id,
          status,
          currentStatus: this.orderDetails.status,
        });
        this.$nuxt.$emit("success", "Order accept");
        this.modal = false;
        this.updateStatus(this.orderDetails._id, status);
      } catch (error) {
        console.error(error);
      } finally {
        this.acceptLoading = false;
      }
    },
    async completeOrder() {
      try {
        const status = "complete";
        this.acceptLoading = true;
        await this.$userApi.completeOrder({
          _id: this.orderDetails._id,
          status,
        });
        this.$nuxt.$emit("success", "Order complete");
        this.modal = false;
        this.updateStatus(this.orderDetails._id, status);
      } catch (error) {
        console.error(error);
      } finally {
        this.acceptLoading = false;
      }
    },
    updateStatus(id, status) {
      const i = this.items.findIndex(({ _id }) => _id === id);
      this.items[i].status = status;
      this.reset();
    },
  },
};
</script>

<style lang="scss">
.performance-date-picker {
  .cell {
    color: #4b5563;
    font-weight: 600;
    &.in-range,
    &.hover-in-range {
      color: #4b5563;
      background-color: #f3f4f6 !important;
    }
    &.active {
      background-color: #22c55e !important;
    }
    &:hover {
      color: #4b5563;
      background-color: #f3f4f6 !important;
    }
  }
  .mx-input-wrapper {
    input {
      border-radius: 8px;
      height: 40px;
      &:hover,
      &:focus {
        border-color: #22c55e !important;
      }
    }
  }
  .mx-icon-calendar {
    svg {
      color: #22c55e;
    }
  }
  .mx-calendar-header-label {
    button {
      color: #4b5563;
      font-weight: 600;
    }
  }
  .mx-icon-left,
  .mx-icon-double-left,
  .mx-icon-right,
  .mx-icon-double-right {
    color: #4b5563;
  }
}
.text-wrap {
  text-wrap: wrap;
}
</style>
