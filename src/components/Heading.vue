<script lang="ts" setup>
withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }>(),
  {
    as: 'h2',
  }
);
</script>

<template>
  <component :is="as" class="text-2xl font-medium tracking-wider text-white uppercase"><slot></slot></component>
</template>

<style scoped></style>
