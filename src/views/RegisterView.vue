<script setup >
import router from '@/router';
import { DAOService } from '@/services/DAOService';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { reactive } from 'vue';



const auth = getAuth();

const reactiveInputRegisterUser = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  isValid: false,
  isValidPassword: false,
  isValidEmail: false,
  validateEmail: () => {
    const email = reactiveInputRegisterUser.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    reactiveInputRegisterUser.isValidEmail = emailRegex.test(email);
    !reactiveInputRegisterUser.isValidEmail ?
      reactiveInputRegisterUser.error = 'Email inválido' :
    reactiveInputRegisterUser.error = '';
  },
  validatePassword: () => {
    const password = reactiveInputRegisterUser.password;
    const confirmPassword = reactiveInputRegisterUser.confirmPassword;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    reactiveInputRegisterUser.isValidPassword = (password === confirmPassword) && passwordRegex.test(password);
    reactiveInputRegisterUser.error = !reactiveInputRegisterUser.isValidPassword ? 'Password inválido ou diferentes' : '';
  },
  error:'',
})

const dao = new DAOService('users');

const register = async () => {
  const payload = {
    email: reactiveInputRegisterUser.email,
    name: reactiveInputRegisterUser.name,
    createdAt: new Date()
  }

  try {
    const user = await createUserWithEmailAndPassword(auth, reactiveInputRegisterUser.email, reactiveInputRegisterUser.password)
    if (!user) {
      alert('Erro ao criar usuário');
      throw new Error('Erro ao criar usuário');
    }
    const uid = user.user.uid;
    await dao.create({ userId: uid ,...payload });
    router.push('/login');
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="register">
    <div class="container">

      <div  class="form">
        <h1>Bem-vindo ao<br>Easy Football Management!</h1>
        <p>Gerencie suas equipes e torneios com facilidade</p>
        <p>e eficiência. Entre na sua conta para ter acesso a todas as </p>
        <p>ferramentas necessárias para organizar e acompanhar o </p>
        <p>desempenho do seu time, tudo em um só lugar.</p>
        <h2>Faça seu cadastro para começar!</h2>


        <input type="text" placeholder="Nome" v-model="reactiveInputRegisterUser.name">
        <input type="text" placeholder="Email" v-model="reactiveInputRegisterUser.email" @keypress="reactiveInputRegisterUser.validateEmail">
        <input type="password" placeholder="Senha" v-model="reactiveInputRegisterUser.password" @keyup="reactiveInputRegisterUser.validatePassword">
        <input type="password" placeholder="Confirme a senha" v-model="reactiveInputRegisterUser.confirmPassword" @keyup="reactiveInputRegisterUser.validatePassword">

        <button @click="register">Cadastrar</button>
        <span v-if="reactiveInputRegisterUser.error">{{ reactiveInputRegisterUser.error }}</span>
      </div>
      <div>
        <img src="../assets/logo_oficial.png" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<style scoped>
#app{
  display: flex;
  height: 100dvh;
  width: 100vw;
}

.container {
  border-radius: 26px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #1c1e21;
  height: 80vh;
  width: 80vw;
  border: 1px solid #42b883;

  button {
    background-color: #42b883;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 26px;
  }

  button:hover {
    background-color: #1c1e21;
    border: 1px solid #42b883;
    color: #ffffff;
  }
}



.register {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      input {
        color: white;
        font-size: 16px;
        background-color: #1c1e21;
        border: 1px solid #42b883;
        height: 36px;
        width: auto;
        border-radius: 26px;
        margin: 10px;
        padding: 10px;
      }
}
@media (min-width: 1024px) {
  .register {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
