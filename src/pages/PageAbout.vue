<script lang="ts" setup>
import Heading from '../components/Heading.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import Button from '../components/Button.vue';
import IconChevron from '../components/icons/IconChevron.vue';
</script>

<template>
  <LayoutDefault>
    <div class="py-12 px-6 flex flex-col justify-between h-full">
      <Heading class="text-center">About</Heading>

      <div class="space-y-6">
        <p>
          Tic Tac Go is a game created by
          <a class="underline text-blue" target="_blank" href="https://pixelhop.io">Pixelhop</a> for a tutorial series
          on how to create a real-time game with
          <a class="underline text-blue" target="_blank" href="https://supabase.com">supabase</a> and
          <a class="underline text-blue" target="_blank" href="https://vuejs.org">Vue.js</a>
        </p>

        <p>
          If you would like to learn how to build something similar, read the tutorial series here:
          <a class="underline text-blue" href="https://pixelhop.io/writing" target="_blank"
            >Build a real-time game with supabase and Vue</a
          >
        </p>
      </div>

      <div class="flex justify-between">
        <Button as="router-link" to="/" theme="secondary"><IconChevron class="h-5 rotate-180 mr-2" /> Back</Button>
      </div>
    </div>
  </LayoutDefault>
</template>

<style scoped></style>
