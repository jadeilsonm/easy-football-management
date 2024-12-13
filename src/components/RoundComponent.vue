<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="round">
    <h2>{{ title }}</h2>
    <div class="matches">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.round {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.matches {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
