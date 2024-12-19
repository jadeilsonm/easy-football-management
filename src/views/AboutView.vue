<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <RouterLink to="/login">login</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
