<script setup>
import { onMounted, reactive } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from 'vue-router'
import router from "@/router";
import { DAOChanpionShip, DAOPlayers } from "@/services";
const auth = getAuth();
const route = useRoute();
const state = reactive({
  data: null,
  team1: {},
  team2: {}
})

const backUrl = () => {
  router.push({ name: 'manager' });
};

const resquestDefault = async () => {
  const responseChanpionShip = await DAOChanpionShip.getById(route.params.championshipID);
  const x = responseChanpionShip.matches
    .filter(round => round.round == route.params.numberRound);
  console.log("matchResult", x[0].games[route.params.numberMatch].team1);
  state.data = responseChanpionShip;
  state.team1 = x[0].games[route.params.numberMatch].team1
  state.team2 = x[0].games[route.params.numberMatch].team2
  console.log("matchResult", state.team1.teamId);
  
  const playersTeam1 = await DAOPlayers.getByField('teamId', state.team1.teamId);
  const playersTeam2 = await DAOPlayers.getByField('teamId', state.team2.teamId);
  console.log("matchResult", playersTeam1);
  
} 

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("ok")
    } else {
      router.push('/login');
    }
  });
  try {
    resquestDefault()
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
