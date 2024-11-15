<script setup>
import NavBar from '@/components/NavBar.vue';
import Input from '@/components/InputGeneric.vue';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { STATUS } from '@/Enums/status';
import { reactive } from 'vue';
import { getAuth } from 'firebase/auth';

const reactiveInputManager = reactive({
  inputName: '',
  inputValue: '',
  inputQntTime: '',
  selectValue: ''
})

const user = getAuth().currentUser;

const select = [{ text: "COPA", value: "copa" }, { text: "LIGA", value: "liga" }]
const buttonsValues = [{path:'/',value:'Home'}, {path:'/manager/created',value:'Criar Campeonato'}, {path:'/manager/league',value:'Campeonatos'}, {path:'/login',value:'Sair'}]


const createLeague = async () => {

  await addDoc(collection(db, 'leagues'), {
    name: reactiveInputManager.inputName,
    value: reactiveInputManager.inputValue,
    type: reactiveInputManager.selectValue,
    qntTime: reactiveInputManager.inputQntTime,
    status: STATUS[1],
    createdAt: new Date(),
    userOwner: user.uid
  })
}

</script>

<template>
  <NavBar :buttonsValues=buttonsValues />
  <main>
      <div class="container">
        <Input inputType="text" label="Nome do campeonato:" cssApply="input" v-model="reactiveInputManager.inputName" />
        <Input inputType="number" label="Premiação:" cssApply="input" v-model="reactiveInputManager.inputValue" />
        <label for="select" class="select">
          Modalidade:
          <select v-model="reactiveInputManager.selectValue">
            <option v-for="(value, index) in select" :key="index" :value="value">{{ value.text }}</option>
          </select>
        </label>
        <Input inputType="number" label="Quantidade de times:" cssApply="input" v-model="inputQntTime" />
        <button class="button" @click="createLeague">Criar</button>
      </div>
    </main>
</template>


<style scoped>

.button {
  padding: 10px;
  border-radius: 26px;
  border: none;
  width: 30%;
  box-shadow: none;
  font-size: medium;
  background-color: #42b883;
  color: white;
  margin: 20px;
  cursor: pointer;
}

.button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
}

main {
  display: flex;
  flex-direction: column;
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
