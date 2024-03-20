<template>
  <div>
    <slide-up-down :active="newOrder" :duration="300">
      <div class="px-4 mb-3">
        <div
          class="flex justify-between bg-amber-100 w-full items-center px-4 py-2 rounded-lg"
        >
          <p class="text-gray-700">New order receive</p>
          <Button @click.native.prevent="refetch"
            ><i class="fas fa-rotate" /> Refresh</Button
          >
        </div>
      </div>
    </slide-up-down>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <h2 class="text-3xl font-medium text-gray-700">Order</h2>
      <Button @click.native.prevent="refetch"
        ><i class="fas fa-rotate" /> Refresh</Button
      >
    </section>

    <section class="px-4">
      <div class="px-2 bg-white rounded-lg pt-2 shadow-lg">
        <TabTitle
          :tabTitle="tabTitle"
          v-model="active"
          fullWidth
          class="flex-1"
        />
        <template v-if="active === 'Table view'">
          <div
            class="flex items-center text-center h-96 bg-white"
            v-if="tables && tables.length === 0"
          >
            <EmptyMessage title="No Table found" />
          </div>
          <div
            v-else
            class="bg-white py-3 px-1 grid gap-1 lg:gap-3 my-3"
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
              <div class="text-gray-700">
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
        </template>
        <template v-else>
          <div class="flex flex-col lg:flex-row justify-between pt-3 gap-5">
            <div class="flex items-center justify-between lg:justify-start">
              <TabTitle
                :tabTitle="tabOrderType"
                v-model="orderType"
                :fullWidth="isMobile"
              />
            </div>
            <div class="flex gap-3 items-center">
              <client-only>
                <DatePicker
                  v-model="date"
                  v-if="activeSubscription"
                  type="date"
                  range
                  placeholder="Select date range"
                  prefix-class="performance-date-picker mx"
                />
              </client-only>
              <i
                v-if="date && date[0] != null && date[1] != null"
                class="text-xl cursor-pointer text-green-500 block lg:hidden far fa-circle-xmark"
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
                  class="rounded-lg p-3 text-gray-700 relative cursor-pointer"
                  :class="getClass(item.status)"
                  :key="i"
                  @click="openOrderDetails(item._id)"
                >
                  <small
                    class="absolute right-3 top-1"
                    :class="item.new ? 'text-green-500' : 'text-gray-400'"
                    >{{ item.new ? "New" : i + 1 }}</small
                  >
                  <p
                    class="font-normal flex justify-center items-center text-2xl mb-2"
                  >
                    <ParcelIcon
                      class="w-10 mr-2"
                      v-if="item.orderType === 'Parcel'"
                    />
                    <TableIcon class="w-10 mr-2" v-else />
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
                  <p class="font-normal" v-if="item.cancelReason">
                    Cancel Reason:
                    <span class="font-bold">{{
                      item.cancelReason || "#"
                    }}</span>
                  </p>
                </div>
              </template>
            </div>
            <Observer @load="fetchItems" v-if="items.length > 0">
              <Spinner
                class="text-green-600 h-7 w-7"
                v-if="items % perPage === 0"
              />
            </Observer>
            <div class="flex justify-center items-center" v-if="loading">
              <loading />
            </div>
            <div
              class="flex items-center text-center h-96 bg-white"
              v-else-if="items.length === 0"
            >
              <EmptyMessage title="No order found" />
            </div>
          </section>
        </template>
      </div>
    </section>

    <OrderDetails
      :vats="vats"
      :employees="employees"
      v-if="orderModal"
      @refetch="closeModal"
    />
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters, mapActions } from "vuex";
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
      active: this.$route?.query?.tab || "Table view",
      orderType: "All",
      date: [],
      items: [],
      vats: [],
      perPage: 20,
      vat: "",
      loading: true,
      cancelLoading: false,
      acceptLoading: false,
      errors: {},
      dropdown: null,
      refreshTrigger: 0,
      orderDetails: {},
      newOrder: false,
      employees: [],
      selectWaiterModal: false,
      deleteMode: false,
      cancelModal: false,
    };
  },
  computed: {
    ...mapGetters([
      "isMobile",
      "pageTitle",
      "manager",
      "waiter",
      "restaurantSlug",
      "activeSubscription",
    ]),
    ...mapGetters("order", ["orderModal", "tables"]),
    tabTitle() {
      return [
        {
          title: "Table view",
          status: "pending",
          icon: "fas fa-table-cells",
          iconClass: "text-grey-700",
        },
        {
          title: "Processing order",
          status: "processing",
          icon: "fas fa-users-gear",
          iconClass: "text-grey-700",
        },
        {
          title: "Pending order",
          status: "pending",
          icon: "fas fa-clock",
          iconClass: "text-amber-500",
        },
        {
          title: "Active order",
          status: "active",
          icon: "fas fa-pizza-slice",
          iconClass: "text-sky-500",
        },
        {
          title: "Billing order",
          status: "billing",
          icon: "fas fa-file-invoice",
          iconClass: "text-purple-500",
        },
        {
          title: "Complete order",
          status: "complete",
          icon: "fas fa-circle-check",
          iconClass: "text-green-500",
        },
        {
          title: "Cancel order",
          status: "cancel",
          icon: "fas fa-circle-xmark",
          iconClass: "text-rose-500",
        },
        { title: "All order", status: null, icon: "fas fa-bars-staggered" },
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
    cancelModal(val) {
      if (!val) {
        this.cancelForm.cancelReason = "Wrong order";
      }
    },
    selectWaiterModal(val) {
      if (!val) {
        this.selectEmployee = null;
      }
    },
  },
  created() {
    this.$nuxt.$on("order-notification-socket-data", () => {
      this.newOrder = true;
    });
    this.$nuxt.$on("openOrderDetails", (orderID) =>
      this.openOrderDetails(orderID)
    );
  },
  mounted() {
    this.fetchTable();
    if (this.active === "Table view") {
      this.fetchTableOrder();
    } else {
      this.fetchItems();
    }
    this.fetchVats();
    if (this.manager) {
      this.fetchEmploy();
    }
    this.intervalId = setInterval(() => {
      this.refreshTrigger++;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    this.$nuxt.$off("order-notification-socket-data");
    this.$nuxt.$off("openOrderDetails");
  },
  methods: {
    ...mapActions("order", ["fetchOrder", "fetchTable"]),
    closeModal() {
      if (this.active === "Table view") {
        this.fetchTableOrder();
      } else if (
        this.active === "Processing order" ||
        this.active === "Pending order" ||
        this.active === "Active order" ||
        this.active === "Billing order"
      ) {
        this.fetchItems();
      }
    },
    async fetchVats() {
      try {
        const { vats } = await this.$mowApi.fetchVat();
        this.vats = vats;
      } catch (error) {}
    },
    async fetchItems() {
      try {
        this.loading = true;
        const { status } = this.tabTitle.find(
          ({ title }) => title === this.active
        );

        const timezone = this.$moment.tz.guess();
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          date: this.date,
          status,
          orderType: this.orderType,
          timezone,
        };
        if (Number.isInteger(params.page)) {
          const { orders } = await this.$mowApi.fetchOrder(params);
          this.items = this.items.concat(orders);
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async fetchTableOrder() {
      try {
        this.loading = true;
        const { orders } = await this.$mowApi.fetchTableOrder();
        this.items = orders;
      } catch (error) {
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
        this.fetchTableOrder();
      } else {
        this.fetchItems();
      }
    },
    refetchOrderData() {
      this.loading = false;
      this.newOrder = false;
      this.cancelLoading = false;
      this.acceptLoading = false;
      this.items = [];
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
      this.deleteMode = false;
      // this.orderDetails = {};
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
      } else if (status === "billing") {
        return "bg-purple-200 hover:bg-purple-300";
      }
    },
    openOrderDetails(_id) {
      this.fetchOrder(_id);
    },
    async fetchEmploy() {
      try {
        const { employees } = await this.$managerApi.fetchAllEmployee();
        this.employees = employees;
      } catch (error) {}
    },
    updatePaymentData(id, { method, amount }) {
      const i = this.items.findIndex(({ _id }) => _id === id);
      this.items[i].paymentMethod = method;
      this.items[i].paymentReceivedAmount = amount;
    },
    updateStatus(id, status) {
      const i = this.items.findIndex(({ _id }) => _id === id);
      this.items[i].status = status;
      this.orderDetails = this.items[i];
      this.reset();
    },
    showTime(date) {
      const timeDifference = new Date() - new Date(date);
      const seconds = Math.floor(timeDifference / 1000);

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${this.formatTime(hours)}:${this.formatTime(
        minutes
      )}:${this.formatTime(remainingSeconds)}`;
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    checkStatus(item) {
      if (this.waiter) {
        if (item.waiterID) {
          return item.waiterID == this.$auth.user?._id;
        } else {
          return true;
        }
      } else if (this.manager) {
        return true;
      } else {
        return false;
      }
    },
    tableBgClass({ _id }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        if (find.waiterID && !this.manager) {
          const data =
            find.waiterID === this.$auth.user?._id
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
    openOrder({ _id, serial }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        this.fetchOrder(find._id);
      } else {
        if (this.activeSubscription) {
          this.$router.push({
            name: "menu-slug-table",
            params: { slug: this.$auth.user?.restaurant?.slug, table: serial },
            query: { manualOrder: true },
          });
        }
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
      background-color: #111827 !important;
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
        border-color: #111827 !important;
      }
    }
  }
  .mx-icon-calendar {
    svg {
      color: #111827;
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
</style>
