<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import { useRoute } from 'vue-router'
import router from "@/router";

export default {
  setup() {
    const DAOClassificationServiceInstance = new DAOService('classification');
    const stateClassification = ref([
      {
        teamId: "Flamengo",
        P: 78,
        J: 38,
        V: 24,
        E: 6,
        D: 8,
        GP: 75,
        GC: 35,
        SG: 40,
        A: "68.4%"
      },
      {
        teamId: "Palmeiras",
        P: 74,
        J: 38,
        V: 22,
        E: 8,
        D: 8,
        GP: 68,
        GC: 30,
        SG: 38,
        A: "65.8%"
      },
      {
        teamId: "Atlético Mineiro",
        P: 69,
        J: 38,
        V: 20,
        E: 9,
        D: 9,
        GP: 66,
        GC: 33,
        SG: 33,
        A: "60.5%"
      },
      {
        teamId: "São Paulo",
        P: 63,
        J: 38,
        V: 18,
        E: 9,
        D: 11,
        GP: 58,
        GC: 39,
        SG: 19,
        A: "55.3%"
      },
      {
        teamId: "Corinthians",
        P: 59,
        J: 38,
        V: 16,
        E: 11,
        D: 11,
        GP: 53,
        GC: 41,
        SG: 12,
        A: "51.8%"
      },
      {
        teamId: "Internacional",
        P: 57,
        J: 38,
        V: 15,
        E: 12,
        D: 11,
        GP: 50,
        GC: 39,
        SG: 11,
        A: "50.0%"
      },
      {
        teamId: "Fluminense",
        P: 56,
        J: 38,
        V: 14,
        E: 14,
        D: 10,
        GP: 49,
        GC: 38,
        SG: 11,
        A: "49.2%"
      },
      {
        teamId: "Grêmio",
        P: 53,
        J: 38,
        V: 14,
        E: 11,
        D: 13,
        GP: 47,
        GC: 43,
        SG: 4,
        A: "46.5%"
      }
    ]);
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

    // onBeforeMount(async () => {
    //   try {
    //     const [ response ] = await DAOClassificationServiceInstance.search(
    //       [
    //         { field: 'chanpionsShipId', operator: "==", value: route.params.id}
    //       ]);
    //     console.log('classification', response.teams);
    //     stateClassification.value = response.teams;

    //   } catch (error) {
    //     console.error('Erro ao carregar os dados:', error);
    //   }
    // });

    

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
.league {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e0e0e0;
}

span {
  display: block;
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
}

@media (max-width: 768px) {
  table, th, td {
    font-size: 0.9em;
  }

  th, td {
    padding: 10px;
  }

  .league {
    overflow-x: auto;
  }

  table {
    display: block;
    width: 100%;
  }

  thead {
    display: none;
  }

  tbody tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    padding: 10px;
  }

  tbody td {
    display: block;
    text-align: right;
    padding: 10px 0;
    position: relative;
    border: none;
  }

  tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #007bff;
  }

  th, td {
    border: none;
  }
}
</style>
