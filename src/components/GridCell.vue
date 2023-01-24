<script lang="ts" setup>
import IconX from './icons/IconX.vue';
import Icon0 from './icons/Icon0.vue';

defineProps<{
  contents?: 'x' | '0';
}>();
</script>

<template>
  <button class="appearance-none flex items-center justify-center">
    <transition name="fade">
      <IconX v-if="contents === 'x'" class="h-16 w-16" />
    </transition>
    <transition name="fade">
      <Icon0 v-if="contents === '0'" class="h-16 w-16" />
    </transition>
  </button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform-origin: center;
  transition: opacity 0.2s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
