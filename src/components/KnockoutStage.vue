<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RoundComponent from './RoundComponent.vue';
import MatchComponent from './MatchComponent.vue';
import { DAOService } from '@/services/DAOService';

defineProps({
  teamsAll: {
    type: Array,
    required: true
  }
})

const sortMatches = (teamsAll) => {
  const sortedMatches = {
    oitavas: [],
    quarterFinals: [],
    semiFinals: [],
    final: []
  }

  const lengthAllMatches = teamsAll.length / 2

  if (lengthAllMatches === 0) return sortedMatches

  if (lengthAllMatches === 8) {
    for (let i = 0; i < lengthAllMatches; i++) {
      const home = teamsAll.shift()
      teamsAll = teamsAll.sort(() => Math.random() - 0.5)
      const away = teamsAll.shift()
      sortedMatches.oitavas.push({
        stage: 'CURRENT',
        team1: { name: home.name, score: '' },
        team2: { name: away.name, score: '' }
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

onMounted(() => {
  const daoChampionsShip = new DAOService('champions_ship');
  const teamsAll = [];
  matches.value = sortMatches(teamsAll)
});

</script>

<template>
  <div class="knockout-stage">
    <h1>Eliminatórias</h1>
    <div class="brackets">
      <RoundComponent v-if="matches.oitavas" title="Oitavas de final">
        <MatchComponent v-for="(match, index) in matches.oitavas"
               :key="index"
               :match="match" />
      </RoundComponent>
      <RoundComponent title="Quartas de final">
        <MatchComponent v-for="(match, index) in matches.quarterFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Semifinais">
        <MatchComponent v-for="(match, index) in matches.semiFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Final">
        <MatchComponent v-for="(match, index) in matches.final"
               :key="index"
               :match="match" />
      </RoundComponent>
    </div>
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
