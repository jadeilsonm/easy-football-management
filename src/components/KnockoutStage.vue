<script setup lang="ts">
import { ref } from 'vue'
import RoundComponent from './RoundComponent.vue';
import MatchComponent from './MatchComponent.vue';

const matches = ref({
  quarterFinals: [
    {
      date: '09/12/22',
      stage: 'FIM (P)',
      team1: { name: 'Holanda', flag: '🇳🇱', score: '2 (3)' },
      team2: { name: 'Argentina', flag: '🇦🇷', score: '2 (4)', winner: true }
    },
    {
      date: '09/12/22',
      stage: 'FIM (P)',
      team1: { name: 'Croácia', flag: '🇭🇷', score: '1 (4)', winner: true },
      team2: { name: 'Brasil', flag: '🇧🇷', score: '1 (2)' }
    },
    {
      date: '10/12/22',
      stage: 'FIM',
      team1: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '1' },
      team2: { name: 'França', flag: '🇫🇷', score: '2', winner: true }
    },
    {
      date: '10/12/22',
      stage: 'FIM',
      team1: { name: 'Marrocos', flag: '🇲🇦', score: '1', winner: true },
      team2: { name: 'Portugal', flag: '🇵🇹', score: '0' }
    }
  ],
  semiFinals: [
    {
      date: '13/12/22',
      stage: 'FIM',
      team1: { name: 'Argentina', flag: '🇦🇷', score: '3', winner: true },
      team2: { name: 'Croácia', flag: '🇭🇷', score: '0' }
    },
    {
      date: '14/12/22',
      stage: 'FIM',
      team1: { name: 'França', flag: '🇫🇷', score: '2', winner: true },
      team2: { name: 'Marrocos', flag: '🇲🇦', score: '0' }
    }
  ],
  final: [
    {
      date: '18/12/22',
      stage: 'FIM (P)',
      team1: { name: 'Argentina', flag: '🇦🇷', score: '3 (4)', winner: true },
      team2: { name: 'França', flag: '🇫🇷', score: '3 (2)' }
    }
  ]
})
</script>

<template>
  <div class="knockout-stage">
    <h1>Eliminatórias</h1>
    <div class="brackets">
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
