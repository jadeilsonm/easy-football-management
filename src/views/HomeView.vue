<script setup>
import AsideComponent from "@/components/AsideComponent.vue";
import NavBar from "@/components/NavBar.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router';
import { GlobalStore } from '@/stores/GlobalStore';
import { DAOTeams } from '../services/index'

const buttonsValues = [
  { path: '/manager', value: 'Gerenciar Torneios' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/perfil', value: 'Perfil' },
  { path: '/login', value: 'Sair' }
];

const globalStore = GlobalStore();

const getByIdTeam = async (userId) => {
  try {
    const response = await DAOTeams.getByField('userId', userId);
    globalStore.setMyTeamId(response[0].id);
    localStorage.setItem('data', JSON.stringify({userId, teamId: response[0].id}))
    console.log(globalStore.myTeamId)
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
};

const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!globalStore.getUserId) {
        const uuid = user.uid;
        globalStore.setUserId(uuid);
        localStorage.setItem('data', JSON.stringify({userId: uuid}))
        console.log(globalStore.userId)
        getByIdTeam(uuid);
      }
    } else {
      router.push('/login');
    }
  });
});
</script>


<template>
  <main class="home">
    <NavBar :buttonsValues=buttonsValues />
    <div>
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
</style>
