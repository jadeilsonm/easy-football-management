<script setup>
import AsideComponent from "@/components/AsideComponent.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { DAOTeams } from '../services/index'
import { PiniaStore } from '@/stores';
import NavBar from "@/components/NavBar.vue";

// const globalStore = PiniaStore();

const buttonsValues = [
  { path: '/manager', value: 'Gerenciar Torneios' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/profile', value: 'Perfil' },
  { path: '/login', value: 'Sair' }
];

const getByIdTeam = async (userId) => {
  // try {
  //   const [response] = await DAOTeams.getByField('userId', userId);
  //   globalStore.setMyTeam(response);
  // } catch (error) {
  //   console.error('Erro ao carregar os dados:', error);
  // }
};

// const auth = getAuth();

onMounted(() => {
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uuid = user.uid;
  //     globalStore.setUserId(uuid);
  //     getByIdTeam(uuid);
  //   }
  // });
});
</script>


<template>
  <main class="home">
    <NavBar :buttonsValues="buttonsValues" />
    <div class="content">
      <AsideComponent class="sidebar" />
      <RouterView class="main-content" />
    </div>
  </main>
</template>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #121212;
}

.content {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar {
  width: 250px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.main-content {
  flex-grow: 1;
  margin: 20px;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    padding: 2px;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .main-content {
    border-radius: 0;
    margin: 0;
    padding: 0;
  }
  .team {
    border: none;
    border-radius: 0;
  }
}
</style>
