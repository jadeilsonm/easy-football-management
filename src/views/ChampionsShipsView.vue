<script setup >
import NavBar from '@/components/NavBar.vue';
import router from '@/router';
import { DAOService } from '@/services/DAOService';
import { CHAMPIONS_SHIP_COLLECTION } from '@/Utils/constantes';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, reactive } from 'vue';


const auth = getAuth();

const dao = new DAOService(CHAMPIONS_SHIP_COLLECTION);

const reactiveChampionsShips = reactive({
  result: []
})

const getChampionsShips = async (userID) => {
  console.log("userID: ",userID);
  const response = await dao.search([{ field: 'status', operator: '==', value: 'CREATED' }, { field: 'userOwner', operator: '==', value: userID }]);
  return response;
}

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.push('/login');
    }
    const userId = user.uid;
    const result = await getChampionsShips(userId);
    reactiveChampionsShips.result = result;
  });
})

const buttonsValues = [{ path: '/home', value: 'Home' }, { path: '/manager/created', value: 'Criar Campeonato' }, { path: '/manager/league', value: 'Campeonatos' }, { path: '/login', value: 'Sair' }]

const goDetais = (e) => {
  router.push(e);
}

</script>

<template>
  <NavBar :buttonsValues="buttonsValues" />
  <div class="container">
    <div class="card" @click="() => goDetais(`/manager/${r.type}/${r.id}`)" v-for="r, i in reactiveChampionsShips.result" :key="i">
      <img v-if="r.type === 'ligue'" src="https://cdn.gencraft.com/prod/user/f2b9531a-8f21-4aec-8615-542b334d8d12/ab913fbe-1b83-49bb-a38d-8bec70ae4545/image/image0_0.jpg?Expires=1741554731&Signature=JkktQrnSs5d6kRe8TfbmEuMMv9nf~6UehZkvUmUGxSvz7~2ECmHAS1fva4iCnMWe~8UbJI2Ic7MLPlLN6OSayJshoOFosEPRjjMaYXKr-ltq3ssNnk76UL62-jS~6WzWI5Z3BffN~drVpMQK-tY1ek6kGs~3NAFt9q92MdWyZFiQ2LIrZVWtEqZI5StYD2cPk-6Xk~dvCnXBlDfSzObM160CnYIQxAq3b1oXWfo4d6NnOBf2PjM8cxFS3ebsdBMYpi~jWs3IaXPt~iH65MxQP6OSunquE6MpJxZjThQaojshz6usPkXud7fHtwsaNRucbrWjMUJfxr3Q7NBtYMnHYQ__&Key-Pair-Id=K3RDDB1TZ8BHT8" alt="">
      <img v-else src="https://cdn.gencraft.com/prod/user/f2b9531a-8f21-4aec-8615-542b334d8d12/05d1f0a6-8021-48ad-bff8-435ded6f466b/image/image0_0.jpg?Expires=1741555034&Signature=KsNJC7TF9wPT6lr04WKVvIUvszWaplDdU2gbHS~UQmGUvX2jxw4lOesFf2RzUHAN0LDxzj6eFEuAjoBThV7aAzGffKSYQStwMQ1EB3u4UEsXnVOnEAgNLY4k8pcq3UFABQ-OExaeHyVgSNb6fPyMO8GrqbOiekA7OwcHLqMl2JHWONQfH43fwN9q5LCnsdDK6q6wXaOJKhQIq4woWID5ktshyTQJKcd~jT0mzxiML~7592cJWKGv~GzNrWxMURWKCPFGxgPz9dju6hPkRWk~rBlfLWOWKqc5ZNTAwpbd~sbecz4VZ7TOSDSlWep70tS4q6aLtilEdVczQYPldsuRAw__&Key-Pair-Id=K3RDDB1TZ8BHT8" alt="">
      <div>
        <h3>{{ r.name }}</h3>
        <p v-if="r.description">{{ r.description }}</p>
        <p v-else>{{ `Venha participar do ${r.name}, um evento emocionante para jogadores de todos os níveis! Prepare-se para competir, se divertir e ter a chance de levar prêmios incríveis para casa, no valor de R$ ${r.value}`  }}</p>
        <p>R$ {{ r.value }}</p>
        <p>Quantidade de times: {{ r.qntTime }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-link {
  color: rgb(255, 255, 255);
  text-decoration: none;
  border: none;
  padding: 10px;
  display: flex;
}

.custom-link:hover {
  color: rgb(255, 255, 255);
  text-decoration: none;
  border: none;
  padding: 10px;
}

.container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card {
  display: flex;
  flex-direction: row;
  width: 30%;
  border: 1px solid #ccc;
  height: 25vh;
  && img {
    width: 40%;
    height: 100%;
  }
  && div {
    padding: 15px;
    overflow: hidden;
  }
}
p {
  word-wrap: break-word;
  word-break: break-word;
}
</style>
