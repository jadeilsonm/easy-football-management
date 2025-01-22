<script setup>
import router from "@/router";


defineProps({
  round: Object,
  championshipID: String
});

// console.log('RoundsComponent', round);
const buttonRedirect = (url, championshipID, numberRound, numberMatch) => {
  // console.log('url', url)
  // console.log('chanpionShipId', chanpionShipId)
  // console.log('numberRound', numberRound)
  // console.log('numberMatch', numberMatch)
  router.push({ name: url, params: { championshipID, numberRound, numberMatch } })
}//manager/league/matches/:chanpionShipId/round/:numberRound/match/:numberMatch
</script>

<template>
  <div class="round" v-if="round">
    <h2>Rodada {{ round.round }}</h2>
    <ul>
      <li v-for="(match, key) in round.games" :key="key"
        @click="buttonRedirect('/manager/league/matches/round', championshipID, round.round, key)">
        {{ match.team1.name }} vs {{ match.team2.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Carregando rodadas...</p>
  </div>
</template>


<style scoped>
/* .round {
  margin-bottom: 20px;
} */
.round {
  margin-bottom: 20px;
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
  /* Adiciona uma borda leve para delimitar o componente */
  border-radius: 8px;
  /* Bordas arredondadas */
}

h2 {
  font-size: 1.5em;
  /* color: #333; */
  margin-bottom: 10px;
  text-align: center;
  /* Centraliza o título */
}

ul {
  list-style-type: none;
  padding: 0;
}

.match-item {
  font-size: 1.1em;
  color: #444;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  /* Borda entre os jogos */
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  /* Centraliza os itens na linha */
}

.match-item:last-child {
  border-bottom: none;
  /* Remove a borda da última linha */
}

.match-item:hover {
  background-color: #f1f1f1;
  /* Destaca os itens ao passar o mouse */
}

.team-name {
  font-weight: bold;
  text-align: center;
  /* Centraliza o nome dos times */
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}
</style>
