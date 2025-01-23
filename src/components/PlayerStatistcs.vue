<script setup>
import { ref } from 'vue'

const players = ref([
  { id: 1, name: 'João Silva', number: 10, yellowCards: 0, redCards: 0, goals: 0 },
  { id: 2, name: 'Pedro Santos', number: 9, yellowCards: 0, redCards: 0, goals: 0 },
  { id: 3, name: 'Carlos Oliveira', number: 7, yellowCards: 0, redCards: 0, goals: 0 },
]);

const addYellowCard = (player) => {
  player.yellowCards++
}

const addRedCard = (player) => {
  player.redCards++
}

const addGoal = (player) => {
  player.goals++
}

const removeGoal = (player) => {
  if (player.goals > 0) {
    player.goals--
  }
}
</script>

<template>
  <div class="player-stats">
    <h2>Estatísticas dos Jogadores</h2>
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Nome</th>
          <th>Cartões Amarelos</th>
          <th>Cartões Vermelhos</th>
          <th>Gols</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{ player.number }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.yellowCards }}</td>
          <td>{{ player.redCards }}</td>
          <td>{{ player.goals }}</td>
          <td class="actions">
            <button @click="addYellowCard(player)" class="yellow-card">
              + Amarelo
            </button>
            <button @click="addRedCard(player)" class="red-card">
              + Vermelho
            </button>
            <button @click="addGoal(player)" class="add-goal">
              + Gol
            </button>
            <button @click="removeGoal(player)" class="remove-goal">
              - Gol
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.player-stats {
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  color: #213547;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.yellow-card {
  background-color: #ffd700;
  color: #000;
}

.red-card {
  background-color: #ff0000;
  color: #fff;
}

.add-goal {
  background-color: #4CAF50;
  color: #fff;
}

.remove-goal {
  background-color: #f44336;
  color: #fff;
}

button:hover {
  opacity: 0.8;
}
</style>
