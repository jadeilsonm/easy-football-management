
<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import router from '@/router';
export default {
  setup() {
    const DAOChampionsShipServiceInstance = new DAOService('chanpions_ships');
    const stateChanpionsShip = ref(); 

    onBeforeMount(async () => {
      try {
        console.log('está sendo retornado Champions ship');
        const response = await DAOChampionsShipServiceInstance.getById(router.params.id);
        console.log('está sendo retornado Champions ship', response);
        stateChanpionsShip.value = router.params.id//response;

      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    });

    return {
      stateChanpionsShip
    };
  }
};
</script>

<template>
    <div class="search">
      <button>Voltar</button>
      <img src="../assets/logo_oficial.png" alt="logo" srcset="">
      <h1>search</h1>
      <div >
        <h2>Name: {{ stateChanpionsShip.name }} </h2>
        <h3>vagas: {{ stateChanpionsShip.qntTime }}</h3>
        <h3>Tipo: {{ stateChanpionsShip.type }}</h3>
      </div>
      <button type="button">Inscrever-se</button>
    </div>
  </template>
  
  <style scoped>
  
  </style>
  