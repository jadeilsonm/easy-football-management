<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import { RequestChampionshipsAPI } from '@/services/api/RequestChampionshipsAPI'
import { ref, onMounted } from 'vue'
import { PiniaStore } from '@/stores'

// [{ field: 'status', operator: '==', value: 'CREATED' }, { field: 'userOwner', operator: '==', value: userID }]
const userID = ref('')

const reactiveChampionsShips = ref([])

const getChampionsShips = async (userID) => {
  const response = await RequestChampionshipsAPI()
  return response
}

const globalStore = PiniaStore()

onMounted(async () => {
  userID.value = globalStore.userId
  reactiveChampionsShips.value = await getChampionsShips(userID.value)
})

const buttonsValues = [
  { path: '/home/team/editteam', value: 'Principal' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/league', value: 'Campeonatos' },
  { path: '/login', value: 'Sair' },
]

const goDetais = (e) => {
  router.push(e)
}
</script>

<template>
  <NavBar :buttonsValues="buttonsValues" />
  <div class="container">
    <div
      class="card"
      @click="() => goDetais(`/manager/${r.type}/${r.id}`)"
      v-for="(r, i) in reactiveChampionsShips"
      :key="i"
    >
      <img
        v-if="r.type === 'ligue'"
        src="https://cdn.gencraft.com/prod/user/f2b9531a-8f21-4aec-8615-542b334d8d12/ab913fbe-1b83-49bb-a38d-8bec70ae4545/image/image0_0.jpg?Expires=1741554731&Signature=JkktQrnSs5d6kRe8TfbmEuMMv9nf~6UehZkvUmUGxSvz7~2ECmHAS1fva4iCnMWe~8UbJI2Ic7MLPlLN6OSayJshoOFosEPRjjMaYXKr-ltq3ssNnk76UL62-jS~6WzWI5Z3BffN~drVpMQK-tY1ek6kGs~3NAFt9q92MdWyZFiQ2LIrZVWtEqZI5StYD2cPk-6Xk~dvCnXBlDfSzObM160CnYIQxAq3b1oXWfo4d6NnOBf2PjM8cxFS3ebsdBMYpi~jWs3IaXPt~iH65MxQP6OSunquE6MpJxZjThQaojshz6usPkXud7fHtwsaNRucbrWjMUJfxr3Q7NBtYMnHYQ__&Key-Pair-Id=K3RDDB1TZ8BHT8"
        alt=""
      />
      <img
        v-else
        src="https://cdn.gencraft.com/prod/user/f2b9531a-8f21-4aec-8615-542b334d8d12/05d1f0a6-8021-48ad-bff8-435ded6f466b/image/image0_0.jpg?Expires=1741555034&Signature=KsNJC7TF9wPT6lr04WKVvIUvszWaplDdU2gbHS~UQmGUvX2jxw4lOesFf2RzUHAN0LDxzj6eFEuAjoBThV7aAzGffKSYQStwMQ1EB3u4UEsXnVOnEAgNLY4k8pcq3UFABQ-OExaeHyVgSNb6fPyMO8GrqbOiekA7OwcHLqMl2JHWONQfH43fwN9q5LCnsdDK6q6wXaOJKhQIq4woWID5ktshyTQJKcd~jT0mzxiML~7592cJWKGv~GzNrWxMURWKCPFGxgPz9dju6hPkRWk~rBlfLWOWKqc5ZNTAwpbd~sbecz4VZ7TOSDSlWep70tS4q6aLtilEdVczQYPldsuRAw__&Key-Pair-Id=K3RDDB1TZ8BHT8"
        alt=""
      />
      <div>
        <h3>{{ r.name }}</h3>
        <p v-if="r.description">{{ r.description }}</p>
        <p v-else>
          {{
            `Venha participar do ${r.name}, um evento emocionante para jogadores de todos os níveis! Prepare-se
          para competir, se divertir e ter a chance de levar prêmios incríveis para casa, no valor de R$ ${r.value}`
          }}
        </p>
        <p class="hide">R$ {{ r.value }}</p>
        <p class="hide">Quantidade de times: {{ r.qntTime }}</p>
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
  justify-content: center;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  border: 1px solid #ccc;
  border-radius: 15px;
  overflow: hidden;
  background-color: #1c1c1c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: auto;
}

.card div {
  padding: 15px;
  background-color: #1c1e21; /* Adiciona um fundo mais claro para contraste */
}

.card h3 {
  margin: 0;
  font-size: 1.2em;
  color: #fff; /* Define a cor do texto para branco */
}

.card p {
  margin: 10px 0;
  color: #ccc; /* Define a cor do texto para cinza claro */
  word-wrap: break-word;
  word-break: break-word;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 70%;
    height: 75vh;
    & .hide {
      display: none;
    }
  }
}
</style>
