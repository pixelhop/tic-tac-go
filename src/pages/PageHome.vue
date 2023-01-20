<script setup lang="ts">
import LayoutDefault from '../layouts/LayoutDefault.vue';
import Button from '../components/Button.vue';
</script>

<template>
  <LayoutDefault>
    <div class="absolute inset-0 flex justify-center items-center px-12">
      <svg class="w-full" viewBox="0 0 329 329" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="294.388" y1="37.3191" x2="36.388" y2="295.319" stroke="#777777" stroke-opacity="0.34" />
        <line x1="36.388" y1="36.6119" x2="294.388" y2="294.612" stroke="#777777" stroke-opacity="0.34" />
        <circle cx="164.5" cy="164.5" r="162.5" stroke="#482914" stroke-width="4" />
        <rect x="294.192" y="28" width="13" height="13" transform="rotate(45 294.192 28)" fill="#1D5353" />
        <rect x="36.1924" y="286" width="13" height="13" transform="rotate(45 36.1924 286)" fill="#1D5353" />
        <rect x="36.1924" y="28" width="13" height="13" transform="rotate(45 36.1924 28)" fill="#1D5353" />
        <rect x="294.192" y="286" width="13" height="13" transform="rotate(45 294.192 286)" fill="#1D5353" />
      </svg>
    </div>
    <div class="h-full flex flex-col px-24 space-y-4 justify-center">
      <Button as="router-link" to="/new-game">New game</Button>
      <Button as="router-link" to="/join-game">Join game</Button>
      <Button>About</Button>
    </div>
  </LayoutDefault>
</template>

<style scoped></style>
