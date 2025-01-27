<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import router from "@/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { generateClassification } from "@/services/ServiceClassification";
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

</script>

<template>
  <div class="league">
    <table>
      <tbody>
        <tr :key="1">
          <th>N</th>
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>%</th>
        </tr>
        <tr v-for="(teams, index) in state" :key="index">
          <th>{{ teams.name }}</th>
           <th>{{ teams.pontos }}</th>
          <th>{{ teams.totalGames }}</th>
          <th>{{ teams.totalVictories }}</th>
          <th>{{ teams.totalDraws }}</th>
          <th>{{ teams.totalLosses }}</th>
          <th>{{ teams.goalsFavor }}</th>
          <th>{{ teams.goalsOwn }}</th>
          <th>{{ teams.goalsFavor - teams.goalsOwn }}</th>
          <th>{{ teams.efficiency }}</th>
        </tr>
      </tbody>
    </table>
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %:
      Aproveitamento</span>
    <button type="button" @click="() => buttonRedirect(`/manager/league/matches`, championshipID)">
      Gerenciar Jogos
    </button>
    <button @click="backUrl">Voltar</button>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 8px 12px;
  text-align: center;
  /* border: 1px solid #ddd; */
}

/* th {
  font-weight: bold;
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
} */

span {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: #666;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  border: none;
  border-radius: 5px;
}

button[type="button"] {
  background-color: #28a745;
  color: white;
}

button[type="button"]:hover {
  background-color: #218838;
}

button {
  background-color: #dc3545;
  color: white;
}

button:hover {
  background-color: #c82333;
}
</style>
