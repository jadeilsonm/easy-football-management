<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterView } from 'vue-router';
import AsideComponent from '@/components/AsideComponent.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from '@/router';

const buttonsValues = [
  { path: '/manager', value: 'Gerenciar Torneios' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/perfil', value: 'Perfil' },
  { path: '/login', value: 'Sair' }]

const store = useStore(); // Acessa o store do Vuex
const newUserId = ref(''); // Para capturar o input do usuário

const userId = computed(() => store.getters.getUserId);

const setUserId = () => {
  if (newUserId.value) {
    store.dispatch('updateUserId', newUserId.value);
  }
};

const auth = getAuth();

onAuthStateChanged(auth,(user) => {
    if (user) {
      const { uid } = user;
      newUserId.value = uid;
      setUserId(uid);
      return user;
    } else {
      router.push('/login');
    }});



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
