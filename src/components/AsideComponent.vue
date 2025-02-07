<script>
export default {
  mounted() {
    //console.log(this.$route.path); // Exibe o parâmetro 'id' da rota
  },
};
</script>

<template>
  <div class="sidebar">
    <img src="../assets/logo_oficial.png" />
    <input
    class="menu-item"
      type="button"
      value="Meu Time"
      @click="$router.push('/home/team/editteam')"
    />
    <input
      type="button"
      class="menu-item"
      value="Meus Torneios"
      @click="$router.push('/home/subscribed')"
    />
    <input
      type="button"
      class="menu-item"
      value="Buscar Torneios"
      @click="$router.push('/home/search')"
    />
  </div>
</template>

<style scoped>
.aside {
  height: 80vh;
  width: 15vw;
  margin: 16px;
  border-radius: 26px;
  border: 1px solid #42b883;
  display: flex;
  flex-direction: column;
}

.aside input {
  background-color: #01ff9100;
  border: none;
  color: white;
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
  background-color: #42b883;
}

.aside img {
  width: 100px;
  margin: 0 auto;
}

.sidebar {
  width: 15%;
  background-color: #27293d;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.sidebar .menu-item {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  background-color: #42b883;
  transition: all 0.3s ease;
}

.sidebar .menu-item:hover {
  background-color: #25634a;
}
</style>
