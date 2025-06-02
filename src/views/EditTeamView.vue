<script setup>
import NavBar from '@/components/NavBar.vue';
import InputGeneric from '@/components/InputGeneric.vue';
import LoadComponent from '@/components/LoadComponent.vue';
import { onMounted, reactive } from 'vue';
import { PiniaStore } from '@/stores';
import { RequestGenericsAPI } from "@/services/api/RequestGenericAPI";

const globalStore = PiniaStore();

const buttonsValues = [
  { path: '/home/team/editteam', value: 'Principal' },
  { path: '/manager/created', value: 'Criar Campeonato' },
  { path: '/manager/league', value: 'Campeonatos' },
  { path: '/login', value: 'Sair' }
];

const reactiveTeam = reactive({
  name: '',
  city: '',
  state: '',
  country: '',
  logo: '',
  isLoad: true,
  save: async () => {
    try {
      await RequestGenericsAPI('/api/v1/teams', globalStore.getMyTeam.id, 'PUT', {
        name: reactiveTeam.name,
        city: reactiveTeam.city,
        state: reactiveTeam.state,
        country: reactiveTeam.country,
        logo: reactiveTeam.logo
      });
      alert('Time atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar time');
    }
  },
  uploadImage: async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        reactiveTeam.logo = 'url_to_uploaded_image';
      } catch (error) {
        console.error(error);
      }
    }
  }
});

const getTeamValues = async () => {
  try {
    const team = await RequestGenericsAPI('/api/v1/teams', globalStore.getMyTeam.id, 'GET');
    reactiveTeam.name = team.name;
    reactiveTeam.city = team.city;
    reactiveTeam.state = team.state;
    reactiveTeam.country = team.country;
    reactiveTeam.logo = team.logo;
    reactiveTeam.isLoad = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getTeamValues();
});
</script>

<template>
  <div>
    <NavBar :buttonsValues="buttonsValues" />
    <LoadComponent v-if="reactiveTeam.isLoad" :isLoading="reactiveTeam.isLoad" />
    <main v-else>
      <div class="container">
        <div class="team-profile">
          <h2>Editar Time</h2>
          <img :src="reactiveTeam.logo" alt="Logo do time" v-if="reactiveTeam.logo">
          
          <div class="form-container">
            <input type="file" accept="image/*" @change="reactiveTeam.uploadImage" />
            
            <InputGeneric 
              inputType="text" 
              label="Nome do time:" 
              cssApply="input"
              v-model="reactiveTeam.name" 
            />

            <InputGeneric 
              inputType="text" 
              label="Cidade:" 
              cssApply="input"
              v-model="reactiveTeam.city" 
            />

            <InputGeneric 
              inputType="text" 
              label="Estado:" 
              cssApply="input"
              v-model="reactiveTeam.state" 
            />

            <InputGeneric 
              inputType="text" 
              label="País:" 
              cssApply="input"
              v-model="reactiveTeam.country" 
            />

            <button type="button" @click="reactiveTeam.save">Salvar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.team-profile {
  width: 100%;
  max-width: 600px;
  background-color: #1c1e21;
  border-radius: 26px;
  padding: 30px;
  border: 1px solid #42b883;
  color: white;
}

.team-profile h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #42b883;
}

.team-profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: block;
  object-fit: cover;
  border: 2px solid #42b883;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input[type="file"] {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #42b883;
  background-color: #2c3034;
  color: white;
}

button {
  padding: 12px 20px;
  border-radius: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3aa876;
}
</style>