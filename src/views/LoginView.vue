<script setup >
import { AuthService } from '@/services/AuthService';
import { ref } from 'vue';


const auth = new AuthService();

const error = ref('');

const email = ref('');
const password = ref('');

const login = () => {
  auth.login(email.value, password.value);
}

const loginGoogle = () => {
  auth.loginWhithGoogle();
}

</script>

<template>
  <div class="login">
    <div class="container">
      <div>
        <img class="logo" src="../assets/logo_oficial.png" alt="" srcset="">
      </div>

      <div  class="form">

        <h1>Bem-vindo!</h1>
        <p>Gerencie suas equipes e torneios com facilidade</p>
        <p>e eficiência. Entre na sua conta para ter acesso a todas as </p>
        <p>ferramentas necessárias para organizar e acompanhar o </p>
        <p>desempenho do seu time, tudo em um só lugar.</p>
        <h2>Faça login para começar!</h2>


        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Senha" v-model="password">

        <button @click="login">Entrar</button>
        <button @click="loginGoogle" class="google">Entrar com <img src="../assets/google.png" class="google-img" srcset=""></button>
        <router-link to="/register">Não tem uma conta? Registre-se</router-link>
        <span v-if="error">{{ error }}</span>
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
  .google {
    display: flex;
    align-items: center;
    border: none;
    width: auto;
    justify-content: center;
    background-color: #1c1e21;

    && .google-img  {
      margin-left: 10px;
      width: 25px;
      height: 25px;
    }
  }

}




.login {
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

@media screen and (max-width: 1024px) {
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    && .logo {
      display: none;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
  }

}

@media screen and (max-width: 768px) {
  .container {
    width: 100vw;
    height: 100vh;
    && .logo {
    display: block;
      width: 200px;
      height: 200px;
    }
  }


  .form {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    h1, h2, p {
      display: none;
    }
    && input {
      width: 80%;
    }
    && button {
      width: 80%;
    }

  }

}
</style>
