<script setup>
import NavBar from '@/components/NavBar.vue';
import Input from '@/components/InputGeneric.vue';
import { STATUS } from '@/Enums/status';
import { reactive } from 'vue';
import { DAOService } from '@/services/DAOService';
import { AuthService } from '@/services/AuthService';

const reactiveInputManager = reactive({
  inputName: '',
  inputValue: '',
  inputQntTime: '',
  selectValue: '',
  userAuth: '',
  description: ''
})

const auth = new AuthService();

reactiveInputManager.userAuth = auth.getUser();

const select = [
  { text: "COPA", value: "cup" },
  { text: "LIGA", value: "league" },
];

const buttonsValues = [
  { path: "/home", value: "Home" },
  { path: "/manager/created", value: "Criar Campeonato" },
  { path: "/manager/profile", value: "Editar perfil" },
  { path: "/manager", value: "Campeonatos" },
  { path: "/login", value: "Sair" },
];

const createLeague = async () => {
  const dao = new DAOService("chanpions_ships");
  const DAOClassificationInstance = new DAOService("classification");
  const payload = {
    name: reactiveInputManager.inputName,
    value: reactiveInputManager.inputValue,
    type: reactiveInputManager.selectValue.value,
    qntTime: reactiveInputManager.inputQntTime,
    status: STATUS[1],
    description: reactiveInputManager.description,
    createdAt: new Date(),
    userOwner: reactiveInputManager.userAuth.uid,
  };

  if (
    payload.name === "" ||
    payload.value === "" ||
    payload.type === "" ||
    payload.qntTime === ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  if (payload.qntTime < 2) {
    alert("Quantidade de times deve ser maior que 1");
    return;
  }

  if (payload.userOwner === null) {
    alert("Usuário não autenticado");
    return;
  }

  try {
    await dao.create(payload);
    // await DAOClassificationInstance.create({chanpionsShipId, teams: []})
    clearReactive();
  } catch (error) {
    console.error(error);
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
</template>

<style scoped>
.button {
  padding: 10px;
  border-radius: 7px;
  width: 30%;
  box-shadow: none;
  font-size: medium;
  background-color: #42b883;
  border: 2px solid #ffffff;
  color: white;
  margin: 20px;
  cursor: pointer;
}

.button:hover {
  background-color: #1c1e21;
  border: 2px solid #42b883;
  color: #ffffff;
}

main {
  display: flex;
  flex-direction: column;
  background-color: #000000;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90dvh;
}

.select {
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 40%;
  align-items: center;
  justify-content: space-between;

  select {
    background-color: #1c1e21;
    border: 1px solid #42b883;
    color: white;
    width: 190px;
  }
}

select {
  padding: 10px;
  border-radius: 7px;
  box-shadow: none;
}

.container {
  border: 1px solid #42b883;
  background-color: #1c1e21;
  padding: 80px;
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
}
</style>
