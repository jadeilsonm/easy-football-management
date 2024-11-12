<script setup>
import NavBar from '@/components/NavBar.vue';
import Input from '@/components/InputGeneric.vue';
import { ref } from 'vue';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { STATUS } from '@/Enums/status';

const inputName = ref('');
const inputValue = ref('');
const inputQntTime = ref('');
const selectType = ref('');

const select = [{ text: "COPA", value: "copa" }, { text: "LIGA", value: "liga" }]
const buttonsValues = [{path:'/',value:'Home'}, {path:'/manager/created',value:'Criar Campeonato'}, {path:'/manager/league',value:'Campeonatos'}, {path:'/login',value:'Sair'}]

console.log('ManagerCreated.vue');

const createLeague = async () => {
  console.log(inputName.value, inputValue.value, selectType.value, inputQntTime.value)

  await addDoc(collection(db, 'leagues'), {
    name: inputName.value,
    value: inputValue.value,
    type: selectType.value,
    qntTime: inputQntTime.value,
    status: STATUS[1],
    createdAt: new Date(),
    userOwner: 'user'
  })
}

</script>

<template>
  <NavBar :buttonsValues=buttonsValues />
  <main>
      <div class="container">
        <Input inputType="text" label="Nome do campeonato:" cssApply="input" v-model="inputName" />
        <Input inputType="number" label="Premiação:" cssApply="input" v-model="inputValue" />
        <label for="select" class="select">
          Modalidade:
          <select v-model="selectType">
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
  border-radius: 7px;
  width: 50%;
  box-shadow: none;
  background-color: #42b883;
  color: white;
  margin: 10px;
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
  width: 70%;
  align-items: center;
  justify-content: space-between

}

select {
  padding: 10px;
  border-radius: 7px;
  box-shadow: none;
}

.container {
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
