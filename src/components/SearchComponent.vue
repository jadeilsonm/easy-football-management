<template>
  <div class="search">
    <div v-for="( ChanpionsShip, index ) in stateChanpionsShips" :key="index" class="chanpionships">
      <span>Name: {{ ChanpionsShip.name }} </span>
      <span>vagas: {{ ChanpionsShip.qntTime }}</span>
      <span>Tipo: {{ ChanpionsShip.type }}</span>
      <button type="button" @click="buttonRedirect(ChanpionsShip.id)">detalhes</button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import router from "@/router";
const URL_ROUTER_CHAMPION_SHIP = '/search/championship/details/';

export default {
  setup() {
    const DAOServiceInstance = new DAOService('chanpions_ships');
    const stateChanpionsShips = ref([
      // { name: "brasileirão", qntTime: 12,  type: "cup"},
      // { name: "cop do brasil", qntTime: 18,  type: "league"}
    ]); // Estado que irá armazenar os dados

    const buttonRedirect = (championShipId) => {
      console.log(URL_ROUTER_CHAMPION_SHIP + championShipId);
      router.push({name: 'championsshipdetails', params: { id: championShipId }})
    }
    
    onBeforeMount(async () => {
      try {
        const response = await DAOServiceInstance.getAll();
        console.log('está sendo retornado ', response);
        stateChanpionsShips.value = response;

      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    });

    return {
      stateChanpionsShips,
      buttonRedirect
    };
  }
};
</script>

<style scoped>
.search {
  height: 70vh;
  width: 80vw;
  border: solid 1px green;
  display: flex;
  margin: 15px;
}

.chanpionships {
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.chanpionships:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4); 
}


.chanpionships span {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #ddd;
}


button {
  background-color: #06ee2dd7;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #06ee2d88;
}

@media (max-width: 768px) {
  .chanpionships {
    padding: 15px;
  }

  button {
    width: 100%;
  }
}
</style>
