<script setup lang="ts">
import Logo from '../components/Logo.vue';
</script>

<template>
  <div class="h-full flex flex-col">
    <Logo class="mt-4" />
    <main class="h-full relative">
      <slot />
    </main>
    <footer class="text-center uppercase mb-3">
      <p class="text-white text-xs">Built in the future by</p>
      <a class="text-blue drop-shadow-blue" href="https://pixelhop.io" target="_blank">Pixelhop</a>
    </footer>
  </div>
</template>

<style scoped></style>
