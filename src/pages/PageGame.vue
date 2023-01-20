<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Heading from '../components/Heading.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import Button from '../components/Button.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { gameCode } = storeToRefs(store);
</script>

<template>
  <LayoutDefault :show-footer="false"> </LayoutDefault>
</template>

<style scoped></style>
