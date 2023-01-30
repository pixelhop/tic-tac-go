<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useClipboard } from '@vueuse/core';
import Heading from '../components/Heading.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import Button from '../components/Button.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { gameCode } = storeToRefs(store);

const { copy, copied } = useClipboard({ source: gameCode });
</script>

<template>
  <LayoutDefault>
    <div class="py-12 px-6 flex flex-col justify-between h-full tracking-wide">
      <Heading class="text-center"
        >Waiting for<br />
        player 2</Heading
      >

      <div class="text-center">
        <p class="text-xs text-gray-400 uppercase mb-1">Game code</p>
        <p class="text-blue text-xl font-medium uppercase" @click="copy(gameCode)">{{ gameCode }}</p>
        <p v-if="copied" class="text-xs text-white">Copied!</p>
        <p v-else class="text-xs text-white">click to copy</p>
      </div>

      <p class="uppercase text-center">
        Send player 2 Your game code so They can join. The game will start once they join.
      </p>

      <div class="flex justify-center">
        <Button as="router-link" to="/" theme="secondary">Quit</Button>
      </div>
    </div>
  </LayoutDefault>
</template>

<style scoped></style>
