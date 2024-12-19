<script setup>
import router from '@/router';
import { defineProps } from 'vue';

defineProps({
  buttonsValues: {
    type: Array,
    required: true
  }, imgProfile: {
    type: String,
    required: false
  }
});

const home = () => {
  router.push('/home');
}


// const profileDefault = "../assets/profil.png"
// https://stackoverflow.com/questions/56624817/passing-and-binding-img-src-from-props-in-vue-js

</script>

<template>
  <nav class="navBar">
    <button class="img-bt" @click="home">
      <img v-if="imgProfile" :src=imgProfile alt="imagem de perfil do usuario" srcset="">
      <img v-else src="../assets/profil.png" alt="imagem de perfil do usuario">
    </button>
    <ul>
      <li v-for="item in buttonsValues" :key="item.value">
        <router-link :to="item.path">{{ item.value }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

button {
  background-color: #1c1e21;
  border: none;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.navBar {
  display: flex;
  align-items: center;
  background-color: #1c1e21;
  justify-content: space-between;
  padding: 15px;
  /* margin: 5% 5% 0% 5%; */
  border: 1px solid #42b883;
}

img {
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 20px;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style: none;
  width: 25%;
}
</style>
