<template>
  <slide-up-down :active="!field.hide" :duration="300">
    <div class="mt-3">
      <label class="text-gray-700" :for="field.label?.id" v-if="field.label">{{
        field.label?.title
      }}</label>
      <div class="relative flex items-center">
        <span class="absolute" v-if="field.icon">
          <font-awesome-icon
            :icon="field.icon"
            class="w-5 h-5 mx-3 text-gray-300"
          />
        </span>
        <span
          class="absolute right-0 top-0 h-full"
          v-if="field.inlineSubmit?.show"
        >
          <Button
            variant="green"
            class="h-full"
            @click.native.prevent="$emit('action')"
          >
            <font-awesome-icon
              :icon="field.inlineSubmit.icon"
              v-if="field.inlineSubmit.icon"
            />
            {{ field.inlineSubmit.text }}
          </Button>
        </span>
        <select
          v-if="field.type === 'select'"
          :id="field.label?.id"
          v-model="data[field.name]"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
          :class="field.icon ? 'px-11' : ' px-4'"
        >
          <option value="">{{ field.placeholder }}</option>
          <option
            :value="option.value"
            v-for="(option, i) in field.options"
            :key="i"
          >
            {{ option.label }}
          </option>
        </select>
        <template v-else-if="field.type === 'editor'">
          <client-only>
            <VueEditor v-model="data[field.name]" :name="field.name" />
          </client-only>
        </template>
        <textarea
          cols="30"
          rows="10"
          v-else-if="field.type === 'textarea'"
          :id="field.label?.id"
          v-model="data[field.name]"
          :name="field.name"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
          :class="[
            field.inlineSubmit?.show
              ? 'pl-4 pr-14'
              : field.icon
              ? 'px-11'
              : ' px-4',
          ]"
          :placeholder="field.placeholder"
        />
        <input
          v-else
          :type="field.type"
          :id="field.label?.id"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
          :class="[
            field.inlineSubmit?.show
              ? 'pl-4 pr-14'
              : field.icon
              ? 'px-11'
              : ' px-4',
          ]"
          :placeholder="field.placeholder"
          :name="field.name"
          v-model="data[field.name]"
        />
      </div>
      <p
        class="text-rose-700"
        v-if="
          errors && errors[field.name] && typeof errors[field.name] === 'object'
        "
      >
        {{ errors[field.name].msg }}
      </p>
    </div>
  </slide-up-down>
</template>
<script>
export default {
  name: "Input",
  props: {
    field: Object,
    errors: Object,
    options: Array,
  },
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
