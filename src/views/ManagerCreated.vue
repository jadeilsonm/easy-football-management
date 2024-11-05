<script setup>
import NavBar from '@/components/NavBar.vue';
import Input from '@/components/InputGeneric.vue';
import { ref } from 'vue';

const inputName = ref('');
const inputValue = ref('');
const inputQntTime = ref('');
const selectType = ref('');

const select = [{ text: "COPA", value: "copa" }, { text: "LIGA", value: "liga" }]
const buttonsValues = [{path:'/',value:'Home'}, {path:'/manager/created',value:'Criar Campeonato'}, {path:'/manager/league',value:'Campeonatos'}, {path:'/login',value:'Sair'}]

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
      </div>
    </main>
</template>


<style>
#app{
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
}

.select {
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 50%;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25%;
}


@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
