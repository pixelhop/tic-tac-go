<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
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

const router = useRouter();
const store = useGameStore();
const { game } = storeToRefs(store);

onBeforeMount(() => {
  if (!game.value.code) {
    router.push('/');
  }
});

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

      <TurnTimer />
    </div>

    <ModalInstructions v-if="game.state === 'instructions'" />
    <ModalCountdown v-else-if="game.state === 'countdown'" />
    <ModalRoundWinner v-if="game.state === 'round-winner'" />
    <ModalRoundGameWinner v-else-if="game.state === 'game-winner'" />
    <ModalDisconnect v-else-if="game.state === 'disconnected'" />
  </LayoutDefault>
</template>

<style scoped></style>
