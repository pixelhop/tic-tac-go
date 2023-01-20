<script lang="ts" setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'number';
    value?: string | number;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    type: 'text',
    value: undefined,
  }
);

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div>
    <label v-if="label" class="text-xs text-gray-400 uppercase mb-2 block" :for="name">{{ label }}</label>
    <input
      :id="name"
      class="border border-blue bg-blue bg-opacity-10 w-full px-2 py-2 rounded-none focus:outline-none focus:drop-shadow-blue"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-red-600 mt-1 text-xs">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
