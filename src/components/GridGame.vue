<script lang="ts" setup>
import anime from 'animejs/lib/anime.es.js';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import GridCell from './GridCell.vue';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { grid, game, winningMask } = storeToRefs(store);

const gridContainer = ref<HTMLDivElement>();

const playerColour = computed(() => {
  const colourMap = {
    1: '#02FFFF',
    2: '#FF7615',
  };

  return colourMap[game.value.currentPlayer];
});

watch(
  grid,
  () => {
    console.log('Play animation');
    anime({
      targets: '.lines-1 line',
      // stroke: ['#fff', '#FF7615', '#fff'],
      scale: [1, 1.7, 1],
      easing: 'easeOutCubic',
      delay: (el, i) => i * 10,
      duration: 300,
    });
    anime({
      targets: '.lines-2 line',
      // stroke: ['#fff', '#FF7615', '#fff'],
      scale: [1, 1.7, 1],
      easing: 'easeOutCubic',
      delay: (el, i) => i * 10,
      duration: 300,
    });

    // anime({
    //   targets: '.grid-container',
    //   scale: 1.05,
    //   // rotate: [anime.random(-2, 2), anime.random(-2, 2), anime.random(-2, 2), anime.random(-2, 2)],
    //   // // translateX: [
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // //   anime.random(-2, 2),
    //   // // ],
    //   easing: 'easeOutQuad',
    //   direction: 'alternate',
    //   duration: 50,
    // });
  },
  { deep: true }
);
</script>

