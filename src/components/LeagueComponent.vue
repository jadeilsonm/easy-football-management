<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import { useRoute } from 'vue-router'
import router from "@/router";

export default {
  setup() {
    const DAOChampionsShipServiceInstance = new DAOService('chanpions_ships');
    const stateChanpionsShip = ref();
    const route = useRoute();

    const backUrl = () => {
      router.push({ name: 'manager/league'})
    };

    const subcribeChanpinsShip = async () => {
      try {
        //const response = await DAOChampionsShipServiceInstance.getById(stateChanpionsShip.value.id);
        const responseLocalStorage = JSON.parse(localStorage.getItem("data"));
        // if (!stateChanpionsShip.value.TeamIds) {
        //   stateChanpionsShip.value.TeamIds = [responseLocalStorage.teamId]
        //   return
        // }
        stateChanpionsShip.value.teamIds = [ ...stateChanpionsShip.value.teamIds, responseLocalStorage.teamId]
        await DAOChampionsShipServiceInstance.update(stateChanpionsShip.value.id, stateChanpionsShip.value)
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
    };

    onBeforeMount(async () => {
      try {
        // console.log('está sendo retornado Champions ship', route.params.id);
        const response = await DAOChampionsShipServiceInstance.getById(route.params.id);
        console.log('está sendo retornado Champions ship', response);
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
  <div class="league">
    <table>
      <tbody>
        <tr :key="1">
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>%</th>
        </tr>
        <tr>
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>%</th>
        </tr>
      </tbody>
    </table>
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %: Aproveitamento</span>
  </div>
</template>

<style scoped>

</style>
