<template>
  <div
    style="font-size: 12px; display: none"
    ref="receipt"
    v-if="orderDetails?._id"
  >
    <table style="width: 100%">
      <tbody style="font-size: 12px">
        <tr v-if="restaurant.printImage">
          <td style="text-align: center; text-align: -webkit-center">
            <nuxt-img
              format="webp"
              loading="lazy"
              decode="async"
              :src="restaurant.printImage"
              :alt="restaurant.name"
              style="max-width: 70%; max-height: 95px"
            />
          </td>
        </tr>
        <tr v-if="restaurant.printName">
          <td style="text-align: center; font-size: 16px">
            <b>{{ restaurant.printName }}</b>
          </td>
        </tr>
        <tr v-if="restaurant.printAddress">
          <td style="text-align: center">{{ restaurant.printAddress }}</td>
        </tr>
        <tr v-if="restaurant.printPhone">
          <td style="text-align: center">
            Mobile: {{ restaurant.printPhone }}
          </td>
        </tr>
        <tr v-if="restaurant.printEmail">
          <td style="text-align: center">Email: {{ restaurant.printEmail }}</td>
        </tr>
        <template  v-if="restaurant.topPrintData">
          <tr v-for="(topPrintData, i) in restaurant.topPrintData" :key="i + 'print'">
            <td style="text-align: center"><span v-if="topPrintData.title">{{ topPrintData.title }}: </span><span v-if="topPrintData.body">{{ topPrintData.body }}</span></td>
          </tr>
        </template>
      </tbody>
    </table>
    <table style="width: 100%; margin-top: 10px">
      <tbody style="font-size: 12px">
        <tr>
          <td>
            <div style="text-align: left">
              Date:
              {{ $moment(orderDetails.created_at).format("DD/MM/YYYY") }}
            </div>
          </td>
          <td>
            <div style="text-align: right">
              Time:
              {{ $moment(orderDetails.created_at).format("hh:mm A") }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="text-align: left">
              Table: {{ orderDetails.tableName }}
            </div>
          </td>
          <td>
            <div style="text-align: right">
              Order No: #{{ orderDetails.orderNumber }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="text-align: left">
              Waiter: {{ orderDetails.waiterName }}
            </div>
          </td>
        </tr>
        <template v-if="orderDetails.orderType === 'Parcel'">
          <tr>
            <td colspan="2">
              <div style="text-align: left">
                Customer: {{ orderDetails.parcelName }}
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div style="text-align: left">
                Phone: {{ orderDetails.parcelPhone }}
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div style="text-align: left">
                Address: {{ orderDetails.parcelAddress }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div style="margin-top: 10px"></div>
    <table
      style="
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        border: 1px solid #000;
      "
    >
      <tbody style="font-size: 12px">
        <tr style="font-weight: 600; border-bottom: 1px solid #000">
          <td style="width: calc(100% - 65px); border-right: 1px solid #000">
            Name
          </td>
          <td style="width: 25px; border-right: 1px solid #000; padding: 0 5px">
            Qty
          </td>
          <td style="width: 40px; padding: 0 5px">Price</td>
        </tr>
        <tr
          :style="`border-bottom: 1px ${
            key + 1 === orderDetails?.orderItems?.length ? 'solid' : 'dashed'
          } #000`"
          v-for="(item, key) in orderDetails.orderItems"
          :key="key"
        >
          <td
            style="
              width: calc(100% - 65px);
              border-right: 1px solid #000;
              text-align: left;
            "
          >
            <div>
              {{ item.name }}
            </div>
            <div
              v-for="(choice, index) in item.choice"
              :key="`choice-${index}`"
            >
              <small>+ {{ choice.name }}</small>
            </div>
            <div v-for="(addon, index) in item.addon" :key="`addon-${index}`">
              <small>+ {{ addon.name }}</small>
            </div>
          </td>
          <td style="width: 25px; border-right: 1px solid #000; padding: 0 5px">
            x{{ item.qty }}
          </td>
          <td style="width: 40px; padding: 0 5px">
            {{ singleItemPrice(item) | number }}
          </td>
        </tr>
      </tbody>
    </table>
    <table style="width: 100%">
      <tbody style="font-size: 12px">
        <tr style="font-weight: 600">
          <td style="width: calc(100% - 60px)">Sub total</td>
          <td style="width: 60px; text-align: right">
            {{ orderDetails.subTotalPrice ?? 0 | number }}
          </td>
        </tr>
        <tr>
          <td style="width: calc(100% - 60px)">Discount</td>
          <td style="width: 60px; text-align: right">
            -{{ orderDetails.totalDiscount ?? 0 | number }}
          </td>
        </tr>
      </tbody>
    </table>
    <div style="border-bottom: 1px solid #000"></div>
    <table style="width: 100%">
      <tbody style="font-size: 12px">
        <tr style="font-weight: 600">
          <td style="width: calc(100% - 60px)">Total price</td>
          <td style="width: 60px; text-align: right">
            {{ orderDetails.totalPrice ?? 0 | number }}
          </td>
        </tr>
        <tr>
          <td style="width: calc(100% - 60px)">
            {{ orderDetails.vatName ?? "vat" }}
          </td>
          <td style="width: 60px; text-align: right">
            {{ orderDetails.vatAmount ?? 0 | number }}
          </td>
        </tr>
        <tr
          v-if="
            orderDetails?.additionalCharges &&
            orderDetails?.additionalCharges.length === 0
          "
        >
          <td style="width: calc(100% - 60px)">Additional charges</td>
          <td style="width: 60px; text-align: right">0</td>
        </tr>
        <tr
          v-for="(additional, i) in orderDetails.additionalCharges"
          :key="'additional' + i"
        >
          <td style="width: calc(100% - 60px)">{{ additional.name }}</td>
          <td style="width: 60px; text-align: right">
            {{ additional.charge ?? 0 | number }}
          </td>
        </tr>
      </tbody>
    </table>
    <div style="border-bottom: 1px solid #000"></div>
    <table style="width: 100%">
      <tbody style="font-size: 12px">
        <tr style="font-size: 15px; font-weight: 600">
          <td style="width: calc(100% - 60px)">Total payable</td>
          <td style="width: 60px; text-align: right">
            {{ totalPayable() | number }}
          </td>
        </tr>
        <tr
          v-if="
            orderDetails.paymentMethod && orderDetails.status === 'complete'
          "
        >
          <td style="width: calc(100% - 60px)">
            Pay by: {{ orderDetails.paymentMethod }}
          </td>
          <td style="width: 60px; text-align: right">
            {{ orderDetails.paymentReceivedAmount ?? 0 | number }}
          </td>
        </tr>
        <tr
          v-if="
            orderDetails.paymentMethod && orderDetails.status === 'complete'
          "
        >
          <td style="width: calc(100% - 60px)">Returned Amount</td>
          <td style="width: 60px; text-align: right">
            {{
              orderDetails.paymentReceivedAmount - totalPayable() ?? 0 | number
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <div
      style="border-bottom: 1px solid #000"
      v-if="orderDetails.paymentMethod && orderDetails.status === 'complete'"
    ></div>

    <div style="margin-top: 12px" v-if="restaurant.bottomPrintData">
      <p style="text-align: center; font-size: 12px; margin: 0" v-for="(bottomPrintData, i) in restaurant.bottomPrintData" :key="i + 'bottomPrintData'"><span v-if="bottomPrintData.title">{{ bottomPrintData.title }}: </span><span v-if="bottomPrintData.body">{{ bottomPrintData.body }}</span></p>
        </div>
    <center style="font-size: 12px; padding: 0 15px; margin: 10px 0">Technology Partner "scaneating.com"</center>
  </div>
</template>

<script>
export default {
  name: "PrintReceipt",
  data() {
    return {
      orderDetails: {},
    };
  },
  computed: {
    restaurant() {
      return this.$auth.user?.restaurant;
    },
  },
  created() {
    this.$nuxt.$on("trigger-print-receipt", (orderID) =>
      this.fetchOrder(orderID)
    );
  },
  methods: {
    calcPrice(item) {
      const { qty, price, addon, choice } = item;
      const addonPrice = addon.reduce((total, value) => total + value.price, 0);
      return (price + addonPrice + (choice.price || 0)) * qty;
    },
    singleItemPrice(data) {
      return this.calcPrice(data);
    },
    additionalChargesAmount() {
      return this.orderDetails.additionalCharges.reduce(
        (t, { charge }) => t + +charge,
        0
      );
    },
    totalPayable() {
      return (
        (this.orderDetails.totalPrice || 0) +
        (this.additionalChargesAmount() || 0) +
        (this.orderDetails.vatAmount || 0)
      );
    },
    printReceipt() {
      try {
        this.$nextTick(() => {
          const printContent = this.$refs?.receipt?.innerHTML;
          if (printContent) {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(
              `<html><body style="padding: 0; margin: 0 20px 0 0; font-family: monospace">${printContent}</body></html>`
            );
            printWindow.document.close();
            printWindow.print();
            printWindow.onafterprint = () => {
              printWindow.close();
              this.orderDetails = {};
            };
          }
        });
      } catch (error) {}
    },
    async fetchOrder(orderID) {
      try {
        const { order } = await this.$managerApi.fetchSingleOrder(orderID);
        this.orderDetails = order;
        this.printReceipt();
      } catch (error) {}
    },
  },
};
</script>
