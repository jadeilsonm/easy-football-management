<script setup >
</script>

<template>
  <div class="login">
    <div class="container">
      <div>
        <img src="../assets/logo_oficial.png" alt="" srcset="">
      </div>

      <form action="" class="form">
        
          <h1>Bem-vindo!</h1>
          <p>Gerencie suas equipes e torneios com facilidade</p>
          <p>e eficiência. Entre na sua conta para ter acesso a todas as </p>
          <p>ferramentas necessárias para organizar e acompanhar o </p>
          <p>desempenho do seu time, tudo em um só lugar.</p>
          <h2>Faça login para começar!</h2>
        
        
          <input type="text" placeholder="Email">
          <input type="password" placeholder="Senha">
        
          <RouterLink to="/login">Entrar</RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  .container {
    border-radius: 26px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #1c1e21;
    height: 80vh;
    width: 80vw;
    border: 1px solid #42b883;
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      input {
        background-color: #1c1e21;
        border: 1px solid #42b883;
        height: 36px;
        width: auto;
        border-radius: 26px;
        margin: 10px;
        padding: 10px;
      }
    }
  }
}
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
