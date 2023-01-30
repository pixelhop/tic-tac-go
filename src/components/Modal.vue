<script lang="ts" setup>
import Heading from './Heading.vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <Transition name="modal" appear>
    <div class="fixed inset-0 bg-black bg-opacity-90 p-6 text-center z-30">
      <div class="modal-container h-full w-full flex items-center justify-center">
        <div class="max-w-sm max-h-[667px] h-full w-full flex flex-col justify-center">
          <div class="modal-heading mb-6">
            <Heading border>{{ title }}</Heading>
          </div>
          <div class="modal-content h-full">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(100%);
}
</style>
