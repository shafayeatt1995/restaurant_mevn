<template>
  <div style="font-size: 12px; display: none" ref="itemList">
    <table style="width: 100%">
      <tbody style="font-size: 12px">
        <tr>
          <td>
            <div>
              <b>Date:</b>
              {{ $moment().format("DD/MM/YYYY - HH:MMa") }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div><b>Table: </b> {{ orderDetails?.tableName }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="border-bottom: 1px solid #000; margin-top: 5px"></div>
    <table style="width: 100%; border-collapse: collapse; text-align: center">
      <tbody style="font-size: 12px">
        <tr style="font-weight: 600; border-bottom: 1px solid #000">
          <td style="width: calc(100% - 30px); border-right: 1px solid #000">
            Name
          </td>
          <td style="width: 25px; border-right: 1px solid #000; padding: 0 5px">
            Qty
          </td>
        </tr>
        <tr
          :style="`border-bottom: 1px ${
            key + 1 === orderDetails?.orderItems?.length ? 'solid' : 'dashed'
          } #000`"
          v-for="(item, key) in orderDetails?.orderItems"
          :key="key"
        >
          <td
            style="
              width: calc(100% - 30px);
              border-right: 1px solid #000;
              text-align: left;
            "
          >
            <div>
              {{ item.name }}
              <span v-if="item.choice.name">({{ item.choice.name }})</span>
            </div>
            <div v-for="(addon, index) in item.addon" :key="`addon-${index}`">
              <small>+ {{ addon.name }}</small>
            </div>
          </td>
          <td style="width: 25px; border-right: 1px solid #000; padding: 0 2px">
            x{{ item.qty }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import socket from "@/utils/socket";
import { mapGetters } from "vuex";

export default {
  name: "RealtimePrintItemList",
  data() {
    return {
      orderDetails: {},
    };
  },
  computed: {
    ...mapGetters(["baseUrl", "manager"]),
  },
  mounted() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.on(
        `print-item-list-${this.$auth.user.restaurant._id}`,
        (orderID) => {
          this.printItem(orderID);
        }
      );
    }
  },
  beforeDestroy() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.off(`print-item-list-${this.$auth?.user?.restaurant?._id}`);
    }
  },
  methods: {
    async printItem(orderID) {
      try {
        const { order } = await this.$managerApi.fetchPrintOrder(orderID);
        this.orderDetails = order;
        setTimeout(() => {
          this.printReceipt();
        }, 500);
      } catch (error) {
        console.error(error);
      }
    },
    printReceipt() {
      const printContent = this.$refs.itemList.innerHTML;
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `<html><head><title>Print item list</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0" >${printContent.toString()}</body></html>`
      );
      printWindow.document.addEventListener("DOMContentLoaded", () => {
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
      });
    },
  },
};
</script>
