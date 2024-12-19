
<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import { useRoute } from 'vue-router'
import router from "@/router";

export default {
  setup() {
    const DAOChampionsShipServiceInstance = new DAOService('chanpions_ships');
    const DAOClassificationInstance = new DAOService('classification');
    const stateChanpionsShip = ref();
    const route = useRoute();

    const backUrl = () => {
      router.push({ name: 'search'})
    };

    const subcribeChanpinsShip = async () => {
      try {
        const responseLocalStorage = JSON.parse(localStorage.getItem("data"));
        
        // stateChanpionsShip.value.teamIds = [ ...stateChanpionsShip.value.teamIds, responseLocalStorage.teamId]
        // await DAOChampionsShipServiceInstance.update(stateChanpionsShip.value.id, stateChanpionsShip.value)
        const [{id, chanpionsShipId, teams}] = await DAOClassificationInstance.search([{ field: 'chanpionsShipId', operator: "==", value: stateChanpionsShip.value.id}]);
        console.log(id, chanpionsShipId, teams,stateChanpionsShip.value.id);
        await DAOClassificationInstance.update(id,{
          teams: [...teams, {teamId:responseLocalStorage.teamId, P:0 ,J:0, v:0, E:0, D:0, GP:0, GC:0, S:0, A: 0.00}]
        })
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
    };

    onBeforeMount(async () => {
      try {
        // console.log('está sendo retornado Champions ship', route.params.id);
        const response = await DAOChampionsShipServiceInstance.getById(route.params.id);
        //console.log('está sendo retornado Champions ship', response);
        stateChanpionsShip.value = response;

      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    });

    return {
      stateChanpionsShip,
      subcribeChanpinsShip,
      backUrl
    };
  }
};
</script>

<template>
    <div class="search">
      <button 
      @click="backUrl()"
      >Voltar</button>
      <img src="../assets/logo_oficial.png" alt="logo" srcset="">
      <h1>search</h1>
      <div >
        <h2>Name: {{ stateChanpionsShip.name }} </h2>
        <h3>vagas: {{ stateChanpionsShip.qntTime }}</h3>
        <h3>Tipo: {{ stateChanpionsShip.type }}</h3>
      </div>
      <button type="button" @click="subcribeChanpinsShip()">Inscrever-se</button>
    </div>
  </template>
  
  <style scoped>
  
  </style>
  