<script setup>
import router from '@/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';

const auth = getAuth();

const props = defineProps({
  championshipID: {
    type: String,
    required: true
  },
  round: {
    type: String,
    required: true
  },
  matchValue: {
    type: String,
    required: true
  },
  match: {
    stage: {
      type: String,
      required: true
    },
    team1: {
      name: {
        type: String,
        required: true
      },
      score: {
        type: String,
        required: true
      },
      winner: {
        type: Boolean,
        required: false
      },
    },
    team2: {
      name: {
        type: String,
        required: true
      },
      score: {
        type: String,
        required: true
      },
      winner: {
        type: Boolean,
        required: false
      },
    }
  }
})
const { championshipID, match, matchValue, round } = props;


const buttonRedirect = (url, championshipID, numberRound, numberMatch) => {
  router.push({ name: url, params: { championshipID, numberRound, numberMatch } })
};

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push('/login');
    }
  });
}
);
</script>

<template>
  <div class="match" @click="() => buttonRedirect('/manager/matches/result/round', championshipID, round, matchValue)">
    <div class="match-header">
      <span class="stage">{{ match.stage }}</span>
    </div>
    <div class="team" :class="{ winner: match.team1.winner }">
      <span class="name">{{ match.team1.name }}</span>
      <span class="score">{{ match.team1.score }}</span>
    </div>
    <div class="team" :class="{ winner: match.team2.winner }">
      <span class="name">{{ match.team2.name }}</span>
      <span class="score">{{ match.team2.score }}</span>
    </div>
  </div>
</template>

<style scoped>
.match {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 250px;
}

.match-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #888;
}

.team {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
}

.winner {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.flag {
  font-size: 1.2rem;
}

.name {
  flex-grow: 1;
}

.score {
  font-weight: bold;
}
</style>
