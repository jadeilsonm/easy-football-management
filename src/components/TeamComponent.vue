<script>

</script>

<template>
  <div class="team">
    <div>
      <button @click="$router.push('/home/team/editteam')">Meu time</button>
      <button @click="$router.push('/home/team/statistics')">Estatisticas</button>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.team {
  display: flex;
  flex-direction: column;
  border-radius: 26px;
  border: 1px solid #42b883;
}

.team div {
  display: flex;
  justify-content: center;
}

button {
  background-color: #10422c00;
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
  color: white;
  background-color: #42b883;
}

.activate {
  color: white;
  background-color: #17583b;
}

.form-containe {
  z-index: 1;
}

@media screen and (max-width: 768px) {
  .team {
    width: 100vw;
    padding: 10px;
    border: none;
    border-radius: 0;
    justify-content: center;
    align-items: center;
  }

  button {
    font-size: 0.9em;
    padding: 8px;
  }

}
</style>
