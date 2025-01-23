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

defineProps({
  teamsAll: {
    type: Array,
    required: true,
  },
});

const matchesGames = ref({
  oitavas: [],
  quarterFinals: [],
  semiFinals: [],
  final: []
});

const currentFase = ref(0);

const isCurrentCup = ref(false);

const isLoading = ref(true);

const nameCup = ref("");

const defineMatch = (match, qntTeams) => {
  switch (qntTeams) {
    case 16:
      return {
        oitavas: Object.values(match[0]) || [],
        quarterFinals: Object.values(match[1]) || [],
        semiFinals: Object.values(match[2]) || [],
        final: Object.values(match[3]) || [],
      };
    case 8:
      return {
        quarterFinals: Object.values(match[0]) || [],
        semiFinals: Object.values(match[1]) || [],
        final:  Object.values(match[2]) || [],
      };
    case 4:
      return {
        semiFinals: Object.values(match[0]) || [],
        final: Object.values(match[1]) || [],
      };
    case 2:
      return {
        final: Object.values(match[0]) || [],
      };
  }
};

onMounted(async () => {
  const {
    teams = [],
    qntTime,
    name,
    matches = [],
  } = await DAOChanpionShip.getById(idChampionsShip.value);
  const qntTeams = teams.length || 0;
  currentFase.value = qntTeams;
  nameCup.value = name;
  if (qntTime == qntTeams) {
    try {
      if (matches != undefined && matches.length > 0) {
        matchesGames.value = defineMatch(matches, qntTeams);
        isCurrentCup.value = true;
        isLoading.value = false;
        return;
      }
      const machGenerate = generatedRoundMatchCup(teams);
      matchesGames.value = defineMatch(machGenerate, qntTeams);
      await DAOChanpionShip.update(idChampionsShip.value, {
        matches: machGenerate,
      });
      isCurrentCup.value = true;
      return;
    } catch (error) {
      console.error(error);
    }
  }
  isCurrentCup.value = false;
  isLoading.value = false;
  console.log("matchesGames: ", matchesGames.value);
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
               :match="match" />
      </RoundComponent>
      <RoundComponent title="Quartas de final" v-if="8 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.quarterFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Semifinais" v-if="4 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.semiFinals"
               :key="index"
               :match="match" />
      </RoundComponent>

      <RoundComponent title="Final" v-if="2 <= currentFase">
        <MatchComponent v-for="(match, index) in matchesGames.final"
               :key="index"
               :match="match" />
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
