<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from 'vue-router'
import router from "@/router";
import { DAOChanpionShip, DAOPlayers } from "@/services";
const auth = getAuth();
const route = useRoute();

const chanpionShip = ref(null);
const teamOne = ref({ players: [] });
const teamTwo = ref({ players: [] });
const scoreHome = ref(0);
const scoreAway = ref(0);


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
        match.games[numberMatch].teamOne.score = scoreHome.value;
        match.games[numberMatch].teamOne.stage = 'FINISHED';
        match.games[numberMatch].teamTwo = teamTwo.value;
        match.games[numberMatch].teamTwo.score = scoreAway.value;
        match.games[numberMatch].teamTwo.stage = 'FINISHED';
      }
    });
  } else {
    state.matches[numberRound].games[numberMatch].teamOne = teamOne.value
    state.matches[numberRound].games[numberMatch].teamOne.score = scoreHome.value;
    state.matches[numberRound].games[numberMatch].teamTwo = teamTwo.value
    state.matches[numberRound].games[numberMatch].teamTwo.score = scoreHome.value;
  }
  await DAOChanpionShip.update(championshipID, state)
};

const isExistePlayesInTeam = (matchs) => {
  if (matchs.filter(round => round.round == numberRound)[0].games[numberMatch].team1.players) {
    return matchs
      .filter(round => round.round == numberRound)[0].games[numberMatch].team1.players.length > 0 && matchs
        .filter(round => round.round == numberRound)[0].games[numberMatch].team2.players.length > 0
  } return false;
}

const returnTeam = (responseChanpionShip, team) => {
  const teamResponse = responseChanpionShip.matches.filter(round => round.round == numberRound)[0].games[numberMatch][team];
  teamResponse.players.sort((a, b) => Number(a.number) - Number(b.number));
  return teamResponse;
}

const addCardYellow = (team, index) => {
  let teamChange = team == 'teamOne' ? teamOne.value : teamTwo.value;
  teamChange.players[index].yellowCard = teamChange.players[index].yellowCard + 1;
  if (teamChange.players[index].yellowCard >= 2) {
    teamChange.players[index].redCard = 1;
  }
  team == 'teamOne' ? teamOne.value = teamChange : teamTwo.value = teamChange;
}

const addGols = (team, index, operation) => {
  if (operation == '-' && team == 'teamOne' && teamOne.value.players[index].gols == 0) {
    return;
  } else if (operation == '-' && team == 'teamTwo' && teamTwo.value.players[index].gols == 0) {
    return;
  }
  let teamChange = team == 'teamOne' ? teamOne.value : teamTwo.value;
  teamChange.players[index].gols = operation == '+' ? teamChange.players[index].gols += 1 : teamChange.players[index].gols -= 1;
  team == 'teamOne' ? (scoreHome.value = operation == '+' ? scoreHome.value += 1 : scoreHome.value -= 1) : (scoreAway.value = operation == '+' ? scoreAway.value += 1 : scoreAway.value -= 1);
  team == 'teamOne' ? teamOne.value = teamChange : teamTwo.value = teamChange;
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
    teamOneWithPlayes.players.sort((a, b) => Number(a.number) - Number(b.number));
    teamOne.value = teamOneWithPlayes;
    let teamTwoWithPlayes = roundMatch[0].games[numberMatch].team2;
    teamTwoWithPlayes.players = [];
    const playersteamTwo = await DAOPlayers.getByField('teamId', teamTwoWithPlayes.teamId);
    playersteamTwo.forEach(player => {
      teamTwoWithPlayes.players = [...teamTwoWithPlayes.players, { ...player, gols: 0, redCard: 0, yellowCard: 0 }]
    });
    teamOneWithPlayes.players.sort((a, b) => Number(a.number) - Number(b.number));
    teamTwo.value = teamTwoWithPlayes;
  } else {
    teamOne.value = returnTeam(responseChanpionShip, 'team1')
    scoreHome.value = teamOne.value.score
    teamTwo.value = returnTeam(responseChanpionShip, 'team2')
    scoreAway.value = teamTwo.value.score
  }
}

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
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
    <h2>{{ teamOne.name }} {{ scoreHome }} x {{ scoreAway }} {{ teamTwo.name }}</h2>
    <div class="match">
      <table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nome</th>
            <th>gols</th>
            <th>cartões vermelhos</th>
            <th>cartões amarelos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in teamOne.players" :key="index">
            <td>
              <span>{{ player.number }}</span>
            </td>
            <td>
              <span>{{ player.name }}</span>
            </td>
            <td>
              <button type="button" :disabled="player.gols <= 0" @click="addGols('teamOne', index, '-')">-</button>
              <span>{{ player.gols }}</span>
              <button type="button" @click="addGols('teamOne', index, '+')">+</button>
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
              <button type="button" :disabled="player.yellowCard >= 2"
                @click="addCardYellow('teamOne', index)">+</button>
            </td>
          </tr>

        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nome</th>
            <th>gols</th>
            <th>cartões amarelos</th>
            <th>cartões vermelhos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in teamTwo.players.sort(a, b => a.number - b.number)" :key="index">
            <td>
              <span>{{ player.number }}</span>
            </td>
            <td>
              <span>{{ player.name }}</span>
            </td>
            <td>
              <button type="button" :disabled="player.gols <= 0" @click="addGols('teamTwo', index, '-')">-</button>
              <span>{{ player.gols }}</span>
              <button type="button" @click="addGols('teamTwo', index, '+')">+</button>
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
              <button type="button" :disabled="player.yellowCard >= 2"
                @click="addCardYellow('teamTwo', index)">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <button type="button" @click="saveMacthResult()">Salvar</button>
</template>

<style scoped>

.league {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.match {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;

  & h2 {
    margin: 0 10px;
    display: inline-block;
  }
}

table {
    margin: 0 25px;
    & th {
      border-bottom: 1px solid #105203;
      padding: 10px;
      margin: 0 10px;
    }
    & td {
      padding: 3px;
      margin: 0 10px;
    }
  }



</style>
