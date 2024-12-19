<script setup >
import router from '@/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';


const auth = getAuth();

const error = ref('');

const email = ref('');
const password = ref('');

const login = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          if(userCredential.user)
            router.push('/home/team/editteam');
        })
        .catch((err) => {
          error.value = 'Email ou senha inválidos';
          console.log(err);
        });
}

</script>

<template>
  <div class="login">
    <div class="container">
      <div>
        <img src="../assets/logo_oficial.png" alt="" srcset="">
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
        <router-link to="/register">Não tem uma conta? Registre-se</router-link>
        <span v-if="error">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.league {
  /* font-family: Arial, sans-serif; */
  margin: 20px;
  padding: 20px;
  /* background-color: transparent; */
  border-radius: 8px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  /* background-color: transparent; */
  border: 1px solid #42b883;
}

th, td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #42b883;
}

th {
  background-color: transparent;
  color: #42b883;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: transparent;
}

tr:hover {
  background-color: transparent;
}

span {
  display: block;
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
}

@media (max-width: 768px) {
  table, th, td {
    font-size: 0.9em;
  }

  th, td {
    padding: 10px;
  }

  .league {
    overflow-x: auto;
  }

  table {
    display: block;
    width: 100%;
  }

  thead {
    display: none;
  }

  tbody tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #42b883;
    padding: 10px;
  }

  tbody td {
    display: block;
    text-align: right;
    padding: 10px 0;
    position: relative;
    border: none;
  }

  tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #42b883;
  }

  th, td {
    border: none;
  }
}
</style>
