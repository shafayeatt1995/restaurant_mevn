<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Table</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button variant="green" @click.native.prevent="modal = true">
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
            <Button variant="green" @click.native.prevent="generateQR(item)"
              ><font-awesome-icon :icon="['fas', 'qrcode']" /> Generate QR
            </Button>
            <Button variant="green" @click.native.prevent="editItem(item)"
              ><font-awesome-icon :icon="['far', 'pen-to-square']" />
              Edit</Button
            >
            <Button
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
      <h3
        class="text-lg font-medium leading-6 text-gray-600 capitalize"
        id="modal-title"
      >
        {{ editMode ? "Edit" : "Create new" }} table
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
            variant="white"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="modal = false"
          >
            Cancel
          </Button>

          <Button variant="green" class="w-full tracking-wide flex-1">
            {{ editMode ? "Update" : "Create" }} table
          </Button>
        </div>
      </form>
    </Modal>
    <Modal v-model="qrModal">
      <div class="flex justify-between items-center">
        <h3
          class="text-lg font-medium leading-6 text-gray-600 capitalize"
          id="modal-title"
        >
          Generate QR code
        </h3>
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
        <div ref="qrCode">
          <div class="flex flex-col items-center my-4">
            <QrcodeVue
              id="svgCode"
              :value="url"
              :size="qrCode.size"
              level="H"
              render-as="svg"
              :background="qrCode.background"
              :foreground="qrCode.foreground"
            />
            <p class="my-3">{{ name }}</p>
          </div>
        </div>

        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
            variant="white"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="qrModal = false"
          >
            Close
          </Button>
          <Button
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="printQRCode"
          >
            <font-awesome-icon :icon="['fas', 'print']" />
            Print QrCode
          </Button>
          <Button
            variant="green"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="downloadQR"
          >
            <font-awesome-icon :icon="['fas', 'download']" />
            Download QrCode
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      click: true,
      modal: false,
      form: { name: "" },
      qrCode: {
        size: 100,
        background: "#ffffff",
        foreground: "#000000",
        page: 80,
      },
      editMode: false,
      items: [],
      perPage: 50,
      loading: true,
      qrModal: false,
      errors: {},
      url: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
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
          type: "select",
          placeholder: "Print page Size",
          name: "page",
          label: { id: "page", title: "Print page Size" },
          options: [
            { value: 80, label: "80mm" },
            { value: 58, label: "58mm" },
          ],
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
        if (this.click) {
          this.click = false;
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
          this.click = true;
        }
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.click = true;
      }
    },
    reset() {
      this.form = {
        name: "",
      };
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
          if (this.click) {
            this.click = false;
            await this.$managerApi.deleteTable({ _id });
            this.items.splice(key, 1);
            this.click = true;
          }
        } catch (error) {
          this.$nuxt.$emit("error", error.response.data.message);
        } finally {
          this.click = true;
        }
      }
    },
    generateQR({ serial, name }) {
      this.name = name;
      this.url = `${window.location.origin}/menu/${this.$auth.user.restaurant.slug}/${serial}`;
      this.qrModal = true;
    },
    async printQRCode() {
      const elementToConvert = this.$refs.qrCode;
      console.log(content);
      // Use html2canvas to capture the HTML element
      const canvas = await html2canvas(elementToConvert);

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the captured canvas to the PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );

      // Save or print the PDF as needed
      // For example, opening in a new window for printing
      const blobUrl = URL.createObjectURL(pdf.output("blob"));
      window.open(blobUrl, "_blank");
    },
    async downloadQR() {
      try {
        const svgContainer = document.querySelector("#svgCode");
        const dataUrl = await domToImage.toPng(svgContainer);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${this.name}.png`;
        link.click();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
