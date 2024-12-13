<script >
export default {
  mounted() {
    //console.log(this.$route.path); // Exibe o parâmetro 'id' da rota

  }
}
</script>

<template>
  <div class="aside">
    <img src="../assets/logo_oficial.png"  />
    <input type="button" value="Meu Time" @click="$router.push('/home/team')">
    <input type="button" value="Meus Torneios" @click="$router.push('/home/subscribed')">
    <input type="button" value="Buscar Torneios" @click="$router.push('/home/search')">
    
  </div>
</template>

<style scoped>
.aside {
  height: 70vh;
  width: 10vw; 
  margin: 26px;
  border-radius: 26px;
  border: 1px solid #42b883;
  display: flex;
  flex-direction: column;
}

.aside input {
  background-color: #10422c00;
  border: none;
  color: white;
  /* padding: 15px 32px; */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 26px;
}

.aside input:hover {
  background-color: #333; /* Cor mais clara do fundo no hover */
}

.aside button {
  background-color: #42b883
}

.aside img {
  width: 100px;
}
</style>
