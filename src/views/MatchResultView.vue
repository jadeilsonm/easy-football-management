<script setup>
import { onMounted } from "vue";
import { useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "@/router";
const auth = getAuth();


const route = useRoute();

const backUrl = () => {
  router.push({ name: 'manager' });
};

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("ok")
    } else {
      router.push('/login');
    }
  });
  try {
    
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>

<template>
  <div class="league">
    <h1>editar Jogos</h1>
    <h1>em construção</h1>
  </div>
</template>

<style scoped>
</style>
