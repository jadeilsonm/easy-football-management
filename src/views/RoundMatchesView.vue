<!-- <script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from 'vue-router'
import { DAOClassification, DAORoundMatches } from "@/services";
import router from "@/router";
import RoundComponent from "@/components/RoundComponent.vue";

const localState = reactive({
  rounds: [],
  currentPage: 1,
  totalRounds: 0
});

const route = useRoute();

const backUrl = () => {
  router.push({ name: 'manager' });
};

onMounted(async () => {
  try {
    console.log('classification', (route.params.id));
    const responseAPI = await DAORoundMatches.getByField('classificationId', route.params.id);
    console.log('classification response', (responseAPI));
    genereateRoundMatches(route.params.id);
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script> -->

<script setup>
import { onMounted, reactive, computed  } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DAOClassification, DAORoundMatches } from "@/services";
import RoundsComponent from '@/components/RoundsComponent.vue';
import { genereateRoundMatches } from "@/services/ServiceRoundMatches";
import router from "@/router";
import { useRoute } from 'vue-router'
const route = useRoute();
const auth = getAuth();
// Definindo o estado com reactive
const state = reactive({
  rounds: [
    // { round: 1, games: { match1: { team1: 'Flamengo', team2: 'Corinthians' }, match2: { team1: 'Palmeiras', team2: 'São Paulo' } } },
    // { round: 2, games: { match1: { team1: 'Corinthians', team2: 'Flamengo' }, match2: { team1: 'São Paulo', team2: 'Palmeiras' } } },
    // Adicione mais rodadas conforme necessário
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
    // console.log('classification', (route.params.id));
    const responseAPI = await DAORoundMatches.getByField('classificationId', route.params.id);
    console.log('classification response', (!responseAPI.length));
    console.log('component 2' , await genereateRoundMatches(route.params.id));
    if(!responseAPI.length) {
      const  {matches}  = (await genereateRoundMatches(route.params.id));
      // DAORoundMatches.create()
      state.rounds = matches;
      console.log('if response', matches)
      console.log('state', state.rounds)
    } else {
      state.rounds = responseAPI;
    };
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});
</script>

<template>
  <div class="round-matches">
    <h1>Campeonato - Rodadas</h1>

    <!-- Exibe as rodadas atuais -->
    <RoundsComponent :round="currentRound" :chanpionShipId="route.params.id"/>

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
