<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">Table</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new table</span>
          </div>
        </Button>
      </div>
    </section>

    <section class="px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button @click.native.prevent="generateQR(item)"
              ><font-awesome-icon :icon="['fas', 'qrcode']" /> Generate QR
            </Button>
            <Button @click.native.prevent="editItem(item)"
              ><font-awesome-icon :icon="['far', 'pen-to-square']" />
              Edit</Button
            >
            <Button
              v-if="isDev"
              variant="red"
              @click.native.prevent="deleteItem(item._id, index)"
              ><font-awesome-icon :icon="['far', 'trash-can']" />Delete</Button
            >
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No table found"
              buttonText="Add table"
              :icon="['far', 'circle-xmark']"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItem" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          {{ editMode ? "Edit" : "Create new" }} table
        </h1>
        <CloseButton @click.native.prevent="modal = false" />
      </div>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button class="w-full tracking-wide flex-1" type="submit">
            {{ editMode ? "Update" : "Create" }} table
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="modal = false"
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
    <Modal v-model="qrModal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          Generate QR code
        </h1>
        <CloseButton @click.native.prevent="qrModal = false" />
      </div>
      <div>
        <Input
          v-for="(field, i) in qrCodeField"
          :key="i"
          :field="field"
          v-model="qrCode"
          :errors="errors"
        />
        <div class="flex flex-col items-center my-4">
          <div
            id="svgCode"
            ref="qrCode"
            :style="`border: ${qrCode.margin}px solid ${qrCode.background}`"
          >
            <QrcodeVue
              :value="url"
              :size="qrCode.size"
              level="H"
              render-as="svg"
              :background="qrCode.background"
              :foreground="qrCode.foreground"
              margin="10"
            />
          </div>
          <p class="my-3">{{ name }}</p>
        </div>

        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printQRCode"
          >
            <font-awesome-icon :icon="['fas', 'print']" />
            Print QrCode
          </Button>
          <Button
            class="w-full tracking-wide flex-1"
            @click.native.prevent="downloadQR"
          >
            <font-awesome-icon :icon="['fas', 'download']" />
            Download QrCode
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="qrModal = false"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableIcon from "~/static/svg/table.svg";
import QrcodeVue from "qrcode.vue";
import domToImage from "dom-to-image";

export default {
  name: "Table",
  layout: "dashboard",
  middleware: "manager",
  components: { TableIcon, QrcodeVue },
  head() {
    return { title: "Table - " + this.pageTitle };
  },
  data() {
    return {
      modal: false,
      form: { name: "" },
      qrCode: {
        size: 300,
        margin: 10,
        background: "#ffffff",
        foreground: "#000000",
      },
      editMode: false,
      items: [],
      perPage: 20,
      loading: true,
      qrModal: false,
      errors: {},
      url: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "isDev"]),
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "serial", label: "SERIAL", span: "minmax(120PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "minmax(380PX, 1fr)",
        },
      ];
    },
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Name",
          name: "name",
        },
      ];
    },
    qrCodeField() {
      return [
        {
          type: "number",
          placeholder: "QR code Size",
          name: "size",
          label: { id: "Size", title: "QR code Size" },
        },
        {
          type: "number",
          placeholder: "QR code margin",
          name: "margin",
          label: { id: "margin", title: "QR code margin" },
        },
        {
          type: "color",
          placeholder: "Background",
          name: "background",
          label: { id: "background", title: "Background" },
        },
        {
          type: "color",
          placeholder: "Foreground",
          name: "foreground",
          label: { id: "foreground", title: "Foreground" },
        },
      ];
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
        };
        if (Number.isInteger(params.page)) {
          const { tables } = await this.$managerApi.fetchTable(params);
          this.items = this.items.concat(tables);
        }
      } catch (error) {
        this.$nuxt.$emit("error", error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.editMode) {
          await this.$managerApi.updateTable(this.form);
        } else {
          await this.$managerApi.createTable(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `Table ${this.editMode ? "updated" : "created"} successfully`
        );
        this.refetch();
        this.modal = false;
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
    reset() {
      this.form = { name: "" };
      this.errors = {};
      this.editMode = false;
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ _id, name }) {
      this.form = { _id, name };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$managerApi.deleteTable({ _id });
          this.items.splice(key, 1);
        } catch (error) {
          this.$nuxt.$emit("error", error.response.data.message);
        }
      }
    },
    generateQR({ serial, name }) {
      this.name = name;
      this.url = `${window.location.origin}/menu/${this.$auth.user.restaurant.slug}/${serial}`;
      this.qrModal = true;
    },
    async printQRCode() {
      const printContent = this.$refs?.qrCode?.innerHTML;
      if (printContent) {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(
          `<html><body>${printContent.toString()}</body></html>`
        );
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          this.orderDetails = {};
        };
      }
    },
    async downloadQR() {
      try {
        const svgContainer = document.querySelector("#svgCode");
        const dataUrl = await domToImage.toPng(svgContainer);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${this.name}.png`;
        link.click();
      } catch (error) {}
    },
  },
};
</script>
