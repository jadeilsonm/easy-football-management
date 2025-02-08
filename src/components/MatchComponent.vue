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
    <div class="team" :class="{ winner: match.team1.winner }">
      <span class="name">{{ match.team1.name }}</span>
      <span class="score">{{ match.team1.score || 0}}</span>
    </div>
    <div class="team1" :class="{ winner: match.team2.winner }">
      <span class="name">{{ match.team2.name }}</span>
      <span class="score">{{ match.team2.score || 0}}</span>
    </div>
  </div>
</template>

<style scoped>
.match {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
}

.team {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(70, 69, 69, 0.2);
  gap: 0.5rem;
}

.team1 {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(70, 69, 69, 0.5);
  gap: 0.5rem;
}

.winner {
  background-color: rgba(158, 62, 62, 0.1);
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
