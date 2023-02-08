<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    animateIn?: boolean;
  }>(),
  {
    animateIn: false,
  }
);

function flicker() {
  anime({
    targets: ['#letter_8', '#letter_4'],
    opacity: [1, 0, 1, 0.2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    easing: 'linear',
    direction: 'alternate',
    duration: 2000,
    delay: 0,
    loop: true,
  });
}

function animateIn() {
  anime({
    targets: '#letters path',
    easing: 'easeOutCubic',
    delay(el: any, i: number) {
      return i * 100;
    },
    scale: [0, 1],
    opacity: [0, 1],
    duration: 300,
  });

  anime({
    targets: '#arrow-path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeOutCubic',
    duration: 800,
    delay: 200,
  });

  anime({
    targets: ['#arrow-tip-top', '#arrow-tip-bottom'],
    opacity: [0, 1],
    easing: 'easeOutCubic',
    duration: 300,
    delay: 900,
  });

  anime
    .timeline({
      duration: 300,
      easing: 'linear',
    })
    .add({
      targets: '#blue-line #square-1',
      opacity: [0, 1],
      delay: 600,
    })
    .add({
      targets: '#blue-line #thin-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutCubic',
      duration: 600,
    })
    .add(
      {
        targets: '#blue-line #thick-line-1 path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutCubic',
        duration: 300,
      },
      '-=500'
    )
    .add(
      {
        targets: '#blue-line #thick-line-2 path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutCubic',
        duration: 300,
      },
      '-=200'
    );

  anime({
    targets: '#logo-end-1',
    'fill-opacity': [0.27, 1, 0.27],
    easing: 'easeOutCubic',
    duration: 600,
    delay: 1400,
  });

  anime({
    targets: '#logo-end-2',
    'fill-opacity': [0.27, 1, 0.27],
    easing: 'easeOutCubic',
    duration: 600,
    delay: 1500,
  });

  anime({
    targets: '#logo-end-3',
    'fill-opacity': [0.27, 1, 0.27],
    easing: 'easeOutCubic',
    duration: 600,
    delay: 1600,
  });

  anime({
    targets: '#logo-end-dot',
    opacity: [1, 0.27, 1],
    easing: 'easeOutCubic',
    duration: 800,
    delay: 1700,
    complete: () => {
      flicker();
    },
  });
}

onMounted(() => {
  if (props.animateIn) {
    animateIn();
  } else {
    flicker();
  }
});
</script>

<template>
  <svg class="rotate-3" viewBox="0 0 950 182" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Logo">
      <g id="text" clip-path="url(#clip0_4_39)">
        <g id="letters" filter="url(#filter0_d_4_39)">
          <path id="letter" d="M147.274 124V74.932H122.74V61.36H185.38V74.932H160.846V124H147.274Z" fill="white" />
          <path id="letter_2" d="M211.462 124V61.36H224.773V124H211.462Z" fill="white" />
          <path
            id="letter_3"
            d="M266.869 124C264.491 124 262.316 123.42 260.344 122.26C258.43 121.1 256.893 119.563 255.733 117.649C254.573 115.677 253.993 113.502 253.993 111.124V74.236C253.993 71.858 254.573 69.712 255.733 67.798C256.893 65.826 258.43 64.26 260.344 63.1C262.316 61.94 264.491 61.36 266.869 61.36H316.459V74.932H270.349C269.421 74.932 268.696 75.164 268.174 75.628C267.71 76.092 267.478 76.817 267.478 77.803V107.557C267.478 108.485 267.71 109.21 268.174 109.732C268.696 110.196 269.421 110.428 270.349 110.428H316.459V124H266.869Z"
            fill="white"
          />
          <path id="letter_4" d="M368.682 124V74.932H344.148V61.36H406.788V74.932H382.254V124H368.682Z" fill="white" />
          <path
            id="letter_5"
            d="M435.219 124V74.236C435.219 71.858 435.799 69.712 436.959 67.798C438.119 65.826 439.685 64.26 441.657 63.1C443.629 61.94 445.775 61.36 448.095 61.36H484.896C487.274 61.36 489.42 61.94 491.334 63.1C493.306 64.26 494.872 65.826 496.032 67.798C497.25 69.712 497.859 71.858 497.859 74.236V124H484.2V103.816H448.704V124H435.219ZM448.704 90.244H484.2V74.932H448.704V90.244Z"
            fill="white"
          />
          <path
            id="letter_6"
            d="M542.397 124C540.019 124 537.844 123.42 535.872 122.26C533.958 121.1 532.421 119.563 531.261 117.649C530.101 115.677 529.521 113.502 529.521 111.124V74.236C529.521 71.858 530.101 69.712 531.261 67.798C532.421 65.826 533.958 64.26 535.872 63.1C537.844 61.94 540.019 61.36 542.397 61.36H591.987V74.932H545.877C544.949 74.932 544.224 75.164 543.702 75.628C543.238 76.092 543.006 76.817 543.006 77.803V107.557C543.006 108.485 543.238 109.21 543.702 109.732C544.224 110.196 544.949 110.428 545.877 110.428H591.987V124H542.397Z"
            fill="white"
          />
          <path
            id="letter_7"
            d="M635.685 124C633.365 124 631.219 123.42 629.247 122.26C627.275 121.1 625.709 119.534 624.549 117.562C623.389 115.59 622.809 113.444 622.809 111.124V74.236C622.809 71.858 623.389 69.712 624.549 67.798C625.709 65.826 627.275 64.26 629.247 63.1C631.219 61.94 633.365 61.36 635.685 61.36H672.486C674.864 61.36 677.01 61.94 678.924 63.1C680.896 64.26 682.462 65.826 683.622 67.798C684.84 69.712 685.448 71.858 685.448 74.236V80.152H671.789V74.932H636.294V110.428H671.789V101.032H658.218V87.46H685.448V111.124C685.448 113.444 684.84 115.59 683.622 117.562C682.462 119.534 680.896 121.1 678.924 122.26C677.01 123.42 674.864 124 672.486 124H635.685Z"
            fill="white"
          />
          <path
            id="letter_8"
            d="M729.477 124C727.157 124 725.011 123.42 723.039 122.26C721.067 121.1 719.501 119.534 718.341 117.562C717.181 115.59 716.601 113.444 716.601 111.124V74.236C716.601 71.858 717.181 69.712 718.341 67.798C719.501 65.826 721.067 64.26 723.039 63.1C725.011 61.94 727.157 61.36 729.477 61.36H766.365C768.685 61.36 770.802 61.94 772.716 63.1C774.688 64.26 776.254 65.826 777.414 67.798C778.632 69.712 779.241 71.858 779.241 74.236V111.124C779.241 113.444 778.632 115.59 777.414 117.562C776.254 119.534 774.688 121.1 772.716 122.26C770.802 123.42 768.685 124 766.365 124H729.477ZM730.086 110.428H765.582V74.932H730.086V110.428Z"
            fill="white"
          />
        </g>
      </g>
      <rect id="logo-end-1" x="96" y="23" width="10" height="133" fill="#FF7615" fill-opacity="0.27" />
      <rect id="logo-end-2" x="69" y="38" width="10" height="103" fill="#FF7615" fill-opacity="0.27" />
      <rect id="logo-end-3" x="42" y="62" width="10" height="55" fill="#FF7615" fill-opacity="0.27" />
      <g id="logo-end-dot" filter="url(#filter1_d_4_39)">
        <rect x="12" y="81" width="16" height="16" fill="#02FFFF" />
      </g>
      <g id="arrow" filter="url(#filter2_d_4_39)">
        <rect
          id="arrow-tip-top"
          x="833"
          y="64.598"
          width="56"
          height="10"
          transform="rotate(-45 833 64.598)"
          fill="#FF7615"
        />
        <rect
          id="arrow-tip-bottom"
          x="840.071"
          y="57.4731"
          width="56"
          height="10"
          transform="rotate(45 840.071 57.4731)"
          fill="#FF7615"
        />
        <path id="arrow-path" d="M118 151.5H919.5V65H846.5" stroke="#FF7615" stroke-width="10" />
      </g>
      <g id="blue-line">
        <g id="square-1" filter="url(#filter3_d_4_39)">
          <rect x="800" y="56" width="16" height="16" fill="#02FFFF" />
        </g>
        <g id="thick-line-1" filter="url(#filter4_d_4_39)">
          <path d="M775.5 29H559" stroke="#02FFFF" stroke-width="10" />
        </g>
        <g id="thick-line-2" filter="url(#filter5_d_4_39)">
          <path d="M334.5 29H118" stroke="#02FFFF" stroke-width="10" />
        </g>
        <path id="thin-line" d="M808 70.5V29H118.5" stroke="#02FFFF" stroke-opacity="0.32" stroke-width="4" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_4_39"
        x="97.74"
        y="36.36"
        width="706.501"
        height="112.64"
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
        <feGaussianBlur stdDeviation="12.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.466667 0 0 0 0 0.0862745 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <filter
        id="filter1_d_4_39"
        x="0"
        y="69"
        width="40"
        height="40"
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
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.84 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <filter
        id="filter2_d_4_39"
        x="93"
        y="0"
        width="856.5"
        height="181.5"
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
        <feGaussianBlur stdDeviation="12.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.462745 0 0 0 0 0.0823529 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <filter
        id="filter3_d_4_39"
        x="788"
        y="44"
        width="40"
        height="40"
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
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.84 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <filter
        id="filter4_d_4_39"
        x="551"
        y="16"
        width="232.5"
        height="26"
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
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.84 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <filter
        id="filter5_d_4_39"
        x="110"
        y="16"
        width="232.5"
        height="26"
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
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 0 1 0 0 0 0.84 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_39" result="shape" />
      </filter>
      <clipPath id="clip0_4_39">
        <rect width="708" height="113" fill="white" transform="translate(97 36)" />
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped>
#letters path,
#blue-line * {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
