<script setup>
import { onMounted, reactive } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from 'vue-router'
import router from "@/router";
import { DAOChanpionShip, DAOPlayers } from "@/services";
const auth = getAuth();
const route = useRoute();
const state = reactive({
  ChanpionShip: null,
  team1: {},
  team2: {}
})

const { championshipID, numberRound, numberMatch } = route.params;

const backUrl = () => {
  router.push({ name: 'manager' });
};

const saveMacthResult = async () => {
  state.ChanpionShip.matches[numberRound].games[numberMatch].team1 = state.team1
  state.ChanpionShip.matches[numberRound].games[numberMatch].team2 = state.team2

  await DAOChanpionShip.update(championshipID, state.ChanpionShip)
};

const resquestDefault = async () => {

  const responseChanpionShip = await DAOChanpionShip.getById(championshipID);
  const x = responseChanpionShip.matches
    .filter(round => round.round == numberRound);
  state.ChanpionShip = responseChanpionShip;
  state.team1 = x[0].games[numberMatch].team1
  state.team1.players = []
  state.team2 = x[0].games[numberMatch].team2
  state.team2.players = []
  if (!responseChanpionShip.matches[numberRound].games[numberMatch].team1.players) {
    console.log('123')
    const playersTeam1 = await DAOPlayers.getByField('teamId', state.team1.teamId);
    playersTeam1.forEach(player => {
      state.team1.players = [...state.team1.players, { ...player, gols: 0, redCard: 0, yellowCard: 0 }]
    });
    const playersTeam2 = await DAOPlayers.getByField('teamId', state.team2.teamId);

    playersTeam2.forEach(player => {
      state.team2.players = [...state.team2.players, { ...player, gols: 0, redCard: 0, yellowCard: 0 }]
    });
  } else {
    state.team1 = responseChanpionShip.matches[numberRound].games[numberMatch].team1
    state.team2 = responseChanpionShip.matches[numberRound].games[numberMatch].team2
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
        <tr v-for="(player, index) in state.team1.players" :key="index">
          <td>
            <span>{{ player.name }}</span>
          </td>
          <td>
            <button type="button" :disabled="player.gols <= 0"
            @click="() => { state.team1.players[index].gols = player.gols - 1 }">-</button>
            <span>{{ player.gols }}</span>
            <button type="button" @click="() => { state.team1.players[index].gols = player.gols + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.redCard <= 0 || player.yellowCard == 2"
            @click="() => { state.team1.players[index].redCard = player.redCard - 1 }">-</button>
            <span>{{ player.redCard }}</span>
            <button type="button" :disabled="player.redCard >= 1"
            @click="() => { state.team1.players[index].redCard = player.redCard + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.yellowCard <= 0"
            @click="() => { state.team1.players[index].yellowCard = player.yellowCard - 1 }">-</button>
            <span>{{ player.yellowCard }}</span>
            <button type="button" :disabled="player.yellowCard >= 2"
              @click="() => { 
                state.team1.players[index].yellowCard = player.yellowCard + 1;
                if (player.yellowCard >= 2) {
                  state.team1.players[index].redCard = 1;
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
        <tr v-for="(player, index) in state.team2.players" :key="index">
          <td>
            <span>{{ player.name }}</span>
          </td>
          <td>
            <button type="button" :disabled="player.gols <= 0"
            @click="() => { state.team2.players[index].gols = player.gols - 1 }">-</button>
            <span>{{ player.gols }}</span>
            <button type="button" @click="() => { 
              state.team2.players[index].gols = player.gols + 1 
            }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.redCard <= 0 || player.yellowCard == 2"
            @click="() => { state.team2.players[index].redCard = player.redCard - 1 }">-</button>
            <span>{{ player.redCard }}</span>
            <button type="button" :disabled="player.redCard >= 1"
            @click="() => { state.team2.players[index].redCard = player.redCard + 1 }">+</button>
          </td>
          <td>
            <button type="button" :disabled="player.yellowCard <= 0"
            @click="() => { state.team2.players[index].yellowCard = player.yellowCard - 1 }">-</button>
            <span>{{ player.yellowCard }}</span>
            <button type="button" :disabled="player.yellowCard >= 2"
              @click="() => { state.team2.players[index].yellowCard = player.yellowCard + 1;
              if (player.yellowCard >= 2) {
                  state.team1.players[index].redCard = 1;
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
