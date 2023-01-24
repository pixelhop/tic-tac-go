<script lang="ts" setup>
import IconX from './icons/IconX.vue';
import Icon0 from './icons/Icon0.vue';

defineProps<{
  contents?: 'x' | '0';
}>();
</script>

<template>
  <button class="appearance-none flex items-center justify-center">
    <IconX v-if="contents === 'x'" class="h-16 w-16" />
    <Icon0 v-if="contents === '0'" class="h-16 w-16" />
  </button>
</template>

<style scoped></style>
