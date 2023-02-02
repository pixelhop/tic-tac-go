<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Modal from '../Modal.vue';
import Button from '../Button.vue';
import { useGameStore } from '../../stores/game';

const store = useGameStore();
const { player1Name, player2Name, isPlayer1, imReady } = storeToRefs(store);
</script>

<template>
  <Modal title="Instructions">
    <div class="border border-gray-400 p-6 uppercase space-y-4 tracking-wider mb-6">
      <p>Take your turn quickly before the timer runs out.</p>

      <p>If the timer RUNs out your marker will be placed randomly!</p>

      <p>Create sets of 3 markers Vertically, Horizontally or Diagonally.</p>

      <p>The first to win 3 rounds wins.</p>
    </div>

    <div class="flex justify-center">
      <Button v-if="!imReady" @click="store.ready">I'm ready</Button>
      <p v-if="imReady" class="text-white">Ready: Waiting for {{ isPlayer1 ? player2Name : player1Name }}</p>
    </div>
  </Modal>
</template>

<style scoped></style>
