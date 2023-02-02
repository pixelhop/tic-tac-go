<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';
import ModalInstructions from '../components/modals/ModalInstructions.vue';
import ModalCountdown from '../components/modals/ModalCountdown.vue';
import ModalRoundWinner from '../components/modals/ModalRoundWinner.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import GridGame from '../components/GridGame.vue';
import Score from '../components/Score.vue';
import Players from '../components/Players.vue';
import { useGameStore } from '../stores/game';
import TurnTimer from '../components/TurnTimer.vue';
import ModalRoundGameWinner from '../components/modals/ModalRoundGameWinner.vue';
import ModalDisconnect from '../components/modals/ModalDisconnect.vue';

const store = useGameStore();
const { gameState } = storeToRefs(store);

onBeforeUnmount(() => {
  store.disconnect();
});
</script>

<template>
  <LayoutDefault :show-footer="false">
    <div class="px-6 flex flex-col h-full">
      <GridGame class="mx-auto" />

      <Score />

      <Players />

      <!-- <h1 class="text-white" @click="state.test = `${Math.random()}`">{{ state.test }}</h1> -->

      <TurnTimer />
    </div>

    <ModalInstructions v-if="gameState === 'instructions'" />
    <ModalCountdown v-else-if="gameState === 'countdown'" />
    <ModalRoundWinner v-if="gameState === 'round-winner'" />
    <ModalRoundGameWinner v-else-if="gameState === 'game-winner'" />
    <ModalDisconnect v-else-if="gameState === 'disconnected'" />
  </LayoutDefault>
</template>

<style scoped></style>
