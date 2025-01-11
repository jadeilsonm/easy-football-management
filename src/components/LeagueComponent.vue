<script setup>
import { ref, onMounted, reactive, toRefs } from "vue";
// import { DAOService } from "@/services/DAOService";
import { DAOClassification } from "@/services";
import { useRoute } from 'vue-router'
import router from "@/router";


const stateClassification = reactive({
  data: {}
});

const { data } = toRefs(stateClassification);

const route = useRoute();

const backUrl = () => {
  router.push({ name: 'manager/league' });
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

onMounted(async () => {
  try {
    const [ response ] = await DAOClassification.search(
      [
        { field: 'chanpionsShipId', operator: "==", value: route.params.id}
      ]);
    console.log('classification', response.teams);
    stateClassification.data = response.teams;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>

<template>
  <div class="league">
    <table>
      <tbody>
        <tr :key="1">
          <th>N</th>
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
        <tr v-for="(teams, index) in data" :key="index">
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
    <span>P: Pontos J: Jogos V: Vitórias E: Empates D: Derrotas GP: Gols Pró GC: Gols Contra SG: Saldo de gols %:
      Aproveitamento</span>
  </div>
</template>

<style scoped>
</style>
