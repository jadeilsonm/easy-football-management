<script setup>
import { reactive, toRefs, onMounted } from "vue";
import { DAOChanpionShip, DAOClassification } from "@/services";
import { useRoute } from 'vue-router'
import router from "@/router";
import { PiniaStore } from '@/stores';

const globalStore = PiniaStore();

const state = reactive({
  chanpionsShip: null,
  //classification: null,
  errorRequest: false,
  buttonIsDisable: false,
  isSubscribed: false,
});
const { chanpionsShip, buttonIsDisable } = toRefs(state);
const route = useRoute();

const backUrl = () => {
  router.push({ name: 'search' })
};

//const LocalStorage = JSON.parse(localStorage.getItem('data'))

const subcribeChanpinsShip = async () => {
  try {
    const responseAPIchanpionsShip = await DAOChanpionShip.getById(chanpionsShip.value.id)
    console.log('linha 29 ok', responseAPIchanpionsShip);
    if(!responseAPIchanpionsShip.teams.includes(chanpionsShip.value.id)) {
  
      await DAOChanpionShip.update(chanpionsShip.value.id, {
        teams: [
          ...responseAPIchanpionsShip.teams,
          globalStore.getMyTeam,
        ]
      })
    } else {
      state.isSubscribed = true
    }
  } catch (error) {
    console.error('Erro ao editar os dados:', error);
  }
};

const defaultResquest = async () => {
  try {
    // console.log('está sendo retornado Champions ship', route.params.id);
    const responseChampionsShip = await DAOChanpionShip.getById(route.params.id);
    //const responseClassification = await DAOClassification.getByField('chanpionsShipId', route.params.id);
    // console.log('getById \n', route.params.id);
    console.log('getById \n', responseChampionsShip);
    state.chanpionsShip = responseChampionsShip;
    //state.classification = responseClassification;
    // console.log(responseClassification[0].teams.some((team) => team.teamId === LocalStorage.teamId))
    // console.log(responseClassification[0].teams[4].teamId, LocalStorage.teamId,responseClassification[0].teams.some((team) => team.teamId === LocalStorage.teamId))
    // state.buttonIsDisable = responseClassification[0].teams.some((team) => team.teamId === LocalStorage.teamId);

  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

onMounted(async () => {
  await defaultResquest();
});


</script>

<template>
  <div class="chanpions-ship-details">
    <div v-if="state.chanpionsShip">
      <span v-if="chanpionsShip.name">
        Name: {{ chanpionsShip.name }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Quantidade: {{ chanpionsShip.qntTime }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Vagas: {{ chanpionsShip.qntTime - chanpionsShip.teams.length }} 
      </span>
      <span v-if="chanpionsShip.type">
        Tipo: {{ chanpionsShip.type === "cup" ? 'Mata Mata' : 'Pontos Corridos' }}
      </span>
    </div>
    <button :class="['btn', { 'btn-red': buttonIsDisable }]"
      :disabled="isSubscribed" @click="subcribeChanpinsShip">
      {{ isSubscribed ? 'Já estou inscrito' : 'Inscrever-se' }}
    </button>
    <button @click="backUrl()">Voltar</button>
  </div>
</template>

<style scoped>
.chanpions-ship-details {
  height: 70vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin: 15px;
  background-color: #1f1f1f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.chanpions-ship-details div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.chanpions-ship-details span {
  font-size: 18px;
  color: #ddd;
  margin: 5px 0;
}

button {
  width: 80%;
  padding: 12px;
  margin-top: 10px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:first-of-type {
  background-color: #28a745;
  color: white;
}

button:first-of-type:hover {
  background-color: #218838;
  transform: scale(1.05);
}

button:last-of-type {
  background-color: #007bff;
  color: white;
}

button:last-of-type:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
} 

.btn:disabled {
  background-color: #db2626;
  cursor: not-allowed;
}

.btn-red {
  background-color: red;
  color: white;
}

.btn-red:hover {
  background-color: darkred;
}

@media (max-width: 768px) {
  .chanpions-ship-details {
    width: 90vw;
    padding: 15px;
  }

  .chanpions-ship-details span {
    font-size: 16px;
  }

  button {
    font-size: 16px;
  }
}
</style>