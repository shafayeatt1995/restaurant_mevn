<template>
  <div>
    First convert your image from here
    <a
      href="https://www.resizepixel.com/"
      class="text-sky-600 underline"
      target="_blank"
      >Here</a
    >
    <div
      @click="imageModal = true"
      class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
    >
      <nuxt-img
        format="webp"
        loading="lazy"
        decode="async"
        :src="selected.url"
        :alt="selected.url"
        v-if="selected.url"
        class="object-contain w-full h-full p-3"
      />
      <template v-else>
        <i class="text-8xl text-gray-900 far fa-image" />
        <p class="text-lg px-10 text-gray-700">Select an printing logo</p>
      </template>
    </div>
    <Input
      v-for="(field, i) in inputFields"
      :key="i"
      :field="field"
      v-model="form"
      :errors="errors"
    />
    <hr class="my-4" />
    <h3 class="text-2xl font-semibold">Top print data</h3>
    <p
      v-for="(data, key) in form.topPrintData"
      :key="key + 'data'"
      class="font-semibold flex items-center"
    >
      <span> {{ data.title }}: {{ data.body }} </span>
      <i
        class="fas fa-xmark text-red-500 px-2 cursor-pointer min-h-4"
        @click="form.topPrintData.splice(key, 1)"
      ></i>
    </p>
    <Input
      v-for="(field, i) in printInputFields"
      :key="i + 'i'"
      :field="field"
      v-model="topPrintData"
      :errors="errors"
    />
    <div class="flex justify-end mt-3">
      <Button @click.native.prevent="addTopPrintData"
        ><i class="fas fa-add"></i> Add top print data</Button
      >
    </div>
    <hr class="my-4" />
    <h3 class="text-2xl font-semibold">Bottom print data</h3>
    <p
      v-for="(data, key) in form.bottomPrintData"
      :key="key + 'data2'"
      class="font-semibold flex items-center"
    >
      <span> {{ data.title }}: {{ data.body }} </span>
      <i
        class="fas fa-xmark text-red-500 px-2 cursor-pointer min-h-4"
        @click="form.bottomPrintData.splice(key, 1)"
      ></i>
    </p>
    <Input
      v-for="(field, i) in printInputFields"
      :key="i + 'ika'"
      :field="field"
      v-model="bottomPrintData"
      :errors="errors"
    />
    <div class="flex justify-end mt-3">
      <Button @click.native.prevent="addBottomPrintData"
        ><i class="fas fa-add"></i> Add top print data</Button
      >
    </div>
    <Button @click.native.prevent="updatePrintingDetails" class="w-full mt-5"
      >Update Details</Button
    >
    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>
<script>
export default {
  name: "SettingsPrint",
  data() {
    return {
      form: {
        printName: this.$auth.user?.restaurant?.printName || "",
        printAddress: this.$auth.user?.restaurant?.printAddress || "",
        printPhone: this.$auth.user?.restaurant?.printPhone || "",
        printEmail: this.$auth.user?.restaurant?.printEmail || "",
        bottomMessage: this.$auth.user?.restaurant?.bottomMessage || "",
        topPrintData: this.$auth.user?.restaurant?.topPrintData
          ? [...this.$auth.user?.restaurant?.topPrintData]
          : [],
        bottomPrintData: this.$auth.user?.restaurant?.bottomPrintData
          ? [...this.$auth.user?.restaurant?.bottomPrintData]
          : [],
      },
      topPrintData: { title: "", body: "" },
      bottomPrintData: { title: "", body: "" },
      imageModal: false,
      selected: { url: this.$auth.user?.restaurant?.printImage },
      errors: {},
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Restaurant name",
          name: "printName",
          label: { id: "printName", title: "Restaurant Name" },
        },
        {
          type: "text",
          placeholder: "Restaurant address",
          name: "printAddress",
          label: { id: "printAddress", title: "Restaurant address" },
        },
        {
          type: "text",
          placeholder: "Restaurant phone",
          name: "printPhone",
          label: { id: "printPhone", title: "Restaurant phone" },
        },
        {
          type: "text",
          placeholder: "Restaurant email",
          name: "printEmail",
          label: { id: "printEmail", title: "Restaurant email" },
        },
        {
          type: "text",
          placeholder: "Bottom Message",
          name: "printEmail",
          label: { id: "printEmail", title: "Restaurant email" },
        },
        {
          type: "text",
          placeholder: "bottomMessage",
          name: "printEmail",
          label: { id: "printEmail", title: "Restaurant email" },
        },
      ];
    },
    printInputFields() {
      return [
        {
          type: "text",
          placeholder: "Print info title",
          name: "title",
          label: { id: "title", title: "Print info title" },
        },
        {
          type: "text",
          placeholder: "Print info body",
          name: "body",
          label: { id: "body", title: "Print info body" },
        },
      ];
    },
  },
  methods: {
    async updatePrintingDetails() {
      try {
        this.loading = true;
        await this.$managerApi.updatePrintingDetails({
          ...this.form,
          printImage: this.selected.url,
        });
        await this.$auth.fetchUser();
        this.$nuxt.$emit("success", "Printing details updated successfully");
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    addTopPrintData() {
      this.form.topPrintData.push(this.topPrintData);
      this.topPrintData = { title: "", body: "" };
    },
    addBottomPrintData() {
      this.form.bottomPrintData.push(this.bottomPrintData);
      this.bottomPrintData = { title: "", body: "" };
    },
  },
};
</script>
