<script setup>
import { ref, onMounted } from "vue";
import { DAOChanpionShip } from "@/services";
import router from "@/router";

const state = ref([]);

const buttonRedirect = (championShipId) => {
  router.push({ name: 'championsshipdetails', params: { id: championShipId } })
}

onMounted(async () => {
  try {
    const response = await DAOChanpionShip.getAll();
    state.value = response.filter(chanpionShip => chanpionShip.status === "CREATED");
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

</script>
<template>
  <div class="search">
    <div v-for="( ChanpionsShip, index ) in state" :key="index" class="chanpionships">
      <span>Name: {{ ChanpionsShip.name }} </span>
      <span>vagas: {{ ChanpionsShip.qntTime - ChanpionsShip.teams.length }}</span>
      <span>Tipo: {{ ChanpionsShip.type }}</span>
      <button type="button" @click="buttonRedirect(ChanpionsShip.id)">detalhes</button>
    </div>
  </div>
</template>


<style scoped>
.search {
  height: 80vh;
  width: 80vw;
  border: solid 1px #42b883;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.chanpionships {
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.chanpionships:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}


.chanpionships span {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #ddd;
}


button {
  background-color: #42b883;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #25634a;
}

@media (max-width: 768px) {
  .chanpionships {
    padding: 15px;
  }

  button {
    width: 100%;
  }
}
</style>
