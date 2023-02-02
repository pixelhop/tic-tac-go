<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary';
    as?: 'button' | 'router-link';
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    theme: 'primary',
    as: 'button',
    disabled: false,
    type: 'button',
  }
);

const classes = computed(() => {
  const classMap = {
    primary: 'border-blue drop-shadow-blue hover:bg-blue hover:bg-opacity-10',
    secondary: 'border-white hover:bg-white hover:bg-opacity-10',
  };

  let theClasses = `${classMap[props.theme]}`;

  if (props.disabled) {
    theClasses += ' opacity-50';
  }

  return theClasses;
});
</script>

<template>
  <component
    v-bind="$attrs"
    :is="as"
    class="font-medium text-sm text-white border uppercase px-4 py-1 transition-colors appearance-none text-center flex items-center justify-center"
    :class="classes"
    :type="type"
    ><slot></slot
  ></component>
</template>

<style scoped></style>
