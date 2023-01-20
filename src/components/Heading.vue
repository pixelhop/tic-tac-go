<script lang="ts" setup>
withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    border?: boolean;
  }>(),
  {
    as: 'h2',
    border: false,
  }
);
</script>

<template>
  <component
    :is="as"
    class="text-2xl font-medium tracking-wider text-white uppercase"
    :class="{ 'border border-orange inline-block px-2': border }"
    ><slot></slot
  ></component>
</template>

<style scoped></style>
