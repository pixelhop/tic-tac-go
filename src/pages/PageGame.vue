<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';
import ModalInstructions from '../components/modals/ModalInstructions.vue';
import ModalCountdown from '../components/modals/ModalCountdown.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import GridGame from '../components/GridGame.vue';
import Score from '../components/Score.vue';
import Players from '../components/Players.vue';
import { useGameStore } from '../stores/game';
import TurnTimer from '../components/TurnTimer.vue';

const store = useGameStore();
const { gameCode, gameState, state } = storeToRefs(store);

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
    <ModalCountdown v-if="gameState === 'countdown'" />
  </LayoutDefault>
</template>

<style scoped></style>
