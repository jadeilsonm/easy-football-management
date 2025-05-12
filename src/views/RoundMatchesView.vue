<script setup>
import { onMounted, reactive, computed  } from "vue";
// import { DAOChanpionShip } from "@/services";
import RoundsComponent from '@/components/RoundsComponent.vue';
import { useRoute } from 'vue-router'
import router from "@/router";
const route = useRoute();
const state = reactive({
  rounds: [
  ],
  currentPage: 1,
});

const type = computed(() => route.name.split('/'));

const totalRounds = computed(() => state.rounds.length);

const changePage = (page) => {
  if (page >= 1 && page <= totalRounds.value) {
    state.currentPage = page;
  }
};

const backUrl = () => {
  console.log(type.value[2]);
  const t = type.value[2];
  router.push({ name: `manager/${t}`, params: { id: route.params.id } });
};

const currentRound = computed(() => state.rounds[state.currentPage - 1]);

onMounted(async () => {
  try {
    const responseAPI = await DAOChanpionShip.getById(route.params.id);
    state.rounds = responseAPI.matches
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});
</script>

<template>
  <div class="round-matches">
    <button @click="backUrl" class="back">voltar</button>
    <h1>Campeonato - Rodadas</h1>
    <RoundsComponent :round="currentRound" :championshipID="route.params.id"/>
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

.back {
  position: absolute;
  left: 5%;
  padding: 10px;
  width: 100px;
  border-radius: 12px;
  background-color: #42b883;
  color: #ffffff;
  font-size: 1.1em;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}
.round-matches {
  text-align: center;
  background-color: #1c1e21;
  padding: 20px;
  border-radius: 26px;
  border: 1px solid #42b883;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.btn {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 26px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
.btn:hover:not(:disabled) {
  background-color: #1c1e21;
  border: 1px solid #42b883;
  color: #ffffff;
}
</style>
