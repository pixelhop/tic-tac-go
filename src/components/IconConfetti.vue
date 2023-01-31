<script lang="ts" setup>
import anime from 'animejs/lib/anime.es';
import { onMounted } from 'vue';
import IconX from './icons/IconX.vue';
import Icon0 from './icons/Icon0.vue';

defineProps<{ player: 1 | 2 }>();

onMounted(() => {
  anime({
    targets: '.winner-icon',
    // opacity: [1, 1, 1, 1, 0],
    translateX: () => [0, anime.random(150, 240)],
    scale: () => [0, anime.random(0.8, 1)],
    rotate: () => [0, anime.random(0, 360)],
    duration: 600,
    delay: () => anime.random(1200, 1300),
    easing: 'easeOutCubic',
    loop: false,
  });
});

const numIcons = 15;
</script>

<template>
  <div v-if="player === 1" class="absolute inset-0 z-10">
    <div
      v-for="index in numIcons"
      :key="index"
      class="winner-icon-container absolute left-1/2 top-1/2"
      :style="`transform: translateX(-50%) translateY(-50%) rotate(${Math.random() * 360}deg)`"
    >
      <Icon0 class="winner-icon h-24" />
    </div>
  </div>
  <div v-else-if="player === 2" class="absolute inset-0 z-10">
    <div
      v-for="index in numIcons"
      :key="index"
      class="winner-icon-container absolute left-1/2 top-1/2"
      :style="`transform: translateX(-50%) translateY(-50%) rotate(${Math.random() * 360}deg)`"
    >
      <IconX class="winner-icon h-24" />
    </div>
  </div>
</template>

<style scoped></style>
