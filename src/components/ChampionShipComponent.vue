<script>
import { reactive, ref, toRefs, onBeforeMount,onMounted } from "vue";
import { DAOService } from "@/services/DAOService";
import { useRoute } from 'vue-router'
import router from "@/router";

export default {
  setup() {
    const DAOChampionsShipServiceInstance = new DAOService('chanpions_ships');
    const DAOClassificationInstance = new DAOService('classification');
    const stateChanpionsShip = reactive({
      chanpionsShip: null,
      classification: null,
      errorRequest: false,
      buttonDisable: false,
      isSubscribed: false,
    });
    const { chanpionsShip, classification, buttonDisable} = toRefs(stateChanpionsShip);
    const route = useRoute();

    const backUrl = () => {
      router.push({ name: 'search' })
    };

    const subcribeChanpinsShip = async () => {
      try {
        const responseLocalStorage = JSON.parse(localStorage.getItem("data"));

        const [{ id, chanpionsShipId, teams }] = await DAOClassificationInstance.search(
          [{ field: 'chanpionsShipId', operator: "==", value: chanpionsShip.value.id }]
        );
        
        // const [{ id, chanpionsShipId, teams }] = await DAOClassificationInstance.getById(
        //   chanpionsShip.value.id
        // );
        console.log('classificion atual', id, chanpionsShipId, teams);
        await DAOClassificationInstance.update(id, {
          teams: [...teams, { teamId: responseLocalStorage.teamId, P: 0, J: 0, v: 0, E: 0, D: 0, GP: 0, GC: 0, S: 0, A: 0.00 }]
        })
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
    };

    const defaultResquest = async () => {
      try {
        // console.log('está sendo retornado Champions ship', route.params.id);
        const responseChampionsShip = await DAOChampionsShipServiceInstance.getById(route.params.id);
        const responseClassification = await DAOClassificationInstance.getByField('chanpionsShipId', route.params.id);
        console.log('compnents championsShip \n', responseChampionsShip,responseClassification);
        console.log('teams \n',responseClassification[0].teams);
        stateChanpionsShip.chanpionsShip = responseChampionsShip;
        stateChanpionsShip.classification = responseClassification;

        stateChanpionsShip.buttonDisable = responseChampionsShip - responseClassification[0].teams.length <= 0
        
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    }

    onMounted( async () => {
      await defaultResquest();
    });

    return {
      stateChanpionsShip,
      subcribeChanpinsShip,
      backUrl,
      defaultResquest,
      chanpionsShip,
      classification
    };
  }
};
</script>

<template>
  <div class="chanpions-ship-details">
    <div v-if="chanpionsShip">
      <span v-if="chanpionsShip.name">
        Name: {{ chanpionsShip.name }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Quantidade: {{ chanpionsShip.qntTime }}
      </span>
      <span v-if="chanpionsShip.qntTime">
        Vagas: {{ chanpionsShip.qntTime - classification[0].teams.length }}
      </span>
      <span v-if="chanpionsShip.type">
        Tipo: {{ chanpionsShip.type === "cup" ? 'Mata Mata' : 'Pontos Corridos' }}
      </span>
    </div>
    <button 
      :class="['btn', { 'btn-red': stateChanpionsShip.buttonDisable }]" 
      :disabled="stateChanpionsShip.buttonDisable"
      @click="subcribeChanpinsShip"
    >
      {{ stateChanpionsShip.buttonDisable ? 'Já estou inscrito' : 'Inscrever-se' }}
    </button>
    <button @click="backUrl()">Voltar</button>
  </div>
</template>

<style scoped>
/* .chanpions-ship-details {
  height: 70vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  border: solid 1px rgb(6, 207, 6);
}

.chanpions-ship-details img {
  width: 26px;
} */

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
  background-color: #ddd;
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