<script setup>
import { ref, reactive, onMounted } from "vue";
import { PiniaStore } from '@/stores';
import { RequestGenericsAPI, RequestGenericPostAPI } from "@/services/api/RequestGenericAPI";
import { DeletePlayersTeamAPI, RequestUpdatePlayerAPI } from "@/services/api/PlayerAPI";
const globalStore = PiniaStore();

const editingPlayerIndex = ref(null)
const stateListPlayers = reactive({
  teamId: '',
  currentListInput: { name: '', position: '', number: '' },
  // currentListInputUpdate: { name: '', position: '', number: '' },
  currentListPlayers: []
});

const insertPlayers = async () => {
  try {
    await RequestGenericPostAPI("/api/v1/player", '', "POST", { ...stateListPlayers.currentListInput, teamId: globalStore.getMyTeam.id }); //Url, Params, Method, Body
    stateListPlayers.currentListPlayers.push({ ...stateListPlayers.currentListInput, teamId: stateListPlayers.teamId })
    stateListPlayers.currentListInput = { name: '', position: '', number: '' };
  } catch (error) {
    console.error('Erro ao inserir os dados:', error);
  }
};

const editPlayer = (index) => {
  editingPlayerIndex.value = index;
  stateListPlayers.currentListInput = {...stateListPlayers.currentListPlayers[editingPlayerIndex.value]};
};

const updatePlayer = async () => {
  if (editingPlayerIndex.value === null) return;
  try {
    const { id, name, position, number, team } = stateListPlayers.currentListInput
    console.log(id, { name, position, number, teamId: stateListPlayers.teamId })
    await RequestUpdatePlayerAPI(id, { name, position, number, teamId: team.id });
    stateListPlayers.currentListPlayers[editingPlayerIndex.value] = {id, ...stateListPlayers.currentListInput, team }
    cancelEdit();
  } catch (error) {
    console.error('Erro ao editar os dados:', error);
  }
};

const cancelEdit = () => {
  editingPlayerIndex.value = null;
  stateListPlayers.currentListInputUpdate = { name: '', position: '', number: '' };
  stateListPlayers.currentListInput = { name: '', position: '', number: '' };
};

const DeletePlayer = async (id) => {
  try {
    await DeletePlayersTeamAPI(id);
    stateListPlayers.currentListPlayers = stateListPlayers.currentListPlayers.filter((player) => player.id !== id);
  } catch (error) {
    console.error('Erro ao excluir os dados:', error);
  }
};

onMounted(async () => {
  const result = await RequestGenericsAPI("/api/v1/player/team",globalStore.getMyTeam.id,"GET");
  stateListPlayers.teamId = globalStore.getMyTeam.id;
  stateListPlayers.currentListPlayers = result;
});

</script>

<template>
  <div class="edit-team">
      <div class="form-container">
        <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
        <input v-model="stateListPlayers.currentListInput.position" placeholder="Posição" />
        <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" min="1" />
        <button v-if="editingPlayerIndex === null" @click="insertPlayers">Inserir</button>
        <button v-else @click="updatePlayer">Atualizar Jogador</button>
        <button v-if="editingPlayerIndex !== null" @click="cancelEdit">Cancelar</button>
      </div>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Posição</th>
          <th>Número</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(players, index) in stateListPlayers.currentListPlayers" :key="index">
          <td>{{ players.name }}</td>
          <td>{{ players.position }}</td>
          <td>{{ players.number }}</td>
          <td>
            <button @click="editPlayer(index)">Editar</button>
            <button @click="DeletePlayer(players.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.edit-team {
  display: flex;
  flex-direction: column;
  height: 70vh;
  padding: 20px;
  margin: 16px;
  background-color: #1f1f1f;
  align-items: center;
  justify-content: end;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.form-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 700px;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: #1f1f1f;
  padding: 6px;
  z-index: 1;
}

input {
  background-color: #2c2c2c;
  color: white;
  border: 1px;
  padding: 10px;
  font-size: 1em;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

input::placeholder {
  color: #42b883;
  opacity: 0.7;
}

button {
  background-color: #42b883;
  color: white;
  padding: 8px;
  font-size: 0.9em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: auto;
  align-self: center;
}

button:hover {
  background-color: #36a372;
  transform: scale(1.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 320px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #2c2c2c;
  color: white;
}

td {
  background-color: #1f1f1f;
  color: white;
}

@media  (max-width: 768px) {
  .edit-team {
    width: 80vw;
    padding: 15px;
    border: none;
    border-radius: 0;
  }

  .form-container {
    display: none;
    flex-direction: column;
    gap: 10px;
  }

  input {
    font-size: 0.9em;
    padding: 8px;
  }

  button {
    width: 70px;
    font-size: 0.9em;
    padding: 8px;
  }

  th, td {
    font-size: 0.7em;
    padding: 8px;
  }
}
</style>
