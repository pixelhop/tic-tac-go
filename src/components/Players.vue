<script lang="ts" setup>
import Player from './Player.vue';
</script>

<template>
  <div class="flex justify-between items-center">
    <Player name="Jozef" :player="1" orientation="left" />
    <Player name="Jozef" :player="2" orientation="right" />
  </div>
</template>

<style scoped></style>
