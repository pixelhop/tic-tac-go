<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import Heading from '../components/Heading.vue';
import LayoutDefault from '../layouts/LayoutDefault.vue';
import InputText from '../components/InputText.vue';
import Button from '../components/Button.vue';
import IconChevron from '../components/icons/IconChevron.vue';
import { useGameStore } from '../stores/game';

const { joinGame } = useGameStore();

const validationSchema = object({
  name: string().required('Player name is required').max(20, 'Player name must be less than 20 characters'),
  code: string().required('Game code is required'),
});

const { errors, values, handleSubmit } = useForm({
  validationSchema,
});

const join = handleSubmit(() => {
  joinGame(values.name, values.code);
});
</script>

<template>
  <LayoutDefault>
    <div class="py-12 px-6 flex flex-col justify-between h-full">
      <Heading class="text-center">Join game</Heading>

      <form class="space-y-4" @submit="join">
        <InputText name="name" label="Enter player name:" />
        <InputText name="code" label="Enter game code:" />
      </form>

      <div class="flex justify-between">
        <Button as="router-link" to="/" theme="secondary"><IconChevron class="h-5 rotate-180 mr-2" /> Back</Button>
        <Button :disabled="!values.name || !values.code || !!Object.keys(errors).length" @click="join"
          >Next <IconChevron class="h-5 ml-2"
        /></Button>
      </div>
    </div>
  </LayoutDefault>
</template>

<style scoped></style>
