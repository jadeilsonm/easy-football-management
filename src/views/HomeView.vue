<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import AsideComponent from '@/components/AsideComponent.vue';
import { AuthService } from '@/services/AuthService';
import { onMounted } from 'vue';
const buttonsValues = [
  { path:'/manager', value:'Gerenciar Torneios' },
  { path:'/manager/created', value:'Criar Campeonato' },
  {path:'/manager/perfil',value:'Perfil'},
  {path:'/login',value:'Sair'}]

const auth = new AuthService();

onMounted(() => {
  auth.getUser();
})

</script>


<template>
  <main class="home">
    <NavBar :buttonsValues=buttonsValues />
    <div class="container">
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
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
