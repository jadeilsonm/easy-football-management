<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import AsideComponent from '@/components/AsideComponent.vue';
</script>

<template>
  <main class="home">
    <div>
      <AsideComponent />

    </div>
    <div>

      <NavBar />
      <RouterView />
    </div>
    
  </main>
</template>

<style scoped>
.home {
  height: 100vw;
  /* width: 100vh; */
  display: flex;
}
</style>
