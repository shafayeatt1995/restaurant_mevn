<template>
  <div>
    <Modal v-model="modal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          Order details
        </h1>
        <CloseButton @click.native.prevent="closeModal" />
      </div>
      <hr class="my-3" />
      <div class="flex justify-center items-center h-72" v-if="orderLoading">
        <img
          class="size-20 animate-spin"
          src="/images/loading.svg"
          alt="Loading icon"
        />
      </div>
      <template v-else>
        <div
          class="grid grid-cols-1 lg:grid-cols-2 justify-between text-gray-700 gap-1"
        >
          <p>
            <span class="font-semibold">Order No:</span>
            #{{ orderDetails.orderNumber }}
          </p>
          <p>
            <span class="font-semibold">ID:</span> {{ orderDetails.userEmail }}
          </p>
          <div class="flex items-center">
            <span class="font-semibold">Type:</span>
            {{ orderDetails.orderType }}
            <span
              ><TableIcon
                class="h-5"
                v-if="orderDetails.orderType === 'Dine in'" />
              <ParcelIcon class="h-5 ml-1" v-else
            /></span>
          </div>
          <p>
            <span class="font-semibold">Table:</span>
            {{ orderDetails.tableName }}
          </p>
          <p>
            <span class="font-semibold">Status:</span>
            <Badge
              :variant="orderDetails.status"
              :title="orderDetails.status"
            />
          </p>
          <p>
            <span class="font-semibold">Waiter:</span>
            {{ orderDetails.waiterName || "#" }}
          </p>
          <p v-if="orderDetails?.parcelName">
            <span class="font-semibold">Parcel Customer:</span>
            {{ orderDetails.parcelName }}
          </p>
          <p v-if="orderDetails?.parcelPhone">
            <span class="font-semibold">Parcel Phone:</span>
            {{ orderDetails.parcelPhone }}
          </p>
          <p v-if="orderDetails?.parcelAddress">
            <span class="font-semibold">Parcel Address:</span>
            {{ orderDetails.parcelAddress }}
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
                  <i class="far fa-circle-xmark" />
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
              <p
                class="text-right mt-[-8px]"
                v-if="singleItemDiscount(cart) > 0"
              >
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
            class="inline"
            @click.native.prevent="addItem"
          >
            <i class="fas fa-plus" />
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
                    ><i
                      class="fas fa-xmark text-red-500 cursor-pointer"
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
                  <i
                    class="text-red-500 cursor-pointer ml-1 fas fa-xmark"
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
      </template>
      <div class="flex flex-col lg:flex-row justify-between mt-4 gap-3">
        <Button
          v-if="
            (orderDetails.status === 'active' ||
              orderDetails.status === 'billing') &&
            deleteMode
          "
          class="w-full tracking-wide flex-1"
          @click.native.prevent="updateOrder"
          :disabled="AddItemDisabled"
          :loading="updateLoading"
        >
          <i class="far fa-pen-to-square" /> Update order
        </Button>
        <template v-else>
          <Button
            v-if="orderDetails.status === 'billing' && manager && updateMode"
            class="w-full tracking-wide flex-1"
            :loading="updateLoading"
            @click.native.prevent="updateVat"
          >
            <i class="fas fa-percent" />
            Update extra charges
          </Button>
          <Button
            v-else-if="
              (orderDetails.status === 'billing' ||
                orderDetails.status === 'complete') &&
              manager
            "
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printOrder"
          >
            <i class="fas fa-print" />
            Print Receipt
          </Button>
          <Button
            v-if="orderDetails.status === 'active'"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printOrderDetails()"
            :disabled="AddItemDisabled"
          >
            <i class="fas fa-print" />
            Print kitchen copy
          </Button>
          <Button
            v-if="orderDetails.status === 'pending'"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="acceptOrder"
            :loading="acceptLoading"
          >
            <i class="fas fa-check mr-1" />
            Accept order
          </Button>
          <Button
            v-else-if="orderDetails.status === 'active' && manager"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="billingOrder"
            :loading="acceptLoading"
          >
            <i class="fas fa-check mr-1" />
            Create bill
          </Button>
          <Button
            v-else-if="orderDetails.status === 'billing' && manager"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="manager ? completeOrder() : ''"
            :loading="acceptLoading"
            variant="green"
          >
            <i class="fas fa-check mr-1" />
            Complete order
          </Button>
          <Button
            v-else-if="orderDetails.status === 'active' && waiter"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="requestBill"
            :disabled="AddItemDisabled"
            :loading="acceptLoading"
          >
            <i class="fas fa-file-lines mr-1" />
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
              ? $auth.user?._id !== orderDetails.waiterID
              : false
          "
          :loading="cancelLoading"
        >
          <i class="fas fa-xmark" /> Cancel order
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
          <i class="fas fa-xmark" /> Send cancel request
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
          @click.native.prevent="closeModal"
        >
          <i class="fas fa-xmark" /> Close
        </Button>
      </div>
    </Modal>
    <Modal v-model="selectWaiterModal" v-if="selectWaiterModal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          Select a waiter
        </h1>
        <CloseButton @click.native.prevent="selectWaiterModal = false" />
      </div>
      <hr class="my-3" />
      <div class="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
        <div
          class="group flex flex-col justify-center items-center border py-4 px-1 hover:text-white hover:bg-gray-900 cursor-pointer transition-all duration-200 rounded-lg"
          :class="selectEmployee === waiter._id ? 'text-white bg-gray-900' : ''"
          v-for="(waiter, key) in employees"
          :key="key"
          @click="selectEmployee = waiter._id"
        >
          <i
            class="text-5xl text-gray-700 group-hover:text-white transition-all duration-200 far fa-circle-user"
            :class="selectEmployee === waiter._id ? 'text-white' : ''"
          />
          <p
            class="text-gray-700 group-hover:text-white transition-all duration-200 text-lg"
            :class="selectEmployee === waiter._id ? 'text-white' : ''"
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
      v-if="orderModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TableIcon from "~/static/svg/table.svg";
