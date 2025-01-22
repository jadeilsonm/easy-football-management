<script setup>
import { onMounted, reactive, computed  } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DAOChanpionShip } from "@/services";
import RoundsComponent from '@/components/RoundsComponent.vue';
import router from "@/router";
import { useRoute } from 'vue-router'
const route = useRoute();
const auth = getAuth();
const state = reactive({
  rounds: [
  ],
  currentPage: 1,
});

const totalRounds = computed(() => state.rounds.length);

const changePage = (page) => {
  if (page >= 1 && page <= totalRounds.value) {
    state.currentPage = page;
  }
};

const currentRound = computed(() => state.rounds[state.currentPage - 1]);

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("ok")
    } else {
      router.push('/login');
    }
  });
  try {
    console.log('classification', (route.params.id));
    const responseAPI = await DAOChanpionShip.getById(route.params.id);
    console.log('DAORoundMatches response', (responseAPI.matches));
    state.rounds = responseAPI.matches
    //  console.log('component 2' , await genereateRoundMatches(route.params.id));
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});
</script>

<template>
  <div class="round-matches">
    <h1>Campeonato - Rodadas</h1>

    <!-- Exibe as rodadas atuais -->
    <RoundsComponent :round="currentRound" :championshipID="route.params.id"/>

    <!-- Paginação -->
    <div class="pagination">
      <button class="btn" :disabled="state.currentPage === 1" @click="changePage(state.currentPage - 1)">
        Anterior
      </button>

      <span>Página {{ state.currentPage }} de {{ totalRounds }}</span>

      <button class="btn" :disabled="state.currentPage === totalRounds" @click="changePage(state.currentPage + 1)">
        Próxima
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}

.round-matches {
  text-align: center;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #0056b3; /* Cor mais escura ao passar o mouse */
}
</style>
