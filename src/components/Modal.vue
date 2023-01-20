<script lang="ts" setup>
import Heading from './Heading.vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-90 p-6 text-center">
    <div class="h-full w-full flex items-center justify-center">
      <div class="max-w-sm max-h-[667px] h-full w-full flex flex-col justify-center">
        <div class="mb-6">
          <Heading border>{{ title }}</Heading>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
