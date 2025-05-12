<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
// import { DAOChanpionShip, DAOPlayers } from "@/services";
import NavBar from "@/components/NavBar.vue";
const route = useRoute();

const chanpionShip = ref(null);
const teamOne = ref({ players: [] });
const teamTwo = ref({ players: [] });
const scoreHome = ref(0);
const scoreAway = ref(0);

const type = computed(() => chanpionShip.value.type);

const { championshipID, numberRound, numberMatch } = route.params;

const backUrl = () => {
  const t = type.value;
  router.push({ name: `manager/${t}`, params: { id: championshipID } });
};

const saveMacthResult = async () => {
  let state = chanpionShip.value;
  state.matches.forEach((match) => {
    if (match.round == numberRound) {
      match.games[numberMatch].team1 = teamOne.value;
      match.games[numberMatch].team1.score = scoreHome.value;
      match.games[numberMatch].team1.stage = "FINISHED";
      match.games[numberMatch].team2 = teamTwo.value;
      match.games[numberMatch].team2.score = scoreAway.value;
      match.games[numberMatch].team2.stage = "FINISHED";
    }
  });
  await DAOChanpionShip.update(championshipID, state);
};

const isExistePlayesInTeam = (matchs) => {
  if (
    matchs.filter((round) => round.round == numberRound)[0].games[numberMatch]
      .team1.players
  ) {
    return (
      matchs.filter((round) => round.round == numberRound)[0].games[numberMatch]
        .team1.players.length > 0 &&
      matchs.filter((round) => round.round == numberRound)[0].games[numberMatch]
        .team2.players.length > 0
    );
  }
  return false;
};

const returnTeam = (responseChanpionShip, team) => {
  const teamResponse = responseChanpionShip.matches.filter(
    (round) => round.round == numberRound
  )[0].games[numberMatch][team];
  teamResponse.players.sort((a, b) => Number(a.number) - Number(b.number));
  return teamResponse;
};

const addCardYellow = (team, index) => {
  let teamChange = team == "teamOne" ? teamOne.value : teamTwo.value;
  teamChange.players[index].yellowCard =
    teamChange.players[index].yellowCard + 1;
  if (teamChange.players[index].yellowCard >= 2) {
    teamChange.players[index].redCard = 1;
  }
  team == "teamOne"
    ? (teamOne.value = teamChange)
    : (teamTwo.value = teamChange);
};

const addGols = (team, index, operation) => {
  if (
    operation == "-" &&
    team == "teamOne" &&
    teamOne.value.players[index].gols == 0
  ) {
    return;
  } else if (
    operation == "-" &&
    team == "teamTwo" &&
    teamTwo.value.players[index].gols == 0
  ) {
    return;
  }
  let teamChange = team == "teamOne" ? teamOne.value : teamTwo.value;
  teamChange.players[index].gols =
    operation == "+"
      ? (teamChange.players[index].gols += 1)
      : (teamChange.players[index].gols -= 1);
  team == "teamOne"
    ? (scoreHome.value =
        operation == "+" ? (scoreHome.value += 1) : (scoreHome.value -= 1))
    : (scoreAway.value =
        operation == "+" ? (scoreAway.value += 1) : (scoreAway.value -= 1));
  team == "teamOne"
    ? (teamOne.value = teamChange)
    : (teamTwo.value = teamChange);
};

const resquestDefault = async () => {
  const responseChanpionShip = await DAOChanpionShip.getById(championshipID);
  chanpionShip.value = responseChanpionShip;
  const isPlayesExist = isExistePlayesInTeam(responseChanpionShip.matches);
  const roundMatch = responseChanpionShip.matches.filter(
    (round) => round.round == numberRound
  );
  if (!isPlayesExist) {
    let teamOneWithPlayes = roundMatch[0].games[numberMatch].team1;
    teamOneWithPlayes.players = [];
    const playersteamOne = await DAOPlayers.getByField(
      "teamId",
      teamOneWithPlayes.teamId
    );
    playersteamOne.forEach((player) => {
      teamOneWithPlayes.players = [
        ...teamOneWithPlayes.players,
        { ...player, gols: 0, redCard: 0, yellowCard: 0 },
      ];
    });
    teamOneWithPlayes.players.sort(
      (a, b) => Number(a.number) - Number(b.number)
    );
    teamOne.value = teamOneWithPlayes;
    let teamTwoWithPlayes = roundMatch[0].games[numberMatch].team2;
    teamTwoWithPlayes.players = [];
    const playersteamTwo = await DAOPlayers.getByField(
      "teamId",
      teamTwoWithPlayes.teamId
    );
    playersteamTwo.forEach((player) => {
      teamTwoWithPlayes.players = [
        ...teamTwoWithPlayes.players,
        { ...player, gols: 0, redCard: 0, yellowCard: 0 },
      ];
    });
    teamOneWithPlayes.players.sort(
      (a, b) => Number(a.number) - Number(b.number)
    );
    teamTwo.value = teamTwoWithPlayes;
  } else {
    teamOne.value = returnTeam(responseChanpionShip, "team1");
    scoreHome.value = teamOne.value.score;
    teamTwo.value = returnTeam(responseChanpionShip, "team2");
    scoreAway.value = teamTwo.value.score;
  }
};

