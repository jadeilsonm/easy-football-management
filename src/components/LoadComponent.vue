<script setup>
import { defineProps } from 'vue';

defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div v-if="isLoading" class="loader"></div>
</template>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #42b883;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
