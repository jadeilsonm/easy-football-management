<script setup>
import { onMounted, reactive, toRefs } from "vue";
import { DAOChanpionShip } from "@/services";
import { useRoute } from 'vue-router'
import router from "@/router";
import { genereateRoundMatches } from "@/services/ServiceRoundMatches";
const route = useRoute();

const state = reactive({
  data: {}
});

const { data } = toRefs(state);

const backUrl = () => {
  router.push({ name: 'manager' });
};

const buttonRedirect = (url, paramsId) => {
  paramsId === '' ?
    router.push({ name: 'manager' }) :
    router.push({ name: url, params: { id: paramsId } })
}

onMounted(async () => {
  try {
    const response = await DAOChanpionShip.getById(route.params.id);
    console.log('champ', response);
    state.data = response;
    if (response.teams.length === response.qntTime && !response.matches) {
      const matches = genereateRoundMatches(response.teams);
      await DAOChanpionShip.update(response.id, { matches });
    }
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
        <tr v-for="(teams, index) in data.teams" :key="index">
          <!-- <th>{{ teams.teamId }}</th> -->
          <!-- <th>{{ teams.P }}</th>
          <th>{{ teams.J }}</th>
          <th>{{ teams.V }}</th>
          <th>{{ teams.E }}</th>
          <th>{{ teams.D }}</th>
          <th>{{ teams.GP }}</th>
          <th>{{ teams.GC }}</th>
          <th>{{ teams.GP - teams.GC }}</th>
          <th>{{ teams.A }}</th> -->
        </tr>
      </tbody>
    </table>
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %:
      Aproveitamento</span>
    <button type="button" @click="() => buttonRedirect(`/manager/league/matches`, data.id)">
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
