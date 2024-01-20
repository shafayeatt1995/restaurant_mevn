<template>
  <div>
    <slide-up-down :active="newOrder" :duration="300">
      <div class="px-4 mb-3">
        <div
          class="flex justify-between bg-amber-100 w-full items-center px-4 py-2 rounded-lg"
        >
          <p class="text-gray-600">New order receive</p>
          <Button @click.native.prevent="refetch"
            ><font-awesome-icon :icon="['fas', 'rotate']" /> Refresh</Button
          >
        </div>
      </div>
    </slide-up-down>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <h2 class="text-3xl font-medium text-gray-600">Order</h2>
      <Button @click.native.prevent="refetch"
        ><font-awesome-icon :icon="['fas', 'rotate']" /> Refresh</Button
      >
    </section>

    <section class="px-4">
      <div class="px-2 bg-white rounded-lg pt-2">
        <TabTitle
          :tabTitle="tabTitle"
          v-model="active"
          fullWidth
          class="flex-1"
        />
        <div
          class="bg-white py-3 px-1 grid gap-1 lg:gap-3 my-3"
          v-if="active === 'Table view'"
          :class="
            tables.length > 7 || isMobile
              ? 'grid-cols-[repeat(auto-fit,_minmax(110px,_1fr))]'
              : 'grid-cols-[repeat(auto-fit,_minmax(128px,_130px))]'
          "
        >
          <div
            class="h-28 rounded-lg shadow flex flex-col justify-center items-center justify-self-center w-full cursor-pointer"
            :class="tableBgClass(table)"
            v-for="(table, key) in tables"
            :key="key"
            @click="openOrder(table)"
          >
            <div class="text-gray-600">
              <TableIcon />
            </div>
            <p class="text-gray-700 font-semibold text-lg">
              {{ table.name }}
            </p>
            <span class="font-bold text-gray-700" :key="refreshTrigger">{{
              showTableTime(table)
            }}</span>
          </div>
        </div>
        <template v-else>
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
                  ? 'grid-cols-[repeat(auto-fit,_minmax(315px,_1fr))]'
                  : 'grid-cols-[repeat(auto-fit,_minmax(300px,_340px))]'
              "
            >
              <template v-for="(item, i) in items">
                <div
                  v-if="checkStatus(item)"
                  class="rounded-lg p-3 text-gray-600 relative cursor-pointer"
                  :class="getClass(item.status)"
                  :key="i"
                  @click="openOrderDetails(item)"
                >
                  <small
                    class="absolute right-3 top-1"
                    :class="item.new ? 'text-green-500' : 'text-gray-400'"
                    >{{ item.new ? "New" : i + 1 }}</small
                  >
                  <p
                    class="font-normal flex justify-center items-center text-2xl mb-2"
                  >
                    <TableIcon class="w-10 mr-2" />
                    <span class="font-bold">{{ item.tableName }}</span>
                  </p>
                  <p class="font-normal">
                    Order type:
                    <span class="font-bold">{{ item.orderType }}</span>
                  </p>
                  <p class="font-normal">
                    Order No:
                    <span class="font-bold">#{{ item.orderNumber }}</span>
                  </p>
                  <p
                    class="font-normal"
                    v-if="item.status === 'pending' || item.status === 'active'"
                  >
                    Order Time:
                    <span class="font-bold" :key="refreshTrigger">{{
                      showTime(item.created_at)
                    }}</span>
                  </p>
                  <p class="font-normal" v-else>
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
                    Customer ID:
                    <span class="font-bold">{{ item.userEmail || "#" }}</span>
                  </p>
                </div>
              </template>
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
        </template>
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
      <div
        class="grid grid-cols-1 lg:grid-cols-2 justify-between text-gray-700"
      >
        <p>
          <span class="font-semibold">Customer:</span>
          {{ orderDetails.userName }}
        </p>
        <p>
          <span class="font-semibold">ID:</span> {{ orderDetails.userEmail }}
        </p>
        <div class="flex items-center">
          <span class="font-semibold">Type:</span> {{ orderDetails.orderType }}
          <span
            ><TableIcon
              class="h-5"
              v-if="orderDetails.orderType === 'Dine in'" />
            <ParcelIcon class="h-5 ml-1" v-else
          /></span>
        </div>
        <p>
          <span class="font-semibold">Table:</span> {{ orderDetails.tableName }}
        </p>
        <p>
          <span class="font-semibold">Status:</span>
          <Badge :variant="orderDetails.status" :title="orderDetails.status" />
        </p>
        <p>
          <span class="font-semibold">Waiter:</span>
          {{ orderDetails.waiterName || "#" }}
        </p>
      </div>
      <hr class="my-2" />
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
          <td class="flex-1 min-h-11">
            <small
              v-if="cart.AdditionalOrderNumber > 1"
              class="absolute mt-[-12px]"
            >
              Additional order {{ th(cart.AdditionalOrderNumber - 1) }} time
            </small>
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
          :disabled="
            manager
              ? false
              : orderDetails.waiterID
              ? $auth.user._id !== orderDetails.waiterID
              : false
          "
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
          :disabled="manager ? false : $auth.user._id !== orderDetails.waiterID"
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
          class="w-full tracking-wide flex-1 bg-"
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
import TableIcon from "~/static/svg/table.svg";
import ParcelIcon from "~/static/svg/parcel.svg";