const buttonsValues = [
  { path: '/manager', value: 'Gerenciar Torneios' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/perfil', value: 'Perfil' },
  { path: '/login', value: 'Sair' }
];


onMounted(async () => {
  await resquestDefault();
});

</script>

<template>
  <div class="container-result">
    <NavBar :buttonsValues="buttonsValues"/>
    <div class="league">
      <div>
        <h1>Edite o Resultado</h1>
      </div>
      <h2>
        {{ teamOne.name }} {{ scoreHome }} x {{ scoreAway }} {{ teamTwo.name }}
      </h2>
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
              <button
                type="button"
                :disabled="player.gols <= 0"
                @click="addGols('teamOne', index, '-')"
              >
              -
            </button>
            <span>{{ player.gols }}</span>
            <button type="button" @click="addGols('teamOne', index, '+')">
              +
            </button>
            </td>
            <td>
              <button
                type="button"
                :disabled="player.redCard <= 0 || player.yellowCard == 2"
                @click="
                  () => {
                    teamOne.players[index].redCard = player.redCard - 1;
                  }
                  "
              >
                -
              </button>
              <span>{{ player.redCard }}</span>
              <button
              type="button"
              :disabled="player.redCard >= 1"
              @click="
                  () => {
                    teamOne.players[index].redCard = player.redCard + 1;
                  }
                  "
              >
              +
              </button>
            </td>
            <td>
              <button
                type="button"
                :disabled="player.yellowCard <= 0"
                @click="
                  () => {
                    teamOne.players[index].yellowCard = player.yellowCard - 1;
                  }
                "
              >
              -
              </button>
              <span>{{ player.yellowCard }}</span>
              <button
                type="button"
                :disabled="player.yellowCard >= 2"
                @click="addCardYellow('teamOne', index)"
              >
                +
              </button>
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
          <tr
            v-for="(player, index) in teamTwo.players.sort(
              a,
              (b) => a.number - b.number
            )"
            :key="index"
          >
            <td>
              <span>{{ player.number }}</span>
            </td>
            <td>
              <span>{{ player.name }}</span>
            </td>
            <td>
              <button
              type="button"
                :disabled="player.gols <= 0"
                @click="addGols('teamTwo', index, '-')"
                >
                -
              </button>
              <span>{{ player.gols }}</span>
              <button type="button" @click="addGols('teamTwo', index, '+')">
                +
              </button>
            </td>
            <td>
              <button
              type="button"
              :disabled="player.redCard <= 0 || player.yellowCard == 2"
              @click="
                  () => {
                    teamTwo.players[index].redCard = player.redCard - 1;
                  }
                  "
              >
                -
              </button>
              <span>{{ player.redCard }}</span>
              <button
              type="button"
              :disabled="player.redCard >= 1"
              @click="
                  () => {
                    teamTwo.players[index].redCard = player.redCard + 1;
                  }
                  "
              >
              +
              </button>
            </td>
            <td>
              <button
                type="button"
                :disabled="player.yellowCard <= 0"
                @click="
                  () => {
                    teamTwo.players[index].yellowCard = player.yellowCard - 1;
                  }
                  "
              >
                -
              </button>
              <span>{{ player.yellowCard }}</span>
              <button
              type="button"
              :disabled="player.yellowCard >= 2"
              @click="addCardYellow('teamTwo', index)"
              >
              +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="divButtons">
    <button type="button" class="saveBackUrl" @click="backUrl()">voltar</button>
    <button type="button" class="saveButton" @click="saveMacthResult()">Salvar</button>
  </div>
</div>
</template>

<style scoped>


.container-result {
  display: flex;
  background: #121212;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.league {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 85vh;
  background: #1a1919;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  width: 100%;
  & th {
    border-bottom: 1px solid #105203;
  }
}

th, td {
  padding: 10px;
  margin: 0 10px;
  text-align: center;
}

tbody {

  height: 400px;
  overflow-y: auto;
  display: block;
}

table thead, table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

tbody tr {
  width: 100%;
  display: flex;
}
.divButtons {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8%;
  width: 30%;
}

.saveButton {
  width: 30%;
  height: 50px;
  background-color: #105203;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.saveButton:hover {
  background-color: #8dc63f;
}

.saveButton:active {
  transform: scale(0.98);
}

.saveButton:focus {
  outline: none;
}

.saveBackUrl {
  width: 30%;
  height: 50px;
  background-color: #1635c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.saveBackUrl:hover {
  background-color: #5b69e2;
}

.saveBackUrl:active {
  transform: scale(0.98);
}

.saveBackUrl:focus {
  outline: none;
}


tbody::-webkit-scrollbar {
  width: 10px;
}

tbody::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

tbody::-webkit-scrollbar-thumb {
  background-color: #105203;
  border-radius: 10px;
}

tbody::-webkit-scrollbar-thumb:hover {
  background-color: #8dc63f;
}

</style>
