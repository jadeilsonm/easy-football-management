<script setup>
import { onMounted } from "vue";
import { useRoute } from 'vue-router'
import router from "@/router";


const route = useRoute();

const backUrl = () => {
  router.push({ name: 'manager' });
};

onMounted(async () => {
  try {
    console.log('classification');
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>

<template>
  <div class="league">
    <h1>editar Jogos</h1>
  </div>
</template>

<style scoped>
</style>
