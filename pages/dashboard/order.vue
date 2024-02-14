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
      <div class="px-2 bg-white rounded-lg pt-2 shadow-lg">
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
            <div class="flex items-center justify-between lg:justify-start">
              <TabTitle
                :tabTitle="tabOrderType"
                v-model="orderType"
                :fullWidth="isMobile"
              />
              <!-- <p class="text-gray-700">Total order {{ orderCount }}</p> -->
            </div>
            <div class="flex gap-3 items-center">
              <client-only>
                <DatePicker
                  v-model="date"
                  type="date"
                  range
                  placeholder="Select date range"
                  prefix-class="performance-date-picker mx"
                />
              </client-only>
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
          <span class="font-semibold">Order No:</span>
          #{{ orderDetails.orderNumber }}
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
          :class="cart.AdditionalOrderNumber > 1 ? 'mt-2' : ''"
        >
          <td class="pr-3">{{ cart.qty }}x</td>
          <td class="flex-1">
            <small
              v-if="cart.AdditionalOrderNumber > 1"
              class="absolute mt-[-12px]"
            >
              Additional order {{ th(cart.AdditionalOrderNumber - 1) }} time
            </small>
            <p class="font-medium text-wrap flex items-center">
              {{ cart.name }}
              <span
                v-if="
                  orderDetails &&
                  orderDetails?.orderItems &&
                  orderDetails?.orderItems?.length > 1 &&
                  (orderDetails.status === 'pending' ||
                    orderDetails.status === 'active' ||
                    orderDetails.status === 'billing')
                "
                class="text-rose-600 ml-3 text-lg cursor-pointer"
                @click="removeItems(cart)"
              >
                <font-awesome-icon :icon="['far', 'circle-xmark']" />
              </span>
            </p>
            <p
              class="flex flex-col text-gray-500"
              v-if="cart.choice && cart.choice.length"
            >
              <small
                v-for="(choice, index) in cart.choice"
                :key="`choice-${index}`"
              >
                + {{ choice.name }}
              </small>
            </p>
            <p
              class="flex flex-col text-gray-500"
              v-if="cart.addon && cart.addon.length"
            >
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
                >-৳{{ singleItemDiscount(cart) }}</small
              >
            </p>
          </td>
        </tr>
        <Button
          v-if="
            (orderDetails.status === 'active' ||
              orderDetails.status === 'billing') &&
            !AddItemDisabled
          "
          variant="green"
          class="inline"
          @click.native.prevent="addItem"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add additional Item
        </Button>
        <hr class="mt-1" />
        <div class="flex flex-col">
          <div class="flex justify-between font-bold">
            <p>Sub total price:</p>
            <p>৳{{ subTotalPrice }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>Discount:</p>
            <p class="text-rose-500">-৳{{ totalDiscount }}</p>
          </div>
          <hr />
          <div class="flex justify-between font-bold">
            <p>Total price:</p>
            <p>৳{{ subTotalPrice - totalDiscount }}</p>
          </div>
          <div v-if="orderDetails.status === 'billing'">
            <div class="flex justify-between mb-2 mt-1">
              <div class="flex">
                <p>{{ showVatName }}</p>
                <template v-if="manager">
                  <select
                    v-model="vat"
                    :value="vat"
                    @change="handleVatChange"
                    class="border border-gray-700 ml-2 rounded-lg"
                  >
                    <option value="">Select a vat</option>
                    <option
                      :value="vat._id"
                      v-for="(vat, key) in vats"
                      :key="key"
                    >
                      {{ vat.name }}
                    </option>
                  </select>
                </template>
              </div>
              <p>৳{{ showVatAmount | number }}</p>
            </div>
          </div>
          <div
            class="flex justify-between"
            v-for="(additional, i) in orderDetails.additionalCharges"
            :key="'additional' + i"
          >
            <div class="flex items-center">
              <p>
                {{ additional.name }}
                <span v-if="orderDetails.status === 'billing'"
                  ><font-awesome-icon
                    :icon="['fas', 'xmark']"
                    class="text-red-500 cursor-pointer"
                    @click="removeOrderAdditional(i)"
                /></span>
              </p>
            </div>
            <p>৳{{ additional.charge | number }}</p>
          </div>
          <div v-if="orderDetails.status === 'billing'">
            <div
              class="flex justify-between mb-2"
              v-for="(charge, key) in additionalCharges"
              :key="key"
            >
              <div class="flex items-center">
                <input
                  v-model="charge.name"
                  type="text"
                  class="border border-gray-700 rounded-lg px-2"
                  placeholder="Additional charge name"
                />
                <font-awesome-icon
                  :icon="['fas', 'xmark']"
                  class="text-red-500 cursor-pointer ml-1"
                  @click="removeAdditional(key)"
                />
              </div>
              <div class="flex">
                ৳
                <input
                  v-model="charge.charge"
                  type="number"
                  class="border border-gray-700 rounded-lg w-16 text-right pl-2"
                  placeholder="Additional charge amount"
                  min="0"
                />
              </div>
            </div>
            <div class="flex justify-between mb-2 mt-1" v-if="manager">
              <button @click="addNewCharge" class="underline text-sky-500">
                + Add additional charge
              </button>
            </div>
          </div>
        </div>
        <hr class="mt-1" />
        <div class="flex justify-between text-lg font-bold">
          <p>Total Payable:</p>
          <p>৳{{ totalPayable | number }}</p>
        </div>
        <template v-if="orderDetails.status === 'billing'">
          <div class="flex justify-between mb-1">
            <div class="flex">
              <p>Pay by:</p>
              <template v-if="manager">
                <select
                  v-model="payment.method"
                  class="border border-gray-700 ml-2 rounded-lg"
                >
                  <option
                    :value="method"
                    v-for="(method, key) in paymentMethods"
                    :key="key"
                  >
                    {{ method }}
                  </option>
                </select>
              </template>
            </div>
            <div>
              ৳<input
                v-model.number="payment.amount"
                type="number"
                class="border border-gray-700 rounded-lg w-20 text-right pl-1 appearance-none"
                placeholder="Amount"
              />
            </div>
          </div>
          <hr />
          <div class="flex justify-between text-lg font-bold">
            <p>Returned Amount:</p>
            <p>৳{{ (payment.amount - totalPayable) | number }}</p>
          </div>
        </template>
        <template v-if="orderDetails.status === 'complete'">
          <div class="flex justify-between mb-1">
            <div class="flex">
              <p>Pay by: {{ orderDetails.paymentMethod }}</p>
            </div>
            <div>৳{{ orderDetails.paymentReceivedAmount }}</div>
          </div>
          <hr />
          <div class="flex justify-between text-lg font-bold">
            <p>Returned Amount:</p>
            <p>
              ৳{{
                (orderDetails.paymentReceivedAmount - totalPayable) | number
              }}
            </p>
          </div>
        </template>
      </table>

      <div class="flex flex-col lg:flex-row justify-between mt-4 gap-3">
        <Button
          v-if="
            (orderDetails.status === 'active' ||
              orderDetails.status === 'billing') &&
            deleteMode
          "
          variant="green"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="updateOrder"
          :disabled="AddItemDisabled"
          :loading="updateLoading"
        >
          <font-awesome-icon :icon="['far', 'pen-to-square']" /> Update order
        </Button>
        <template v-else>
          <Button
            v-if="orderDetails.status === 'billing' && manager && updateMode"
            variant="green"
            class="w-full tracking-wide flex-1"
            :loading="updateLoading"
            @click.native.prevent="updateVat"
          >
            <font-awesome-icon :icon="['fas', 'percent']" />
            Update vat
          </Button>
          <Button
            v-else-if="
              (orderDetails.status === 'billing' ||
                orderDetails.status === 'complete') &&
              manager
            "
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printOrder"
          >
            <font-awesome-icon :icon="['fas', 'print']" />
            Print Receipt
          </Button>
          <Button
            v-if="orderDetails.status === 'active'"
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printOrderDetails()"
            :disabled="AddItemDisabled"
          >
            <font-awesome-icon :icon="['fas', 'print']" />
            Print for chef
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
            v-else-if="orderDetails.status === 'active' && manager"
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="billingOrder"
            :loading="acceptLoading"
          >
            <font-awesome-icon :icon="['fas', 'check']" class="mr-1" />
            Create bill
          </Button>
          <Button
            v-else-if="orderDetails.status === 'billing' && manager"
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="manager ? completeOrder() : ''"
            :loading="acceptLoading"
          >
            <font-awesome-icon :icon="['fas', 'check']" class="mr-1" />
            Complete order
          </Button>
          <Button
            v-else-if="orderDetails.status === 'active' && waiter"
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="requestBill"
            :disabled="AddItemDisabled"
            :loading="acceptLoading"
          >
            <font-awesome-icon :icon="['fas', 'file-lines']" class="mr-1" />
            Send billing request
          </Button>
        </template>
        <Button
          v-if="
            (orderDetails.status === 'active' ||
              orderDetails.status === 'pending' ||
              orderDetails.status === 'billing') &&
            manager
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
        >
          <font-awesome-icon :icon="['fas', 'xmark']" /> Cancel order
        </Button>
        <Button
          v-if="
            (orderDetails.status === 'active' ||
              orderDetails.status === 'pending' ||
              orderDetails.status === 'billing') &&
            waiter
          "
          variant="red"
          type="button"
          class="w-full tracking-wide flex-1"
          @click.native.prevent="sendCancelRequest"
          :disabled="AddItemDisabled"
          :loading="cancelLoading"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" /> Send cancel request
        </Button>
        <Button
          v-if="
            orderDetails.status === 'complete' ||
            orderDetails.status === 'cancel'
          "
          variant="red"
          type="button"
          class="w-full tracking-wide flex-1"
          :class="orderDetails.status === 'cancel' ? 'col-span-2' : ''"
          @click.native.prevent="modal = false"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" /> Close
        </Button>
      </div>
    </Modal>
    <Modal v-model="selectWaiterModal" v-if="selectWaiterModal">
      <div class="flex justify-between items-center">
        <h3
          class="text-lg font-medium leading-6 text-gray-600 capitalize"
          id="modal-title"
        >
          Select a waiter
        </h3>
        <CloseButton @click.native.prevent="selectWaiterModal = false" />
      </div>
      <hr class="my-3" />
      <div class="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
        <div
          class="group flex flex-col justify-center items-center border py-4 px-1 hover:text-white hover:bg-green-600 cursor-pointer transition-all duration-200 rounded-lg"
          :class="
            selectEmployee === waiter._id ? 'text-white bg-green-600' : ''
          "
          v-for="(waiter, key) in employees"
          :key="key"
          @click="selectEmployee = waiter._id"
        >
          <font-awesome-icon
            :icon="['far', 'circle-user']"
            class="text-5xl text-green-500 group-hover:text-white transition-all duration-200"
            :class="
              selectEmployee === waiter._id ? 'text-white bg-green-600' : ''
            "
          />
          <p
            class="text-gray-700 group-hover:text-white transition-all duration-200 text-lg"
            :class="
              selectEmployee === waiter._id ? 'text-white bg-green-600' : ''
            "
          >
            {{ waiter.name }}
          </p>
        </div>
      </div>
      <hr class="my-3" />
      <div class="flex justify-end">
        <Button
          :disabled="selectEmployee == null"
          @click.native.prevent="acceptOrder"
          >Order Assign</Button
        >
      </div>
    </Modal>
    <Modal v-model="cancelModal" v-if="cancelModal">
      <div class="flex justify-between items-center">
        <h1 class="text-gray-700 text-xl">Select cancel reason</h1>
        <CloseButton @click.native.prevent="cancelModal = false" />
      </div>
      <form @submit.prevent="cancelOrder">
        <Input
          v-for="(field, i) in cancelInputFields"
          :key="i"
          :field="field"
          v-model="cancelForm"
          :errors="errors"
        />
        <div class="flex justify-end mt-4">
          <Button variant="red" type="submit">Cancel order</Button>
        </div>
      </form>
    </Modal>
    <PrintReceipt
      :orderDetails="orderDetails"
      :showVatName="showVatName"
      :showVatAmount="showVatAmount"
      v-if="orderDetails._id"
    />
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
      orderCount: 0,
      date: [],
      items: [],
      tables: [],
      vats: [],
      payment: { method: "Cash", amount: "" },
      paymentMethods: ["Cash", "bKash", "ATM Card"],
      perPage: 30,
      vat: "",
      loading: true,
      cancelLoading: false,
      acceptLoading: false,
      errors: {},
      dropdown: null,
      refreshTrigger: 0,
      orderDetails: {},
      newOrder: false,
      additionalCharges: [],
      employees: [],
      updateMode: false,
      updateLoading: false,
      tableSlug: false,
      selectWaiterModal: false,
      deleteMode: false,
      updateLoading: false,
      selectEmployee: null,
      cancelModal: false,
      cancelForm: { cancelReason: "Wrong order" },
    };
  },
  computed: {
    ...mapGetters([
      "isMobile",
      "pageTitle",
      "manager",
      "waiter",
      "restaurantSlug",
    ]),
    tabTitle() {
      return [
        {
          title: "Table view",
          status: "pending",
          icon: ["fas", "table-cells"],
          iconClass: "text-grey-700",
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
          title: "Billing order",
          status: "billing",
          icon: ["fas", "file-invoice"],
          iconClass: "text-purple-500",
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
    additionalChargesAmount() {
      const additionalCharge = this.additionalCharges.reduce(
        (t, { charge }) => t + +charge,
        0
      );
      const existCharge = this.orderDetails.additionalCharges.reduce(
        (t, { charge }) => t + +charge,
        0
      );
      return additionalCharge + existCharge;
    },
    showVatAmount() {
      if (this.vat) {
        return (
          (this.orderDetails.totalPrice * this.vatName(this.vat).percent) / 100
        );
      } else {
        return 0;
      }
    },
    showVatName() {
      if (this.vat) {
        return `${this.vatName(this.vat).name || ""} ${
          this.vatName(this.vat).percent || ""
        }%`;
      } else {
        return "Vat";
      }
    },
    totalPayable() {
      return (
        this.orderDetails.totalPrice +
        this.additionalChargesAmount +
        this.showVatAmount
      );
    },
    AddItemDisabled() {
      if (this.manager) {
        return false;
      } else {
        return this.orderDetails.waiterID === this.$auth.user._id
          ? false
          : true;
      }
    },
    subTotalPrice() {
      return this.orderDetails.orderItems.reduce(
        (total, value) => total + this.calcPrice(value),
        0
      );
    },
    totalDiscount() {
      return this.orderDetails.orderItems.reduce(
        (total, value) => total + value.qty * value.discount,
        0
      );
    },
    cancelInputFields() {
      const list = [
        "Wrong order",
        "Item unavailability",
        "Bad quality",
        "Others",
      ];
      return [
        {
          type: "select",
          name: "cancelReason",
          options: list.map((data) => ({ value: data, label: data })),
          showEmptySelect: false,
        },
      ];
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
    modal(val) {
      if (!val) {
        this.updateMode = false;
        this.deleteMode = false;
        this.payment = { method: "Cash", amount: "" };
      }
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
      this.fetchOrderDetails(orderID)
    );
  },
  mounted() {
    if (this.active === "Table view") {
      this.fetchTables();
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
    calcPrice(item) {
      const { qty, price, addon, choice } = item;

      const addonPrice = addon.reduce((total, value) => total + value.price, 0);
      const choicePrice = choice.reduce(
        (total, value) => total + value.price,
        0
      );
      return (price + addonPrice + choicePrice) * qty;
    },
    async fetchVats() {
      try {
        const { vats } = await this.$mowApi.fetchVat();
        this.vats = vats;
      } catch (error) {
        console.error(error);
      }
    },
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
      } else if (status === "billing") {
        return "bg-purple-200 hover:bg-purple-300";
      }
    },
    openOrderDetails(item, serial) {
      const vat = this.vats.find(
        ({ name, percent }) => name === item.vatName && percent === item.vat
      );
      this.tableSlug = serial ?? null;
      this.vat = vat ? vat._id : "";
      this.orderDetails = { ...item };
      this.modal = true;
    },
    async cancelOrder() {
      try {
        if (this.cancelModal) {
          this.cancelLoading = true;
          this.errors = {};
          const status = "cancel";
          await this.$mowApi.updateOrderStatus({
            _id: this.orderDetails._id,
            status,
            currentStatus: this.orderDetails.status,
            ...this.cancelForm,
          });
          this.$nuxt.$emit("success", "Order canceled");
          this.modal = false;
          this.cancelModal = false;
          this.updateStatus(this.orderDetails._id, status);
          this.refetch();
        } else {
          this.cancelModal = true;
        }
      } catch (error) {
        console.error(error);
        this.errors = error?.response?.data?.errors;
      } finally {
        this.cancelLoading = false;
      }
    },
    async fetchEmploy() {
      try {
        const { employees } = await this.$managerApi.fetchAllEmployee();
        this.employees = employees;
      } catch (error) {
        console.error(error);
      }
    },
    getWaiter() {
      return (
        this.employees.find(({ _id }) => _id === this.selectEmployee) || false
      );
    },
    async accOrder() {
      try {
        this.acceptLoading = true;
        const status = "active";
        const body = {
          _id: this.orderDetails._id,
          status,
          currentStatus: this.orderDetails.status,
        };
        if (
          this.selectWaiterModal &&
          this.selectEmployee !== null &&
          this.getWaiter()
        ) {
          body.managerMode = true;
          body.setWaiterID = this.getWaiter()._id;
          body.setWaiterName = this.getWaiter().name;
        }
        await this.$mowApi.updateOrderStatus(body);
        this.$nuxt.$emit("success", "Order accept");
        this.modal = false;
        this.selectWaiterModal = false;
        this.updateStatus(this.orderDetails._id, status);
        this.refetch();
      } catch (error) {
        console.error(error);
        if (error?.response?.data?.message) {
          this.$nuxt.$emit("error", error?.response?.data.message);
        }
      } finally {
        this.acceptLoading = false;
      }
    },
    acceptOrder() {
      try {
        if (this.manager && !this.orderDetails.waiterID) {
          if (this.selectWaiterModal && this.selectEmployee !== null) {
            this.accOrder();
          } else {
            this.selectWaiterModal = true;
          }
        } else if (
          this.waiter ||
          (this.manager && this.orderDetails.waiterID)
        ) {
          this.accOrder();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async billingOrder() {
      try {
        if (confirm(`Are you sure, you want to create bill?`)) {
          const status = "billing";
          this.acceptLoading = true;
          await this.$mowApi.updateOrderStatus({
            _id: this.orderDetails._id,
            status,
            currentStatus: this.orderDetails.status,
          });
          this.updateStatus(this.orderDetails._id, status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.acceptLoading = false;
      }
    },
    async completeOrder() {
      try {
        if (this.payment.amount >= 0) {
          if (confirm(`Are you sure, you want to complete this order?`)) {
            const status = "complete";
            this.acceptLoading = true;
            const paymentData = { ...this.payment };
            await this.$mowApi.updateOrderStatus({
              _id: this.orderDetails._id,
              status,
              currentStatus: this.orderDetails.status,
              ...paymentData,
            });
            this.modal = false;
            this.$nuxt.$emit("success", "Order complete");
            this.updatePaymentData(this.orderDetails._id, paymentData);
            this.updateStatus(this.orderDetails._id, status);
            // this.refetch();
          }
        } else {
          this.$nuxt.$emit("error", "Please input a valid amount");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.acceptLoading = false;
      }
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
    openOrder({ _id, serial }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        const newItem = JSON.parse(JSON.stringify(find));
        this.openOrderDetails(newItem, serial);
      } else {
        this.$router.push({
          name: "menu-slug-table",
          params: { slug: this.$auth.user.restaurant.slug, table: serial },
          query: { manualOrder: true },
        });
      }
    },
    showTableTime({ _id }) {
      const find = this.items.find(({ tableID }) => tableID === _id);
      if (find) {
        return this.showTime(find.created_at);
      }
      return null;
    },
    async printOrder() {
      this.$nuxt.$emit("trigger-print-receipt", this.orderDetails._id);
    },
    vatName(vat) {
      return this.vats.find(({ _id }) => _id === vat);
    },
    async updateVat() {
      try {
        this.updateLoading = true;
        const data = {
          _id: this.orderDetails._id,
        };
        if (this.vat) {
          const { name, percent } = this.vatName(this.vat);
          data.vat = { name, percent };
        }
        if (this.additionalCharges) {
          data.additionalCharges = [
            ...(this.orderDetails?.additionalCharges || []),
            ...this.additionalCharges,
          ];
        }
        await this.$managerApi.addServiceCharge(data);
        if (this.active !== "Table view") {
          this.items = [];
          this.fetchItems();
        }
        this.orderDetails.additionalCharges = data.additionalCharges;
        this.additionalCharges = [];
        this.updateMode = false;
        this.$nuxt.$emit("success", "Service charge added successfully");
        this.refetchOrderData();
      } catch (error) {
        console.error(error);
        this.$nuxt.$emit("error", "Something Wrong! Please try Again");
      } finally {
        this.updateLoading = false;
      }
    },
    addNewCharge() {
      this.additionalCharges.push({ name: "", charge: 0 });
      this.updateMode = true;
    },
    removeAdditional(key) {
      this.additionalCharges.splice(key, 1);
      this.updateMode = true;
    },
    removeOrderAdditional(key) {
      this.orderDetails.additionalCharges.splice(key, 1);
      this.updateMode = true;
    },
    handleVatChange(event) {
      this.vat = event.target.value;
      this.updateMode = true;
    },
    async printOrderDetails() {
      try {
        await this.$mowApi.printOrderDetails({
          orderID: this.orderDetails._id,
        });
        this.$nuxt.$emit("success", "Printing details send successfully");
      } catch (error) {
        console.error(error);
      }
    },
    async fetchOrderDetails(orderID) {
      try {
        const { order } = await this.$mowApi.fetchOrderDetails({
          orderID,
        });
        this.openOrderDetails(order);
      } catch (error) {
        console.error(error);
      }
    },
    addItem() {
      this.$router.push({
        name: "menu-slug-table",
        params: { slug: this.restaurantSlug, table: this.tableSlug },
        query: { additionalMode: true, email: this.orderDetails.userEmail },
      });
      this.modal = false;
    },
    async requestBill() {
      try {
        await this.$userApi.billRequest({ tableID: this.orderDetails.tableID });
        this.modal = false;
        this.$nuxt.$emit("success", "Billing request send successfully");
      } catch (error) {
        this.$nuxt.$emit("error", "Something wrong! Please try again");
        console.error(error);
      }
    },
    async sendCancelRequest() {
      try {
        await this.$mowApi.sendCancelRequest({
          orderID: this.orderDetails._id,
        });
        this.$nuxt.$emit("success", "Cancel request send successfully");
      } catch (error) {
        this.$nuxt.$emit("error", "Something wrong! Please try again");
        console.error(error);
      }
    },
    removeItems(item) {
      if (this.orderDetails.orderItems.length > 1) {
        const index = this.orderDetails.orderItems.findIndex(
          ({ _id }) => item._id === _id
        );
        if (index !== -1) {
          this.orderDetails.orderItems.splice(index, 1);
        }
        this.deleteMode = true;
      }
    },
    async updateOrder() {
      try {
        this.updateLoading = true;
        await this.$mowApi.updateOrderItem({
          orderID: this.orderDetails._id,
          orderItems: this.orderDetails.orderItems,
        });
        this.refetch();
        this.modal = false;
        this.$nuxt.$emit("success", "Order item update successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.updateLoading = false;
      }
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
