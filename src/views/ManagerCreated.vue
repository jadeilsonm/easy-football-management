<script setup>
import NavBar from "@/components/NavBar.vue";
import Input from "@/components/InputGeneric.vue";
import { STATUS } from "@/Enums/status";
import { reactive } from "vue";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { DAOService } from "@/services/DAOService";
// import { DAOChanpionShip, DAOClassification } from "@/services";
import router from "@/router";
import { RequestAPI } from "@/services/api/RequestGenericAPI";
import NotificationAlert from "@/components/NotificationAlert.vue";
import { PiniaStore } from "@/stores";
const globalStore = PiniaStore();


const notification = reactive({
  message: '',
  type: 'info',
  show: false,
  duration: 4000
});

const showNotification = (message, type = 'info') => {
  notification.message = message;
  notification.type = type;
  notification.show = true;
};

const reactiveInputManager = reactive({
  inputName: '',
  inputValue: '',
  inputQntTime: '',
  selectValue: '',
  userAuth: '',
  description: ''
})

// const auth = getAuth();

const select = [
  { text: "COPA", value: "CUP" },
  { text: "LIGA", value: "LEAGUE" },
];

const buttonsValues = [
  { path: "/home/team/editteam", value: "Home" },
  { path: "/manager/created", value: "Criar Campeonato" },
  { path: "/manager/profile", value: "Editar perfil" },
  { path: "/manager", value: "Campeonatos" },
  { path: "/login", value: "Sair" },
];



const createLeague = async () => {
  const payload = {
    name: reactiveInputManager.inputName,
    value: reactiveInputManager.inputValue,
    type: reactiveInputManager.selectValue.value,
    qntTime: reactiveInputManager.inputQntTime,
    status: STATUS[1],
    description: reactiveInputManager.description,
    createdAt: new Date(),
    userOwner: reactiveInputManager.userAuth.uid,
    teams: [],
    matches: [],
  };

  if (
    payload.name === "" ||
    payload.value === "" ||
    payload.type === "" ||
    payload.qntTime === ""
  ) {
    showNotification("Preencha todos os campos", "error");
    return;
  }

  if (payload.qntTime < 2) {
    showNotification("Quantidade de times deve ser maior que 1", "error");
    return;
  }

  if (payload.userOwner === null) {
    showNotification("Usuário não autenticado", "error");
    return;
  }

  try {
    const userId = globalStore.getUser;
    console.log("User ID:", userId);
    const request = {
      userID: userId,
      name: payload.name,
      award: payload.value,
      typeChampionship: payload.type,
      quantityTeams: payload.qntTime,
      statusChampionship: 'CREATE',
      description: payload.description
    }
    await RequestAPI('/api/v1/championships', { method: 'POST', body: request });
    
    showNotification("Campeonato criado com sucesso!", "success");
      
    clearReactive();
  } catch (error) {
    console.error(error);
    showNotification("Erro ao criar campeonato", "error");
  }
};

const clearReactive = () => {
  reactiveInputManager.inputName = "";
  reactiveInputManager.inputValue = "";
  reactiveInputManager.inputQntTime = "";
  reactiveInputManager.selectValue = "";
  reactiveInputManager.description = "";
};
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
      <NotificationAlert
        v-if="notification.show"
        :message="notification.message"
        :type="notification.type"
        :duration="notification.duration"
      />
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
  transition: background-color 0.3s ease, transform 0.3s ease;
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
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
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
