<script setup>
import { onMounted, ref } from 'vue'
import RoundComponent from './RoundComponent.vue';
import MatchComponent from './MatchComponent.vue';
import { DAOService } from '@/services/DAOService';
import { useRoute } from 'vue-router';
import { CHAMPIONS_SHIP_COLLECTION, CLASSIFICATION_COLLECTION, TEAM_COLLECTION } from '@/Utils/constantes';
import LoadComponent from './LoadComponent.vue';

const route = useRoute();

const daoClassifications = new DAOService(CLASSIFICATION_COLLECTION);
const daoChampionsShip = new DAOService(CHAMPIONS_SHIP_COLLECTION);
const idChampionsShip = ref(route.params.id);

defineProps({
  teamsAll: {
    type: Array,
    required: true
  }
})

const currentFase = ref(0);

const isCurrentCup = ref(false);

const isLoading = ref(true);

const nameCup = ref('');

const mapToMatch = (num) => {
  const res = []
   for (let i = 0; i < num; i++) {
    res.push({
      stage: 'PENDENT',
      team1: { name: '', score: '0' },
      team2: { name: '', score: '0' }
    })
  }
  return res;
}

const sortMatches = (teamsAll) => {
  const sortedMatches = {
    oitavas: mapToMatch(8),
    quarterFinals: mapToMatch(4),
    semiFinals: mapToMatch(2),
    final: mapToMatch(1)
  }

  const lengthAllMatches = teamsAll.length / 2

  if (lengthAllMatches === 0) return sortedMatches

  if (lengthAllMatches === 8) {
    currentFase.value = 16;
    const res = []
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.shift()
      teamsAll = teamsAll.sort(() => Math.random() - 0.5)
      const away = teamsAll.shift()
      res.push({
        stage: 'CURRENT',
        team1: { teamId: home.id,name: home.name, score: '0' },
        team2: { teamId: away.id, name: away.name, score: '0' }
      })
    }
    sortedMatches.oitavas = res;
  }
  else if (lengthAllMatches === 4) {
    currentFase.value = 8;
    const res = []
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.shift()
      teamsAll = teamsAll.sort(() => Math.random() - 0.5)
      const away = teamsAll.shift()
      res.push({
        stage: 'CURRENT',
        team1: { teamId: home.id,name: home.name, score: '0' },
        team2: { teamId: away.id, name: away.name, score: '0' }
      })
    }
    sortedMatches.quarterFinals = res;

    console.log("sortedMatches: ",sortedMatches)
  }

  else if (lengthAllMatches === 2) {
    currentFase.value = 4;
    const x = [...teamsAll]
    console.log("x: ",x)
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.pop()
      teamsAll = teamsAll.sort(() => Math.random() - 0.5)
      const away = teamsAll.pop() || teamsAll[0]
      sortedMatches.semiFinals.push({
        stage: 'CURRENT',
        team1: { teamId: home.id, name: home.name, score: '0' },
        team2: { teamId: away.id, name: away.name, score: '0' }
      })
    }
  }

  return sortedMatches
}

const matches = ref({
  oitavas: [],
  quarterFinals: [],
  semiFinals: [],
  final: []
})

onMounted(async () => {
  const { teamIds = [], qntTime, name } = await daoChampionsShip.getById(idChampionsShip.value);
  const qntTeams = teamIds.length || 0;
  console.log("qntTeams: ",qntTeams)
  nameCup.value = name;
  if (qntTime == qntTeams) {
    try {
      const classification = await daoClassifications.search([{ field: 'championsShipId', operator: '==', value: idChampionsShip.value }]);
      if (classification != undefined && classification.length > 0) {
        matches.value = classification[0].matches;
        currentFase.value = classification[0].currentFase;
        isCurrentCup.value = true;
        isLoading.value = false;
        return;
      }
      const daoTeams = new DAOService(TEAM_COLLECTION);
      const teams = await daoTeams.getByIds(teamIds);

      matches.value = sortMatches(teams)

      await daoClassifications.create({
        championsShipId: idChampionsShip.value,
        currentFase: currentFase.value,
        matches: matches.value
      })

    } catch (error) {
      console.error(error)
    }
  }
  isCurrentCup.value = false;
  isLoading.value = false;
});

</script>

<template>
  <LoadComponent :isLoading="isLoading"/>
  <div v-if="isCurrentCup" class="knockout-stage">
    <h1>Eliminatórias</h1>
    <div class="brackets">
      <RoundComponent title="Oitavas de final" v-if="16 <= currentFase">
        <MatchComponent v-for="(match, index) in matches.oitavas"
               :key="index"
               :match="match" />
      </RoundComponent>
      <RoundComponent title="Quartas de final" v-if="8 <= currentFase">
        <MatchComponent v-for="(match, index) in matches.quarterFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Semifinais" v-if="4 <= currentFase">
        <MatchComponent v-for="(match, index) in matches.semiFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Final" v-if="2 <= currentFase">
        <MatchComponent v-for="(match, index) in matches.final"
               :key="index"
               :match="match" />
      </RoundComponent>
    </div>
  </div>
  <div v-else>
      <h2>{{ `A copa ${nameCup} vai começar em breve!` }}</h2>
      <p>Aguarde ate todos os times serem preenchido e o sorteio do chaveamento ser concluido.</p>
    </div>
</template>

<style scoped>
.knockout-stage {
  background-color: #1a1a1a;
  padding: 2rem;
  color: white;
}

.brackets {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
