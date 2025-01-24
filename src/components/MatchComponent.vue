<script setup>
defineProps({
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
</script>

<template>
  <div class="match">
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
