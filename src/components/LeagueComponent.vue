<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import { useRoute } from 'vue-router'
import router from "@/router";

export default {
  setup() {
    const DAOClassificationServiceInstance = new DAOService('classification');
    const stateClassification = ref();
    const route = useRoute();

    const backUrl = () => {
      router.push({ name: 'manager/league'})
    };

    // const subcribeChanpinsShip = async () => {
    //   // try {
    //   //   const responseLocalStorage = JSON.parse(localStorage.getItem("data"));
    //   //   stateChanpionsShip.value.teamIds = [ ...stateChanpionsShip.value.teamIds, responseLocalStorage.teamId]
    //   //   await DAOChampionsShipServiceInstance.update(stateChanpionsShip.value.id, stateChanpionsShip.value)
    //   // } catch (error) {
    //   //   console.error('Erro ao editar os dados:', error);
    //   // }
    // };

    onBeforeMount(async () => {
      try {
        const [ response ] = await DAOClassificationServiceInstance.search(
          [
            { field: 'chanpionsShipId', operator: "==", value: route.params.id}
          ]);
        console.log('classification', response.teams);
        stateClassification.value = response.teams;

      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    });

    

    return {
      DAOClassificationServiceInstance,
      stateClassification,
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
          <th></th>
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
        <tr v-for="(teams, index) in stateClassification" :key="index">
          <th>{{ teams.teamId }}</th>
          <th>{{ teams.P }}</th>
          <th>{{ teams.J }}</th>
          <th>{{ teams.V }}</th>
          <th>{{ teams.E }}</th>
          <th>{{ teams.D }}</th>
          <th>{{ teams.GP }}</th>
          <th>{{ teams.GC }}</th>
          <th>{{ teams.SG }}</th>
          <th>{{ teams.A }}</th>
        </tr>
      </tbody>
    </table>
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %: Aproveitamento</span>
  </div>
</template>

<style scoped>

</style>