<template>
  <div ref="gridContainer" class="relative grid-container">
    <svg
      class="relative z-10 pointer-events-none w-full"
      viewBox="0 0 345 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Grid">
        <g id="Grid_2">
          <mask
            id="mask0_18_91"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="29"
            y="25"
            width="288"
            height="290"
          >
            <g id="Corner mask">
              <path
                id="Subtract"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M291.132 25H53.3844V49.3844H29V289.745H53.3844V315L291.132 315V291.486H316.387V49.3844H291.132V25ZM116.087 200.916H141.342V226.171H116.087V200.916ZM141.342 114.7H116.087V139.955H141.342V114.7ZM203.174 200.916H228.429V226.171H203.174V200.916ZM228.429 114.7H203.174V139.955H228.429V114.7Z"
                fill="#C4C4C4"
              />
            </g>
          </mask>
          <g mask="url(#mask0_18_91)">
            <g id="Grid_3">
              <g id="Main grid">
                <rect
                  id="Rectangle 23"
                  x="40.3213"
                  y="38.0631"
                  width="264.745"
                  height="264.745"
                  stroke="#505050"
                  stroke-width="3.48348"
                />
                <line
                  id="Line 3"
                  x1="128.279"
                  y1="38.9281"
                  x2="129.153"
                  y2="301.931"
                  stroke="#505050"
                  stroke-width="3.48348"
                />
                <line
                  id="Line 5"
                  x1="303.767"
                  y1="126.455"
                  x2="40.764"
                  y2="127.329"
                  stroke="#505050"
                  stroke-width="3.48348"
                />
                <line
                  id="Line 4"
                  x1="216.237"
                  y1="36.3213"
                  x2="216.237"
                  y2="301.937"
                  stroke="#505050"
                  stroke-width="3.48348"
                />
                <line
                  id="Line 6"
                  x1="303.767"
                  y1="214.413"
                  x2="40.764"
                  y2="215.287"
                  stroke="#505050"
                  stroke-width="3.48348"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="Corners" filter="url(#filter0_d_18_91)">
          <rect id="Rectangle 28" x="33.3544" y="29.3544" width="13.0631" height="13.0631" :fill="playerColour" />
          <rect id="Rectangle 30" x="33.3544" y="298.453" width="13.0631" height="13.0631" :fill="playerColour" />
          <rect id="Rectangle 29" x="298.099" y="29.3544" width="13.0631" height="13.0631" :fill="playerColour" />
          <rect id="Rectangle 31" x="298.099" y="298.453" width="13.0631" height="13.0631" :fill="playerColour" />
        </g>
        <g id="Centers" filter="url(#filter1_i_18_91)">
          <g id="Ellipse 3">
            <circle cx="128.715" cy="127.327" r="6.53153" :fill="playerColour" />
          </g>
          <g id="Ellipse 5">
            <circle cx="128.715" cy="213.544" r="6.53153" :fill="playerColour" />
          </g>
          <g id="Ellipse 4">
            <circle cx="216.673" cy="127.327" r="6.53153" :fill="playerColour" />
          </g>
          <g id="Ellipse 6">
            <circle cx="216.673" cy="213.544" r="6.53153" :fill="playerColour" />
          </g>
        </g>

        <g id="Line decoration">
          <g id="Top lines decoration">
            <g id="Frame 4" class="lines-1" filter="url(#filter6_dd_18_91)">
              <line id="Line 7" x1="64" y1="29" x2="64" y2="23" stroke="white" stroke-width="2" />
              <line id="Line 8" x1="88" y1="29" x2="88" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 9" x1="112" y1="29" x2="112" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 10" x1="136" y1="29" x2="136" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 11" x1="160" y1="29" x2="160" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 12" x1="184" y1="29" x2="184" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 13" x1="208" y1="29" x2="208" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 17" x1="232" y1="29" x2="232" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 18" x1="256" y1="29" x2="256" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 19" x1="280" y1="29" x2="280" y2="23" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration">
            <g id="Bottom lines decoration_2" class="lines-1" filter="url(#filter7_dd_18_91)">
              <line id="Line 7_2" x1="280" y1="313" x2="280" y2="319" stroke="white" stroke-width="2" />
              <line id="Line 8_2" x1="256" y1="313" x2="256" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 9_2" x1="232" y1="313" x2="232" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 10_2" x1="208" y1="313" x2="208" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 11_2" x1="184" y1="313" x2="184" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 12_2" x1="160" y1="313" x2="160" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 13_2" x1="136" y1="313" x2="136" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 17_2" x1="112" y1="313" x2="112" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 18_2" x1="88" y1="313" x2="88" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 19_2" x1="64" y1="313" x2="64" y2="319" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration_3">
            <g id="Bottom lines decoration_4" class="lines-1" filter="url(#filter8_dd_18_91)">
              <line id="Line 7_3" x1="29" y1="279" x2="23" y2="279" stroke="white" stroke-width="2" />
              <line id="Line 8_3" x1="29" y1="255" x2="20" y2="255" stroke="white" stroke-width="2" />
              <line id="Line 9_3" x1="29" y1="231" x2="17" y2="231" stroke="white" stroke-width="2" />
              <line id="Line 10_3" x1="29" y1="207" x2="15" y2="207" stroke="white" stroke-width="2" />
              <line id="Line 11_3" x1="29" y1="183" x2="11" y2="183" stroke="white" stroke-width="2" />
              <line id="Line 12_3" x1="29" y1="159" x2="11" y2="159" stroke="white" stroke-width="2" />
              <line id="Line 13_3" x1="29" y1="135" x2="15" y2="135" stroke="white" stroke-width="2" />
              <line id="Line 17_3" x1="29" y1="111" x2="17" y2="111" stroke="white" stroke-width="2" />
              <line id="Line 18_3" x1="29" y1="87" x2="20" y2="87" stroke="white" stroke-width="2" />
              <line id="Line 19_3" x1="29" y1="63" x2="23" y2="63" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration_5">
            <g id="Bottom lines decoration_6" class="lines-1" filter="url(#filter9_dd_18_91)">
              <line id="Line 7_4" x1="316" y1="61" x2="322" y2="61" stroke="white" stroke-width="2" />
              <line id="Line 8_4" x1="316" y1="85" x2="325" y2="85" stroke="white" stroke-width="2" />
              <line id="Line 9_4" x1="316" y1="109" x2="328" y2="109" stroke="white" stroke-width="2" />
              <line id="Line 10_4" x1="316" y1="133" x2="330" y2="133" stroke="white" stroke-width="2" />
              <line id="Line 11_4" x1="316" y1="157" x2="334" y2="157" stroke="white" stroke-width="2" />
              <line id="Line 12_4" x1="316" y1="181" x2="334" y2="181" stroke="white" stroke-width="2" />
              <line id="Line 13_4" x1="316" y1="205" x2="330" y2="205" stroke="white" stroke-width="2" />
              <line id="Line 17_4" x1="316" y1="229" x2="328" y2="229" stroke="white" stroke-width="2" />
              <line id="Line 18_4" x1="316" y1="253" x2="325" y2="253" stroke="white" stroke-width="2" />
              <line id="Line 19_4" x1="316" y1="277" x2="322" y2="277" stroke="white" stroke-width="2" />
            </g>
          </g>
        </g>
        <!-- <g id="Line decoration">
          <g id="Top lines decoration">
            <g id="Frame 2" class="lines-1" filter="url(#filter6_d_18_91)">
              <line id="Line 7" x1="64" y1="29" x2="64" y2="23" stroke="white" stroke-width="2" />
              <line id="Line 8" x1="88" y1="29" x2="88" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 9" x1="112" y1="29" x2="112" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 10" x1="136" y1="29" x2="136" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 11" x1="160" y1="29" x2="160" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 12" x1="184" y1="29" x2="184" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 13" x1="208" y1="29" x2="208" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 17" x1="232" y1="29" x2="232" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 18" x1="256" y1="29" x2="256" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 19" x1="280" y1="29" x2="280" y2="23" stroke="white" stroke-width="2" />
            </g>
            <g class="lines-2" filter="url(#filter7_d_18_91)">
              <line id="Line 7_2" x1="64" y1="29" x2="64" y2="23" stroke="white" stroke-width="2" />
              <line id="Line 8_2" x1="88" y1="29" x2="88" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 9_2" x1="112" y1="29" x2="112" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 10_2" x1="136" y1="29" x2="136" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 11_2" x1="160" y1="29" x2="160" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 12_2" x1="184" y1="29" x2="184" y2="11" stroke="white" stroke-width="2" />
              <line id="Line 13_2" x1="208" y1="29" x2="208" y2="15" stroke="white" stroke-width="2" />
              <line id="Line 17_2" x1="232" y1="29" x2="232" y2="17" stroke="white" stroke-width="2" />
              <line id="Line 18_2" x1="256" y1="29" x2="256" y2="20" stroke="white" stroke-width="2" />
              <line id="Line 19_2" x1="280" y1="29" x2="280" y2="23" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration">
            <g id="Frame 5" class="lines-1" filter="url(#filter8_d_18_91)">
              <line id="Line 7_3" x1="280" y1="313" x2="280" y2="319" stroke="white" stroke-width="2" />
              <line id="Line 8_3" x1="256" y1="313" x2="256" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 9_3" x1="232" y1="313" x2="232" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 10_3" x1="208" y1="313" x2="208" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 11_3" x1="184" y1="313" x2="184" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 12_3" x1="160" y1="313" x2="160" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 13_3" x1="136" y1="313" x2="136" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 17_3" x1="112" y1="313" x2="112" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 18_3" x1="88" y1="313" x2="88" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 19_3" x1="64" y1="313" x2="64" y2="319" stroke="white" stroke-width="2" />
            </g>
            <g id="Bottom lines decoration_2" class="lines-2" filter="url(#filter9_d_18_91)">
              <line id="Line 7_4" x1="280" y1="313" x2="280" y2="319" stroke="white" stroke-width="2" />
              <line id="Line 8_4" x1="256" y1="313" x2="256" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 9_4" x1="232" y1="313" x2="232" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 10_4" x1="208" y1="313" x2="208" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 11_4" x1="184" y1="313" x2="184" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 12_4" x1="160" y1="313" x2="160" y2="331" stroke="white" stroke-width="2" />
              <line id="Line 13_4" x1="136" y1="313" x2="136" y2="327" stroke="white" stroke-width="2" />
              <line id="Line 17_4" x1="112" y1="313" x2="112" y2="325" stroke="white" stroke-width="2" />
              <line id="Line 18_4" x1="88" y1="313" x2="88" y2="322" stroke="white" stroke-width="2" />
              <line id="Line 19_4" x1="64" y1="313" x2="64" y2="319" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration_3">
            <g id="Frame 5_2" class="lines-1" filter="url(#filter10_d_18_91)">
              <line id="Line 7_5" x1="29" y1="279" x2="23" y2="279" stroke="white" stroke-width="2" />
              <line id="Line 8_5" x1="29" y1="255" x2="20" y2="255" stroke="white" stroke-width="2" />
              <line id="Line 9_5" x1="29" y1="231" x2="17" y2="231" stroke="white" stroke-width="2" />
              <line id="Line 10_5" x1="29" y1="207" x2="15" y2="207" stroke="white" stroke-width="2" />
              <line id="Line 11_5" x1="29" y1="183" x2="11" y2="183" stroke="white" stroke-width="2" />
              <line id="Line 12_5" x1="29" y1="159" x2="11" y2="159" stroke="white" stroke-width="2" />
              <line id="Line 13_5" x1="29" y1="135" x2="15" y2="135" stroke="white" stroke-width="2" />
              <line id="Line 17_5" x1="29" y1="111" x2="17" y2="111" stroke="white" stroke-width="2" />
              <line id="Line 18_5" x1="29" y1="87" x2="20" y2="87" stroke="white" stroke-width="2" />
              <line id="Line 19_5" x1="29" y1="63" x2="23" y2="63" stroke="white" stroke-width="2" />
            </g>
            <g id="Bottom lines decoration_4" class="lines-2" filter="url(#filter11_d_18_91)">
              <line id="Line 7_6" x1="29" y1="279" x2="23" y2="279" stroke="white" stroke-width="2" />
              <line id="Line 8_6" x1="29" y1="255" x2="20" y2="255" stroke="white" stroke-width="2" />
              <line id="Line 9_6" x1="29" y1="231" x2="17" y2="231" stroke="white" stroke-width="2" />
              <line id="Line 10_6" x1="29" y1="207" x2="15" y2="207" stroke="white" stroke-width="2" />
              <line id="Line 11_6" x1="29" y1="183" x2="11" y2="183" stroke="white" stroke-width="2" />
              <line id="Line 12_6" x1="29" y1="159" x2="11" y2="159" stroke="white" stroke-width="2" />
              <line id="Line 13_6" x1="29" y1="135" x2="15" y2="135" stroke="white" stroke-width="2" />
              <line id="Line 17_6" x1="29" y1="111" x2="17" y2="111" stroke="white" stroke-width="2" />
              <line id="Line 18_6" x1="29" y1="87" x2="20" y2="87" stroke="white" stroke-width="2" />
              <line id="Line 19_6" x1="29" y1="63" x2="23" y2="63" stroke="white" stroke-width="2" />
            </g>
          </g>
          <g id="Bottom lines decoration_5">
            <g id="Frame 5_3" class="lines-1" filter="url(#filter12_d_18_91)">
              <line id="Line 7_7" x1="316" y1="61" x2="322" y2="61" stroke="white" stroke-width="2" />
              <line id="Line 8_7" x1="316" y1="85" x2="325" y2="85" stroke="white" stroke-width="2" />
              <line id="Line 9_7" x1="316" y1="109" x2="328" y2="109" stroke="white" stroke-width="2" />
              <line id="Line 10_7" x1="316" y1="133" x2="330" y2="133" stroke="white" stroke-width="2" />
              <line id="Line 11_7" x1="316" y1="157" x2="334" y2="157" stroke="white" stroke-width="2" />
              <line id="Line 12_7" x1="316" y1="181" x2="334" y2="181" stroke="white" stroke-width="2" />
              <line id="Line 13_7" x1="316" y1="205" x2="330" y2="205" stroke="white" stroke-width="2" />
              <line id="Line 17_7" x1="316" y1="229" x2="328" y2="229" stroke="white" stroke-width="2" />
              <line id="Line 18_7" x1="316" y1="253" x2="325" y2="253" stroke="white" stroke-width="2" />
              <line id="Line 19_7" x1="316" y1="277" x2="322" y2="277" stroke="white" stroke-width="2" />
            </g>
            <g id="Bottom lines decoration_6" class="lines-2" filter="url(#filter13_d_18_91)">
              <line id="Line 7_8" x1="316" y1="61" x2="322" y2="61" stroke="white" stroke-width="2" />
              <line id="Line 8_8" x1="316" y1="85" x2="325" y2="85" stroke="white" stroke-width="2" />
              <line id="Line 9_8" x1="316" y1="109" x2="328" y2="109" stroke="white" stroke-width="2" />
              <line id="Line 10_8" x1="316" y1="133" x2="330" y2="133" stroke="white" stroke-width="2" />
              <line id="Line 11_8" x1="316" y1="157" x2="334" y2="157" stroke="white" stroke-width="2" />
              <line id="Line 12_8" x1="316" y1="181" x2="334" y2="181" stroke="white" stroke-width="2" />
              <line id="Line 13_8" x1="316" y1="205" x2="330" y2="205" stroke="white" stroke-width="2" />
              <line id="Line 17_8" x1="316" y1="229" x2="328" y2="229" stroke="white" stroke-width="2" />
              <line id="Line 18_8" x1="316" y1="253" x2="325" y2="253" stroke="white" stroke-width="2" />
              <line id="Line 19_8" x1="316" y1="277" x2="322" y2="277" stroke="white" stroke-width="2" />
            </g>
          </g>
        </g> -->
      </g>
      <defs>
        <filter
          id="filter0_d_18_91"
          x="8.96999"
          y="4.96997"
          width="326.577"
          height="330.931"
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
          <feGaussianBlur stdDeviation="12.1922" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.84 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_91" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_18_91" result="shape" />
        </filter>
        <filter
          id="filter1_i_18_91"
          x="122.183"
          y="120.796"
          width="101.021"
          height="99.2793"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_18_91" />
        </filter>
        <filter
          id="filter6_dd_18_91"
          x="52"
          y="-9"
          width="240"
          height="49"
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
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_91" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_18_91" result="effect2_dropShadow_18_91" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_18_91" result="shape" />
        </filter>
        <filter
          id="filter7_dd_18_91"
          x="52"
          y="302"
          width="240"
          height="49"
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
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_91" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_18_91" result="effect2_dropShadow_18_91" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_18_91" result="shape" />
        </filter>
        <filter
          id="filter8_dd_18_91"
          x="-9"
          y="51"
          width="49"
          height="240"
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
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_91" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_18_91" result="effect2_dropShadow_18_91" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_18_91" result="shape" />
        </filter>
        <filter
          id="filter9_dd_18_91"
          x="305"
          y="49"
          width="49"
          height="240"
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
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_91" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_18_91" result="effect2_dropShadow_18_91" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_18_91" result="shape" />
        </filter>
      </defs>
    </svg>

    <div class="absolute inset-0">
      <GridCell
        :contents="grid[0]"
        :highlight="winningMask?.[0]"
        class="h-[26%] w-[25%] absolute left-[12%] top-[11%]"
        @click="store.placeMarker(0)"
      />
      <GridCell
        :contents="grid[1]"
        :highlight="winningMask?.[1]"
        class="h-[26%] w-[25%] absolute left-[37.5%] top-[11%]"
        @click="store.placeMarker(1)"
      />
      <GridCell
        :contents="grid[2]"
        :highlight="winningMask?.[2]"
        class="h-[26%] w-[25%] absolute left-[63%] top-[11%]"
        @click="store.placeMarker(2)"
      />

      <GridCell
        :contents="grid[3]"
        :highlight="winningMask?.[3]"
        class="h-[26%] w-[25%] absolute left-[12%] top-[37%]"
        @click="store.placeMarker(3)"
      />
      <GridCell
        :contents="grid[4]"
        :highlight="winningMask?.[4]"
        class="h-[26%] w-[25%] absolute left-[37.5%] top-[37%]"
        @click="store.placeMarker(4)"
      />
      <GridCell
        :contents="grid[5]"
        :highlight="winningMask?.[5]"
        class="h-[26%] w-[25%] absolute left-[63%] top-[37%]"
        @click="store.placeMarker(5)"
      />

      <GridCell
        :contents="grid[6]"
        :highlight="winningMask?.[6]"
        class="h-[26%] w-[25%] absolute left-[12%] top-[63%]"
        @click="store.placeMarker(6)"
      />
      <GridCell
        :contents="grid[7]"
        :highlight="winningMask?.[7]"
        class="h-[26%] w-[25%] absolute left-[37.5%] top-[63%]"
        @click="store.placeMarker(7)"
      />
      <GridCell
        :contents="grid[8]"
        :highlight="winningMask?.[8]"
        class="h-[26%] w-[25%] absolute left-[63%] top-[63%]"
        @click="store.placeMarker(8)"
      />
    </div>
  </div>
</template>

<style scoped>
svg * {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
