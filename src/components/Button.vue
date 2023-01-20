<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary';
    as?: 'button' | 'router-link';
  }>(),
  {
    theme: 'primary',
    as: 'button',
  }
);

const classes = computed(() => {
  const classMap = {
    primary: 'border-blue drop-shadow-blue hover:bg-blue hover:bg-opacity-10',
    secondary: 'border-white hover:bg-white hover:bg-opacity-10',
  };

  return classMap[props.theme];
});
</script>

<template>
  <component
    v-bind="$attrs"
    :is="as"
    class="font-medium text-sm text-white border uppercase px-4 py-1 transition-colors appearance-none text-center"
    :class="classes"
    ><slot></slot
  ></component>
</template>

<style scoped></style>
