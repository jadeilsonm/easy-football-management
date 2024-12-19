<template>
  <div class="search">
    <div v-for="( ChanpionsShip, index ) in stateChanpionsShips" :key="index" class="chanpionships">
      <h2>Name: {{ ChanpionsShip.name }} </h2>
      <h3>vagas: {{ ChanpionsShip.qntTime }}</h3>
      <h3>Tipo: {{ ChanpionsShip.type }}</h3>
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
        //console.log('está sendo retornado ', response);
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
  width: 60vw;
  border: solid 1px green;
  display: flex;
}

.chanpionships {
  border: solid 1px green;
  width: 400px;
  height: 200px;
}

</style>