import ParcelIcon from "~/static/svg/parcel.svg";
export default {
  name: "OrderDetails",
  components: { TableIcon, ParcelIcon },
  props: { vats: Array, employees: Array },
  data() {
    return {
      modal: true,
      selectWaiterModal: false,
      cancelModal: false,
      additionalCharges: [],
      acceptLoading: false,
      cancelLoading: false,
      updateLoading: false,
      deleteMode: false,
      updateMode: false,
      vat: "",
      selectEmployee: null,
      errors: {},
      cancelForm: { cancelReason: "Wrong order" },
      payment: { method: "Cash", amount: 0 },
      paymentMethods: ["Cash", "bKash", "ATM Card"],
    };
  },
  computed: {
    ...mapGetters("order", [
      "orderModal",
      "orderDetails",
      "orderLoading",
      "tables",
    ]),
    ...mapGetters([
      "manager",
      "waiter",
      "restaurantSlug",
      "activeSubscription",
    ]),
    subTotalPrice() {
      if (this.orderDetails !== null) {
        return this.orderDetails.orderItems.reduce(
          (total, value) => total + this.calcPrice(value),
          0
        );
      } else {
        return 0;
      }
    },
    totalDiscount() {
      if (this.orderDetails !== null) {
        return this.orderDetails.orderItems.reduce(
          (total, value) => total + value.qty * value.discount,
          0
        );
      } else {
        return 0;
      }
    },
    totalPayable() {
      return (
        (this.orderDetails.totalPrice || 0) +
        this.additionalChargesAmount +
        this.showVatAmount
      );
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
    showVatName() {
      if (this.vat) {
        return `${this.vatName(this.vat).name || ""} ${
          this.vatName(this.vat).percent || ""
        }%`;
      } else {
        return "Vat";
      }
    },
    AddItemDisabled() {
      if (this.manager) {
        return false;
      } else {
        return this.orderDetails?.waiterID === this.$auth.user?._id
          ? false
          : true;
      }
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
    tableSlug() {
      const data = this.tables.find(
        ({ _id }) => _id === this.orderDetails?.tableID
      );
      return data?.serial ?? "";
    },
  },
  mounted() {
    if (this.orderDetails.vatID) {
      this.vat = this.orderDetails.vatID || "";
    }
  },
  methods: {
    ...mapActions("order", [
      "resetOrder",
      "refetchOrder",
      "removeOrderItem",
      "removeAdditionalCharges",
    ]),
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
    closeModal() {
      this.$emit("refetch");
      this.resetOrder();
    },
    calcPrice(item) {
      const { qty, price, addon, choice } = item;

      const addonPrice = addon.reduce((total, value) => total + value.price, 0);
      const choicePrice = choice.reduce(
        (total, value) => total + value.price,
        0
      );
      return (price + addonPrice + choicePrice) * qty;
    },
    singleItemPrice(data) {
      return this.calcPrice(data);
    },
    singleItemDiscount(item) {
      return item.qty * item.discount;
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
        this.selectWaiterModal = false;
        this.refetchOrder();
      } catch (error) {
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
      } catch (error) {}
    },
    addItem() {
      this.$router.push({
        name: "menu-slug-table",
        params: { slug: this.restaurantSlug, table: this.tableSlug },
        query: { additionalMode: true, email: this.orderDetails.userEmail },
      });
      this.resetOrder();
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
          this.cancelModal = false;
          this.refetchOrder();
        } else {
          this.cancelModal = true;
        }
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.cancelLoading = false;
      }
    },
    removeItems(item) {
      if (this.orderDetails.orderItems.length > 1) {
        const index = this.orderDetails.orderItems.findIndex(
          ({ _id }) => item._id === _id
        );
        if (index !== -1) {
          this.removeOrderItem(index);
          this.deleteMode = true;
        }
      }
    },
    async updateOrder() {
      try {
        this.updateLoading = true;
        await this.$mowApi.updateOrderItem({
          orderID: this.orderDetails._id,
          orderItems: this.orderDetails.orderItems,
        });
        this.$nuxt.$emit("success", "Order item update successfully");
        this.refetchOrder();
        this.deleteMode = false;
      } catch (error) {
      } finally {
        this.updateLoading = false;
      }
    },
    async printOrderDetails() {
      try {
        await this.$mowApi.printOrderDetails({
          orderID: this.orderDetails._id,
        });
        this.$nuxt.$emit("success", "Printing details send successfully");
      } catch (error) {}
    },
    async billingOrder() {
      try {
        const status = "billing";
        this.acceptLoading = true;
        await this.$mowApi.updateOrderStatus({
          _id: this.orderDetails._id,
          status,
          currentStatus: this.orderDetails.status,
        });
        this.refetchOrder();
      } catch (error) {
      } finally {
        this.acceptLoading = false;
      }
    },
    handleVatChange(event) {
      this.vat = event.target.value;
      this.updateMode = true;
    },
    addNewCharge() {
      this.additionalCharges.push({ name: "", charge: 0 });
      this.updateMode = true;
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
          const { _id, name, percent } = this.vatName(this.vat);
          data.vat = { _id, name, percent };
        }
        if (this.additionalCharges) {
          data.additionalCharges = [
            ...(this.orderDetails?.additionalCharges || []),
            ...this.additionalCharges,
          ];
        }
        await this.$managerApi.addServiceCharge(data);
        this.additionalCharges = [];
        this.updateMode = false;
        this.$nuxt.$emit("success", "Service charge added successfully");
        this.refetchOrder();
      } catch (error) {
        this.$nuxt.$emit("error", "Something Wrong! Please try Again");
      } finally {
        this.updateLoading = false;
      }
    },
    removeOrderAdditional(key) {
      this.removeAdditionalCharges(key);
      this.updateMode = true;
    },
    removeAdditional(key) {
      this.additionalCharges.splice(key, 1);
      this.updateMode = true;
    },
    async printOrder() {
      this.$nuxt.$emit("trigger-print-receipt", this.orderDetails._id);
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
            this.$nuxt.$emit("success", "Order complete");
            this.refetchOrder();
          }
        } else {
          this.$nuxt.$emit("error", "Please input a valid amount");
        }
      } catch (error) {
      } finally {
        this.acceptLoading = false;
      }
    },
    async requestBill() {
      try {
        await this.$userApi.billRequest({ tableID: this.orderDetails.tableID });
        this.$nuxt.$emit("success", "Billing request send successfully");
      } catch (error) {
        this.$nuxt.$emit("error", "Something wrong! Please try again");
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
      }
    },
  },
};
</script>
