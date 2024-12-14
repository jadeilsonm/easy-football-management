<script>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DAOService } from "@/services/DAOService"
import router from '@/router';

export default {
  setup() {
    const DAOPlayersServiceInstance = new DAOService('players');
    const DAOTeamsServiceInstance = new DAOService('teams');
    // DAOPlayersServiceInstance.seedDatabase();
    const seedsDatabaseButton = async () => {
      await DAOPlayersServiceInstance.seedDatabase();
    }
    
    // const edintingPlayersActive = ref(false)
    const editingPlayerIndex = ref(null)
    const stateListPlayers = reactive({
      teamId: '',
      currentListInput: { name: '', 
      position: '',
      // posicaoEscolhida: '', // Valor da posição escolhida
      // posicoes: [
      //   { value: 'goleiro', label: 'Goleiro' },
      //   { value: 'zagueiro', label: 'Zagueiro' },
      //   { value: 'lateral-direito', label: 'Lateral Direito' },
      //   { value: 'lateral-esquerdo', label: 'Lateral Esquerdo' },
      //   { value: 'meio-campo', label: 'Meio Campo' },
      //   { value: 'atacante', label: 'Atacante' },
      //   { value: 'ponta-direita', label: 'Ponta Direita' },
      //   { value: 'ponta-esquerda', label: 'Ponta Esquerda' },
      //   { value: 'centroavante', label: 'Centroavante' }
      // ],
      number: '' },
      currentListInputUpdate: { name: '', position: '', number: ''},
      currentListPlayers: []
    });

    const insertPlayers = async () => {
      // stateListPlayers.currentListPlayers.push(stateListPlayers.currentListInput)
      try {
      //  await DAOPlayersServiceInstance.seedDatabase();
        await DAOPlayersServiceInstance.create({...stateListPlayers.currentListInput, teamId: stateListPlayers.teamId});
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
        await DAOPlayersServiceInstance.update(id,stateListPlayers.currentListInputUpdate);
        cancelEdit();
      }

      try {
        const { id, name, position, number  } = stateListPlayers.currentListInputUpdate
        await DAOPlayersServiceInstance.update(id,{name, position, number});
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
      await reSeedsPlayersInList();
    };

    const DeletePlayer = async (indexDeletePlayer) => {
      await DAOPlayersServiceInstance.delete(stateListPlayers.currentListPlayers[indexDeletePlayer].id);
      await reSeedsPlayersInList();
    };

    const cancelEdit = () => {
      editingPlayerIndex.value = null;
      stateListPlayers.currentListInputUpdate = { name: '', cpf: '', number: '' };
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
        localStorage.setItem("data", JSON.stringify({userId, teamId: response[0].id}));
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

    return {
      stateListPlayers,
      insertPlayers,
      editingPlayerIndex,
      editPlayer,
      DeletePlayer,
      updatePlayer,
      cancelEdit,
      onBeforeMount,
      DAOPlayersServiceInstance,
      onMounted,
      reSeedsPlayersInList,
      seedsDatabaseButton
    };
  }
};
</script>

<template>
  <div class="edit-team">
    <!-- condição mal declarada, editar posteriormente após dar bom !edintingPlayersActive -->
    <div v-if="editingPlayerIndex === null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.position" placeholder="Posição" />
      <!-- <select v-model="posicaoEscolhida" id="posicao">
        <option v-for="posicao in posicoes" :key="posicao.value" :value="posicao.value">
          {{ posicao.label }}
        </option>
      </select> -->
      <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" min="1" />
      <button @click="insertPlayers">Inserir</button>
    </div>
    <div v-else>
      <input v-model="stateListPlayers.currentListInputUpdate.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInputUpdate.position" placeholder="Posição" />
      
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

    <!-- <button type="button" @click="seedsDatabaseButton()">seeds</button> -->
  </div>
</template>

<style scoped>
.edit-team {
  height: 400px;
  width: 500px;
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
</style>
