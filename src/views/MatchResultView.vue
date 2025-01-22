<script setup>
import { onMounted, reactive } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from 'vue-router'
import router from "@/router";
import { DAORoundMatches } from "@/services";
const auth = getAuth();
const route = useRoute();
const state = reactive({
  teams1: null,
  teams2: null,
  result: null
})

const backUrl = () => {
  router.push({ name: 'manager' });
};

const resquestDefault = async () => {
  const classificationId= route.params;
  const responseRoundMatches = await DAORoundMatches.getByField("chanpionShipId", classificationId)
  console.log("matchResult", classificationId);
  console.log("matchResult", responseRoundMatches);
} 

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("ok")
    } else {
      router.push('/login');
    }
  });
  try {
    resquestDefault()
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>

<template>
  <div class="league">
    <h1>editar Jogos</h1>
    <h1>em construção</h1>
  </div>
</template>

<style scoped>
</style>
