<template>
  <div class="my-2">
    <Button type="button" @click.native.prevent="addChoice">
      <i class="fas fa-plus" /> Add choice</Button
    >
    <p class="text-rose-500 text-xs mt-1">
      The first option is auto-selected and charged if priced.
    </p>
    <div class="h-64" v-if="form.choices.length === 0"></div>
    <div
      class="mt-3 mb-8 bg-gray-200 relative px-2 py-6 rounded-xl"
      v-for="(choice, key) in form.choices"
      :key="`choice-${key}`"
    >
      <button
        class="rounded-full h-8 w-8 absolute right-[-10px] top-[-10px] text-white bg-rose-500 flex justify-center items-center"
        @click="removeChoice(key)"
      >
        <i class="text-2xl cursor-pointer fas fa-xmark" />
      </button>
      <input
        type="text"
        placeholder="Choice title"
        class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300 text-xl"
        v-model="form.choices[key].title"
      />
      <div class="mt-5 mb-2">
        <Button
          variant="transparent"
          type="button"
          @click.native.prevent="addOption(key)"
        >
          <i class="fas fa-plus" /> Add</Button
        >
      </div>
      <div
        class="flex gap-2 mb-2 items-center"
        v-for="(option, index) in form.choices[key].options"
        :key="`options-${index}`"
      >
        <input
          placeholder="Choice name"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300"
          v-model="form.choices[key].options[index].name"
        />
        <input
          type="number"
          v-model="form.choices[key].options[index].price"
          placeholder="Choice price"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300"
        />
        <div
          v-if="form.choices[key].options.length > 1"
          class="w-7 h-7 bg-white rounded-full p-1 cursor-pointer flex justify-center items-center"
          @click="removeOption(key, index)"
        >
          <i
            class="text-red-500 text-xl far fa-circle-xmark"
            @click="modal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItemChoice",
  props: { errors: Object },
  computed: {
    form: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    addChoice() {
      const data = {
        title: "New Choice",
        options: [{ name: "New Options", price: 0, stock: true }],
      };
      this.form.choices.push(data);
    },
    addOption(key) {
      const options = { name: "New Options", price: 0, stock: true };
      this.form.choices[key].options.push(options);
    },
    removeChoice(key) {
      this.form.choices.splice(key, 1);
    },
    removeOption(key, index) {
      this.form.choices[key].options.splice(index, 1);
    },
  },
};
</script>
