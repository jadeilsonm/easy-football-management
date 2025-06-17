<script setup>
import NavBar from '@/components/NavBar.vue'
import Input from '@/components/InputGeneric.vue'
// import { STATUS } from "@/Enums/status";
import { STATUS as STATUS_ENUM } from '@/Enums/status'
import { onMounted, reactive } from 'vue'
import { createChampionshipsAPI } from '@/services/api/championships/championshipsAPI'
import { PiniaStore } from '@/stores'
// import router from "@/router";

const globalStore = PiniaStore()

const reactiveInputManager = reactive({
  inputName: '',
  inputValue: '',
  inputQntTime: '',
  selectValue: '',
  userAuth: globalStore.getUser,
  description: '',
})

// const auth = getAuth();

onMounted(() => {
  // if (user) {
  reactiveInputManager.userAuth = globalStore.getUser
  console.log('login', globalStore.getUser)
  // } else {
  //   router.push('/login');
  // }
})

const select = [
  { text: 'COPA', value: 'CUP' },
  { text: 'LIGA', value: 'LEAGUE' },
]

const buttonsValues = [
  { path: '/home/team/editteam', value: 'Home' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/profile', value: 'Editar perfil' },
  { path: '/manager', value: 'Campeonatos' },
  { path: '/login', value: 'Sair' },
]

const createLeague = async () => {
  const payload = {
    name: reactiveInputManager.inputName,
    award: reactiveInputManager.inputValue,
    typeChampionship: reactiveInputManager.selectValue.value,
    quantityTeams: reactiveInputManager.inputQntTime,
    statusChampionship: 'CREATE',
    description: reactiveInputManager.description,
    img: '',
    userID: reactiveInputManager.userAuth.uid,
  }

  if (
    payload.name === '' ||
    payload.award === '' ||
    payload.typeChampionship === '' ||
    payload.quantityTeams === ''
  ) {
    alert('Preencha todos os campos')
    return
  }

  if (payload.quantityTeams < 2) {
    alert('Quantidade de times deve ser maior que 1')
    return
  }

  if (payload.userID === null) {
    alert('Usuário não autenticado')
    return
  }

  try {
    // const chanpionsShipId =
    console.log('Campeonato criado com sucesso', payload)
    payload.userID = globalStore.getUser
    await createChampionshipsAPI(payload)
    // await DAOClassification.create({chanpionsShipId, teams: []})
    clearReactive()
  } catch (error) {
    console.error(error)
  }
}

const clearReactive = () => {
  reactiveInputManager.inputName = ''
  reactiveInputManager.inputValue = ''
  reactiveInputManager.inputQntTime = ''
  reactiveInputManager.selectValue = ''
  reactiveInputManager.description = ''
}
</script>

<template>
  <div class="container-manager">
    <NavBar :buttonsValues="buttonsValues" />
    <main>
      <div class="container">
        <Input
          inputType="text"
          label="Nome do campeonato:"
          cssApply="input"
          v-model="reactiveInputManager.inputName"
        />
        <Input
          inputType="number"
          label="Premiação:"
          cssApply="input"
          v-model="reactiveInputManager.inputValue"
        />
        <label for="select" class="select">
          Modalidade:
          <select v-model="reactiveInputManager.selectValue">
            <option v-for="(value, index) in select" :key="index" :value="value">
              {{ value.text }}
            </option>
          </select>
        </label>
        <Input
          inputType="number"
          label="Quantidade de times:"
          cssApply="input"
          v-model="reactiveInputManager.inputQntTime"
        />
        <Input
          inputType="text"
          label="Descrição:"
          cssApply="input"
          v-model="reactiveInputManager.description"
        />
        <button class="button" @click="createLeague">Criar</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container-manager {
  background-color: #1c1e21;
}

.button {
  padding: 12px 20px;
  border-radius: 12px;
  width: 35%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  background-color: #42b883;
  border: none;
  color: white;
  margin: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.button:hover {
  background-color: #25634a;
  transform: translateY(-2px);
}

main {
  display: flex;
  flex-direction: column;
  background-color: #1c1e21;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  padding: 20px;
}

.select {
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 50%;
  align-items: center;
  justify-content: space-between;
}

.select select {
  background-color: #1c1e21;
  border: 1px solid #292929;
  color: #ffffff;
  width: 400px;
  padding: 8px;
  border-radius: 10px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.select select:focus {
  border-color: #636363;
  box-shadow: 0 0 5px rgba(94, 94, 94, 0.5);
}

.select select option {
  background-color: #1c1e21;
  color: #ffffff;
}

select {
  padding: 10px;
  border-radius: 10px;
  box-shadow: none;
}

.container {
  background-color: #1a1a1a;
  padding: 60px;
  display: flex;
  width: 90%;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  overflow: hidden;
}

body {
  margin: 0;
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: #ffffff;
}

@media (max-width: 768px) {
  main {
    margin: 0;
    padding: 0;
  }
  .container {
    padding: 0;
    width: 100%;
  }
}
</style>
