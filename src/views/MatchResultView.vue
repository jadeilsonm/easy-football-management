<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from 'vue-router'
import router from "@/router";
import { DAOChanpionShip, DAOPlayers } from "@/services";
const auth = getAuth();
const route = useRoute();

const chanpionShip = ref(null);
const teamOne = ref({players: []});
const teamTwo = ref({players: []});


const { championshipID, numberRound, numberMatch } = route.params;

const backUrl = () => {
  router.push({ name: 'manager' });
};

const saveMacthResult = async () => {
  let state = chanpionShip.value;
  if (state.type == 'cup') {
    state.matches.forEach(match => {
      if (match.round == numberRound) {
        match.games[numberMatch].teamOne = teamOne.value;
        match.games[numberMatch].teamTwo = teamTwo.value;
      }
    });
  } else {
    state.matches[numberRound].games[numberMatch].teamOne = teamOne.value
    state.matches[numberRound].games[numberMatch].teamTwo = teamTwo.value
  }
  await DAOChanpionShip.update(championshipID, state)
};

const isExistePlayesInTeam = (matchs) => {
  if (matchs.filter(round => round.round == numberRound)[0].games[numberMatch].team1.players){
    return matchs
    .filter(round => round.round == numberRound)[0].games[numberMatch].team1.players.length > 0 && matchs
    .filter(round => round.round == numberRound)[0].games[numberMatch].team2.players.length > 0
  } return false;
}

const returnTeam = (responseChanpionShip, team) => {
  return responseChanpionShip.matches.filter(round => round.round == numberRound)[0].games[numberMatch][team]
}

const resquestDefault = async () => {
  const responseChanpionShip = await DAOChanpionShip.getById(championshipID);
  chanpionShip.value = responseChanpionShip;
  const isPlayesExist = isExistePlayesInTeam(responseChanpionShip.matches)
  const roundMatch = responseChanpionShip.matches
    .filter(round => round.round == numberRound);
  if (!isPlayesExist) {
    let teamOneWithPlayes = roundMatch[0].games[numberMatch].team1;
    teamOneWithPlayes.players = [];
    const playersteamOne = await DAOPlayers.getByField('teamId', teamOneWithPlayes.teamId);
    playersteamOne.forEach(player => {
      teamOneWithPlayes.players = [...teamOneWithPlayes.players, { ...player, gols: 0, redCard: 0, yellowCard: 0 }]
    });
    teamOne.value = teamOneWithPlayes;
    let teamTwoWithPlayes = roundMatch[0].games[numberMatch].team2;
    teamTwoWithPlayes.players = [];
    const playersteamTwo = await DAOPlayers.getByField('teamId', teamTwoWithPlayes.teamId);
    playersteamTwo.forEach(player => {
      teamTwoWithPlayes.players = [...teamTwoWithPlayes.players, { ...player, gols: 0, redCard: 0, yellowCard: 0 }]
    });
    teamTwo.value = teamTwoWithPlayes;
  } else {
    teamOne.value  = returnTeam(responseChanpionShip, 'team1')
    teamTwo.value  = returnTeam(responseChanpionShip, 'team2')
  }
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
    <div>
      <h1>Edite o Resultado</h1>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>gols</th>
          <th>cartões amarelos</th>
          <th>cartões vermelhos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in teamOne.players" :key="index">
          <td>
            <span>{{ player.name }}</span>
          </td>
          <td>
            <button type="button" :disabled="player.gols <= 0"
              @click="() => { teamOne.players[index].gols = player.gols - 1 }">-</button>
            <span>{{ player.gols }}</span>
            <button type="button" @click="() => { teamOne.players[index].gols = player.gols + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.redCard <= 0 || player.yellowCard == 2"
              @click="() => { teamOne.players[index].redCard = player.redCard - 1 }">-</button>
            <span>{{ player.redCard }}</span>
            <button type="button" :disabled="player.redCard >= 1"
              @click="() => { teamOne.players[index].redCard = player.redCard + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.yellowCard <= 0"
              @click="() => { teamOne.players[index].yellowCard = player.yellowCard - 1 }">-</button>
            <span>{{ player.yellowCard }}</span>
            <button type="button" :disabled="player.yellowCard >= 2" @click="() => {
              value.teamOne.players[index].yellowCard = player.yellowCard + 1;
              if (player.yellowCard >= 2) {
                value.teamOne.players[index].redCard = 1;
              }
            }">+</button>
          </td>
        </tr>

      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>gols</th>
          <th>cartões amarelos</th>
          <th>cartões vermelhos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in teamTwo.players" :key="index">
          <td>
            <span>{{ player.name }}</span>
          </td>
          <td>
            <button type="button" :disabled="player.gols <= 0"
              @click="() => { teamTwo.players[index].gols = player.gols - 1 }">-</button>
            <span>{{ player.gols }}</span>
            <button type="button" @click="() => {
              teamTwo.players[index].gols = player.gols + 1
            }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.redCard <= 0 || player.yellowCard == 2"
              @click="() => { teamTwo.players[index].redCard = player.redCard - 1 }">-</button>
            <span>{{ player.redCard }}</span>
            <button type="button" :disabled="player.redCard >= 1"
              @click="() => { teamTwo.players[index].redCard = player.redCard + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.yellowCard <= 0"
              @click="() => { teamTwo.players[index].yellowCard = player.yellowCard - 1 }">-</button>
            <span>{{ player.yellowCard }}</span>
            <button type="button" :disabled="player.yellowCard >= 2" @click="() => {
              teamTwo.players[index].yellowCard = player.yellowCard + 1;
              if (player.yellowCard >= 2) {
                teamTwo.players[index].redCard = 1;
              }
            }">+</button>
          </td>
        </tr>

      </tbody>
    </table>

  </div>
  <button type="button" @click="saveMacthResult()">Salvar</button>
</template>

<style scoped></style>
