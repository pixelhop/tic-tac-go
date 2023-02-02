<script lang="ts" setup>
import Button from '../Button.vue';
import Modal from '../Modal.vue';
</script>

<template>
  <Modal title="Disconnected">
    <div class="border border-gray-400 p-6 uppercase space-y-4 tracking-wider mb-6">
      <p>Oh no, you have been disconnected from the other player!</p>
    </div>

    <div class="flex justify-center">
      <Button as="router-link" to="/">Back home?</Button>
    </div>
  </Modal>
</template>

<style scoped></style>
