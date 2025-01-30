<script setup>
import KnockoutStage from '@/components/KnockoutStage.vue';
import Navbar from '@/components/NavBar.vue';

const buttonsValues = [
  { path: '/manager', value: 'Gerenciar Torneios' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/perfil', value: 'Perfil' },
  { path: '/login', value: 'Sair' }
];

</script>

<template>
  <div class="cup-view">
    <Navbar :buttonsValues="buttonsValues"/> <!-- Adicionar o componente Navbar -->
    <KnockoutStage />
  </div>
</template>

<style scoped>
body {
  margin: 0;
  background-color: #1a1a1a;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: #ffffff;
}

.cup-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .cup-view {
    padding: 10px;
  }
}
</style>
