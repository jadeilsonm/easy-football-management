<template>
  <div class="edit-team">
    <span v-if="editingPlayerIndex === null">true</span>
    <span v-else>false</span>
    <!-- condição mal declarada, editar posteriormente após dar bom !edintingPlayersActive -->
    <div v-if="editingPlayerIndex === null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.position" placeholder="Posição" />
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
      <tr>
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

<script>
import { ref, reactive, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService"
export default {
  setup() {
    const DAOServiceInstance = new DAOService('players');
    // DAOServiceInstance.seedDatabase();
    // const edintingPlayersActive = ref(false)
    const editingPlayerIndex = ref(null)
    const stateListPlayers = reactive({
      currentListInput: { name: '', position: '', number: '' },
      currentListInputUpdate: { name: '', position: '', number: '' },
      currentListPlayers: []
    });

    const insertPlayers = async () => {
      // stateListPlayers.currentListPlayers.push(stateListPlayers.currentListInput)
      try {
        await DAOServiceInstance.seedDatabase();
        await DAOServiceInstance.create(stateListPlayers.currentListInput);
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
      // console.log("index " ,editingPlayerIndex.value)
      const { id } = stateListPlayers.currentListPlayers[editingPlayerIndex.value]
      // console.log("index data todo ", stateListPlayers.currentListPlayers[editingPlayerIndex.value])
      // console.log("index data ", playerCurrentUpdate)
      if (editingPlayerIndex.value !== null) {
        await DAOServiceInstance.update(id,stateListPlayers.currentListInputUpdate);
        // stateListPlayers.currentListPlayers[editingPlayerIndex] = { ...stateListPlayers.currentListInputUpdate };
        cancelEdit();
      }

      try {
        const { id, name, position, number  } = stateListPlayers.currentListInputUpdate
        await DAOServiceInstance.update(id,{name, position, number});
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
      await reSeedsPlayersInList();
    };

    const DeletePlayer = async (indexDeletePlayer) => {
      console.log(stateListPlayers.currentListPlayers[indexDeletePlayer].id)
      await DAOServiceInstance.delete(stateListPlayers.currentListPlayers[indexDeletePlayer].id);
      await reSeedsPlayersInList();
      // stateListPlayers.currentListPlayers = stateListPlayers.currentListPlayers.filter((player,index) => index !== indexDeletePlayer)
    };

    const cancelEdit = () => {
      editingPlayerIndex.value = null;
      stateListPlayers.currentListInputUpdate = { name: '', cpf: '', number: '' };
    };

    const reSeedsPlayersInList = async () => {
      try {
        const response = await DAOServiceInstance.getAll();
        console.log(response)
        // console.log("response edited")
        // console.log(response[0])
        stateListPlayers.currentListPlayers = response;
        // console.log(response);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    onBeforeMount(async () => {
      try {
        const response = await DAOServiceInstance.getAll();
        console.log(response)
        // console.log("response edited")
        // console.log(response[0])
        stateListPlayers.currentListPlayers = response;
        // console.log(response);
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
      DAOServiceInstance,
      // edintingPlayersActive,
      reSeedsPlayersInList
    };
  }
};
</script>

<style scoped>
.edit-team {
  height: 400px;
  width: 500px;
}

  
</style>
