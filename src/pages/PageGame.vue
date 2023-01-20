<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ModalInstructions from '../components/modals/ModalInstructions.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import GridGame from '../components/GridGame.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { gameCode, gameState } = storeToRefs(store);
</script>

<template>
  <LayoutDefault :show-footer="false">
    <div class="px-6">
      <GridGame class="mx-auto" />
    </div>
    <ModalInstructions v-if="gameState === 'instructions'" />
  </LayoutDefault>
</template>

<style scoped></style>
