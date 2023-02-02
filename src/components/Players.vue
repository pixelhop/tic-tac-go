<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Player from './Player.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { player1Name, player2Name, game } = storeToRefs(store);
</script>

<template>
  <div class="flex justify-between items-center">
    <Player :name="player1Name" :player="1" orientation="left" :class="{ 'opacity-30': game.currentPlayer !== 1 }" />
    <Player :name="player2Name" :player="2" orientation="right" :class="{ 'opacity-30': game.currentPlayer !== 2 }" />
  </div>
</template>

<style scoped></style>
