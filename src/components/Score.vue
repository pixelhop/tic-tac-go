<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { game } = storeToRefs(store);
</script>

<template>
  <div class="flex flex-col items-center">
    <h4 class="uppercase font-medium text-white tracking-[0.25em] mb-1">Score</h4>
    <div class="flex gap-2 mb-2">
      <div
        v-for="(round, index) in game.roundWinners"
        :key="index"
        class="h-4 w-4"
        :class="{
          'bg-gray-300': !round,
          'bg-blue': round === 1,
          'bg-orange': round === 2,
        }"
      ></div>
    </div>
    <p class="uppercase font-medium text-gray-400 text-xs">Best of 5</p>
  </div>
</template>

<style scoped></style>
