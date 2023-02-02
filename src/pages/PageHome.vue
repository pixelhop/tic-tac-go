<script setup lang="ts">
import LayoutDefault from '../layouts/LayoutDefault.vue';
import Button from '../components/Button.vue';
</script>

<template>
  <LayoutDefault animate-logo>
    <div class="background-svg-container absolute inset-0 flex justify-center items-center px-12">
      <svg class="background-svg w-full" viewBox="0 0 329 329" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line class="cross" x1="294.388" y1="37.3191" x2="36.388" y2="295.319" stroke="#777777" stroke-opacity="0.34" />
        <line class="cross" x1="36.388" y1="36.6119" x2="294.388" y2="294.612" stroke="#777777" stroke-opacity="0.34" />
        <circle cx="164.5" cy="164.5" r="162.5" stroke="#482914" stroke-width="4" />
        <rect x="294.192" y="28" width="13" height="13" transform="rotate(45 294.192 28)" fill="#1D5353" />
        <rect x="36.1924" y="286" width="13" height="13" transform="rotate(45 36.1924 286)" fill="#1D5353" />
        <rect x="36.1924" y="28" width="13" height="13" transform="rotate(45 36.1924 28)" fill="#1D5353" />
        <rect x="294.192" y="286" width="13" height="13" transform="rotate(45 294.192 286)" fill="#1D5353" />
      </svg>
    </div>
    <div class="h-full flex flex-col px-24 space-y-4 justify-center">
      <Button class="button-animation" as="router-link" to="/new-game">New game</Button>
      <Button class="button-animation" as="router-link" to="/join-game">Join game</Button>
      <Button as="router-link" to="/about" class="button-animation">About</Button>
    </div>
  </LayoutDefault>
</template>

<style scoped>
.button-animation {
  animation-name: buttonAnimation;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-timing-function: ease;
}
.button-animation:nth-child(2) {
  animation-delay: 0.1s;
}

.button-animation:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes buttonAnimation {
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
  }
}

.background-svg-container {
  transform-origin: center;
  animation-name: backgroundEnter;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

@keyframes backgroundEnter {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.background-svg {
  transform-origin: center;
  animation-name: backgroundRotate;
  animation-duration: 100s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes backgroundRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.background-svg .cross {
  transform-box: fill-box;
}
</style>
