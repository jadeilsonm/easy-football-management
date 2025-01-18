<script setup >
import router from '@/router';
import { AuthService } from '@/services/AuthService';
import { DAOService } from '@/services/DAOService';
import { reactive } from 'vue';

const auth = new AuthService();

const reactiveInputRegisterUser = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  isValid: false,
  isValidPassword: false,
  isValidEmail: false,
  isDisabled: true,
  validateEmail: () => {
    const email = reactiveInputRegisterUser.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.length > 3) {
      reactiveInputRegisterUser.isValidEmail = emailRegex.test(email);
      reactiveInputRegisterUser.errorEmail = !reactiveInputRegisterUser.isValidEmail ?
        'Email inválido' : '';
    }
    reactiveInputRegisterUser.verifyDisabled();
  },
  validatePassword: () => {
    const password = reactiveInputRegisterUser.password;
    const confirmPassword = reactiveInputRegisterUser.confirmPassword;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (confirmPassword.length > 1) {
      reactiveInputRegisterUser.isValidPassword = ((password === confirmPassword) && passwordRegex.test(password));
      reactiveInputRegisterUser.errorPassword = !reactiveInputRegisterUser.isValidPassword ? 'Password inválido ou diferentes' : '';
    }
    reactiveInputRegisterUser.verifyDisabled();
  },
  errorEmail:'',
  errorPassword:'',
  verifyDisabled: () => {
    const validate = reactiveInputRegisterUser.isValidEmail && reactiveInputRegisterUser.isValidPassword && reactiveInputRegisterUser.name.length >= 3;
    // console.log(validate);
    reactiveInputRegisterUser.isDisabled = !validate;
  }
})

const dao = new DAOService('users');

const register = async () => {
  const payload = {
    email: reactiveInputRegisterUser.email,
    name: reactiveInputRegisterUser.name,
    createdAt: new Date()
  }

  try {
    const user = await auth.register(reactiveInputRegisterUser.email, reactiveInputRegisterUser.password);
    if (!user) {
      alert('Erro ao criar usuário');
      throw new Error('Erro ao criar usuário');
    }
    const uid = user.user.uid;
    await dao.create({ userId: uid ,...payload });
    const teamDao = new DAOService('teams');
    console.log(payload.name.replace(' ')+ '` teams' );
    await teamDao.create({ userId: uid, name: payload.name.replace(' ')+ '` teams', createdAt: new Date() });
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
        <input type="text" placeholder="Email" v-model="reactiveInputRegisterUser.email" @keyup="reactiveInputRegisterUser.validateEmail">
        <input type="password" placeholder="Senha" v-model="reactiveInputRegisterUser.password" @keyup="reactiveInputRegisterUser.validatePassword">
        <input type="password" placeholder="Confirme a senha" v-model="reactiveInputRegisterUser.confirmPassword" @keyup="reactiveInputRegisterUser.validatePassword">

        <button @click="register" :disabled="reactiveInputRegisterUser.isDisabled">Cadastrar</button>
        <router-link to="/login">Já tem uma conta? Faça login</router-link>
        <span v-if="reactiveInputRegisterUser.errorEmail">{{ reactiveInputRegisterUser.errorEmail }}</span>
        <span v-if="reactiveInputRegisterUser.errorPassword">{{ reactiveInputRegisterUser.errorPassword }}</span>
      </div>
      <div>
        <img class="logo" src="../assets/logo_oficial.png" alt="" srcset="">
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

  button:disabled {
    background-color: rgba(235, 235, 235, 0.64);
    border: 1px solid #000000;
    color: #143023;
    font-weight: bold;
    cursor: not-allowed;
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
    display: flex;
    flex-direction: column-reverse;
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
