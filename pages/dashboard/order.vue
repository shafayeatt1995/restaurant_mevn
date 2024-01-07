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
      <div class="px-2 bg-white rounded-lg">
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
                ? 'grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]'
                : 'grid-cols-[repeat(auto-fit,_minmax(250px,_300px))]'
            "
          >
            <div
              class="rounded-lg p-3 text-gray-700 relative transition-all duration-300 cursor-pointer"
              :class="getClass(item.status)"
              v-for="(item, i) in items"
              :key="i"
              @click="openOrderDetails(item)"
            >
              <small class="absolute right-3 top-1 text-gray-400">{{
                i++
              }}</small>
              <p class="font-normal">
                Table No: <span class="font-bold">Table-12</span>
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
            </div>
          </div>
          <div class="flex" v-if="loading"><loading /></div>
          <div
            class="flex items-center text-center h-96 bg-white"
            v-if="items.length === 0"
          >
            <EmptyMessage title="No order found" />
          </div>
          <!-- <TableResponsive
            :fields="fields"
            :items="loading ? 10 : items"
            :skeleton="loading"
            hover_stripe
          >
            <template #orderItems="{ value, item }">
              <div class="flex flex-col flex-1">
                <div
                  v-for="(cart, key) in value"
                  :key="`cart-${key}`"
                  class="flex mb-2"
                >
                  <div class="pr-3">{{ cart.qty }}x</div>
                  <div class="flex-1">
                    <p class="font-medium text-wrap">
                      {{ cart.name }}
                      <span v-if="cart.choice?.name"
                        >({{ cart.choice?.name }})</span
                      >
                    </p>
                    <p class="flex flex-col text-gray-500">
                      <small
                        v-for="(addon, index) in cart.addon"
                        :key="`addon-${index}`"
                      >
                        + {{ addon.name }}
                      </small>
                    </p>
                  </div>
                  <div class="pl-3">
                    <p class="text-right">৳{{ singleItemPrice(cart) }}</p>
                    <p
                      class="text-right mt-[-8px]"
                      v-if="singleItemDiscount(cart) > 0"
                    >
                      <small class="text-rose-500"
                        >(৳{{ singleItemDiscount(cart) }})</small
                      >
                    </p>
                  </div>
                </div>
                <hr class="mt-1" />
                <div class="flex justify-between my-2">
                  <p>Total Qty: {{ item.totalQty }}x</p>
                  <div class="flex flex-col">
                    <p class="text-right">
                      Total Price: ৳{{ item.totalPrice }}
                    </p>
                    <p class="text-rose-500 text-right">
                      Total discount: ৳{{ item.totalDiscount }}
                    </p>
                  </div>
                </div>
                <hr />
                <div class="flex justify-center my-2 text-base">
                  Net Price: ৳{{ item.netPrice }}
                </div>
              </div>
            </template>
            <template #qty="{ item }"> {{ item.totalQty }}</template>
            <template #price="{ item }"
              ><p class="text-green-500">৳{{ item.netPrice }}</p></template
            >
            <template #discount="{ item }"
              ><p class="text-rose-500">৳{{ item.totalDiscount }}</p></template
            >
            <template #name="{ item }">
              <div class="flex flex-col w-full overflow-hidden">
                <p
                  v-for="(data, key) in item.orderItems"
                  :key="key"
                  class="text-wrap font-medium"
                >
                  {{ data.name }}
                </p>
              </div>
            </template>
            <template #created_at="{ value }">
              <div :key="refreshTrigger">{{ value | agoDate }}</div>
            </template>
            <template #status="{ value }">
              <Badge
                :variant="getBadgeVariant(value)"
                :title="value"
                class="capitalize"
              />
            </template>
            <template #actions="{ item, index }">
              <div class="relative">
                <Button
                  variant="white"
                  class="transition-colors duration-300 rounded-lg sm:px-4 sm:py-2 focus:outline-none hover:bg-gray-100"
                  @click.native.prevent="toggleDropdown(index)"
                >
                  <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                </Button>
                <template v-if="dropdown === index">
                  <div
                    class="absolute right-0 z-50 w-48 p-2 bg-white border rounded-lg top-10"
                    v-click-outside="() => toggleDropdown(null)"
                  >
                    <div
                      class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'circle-info']"
                        class="mr-1"
                      />
                      See details
                    </div>
                    <div
                      class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                      v-if="item.status !== 'pending'"
                      @click="updateStatus('pending', index)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'clock']"
                        class="mr-1 text-amber-500"
                      />
                      Mark as pending
                    </div>
                    <div
                      class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                      v-if="item.status !== 'active'"
                      @click="updateStatus('active', index)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'pizza-slice']"
                        class="mr-1 text-sky-500"
                      />
                      Mark as active
                    </div>
                    <div
                      class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                      v-if="item.status !== 'complete'"
                      @click="updateStatus('complete', index)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'circle-check']"
                        class="mr-1 text-green-500"
                      />
                      Mark as complete
                    </div>
                    <div
                      class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                      v-if="item.status !== 'cancel'"
                      @click="updateStatus('cancel', index)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'circle-xmark']"
                        class="mr-1 text-rose-500"
                      />
                      Mark as cancel
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template #empty v-if="items.length === 0 && !loading">
              <div class="flex items-center text-center h-96 bg-white">
                <EmptyMessage title="No order found" />
              </div>
            </template>
          </TableResponsive> -->
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
      <div class="flex flex-col flex-1 text-gray-800">
        <div class="flex mb-2">
          <div class="pr-3">Qty</div>
          <div class="flex-1">Name</div>
          <div class="pl-3">Price</div>
        </div>
        <div
          v-for="(cart, key) in orderDetails.orderItems"
          :key="`cart-${key}`"
          class="flex mb-2"
        >
          <div class="pr-3">{{ cart.qty }}x</div>
          <div class="flex-1">
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
          </div>
          <div class="pl-3">
            <p class="text-right">৳{{ singleItemPrice(cart) }}</p>
            <p class="text-right mt-[-8px]" v-if="singleItemDiscount(cart) > 0">
              <small class="text-rose-500"
                >(৳{{ singleItemDiscount(cart) }})</small
              >
            </p>
          </div>
        </div>
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
  middleware: "manager",
  components: { DatePicker },
  directives: { clickOutside: vClickOutside.directive },
  head() {
    return { title: "Order - " + this.pageTitle };
  },
  data() {
    return {
      modal: false,
      tabTitle: [
        { title: "All order", status: null, icon: ["fas", "bars-staggered"] },
        { title: "Pending order", status: "pending", icon: ["fas", "clock"] },
        {
          title: "Active order",
          status: "active",
          icon: ["fas", "pizza-slice"],
        },
        {
          title: "Complete order",
          status: "complete",
          icon: ["fas", "circle-check"],
        },
        {
          title: "Cancel order",
          status: "cancel",
          icon: ["fas", "circle-xmark"],
        },
      ],
      active: "All order",
      tabOrderType: [
        { title: "All" },
        { title: "Dine in" },
        { title: "Parcel" },
      ],
      orderType: "All",
      date: [],
      items: [],
      perPage: 50,
      loading: true,
      errors: {},
      dropdown: null,
      refreshTrigger: 0,
      orderDetails: {},
    };
  },
  computed: {
    ...mapGetters(["isMobile", "pageTitle"]),
    fields() {
      return [
        { key: "tableName", label: "Table no", span: "minmax(100PX, 1fr)" },
        { key: "orderItems", label: "Order Items", span: "minmax(300PX, 2fr)" },
        // { key: "qty", label: "Quantity", span: "minmax(80PX, 1fr)" },
        // { key: "name", label: "name", span: "minmax(250PX, 2fr)" },
        // { key: "price", label: "Price", span: "minmax(80PX, 1fr)" },
        { key: "discount", label: "Discount", span: "minmax(80PX, 1fr)" },
        { key: "status", label: "Status", span: "minmax(120PX, 1fr)" },
        { key: "created_at", label: "Order time", span: "minmax(150PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "100PX",
        },
      ];
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
  mounted() {
    this.fetchItems();
    this.intervalId = setInterval(() => {
      this.refreshTrigger++;
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
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
          const { orders } = await this.$managerApi.fetchOrder(params);
          this.items = this.items.concat(orders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(status, i) {
      try {
        console.log("ami anik");
        await this.$managerApi.updateOrderStatus({ status });
        this.items[i].status = status;
      } catch (error) {
        console.log(error);
      }
    },
    refetch() {
      this.items = [];
      this.orderDetails = {};
      this.fetchItems();
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
