<script setup>
import { onMounted, ref } from "vue";
import RoundComponent from "./RoundComponent.vue";
import MatchComponent from "./MatchComponent.vue";
import { useRoute } from "vue-router";
import LoadComponent from "./LoadComponent.vue";
import { generatedRoundMatchCup } from "@/services/ServiceRoundMatches";
import { DAOChanpionShip } from "@/services";

const route = useRoute();

const idChampionsShip = ref(route.params.id);

const round = ref(1);
const matchesGames = ref({
  oitavas: [],
  quarterFinals: [],
  semiFinals: [],
  final: []
});
const championsShip = ref({});
const currentFase = ref(0);
const isCurrentCup = ref(false);
const isLoading = ref(true);

const nameCup = ref("");

const defineMatch = (match, qntTeams) => {
  switch (qntTeams) {
    case 16:
      return {
        oitavas: Object.entries(match[0].games) || [],
        quarterFinals: Object.entries(match[1].games) || [],
        semiFinals: Object.entries(match[2].games) || [],
        final: Object.entries(match[3].games) || [],
      };
    case 8:
      return {
        quarterFinals: Object.entries(match[0].games) || [],
        semiFinals: Object.entries(match[1].games) || [],
        final:  Object.entries(match[2].games) || [],
      };
    case 4:
      return {
        semiFinals: Object.entries(match[0].games) || [],
        final: Object.entries(match[1].games) || [],
      };
    case 2:
      return {
        final: Object.entries(match[0].games) || [],
      };
  }
};

onMounted(async () => {
  const champion = await DAOChanpionShip.getById(idChampionsShip.value);
  const {
    teams = [],
    qntTime,
    name,
    matches = [],
  } = champion;
  championsShip.value = champion;
  const qntTeams = teams.length || 0;
  currentFase.value = qntTeams;
  nameCup.value = name;
  if (qntTime == qntTeams) {
    try {
      if (matches != undefined && matches.length > 0) {
        matchesGames.value = defineMatch(matches, qntTeams);
      } else {
        const machGenerate = generatedRoundMatchCup(teams);
        matchesGames.value = defineMatch(machGenerate, qntTeams);
        await DAOChanpionShip.update(idChampionsShip.value, {
          matches: machGenerate,
        });
      }
    } catch (error) {
      console.error(error);
    }
    isCurrentCup.value = true;
  }
  isLoading.value = false;
});

</script>

<template>
  <LoadComponent :isLoading="isLoading" />
  <div v-if="isCurrentCup" class="knockout-stage">
    <h1>Eliminatórias</h1>
    <div class="brackets">
      <RoundComponent title="Oitavas de final" v-if="16 == currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.oitavas"
               :key="index"
               :match="match[1]"
               :matchValue="match[0]"
               :round="round.toString()"
               :championshipID="idChampionsShip" />
      </RoundComponent>
      <RoundComponent title="Quartas de final" v-if="8 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.quarterFinals"
               :key="index"
               :match="match[1]"
               :matchValue="match[0]"
               :round="round.toString()"
               :championshipID="idChampionsShip" />
      </RoundComponent>

      <RoundComponent title="Semifinais" v-if="4 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.semiFinals"
               :key="index"
               :match="match[1]"
               :matchValue="match[0]"
               :round="round.toString()"
               :championshipID="idChampionsShip" />
      </RoundComponent>

      <RoundComponent title="Final" v-if="2 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.final"
               :key="index"
               :match="match[1]"
               :matchValue="match[0]"
               :round="round.toString()"
               :championshipID="idChampionsShip" />
      </RoundComponent>
    </div>
  </div>
  <div v-else>
    <h2>{{ `A copa ${nameCup} vai começar em breve!` }}</h2>
    <p>
      Aguarde ate todos os times serem preenchido e o sorteio do chaveamento ser
      concluido.
    </p>
  </div>
</template>

<style scoped>
.knockout-stage {
  background-color: #1a1a1a;
  padding: 2rem;
  color: white;
}

.brackets {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