export default {
  name: "Order",
  layout: "dashboard",
  middleware: "managerOrWaiter",
  components: { DatePicker, TableIcon, ParcelIcon },
  directives: { clickOutside: vClickOutside.directive },
  head() {
    return { title: "Order - " + this.pageTitle };
  },
  data() {
    return {
      modal: false,
      active: this.$route?.query?.tab || "Table view",
      orderType: "All",
      date: [],
      items: [],
      tables: [],
      perPage: 50,
      loading: true,
      cancelLoading: false,
      acceptLoading: false,
      errors: {},
      dropdown: null,
      refreshTrigger: 0,
      orderDetails: {},
      newOrder: false,
    };
  },
  computed: {
    ...mapGetters(["isMobile", "pageTitle", "manager", "waiter"]),
    tabTitle() {
      return [
        {
          title: "Table view",
          status: "pending",
          icon: ["fas", "table-cells"],
          iconClass: "text-purple-500",
        },
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
        { title: "All order", status: null, icon: ["fas", "bars-staggered"] },
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
    active(tab) {
      window.history.pushState(
        {},
        "",
        `?${new URLSearchParams({ tab }).toString()}`
      );
      this.refetch();
    },
    orderType() {
      this.refetch();
    },
  },
  created() {
    this.$nuxt.$on("order-notification-socket-data", () => {
      this.newOrder = true;
    });
  },
  mounted() {
    if (this.active === "Table view") {
      this.fetchTables();
    } else {
      this.fetchItems();
    }
    this.intervalId = setInterval(() => {
      this.refreshTrigger++;
    }, 1000);
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
    async fetchTables() {
      try {
        this.loading = true;
        const { orders } = await this.$mowApi.fetchTableOrder();
        this.items = orders;
        const { tables } = await this.$mowApi.fetchTable();
        this.tables = tables;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    refetch() {
      this.loading = false;
      this.newOrder = false;
      this.cancelLoading = false;
      this.acceptLoading = false;
      this.items = [];
      this.orderDetails = {};
      if (this.active === "Table view") {
        this.fetchTables();
      } else {
        this.fetchItems();
      }
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
        return "bg-amber-200 hover:bg-amber-300";
      } else if (status === "active") {
        return "bg-sky-200 hover:bg-sky-300";
      } else if (status === "complete") {
        return "bg-green-200 hover:bg-green-300";
      } else if (status === "cancel") {
        return "bg-rose-200 hover:bg-rose-300";
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
          await this.$mowApi.updateOrderStatus({
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
        await this.$mowApi.updateOrderStatus({
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
    async updateOrder() {
      try {
        const status = "complete";
        this.acceptLoading = true;
        await this.$mowApi.updateOrderStatus({
          _id: this.orderDetails._id,
          status,
          currentStatus: this.orderDetails.status,
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
    showTime(date) {
      const timeDifference = new Date() - new Date(date);
      const seconds = Math.floor(timeDifference / 1000);

      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${days}:${this.formatTime(hours)}:${this.formatTime(
        minutes
      )}:${this.formatTime(remainingSeconds)}`;
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    checkStatus(item) {
      if (this.waiter) {
        if (item.waiterID) {
          return item.waiterID == this.$auth.user._id;
        } else {
          return true;
        }
      } else if (this.manager) {
        return true;
      } else {
        return false;
      }
    },
    th(number) {
      switch (+number) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
        default:
          return number + "th";
      }
    },
    tableBgClass({ _id }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        if (find.waiterID && !this.manager) {
          const data =
            find.waiterID === this.$auth.user._id
              ? this.getClass(find?.status)
              : "bg-white";
          return data;
        } else {
          return this.getClass(find?.status);
        }
      } else {
        return "bg-white";
      }
    },
    openOrder({ _id }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        this.openOrderDetails(find);
      } else {
        this.$nuxt.$emit("error", "This table has no order");
      }
    },
    showTableTime({ _id }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        return this.showTime(find.created_at);
      }
      return null;
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
