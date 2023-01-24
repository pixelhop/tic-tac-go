<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Player from './Player.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { player1Name, player2Name } = storeToRefs(store);
</script>

<template>
  <div class="flex justify-between items-center">
    <Player :name="player1Name" :player="1" orientation="left" />
    <Player :name="player2Name" :player="2" orientation="right" />
  </div>
</template>

<style scoped></style>
