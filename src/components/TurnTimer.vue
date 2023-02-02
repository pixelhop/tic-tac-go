<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { game } = storeToRefs(store);

const goPercentage = ref(0);
useIntervalFn(() => {
  if (!game.value.currentGoEnd || !game.value.currentGoStart) {
    return;
  }

  const originalDuration = Math.abs(
    dayjs(game.value.currentGoStart).diff(dayjs(game.value.currentGoEnd), 'milliseconds')
  );

  const timeLeft = Math.max(0, dayjs(game.value.currentGoEnd).diff(dayjs(), 'milliseconds'));

  goPercentage.value = 1 - timeLeft / originalDuration;
}, 50);

const playerColour = computed(() => {
  const colourMap = {
    1: '#02FFFF',
    2: '#FF7615',
  };

  return colourMap[game.value.currentPlayer];
});
</script>

<template>
  <div>
    <h5 class="uppercase font-medium text-gray-400 text-xs text-center">Turn timer</h5>
    <svg
      :class="{ jiggle: goPercentage > 0.75 }"
      class="-mt-2"
      viewBox="0 0 370 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="turn-timer" filter="url(#filter0_d_107_88)">
        <rect id="outer" x="18" y="19" width="334" height="25" :stroke="playerColour" stroke-width="4" />
        <rect id="progress-bg" x="17" y="26" width="335" height="10" :fill="playerColour" fill-opacity="0.25" />
        <rect
          id="progress"
          x="17"
          y="26"
          :width="goPercentage * 335"
          height="10"
          :fill="playerColour"
          fill-opacity="0.72"
        />
        <g id="dashes">
          <line
            id="Line 20"
            x1="19.1868"
            y1="44.9581"
            x2="29.1868"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 24"
            x1="83.1868"
            y1="44.9581"
            x2="93.1868"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 28"
            x1="147.187"
            y1="44.9581"
            x2="157.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 32"
            x1="211.187"
            y1="44.9581"
            x2="221.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 36"
            x1="275.187"
            y1="44.9581"
            x2="285.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 22"
            x1="51.1868"
            y1="44.9581"
            x2="61.1868"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 25"
            x1="115.187"
            y1="44.9581"
            x2="125.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 29"
            x1="179.187"
            y1="44.9581"
            x2="189.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 33"
            x1="243.187"
            y1="44.9581"
            x2="253.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 37"
            x1="307.187"
            y1="44.9581"
            x2="317.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 21"
            x1="35.1868"
            y1="44.9581"
            x2="45.1868"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 26"
            x1="99.1868"
            y1="44.9581"
            x2="109.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 30"
            x1="163.187"
            y1="44.9581"
            x2="173.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 34"
            x1="227.187"
            y1="44.9581"
            x2="237.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 38"
            x1="291.187"
            y1="44.9581"
            x2="301.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 23"
            x1="67.1868"
            y1="44.9581"
            x2="77.1868"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 27"
            x1="131.187"
            y1="44.9581"
            x2="141.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 31"
            x1="195.187"
            y1="44.9581"
            x2="205.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 35"
            x1="259.187"
            y1="44.9581"
            x2="269.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 39"
            x1="323.187"
            y1="44.9581"
            x2="333.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
          <line
            id="Line 40"
            x1="339.187"
            y1="44.9581"
            x2="349.187"
            y2="17.9581"
            :stroke="playerColour"
            stroke-width="6"
          />
        </g>
      </g>
      <defs>
        <filter
          v-if="game.currentPlayer === 1"
          id="filter0_d_107_88"
          x="0"
          y="0.916107"
          width="370"
          height="61.0839"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.71 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_88" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_88" result="shape" />
        </filter>

        <filter
          v-if="game.currentPlayer === 2"
          id="filter0_d_107_88"
          x="0"
          y="0.916107"
          width="370"
          height="61.0839"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.462745 0 0 0 0 0.0823529 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_88" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_88" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.jiggle {
  transform-origin: center;
  animation-name: jiggle;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 80ms;
  animation-fill-mode: both;
}

@keyframes jiggle {
  from {
    transform: rotate(-1deg);
  }
  to {
    transform: rotate(1deg);
  }
}
</style>
