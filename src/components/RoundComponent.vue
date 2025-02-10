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
  justify-content: space-around;
  gap: 1rem;
  height: 75vh;
}

h2 {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.matches {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  gap: 1rem;
}
</style>
