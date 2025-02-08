<script setup>
import router from "@/router";

defineProps({
  round: Object,
  championshipID: String
});

const buttonRedirect = (url, championshipID, numberRound, numberMatch) => {
  router.push({ name: url, params: { championshipID, numberRound, numberMatch } })
}
</script>

<template>
  <div class="round" v-if="round">
    <h2>Rodada {{ round.round }}</h2>
    <ul>
      <li v-for="(match, key) in round.games" :key="key"
        @click="buttonRedirect('/manager/matches/result/round', championshipID, round.round, key)">
        <span class="comb"> {{ match.team1.name }} </span><span class="comb" style="width: 10px;"> - </span>  <samp class="comb">{{ match.team2.name }}</samp>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Carregando rodadas...</p>
  </div>
</template>


<style scoped>


.round {
  margin-bottom: 20px;
  padding: 10px;
  text-align: left;
  border: 1px solid #25634a;
  height: 85vh;
  border-radius: 26px;
  background-color: #1c1e21;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.comb {
  width: 250px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
  color: #42b883;
}

ul {
  list-style-type: none;
  padding: 0;

  & li {
    display: flex;
    justify-content: space-evenly;
    font-size: 1.1em;
    color: #ffffff;
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    border-bottom: 5px solid #25634a;
    border-top: 1px solid #25634a;
    border-left: 1px solid #25634a;
    border-right: 5px solid #25634a;
    transition: background-color 0.3s;
    &:hover {
      background-color: #1a1a1a;
    }
  }
}

.match-item {
  font-size: 1.1em;
  color: #ffffff;
  padding: 5px;
  border-bottom: 1px solid #42b883;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
}

.match-item:last-child {
  border-bottom: none;
}

.match-item:hover {
  background-color: #1a1a1a;
}

.team-name {
  font-weight: bold;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}
</style>
