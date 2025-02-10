<template>
  <NavBar :buttonsValues="buttonsValues" />
  <div class="league">
    <table class="table table-dark table-striped">
      <tbody>
        <tr :key="1">
          <th class="first_row">POSIÇÃO</th>
          <th class="first_row">NOME</th>
          <th class="first_row">P</th>
          <th class="first_row">J</th>
          <th class="first_row">V</th>
          <th class="first_row">E</th>
          <th class="first_row">D</th>
          <th class="first_row">GP</th>
          <th class="first_row">GC</th>
          <th class="first_row">SG</th>
          <th class="first_row">%</th>
        </tr>
        <tr v-for="(teams, index) in state" :key="index" :style="{ backgroundColor: getRowColor(index) }">
          <th>{{ index + 1 }}</th>
          <th class="nome">{{ teams.name }}</th>
           <th>{{ teams.pontos }}</th>
          <th>{{ teams.totalGames }}</th>
          <th>{{ teams.totalVictories }}</th>
          <th>{{ teams.totalDraws }}</th>
          <th>{{ teams.totalLosses }}</th>
          <th>{{ teams.goalsFavor }}</th>
          <th>{{ teams.goalsOwn }}</th>
          <th>{{ teams.goalsFavor - teams.goalsOwn }}</th>
          <th>{{ ((teams.totalVictories + (0.5 * teams.totalDraws)) / teams.totalGames) * 100 }}%</th>
        </tr>
      </tbody>
    </table>
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %:
      Aproveitamento</span>
      <div>
        <button @click="backUrl">Voltar</button>
        <button type="button" @click="() => buttonRedirect(`/manager/league/matches`, championshipID)">
          Gerenciar Jogos
        </button>
      </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import router from "@/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { generateClassification } from "@/services/ServiceClassification";
import NavBar from '@/components/NavBar.vue'; // Importa a NavBar

const route = useRoute();

const state = ref([]);
const championshipID = route.params.id;

const backUrl = () => {
  router.push({ name: 'manager' });
};

const buttonRedirect = (url, paramsId) => {
  paramsId === '' ?
    router.push({ name: 'manager' }) :
    router.push({ name: url, params: { id: paramsId } })
}

onMounted(async () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (!user) {
      router.push('/login');
    }
  });
  try {
    const responseClassification = await generateClassification(championshipID);
    state.value = responseClassification;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

const buttonsValues = [
  { path: '/home/team/editteam', value: 'Principal' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/league', value: 'Campeonatos' },
  { path: '/login', value: 'Sair' }
]

const getRowColor = (index) => {
  const colors = ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)'];
  return colors[index % colors.length];
}
</script>

<style scoped>
.league {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.nome {
  font-size: 1.3rem;
}

table {
  width: 95%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 27px;
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
}

.first_row {
  background-color: #333333;
}

th,
td {
  padding: 12px 15px;
  text-align: center;
  color: #fff;
}


tr:hover {
  background-color: #444;
}

span {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: #ccc;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="button"] {
  background-color: #28a745;
  color: white;
}

button[type="button"]:hover {
  background-color: #218838;
  transform: scale(1.05);
}

button {
  background-color: #dc3545;
  color: white;
}

button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}
</style>
