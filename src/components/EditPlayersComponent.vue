<template>
  <div class="edit-team">
    <div v-if="editingPlayerIndex === null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.cpf" placeholder="CPF" />
      <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" min="1" />
      <button @click="insertPlayers">Inserir</button>
    </div>
    <div v-if="editingPlayerIndex !== null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.cpf" placeholder="CPF" />
      <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" min="1" />
      <button @click="updatePlayer">Atualizar Jogador</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
    <table>
      <tbody>
      <tr>
        <th>Nome</th>
        <th>cpf</th>
        <th>numero</th>
      </tr>
      <tr v-for="(players, index) in stateListPlayers.currentListPlayers" :key="index">
        <th>{{ players.name }} </th>
        <th>{{ players.cpf }} </th>
        <th>{{ players.number }} </th>
        <th><button @click="editPlayer(index)">Editar</button></th>
        <th><button @click="DeletePlayer(index)">Excluir</button></th>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const stateListPlayers = reactive({
      currentListInput: { name: '', cpf: '', number: '' },
      currentListPlayers: [
        { name: 'Peter', cpf: 999999999999, number: 11 },
        { name: 'cr7', cpf: 999999999999, number: 7 },
        { name: 'messi', cpf: 999999999999, number: 10 }
      ]
    });

    const insertPlayers = () => {
      stateListPlayers.currentListPlayers.push(stateListPlayers.currentListInput)
      stateListPlayers.currentListInput = { name: '', cpf: '', number: '' };
    };

    let editingPlayerIndex = null;

    // Função para iniciar a edição de um jogador
    const editPlayer = (index) => {
      console.log(editingPlayerIndex !== null)
      editingPlayerIndex = index;
      stateListPlayers.currentListInput = { ...stateListPlayers.currentListPlayers[index] };
    };

    // Função para atualizar o jogador editado
    const updatePlayer = () => {
      if (editingPlayerIndex !== null) {
        stateListPlayers.currentListPlayers[editingPlayerIndex] = { ...stateListPlayers.currentListInput };
        cancelEdit();
      }
    };

    const DeletePlayer = (indexDeletePlayer) => {
      stateListPlayers.currentListPlayers = stateListPlayers.currentListPlayers.filter((player,index) => index !== indexDeletePlayer)
    };

    // Função para cancelar a edição
    const cancelEdit = () => {
      editingPlayerIndex = null;
      stateListPlayers.currentListInput = { name: '', cpf: '', number: '' };
    };

    return {
      stateListPlayers,
      insertPlayers,
      editingPlayerIndex,
      editPlayer,
      DeletePlayer,
      updatePlayer,
      cancelEdit
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
<!-- 
<template>
  <div>
    <ul>
      
      <li v-for="(player, index) in stateListPlayers.currentListPlayers" :key="index">
        {{ player.name }} - CPF: {{ player.cpf }} - Número: {{ player.number }}
        <button @click="editPlayer(index)">Editar</button>
      </li>
    </ul>

    
    <div v-if="editingPlayerIndex !== null">
      <input v-model="stateListPlayers.currentListInput.name" placeholder="Nome" />
      <input v-model="stateListPlayers.currentListInput.cpf" placeholder="CPF" />
      <input v-model="stateListPlayers.currentListInput.number" placeholder="Número" type="number" />
      <button @click="updatePlayer">Atualizar Jogador</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const stateListPlayers = reactive({
      currentListInput: { name: '', cpf: '', number: '' },
      currentListPlayers: [
        { name: 'Peter', cpf: 999999999999, number: 11 },
        { name: 'cr7', cpf: 999999999999, number: 7 },
        { name: 'messi', cpf: 999999999999, number: 10 }
      ]
    });

    let editingPlayerIndex = null;

    // Função para iniciar a edição de um jogador
    const editPlayer = (index) => {
      editingPlayerIndex = index;
      stateListPlayers.currentListInput = { ...stateListPlayers.currentListPlayers[index] };
    };

    // Função para atualizar o jogador editado
    const updatePlayer = () => {
      if (editingPlayerIndex !== null) {
        stateListPlayers.currentListPlayers[editingPlayerIndex] = { ...stateListPlayers.currentListInput };
        cancelEdit();
      }
    };

    // Função para cancelar a edição
    const cancelEdit = () => {
      editingPlayerIndex = null;
      stateListPlayers.currentListInput = { name: '', cpf: '', number: '' };
    };

    return {
      stateListPlayers,
      editingPlayerIndex,
      editPlayer,
      updatePlayer,
      cancelEdit
    };
  }
};
</script>

<style scoped>
/* Estilos simples para o formulário e a lista */
input {
  margin: 5px;
  padding: 5px;
}

button {
  padding: 5px 10px;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ddd;
}
</style> -->
