<script setup>

defineProps({
  match: {
    stage: {
      type: String,
      required: true
    },
    team1: {
      teamId: {
        type: String,
        required: true
      },
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
      teamId: {
        type: String,
        required: true
      },
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
  <div>
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
  </div>
</template>


<style scoped>
</style>
