<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import Player from '../Player.vue';
import { useGameStore } from '../../stores/game';

const store = useGameStore();
const { game, player1Name, player2Name } = storeToRefs(store);

const playerName = computed(() => (game.value.currentPlayer === 1 ? player1Name.value : player2Name.value));

const secondsRemaining = ref(1000);
useIntervalFn(() => {
  secondsRemaining.value = dayjs(game.value.roundStartTime).diff(dayjs(), 'seconds');
}, 100);
</script>

<template>
  <Modal :title="`Round ${game.round}`">
    <div class="h-full flex flex-col items-center justify-center">
      <Player class="-ml-4" :name="playerName" :player="game.currentPlayer" orientation="left" />
      <p class="uppercase font-medium text-white tracking-[0.25em]">Will go first</p>

      <div>
        <p class="text-[150px] text-white font-medium">{{ secondsRemaining }}</p>
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
