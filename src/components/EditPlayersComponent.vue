<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DAOService } from "@/services/DAOService"
import router from '@/router';

// const positions = [
//   { id: 'goleiro', nome: 'Goleiro', abreviacao: 'GO' },
//   { id: 'zagueiro', nome: 'Zagueiro', abreviacao: 'ZG' },
//   { id: 'meio-campo', nome: 'Meio-Campo', abreviacao: 'MC' },
//   { id: 'atacante', nome: 'Atacante', abreviacao: 'AT' },
//   { id: 'ponta-esquerda', nome: 'Ponta Esquerda', abreviacao: 'PE' },
//   { id: 'ponta-direita', nome: 'Ponta Direita', abreviacao: 'PD' },
//   { id: 'lateral-esquerdo', nome: 'Lateral Esquerdo', abreviacao: 'LE' },
//   { id: 'lateral-direito', nome: 'Lateral Direito', abreviacao: 'LD' },
//   { id: 'volante', nome: 'Volante', abreviacao: 'VL' }
// ];
const DAOPlayersServiceInstance = new DAOService('players');
const DAOTeamsServiceInstance = new DAOService('teams');
// DAOPlayersServiceInstance.seedDatabase();
const seedsDatabaseButton = async () => {
  await DAOPlayersServiceInstance.seedDatabase();
}

const editingPlayerIndex = ref(null)
const stateListPlayers = reactive({
  teamId: '',
  currentListInput: {
    name: '',
    position: '',
    number: ''
  },
  currentListInputUpdate: { name: '', position: '', number: '' },
  currentListPlayers: []
});

const insertPlayers = async () => {
  // stateListPlayers.currentListPlayers.push(stateListPlayers.currentListInput)
  try {
    //  await DAOPlayersServiceInstance.seedDatabase();
    await DAOPlayersServiceInstance.create({ ...stateListPlayers.currentListInput, teamId: stateListPlayers.teamId });
    stateListPlayers.currentListInput = { name: '', position: '', number: '' };
    await reSeedsPlayersInList();
  } catch (error) {
    console.error('Erro ao inserir os dados:', error);
  }
};

const editPlayer = (index) => {
  editingPlayerIndex.value = index;
  stateListPlayers.currentListInputUpdate = { ...stateListPlayers.currentListPlayers[index] };
};

const updatePlayer = async () => {
  const { id } = stateListPlayers.currentListPlayers[editingPlayerIndex.value]
  if (editingPlayerIndex.value !== null) {
    await DAOPlayersServiceInstance.update(id, stateListPlayers.currentListInputUpdate);
    cancelEdit();
  }

  try {
    const { id, name, position, number } = stateListPlayers.currentListInputUpdate
    await DAOPlayersServiceInstance.update(id, { name, position, number });
  } catch (error) {
    console.error('Erro ao editar os dados:', error);
  }
  await reSeedsPlayersInList();
};

const DeletePlayer = async (indexDeletePlayer) => {
  await DAOPlayersServiceInstance.delete(stateListPlayers.currentListPlayers[indexDeletePlayer].id);
  await reSeedsPlayersInList();
  console.log(stateListPlayers);
};

const cancelEdit = () => {
  editingPlayerIndex.value = null;
  stateListPlayers.currentListInputUpdate = { name: '', position: '', number: '' };
};

const reSeedsPlayersInList = async () => {
  try {
    const response = await DAOPlayersServiceInstance.getAll();
    stateListPlayers.currentListPlayers = response;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
};

const getByIdTeam = async (userId) => {
  try {
    const response = await DAOTeamsServiceInstance.getByField('userId', userId);
    stateListPlayers.teamId = response[0].id;
    localStorage.setItem("data", JSON.stringify({ userId, teamId: response[0].id }));
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
};

const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uuid = user.uid;
      getByIdTeam(uuid);
    } else {
      router.push('/login');
    }
  });
})

onBeforeMount(async () => {
  try {
    const response = await DAOPlayersServiceInstance.getAll();
    stateListPlayers.currentListPlayers = response;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>

<template>
  <div class="edit-team">
    <!-- condição mal declarada, editar posteriormente após dar bom !edintingPlayersActive -->
    <div v-if="editingPlayerIndex === null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.position" placeholder="Posição" />
      <!-- <select v-model="stateListPlayers.position" id="posicao">
        <option v-for="position in positions" :key="position.id" :value="stateListPlayers.position">
          {{ position.nome }}
        </option>
      </select> -->
      <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" min="1" />
      <button @click="insertPlayers">Inserir</button>
    </div>
    <div v-else>
      <input v-model="stateListPlayers.currentListInputUpdate.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInputUpdate.position" placeholder="Posição" />
      <!-- <select v-model="stateListPlayers.position" id="posicao">
        <option v-for="position in positions" :key="position.id" :value="position.value">
          {{ position.nome }}
        </option> -->
      <!-- </select> -->
      <input v-model="stateListPlayers.currentListInputUpdate.number" placeholder="Número" type="number" min="1" />
      <button @click="updatePlayer">Atualizar Jogador</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
    <table>
      <tbody>
        <tr :key="50">
          <th>Nome</th>
          <th>Posição</th>
          <th>numero</th>
        </tr>
        <tr v-for="(players, index) in stateListPlayers.currentListPlayers" :key="index">
          <th>{{ players.name }} </th>
          <th>{{ players.position }} </th>
          <th>{{ players.number }} </th>
          <th><button @click="editPlayer(index)">Editar</button></th>
          <th><button @click="DeletePlayer(index)">Excluir</button></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.edit-team {
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
}

input {
  background-color: black;
  color: white;
  border: 1px solid #42b883;
  padding: 10px;
  font-size: 1em;
  border-radius: 4px;
  width: 20%;
  box-sizing: border-box;
}

input::placeholder {
  color: #42b883;
  opacity: 0.7;
}

button {
  all: unset;
  background-color: black;
  color: white;
  border: 1px solid #42b883;
  padding: 5px;
  font-size: 1em;
  border-radius: 4px;
  width: auto;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  input {
    font-size: 0.9em;
    padding: 8px;
  }
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}

select {
  width: 200px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fafafa;
  outline: none;
}

select:focus {
  border-color: #007bff;
  background-color: #f1f9ff;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
