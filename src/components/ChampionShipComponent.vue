<script setup>
import { reactive, toRefs, onMounted } from "vue";
import { RequestChampionshipsByIdAPI } from "@/services/api/RequestChampionshipsAPI";
import { useRoute } from 'vue-router'
import router from "@/router";
import { PiniaStore } from '@/stores';

const globalStore = PiniaStore();

const state = reactive({
  chanpionsShip: null,
  errorRequest: false,
  buttonIsDisable: false,
  isSubscribed: false,
});
const { chanpionsShip, buttonIsDisable, isSubscribed } = toRefs(state);
const route = useRoute();

const backUrl = () => {
  router.push({ name: 'search' })
};

const subcribeChanpinsShip = async () => {
  try {
    const responseAPIchanpionsShip = await DAOChanpionShip.getById(chanpionsShip.value.id)
    if(!responseAPIchanpionsShip.teams.some(team => team.id === globalStore.myTeam.id)) {
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
    const [responseChampionsShip] = await RequestChampionshipsByIdAPI(route.params.id);
    console.log('responseChampionsShip', responseChampionsShip);
    state.chanpionsShip = responseChampionsShip;
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
    <div v-if="state.chanpionsShip" class="details-container">
      <span v-if="chanpionsShip.name">
        Nome: {{ chanpionsShip.name }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Quantidade: {{ chanpionsShip.qntTime }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Vagas: {{ state.chanpionsShip.qntTime - state.chanpionsShip.teams.length }}
      </span>
      <span v-if="chanpionsShip.description">
        Description: {{ chanpionsShip.description }}
      </span>
      <span v-if="chanpionsShip.type">
        Tipo: {{ chanpionsShip.type === "cup" ? 'Mata Mata' : 'Pontos Corridos' }}
      </span>
      <span v-if="chanpionsShip.type">
        Premiação: {{ `R$ ${chanpionsShip.value}` }}
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
  height: 85vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 20px;
  margin: 15px;
  background-color: #1f1f1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.details-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 30%;
  align-items: start;
  margin-bottom: 20px;
  gap: 10px;
}

.details-container span {
  font-size: 18px;
  color: #ddd;
}

button {
  width: 30%;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:first-of-type {
  background-color: #42b883;
  color: white;
}

button:first-of-type:hover {
  background-color: #25634a;
  transform: scale(1.0);
}

button:last-of-type {
  background-color: #007bff;
  color: white;
}

button:last-of-type:hover {
  background-color: #0056b3;
  transform: scale(1.0);
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
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

  .details-container span {
    font-size: 16px;
  }

  button {
    font-size: 16px;
  }
}
</style>
