<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { ref } from 'vue';
import Modal from '../Modal.vue';
import Player from '../Player.vue';
import { useGameStore } from '../../stores/game';

const store = useGameStore();
const { gameRound, gameRoundStartTime } = storeToRefs(store);

const secondsRemaining = ref(1000);
useIntervalFn(() => {
  secondsRemaining.value = dayjs(gameRoundStartTime.value).diff(dayjs(), 'seconds');
}, 100);
</script>

<template>
  <Modal :title="`Round ${gameRound}`">
    <div class="h-full flex flex-col items-center justify-center">
      <Player class="-ml-4" name="Jozef" :player="1" orientation="left" />
      <p class="uppercase font-medium text-white tracking-[0.25em]">Will go first</p>

      <div>
        <p class="text-[150px] text-white font-medium">{{ secondsRemaining }}</p>
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
