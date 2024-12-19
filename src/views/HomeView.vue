<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import AsideComponent from '@/components/AsideComponent.vue';
const buttonsValues = [
  { path:'/manager', value:'Gerenciar Torneios' },
  { path:'/manager/created', value:'Criar Campeonato' },
  {path:'/manager/perfil',value:'Perfil'},
  {path:'/login',value:'Sair'}]
</script>

<template>
  <main class="home">
    <NavBar :buttonsValues=buttonsValues />
    <div >
      <AsideComponent />
      <RouterView />
    </div>
    
  </main>
</template>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
  }
}
</style>
