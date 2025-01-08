<script setup>
import NavBar from '@/components/NavBar.vue';
import { onMounted, reactive } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DAOService } from '@/services/DAOService';
import { uploadFile } from '@/services/S3Bucket';
import router from '@/router';
import LoadComponent from '@/components/LoadComponent.vue';
import InputGeneric from '@/components/InputGeneric.vue';

const auth = getAuth();

const dao = new DAOService('users');

const buttonsValues = [{path:'/home/team/editteam',value:'Principal'}, {path:'/manager/created',value:'Criar Campeonato'}, {path:'/manager/league',value:'Campeonatos'}, {path:'/login',value:'Sair'}]

const reactiveProfile = reactive({
  name: '',
  email: '',
  imgProfile: '',
  phone: '',
  city: '',
  state: '',
  country: '',
  teamFavorite: '',
  isActivateModal: false,
  currentUser: '',
  isLoad: true,
  uploadImage: async (e) => {
    const file = e.target.files[0];
    const dataUpload = await uploadFile(file);
    console.log(dataUpload);
    reactiveProfile.imgProfile = dataUpload;
  },
  save: () => {
    dao.update(reactiveProfile.currentUser.uid, {
      name: reactiveProfile.name,
      email: reactiveProfile.email,
      imgProfile: reactiveProfile.imgProfile,
      phone: reactiveProfile.phone,
      city: reactiveProfile.city,
      state: reactiveProfile.state,
      country: reactiveProfile.country,
      teamFavorite: reactiveProfile.teamFavorite
    });
  },
  changeModal: () => {
    reactiveProfile.isActivateModal = !reactiveProfile.isActivateModal;
  }
})

const getUserValues = async (userId) => {
  const resultUser = await dao.getByField('userId', userId);
  const userById = await dao.getById(resultUser[0].id);
  console.log("usrbyid", userById);
  const user = resultUser[0];
  reactiveProfile.currentUser = user;
  reactiveProfile.name = user.name;
  reactiveProfile.email = user.email;
  reactiveProfile.imgProfile = user.imgProfile || '../../src/assets/profil.png';
  reactiveProfile.phone = user.phone || '(99) 99999-9999';
  reactiveProfile.city = user.city || '';
  reactiveProfile.state = user.state || '';
  reactiveProfile.country = user.country || '';
  reactiveProfile.teamFavorite = user.teamFavorite || '';
  reactiveProfile.isLoad = false;
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Usuário autenticado');
      const uuid = user.uid;
      getUserValues(uuid);
    } else {
      router.push('/login');
    }
  });
})


</script>

<template>
 <NavBar :buttonsValues=buttonsValues />
  <LoadComponent v-if="reactiveProfile.isLoad" :isLoading="reactiveProfile.isLoad" />
  <main v-else>
    <div class="container">
      <div class="profile">
        <h2>Perfil</h2>
        <img :src="reactiveProfile.imgProfile" alt="" srcset="">
        <div>
          <h4>Nome: {{ reactiveProfile.name }}</h4>
          <p>Email: {{ reactiveProfile.email }}</p>
          <p>Telefone: {{ reactiveProfile.phone }}</p>
          <p>Cidade: {{ reactiveProfile.city }}</p>
          <p>Estado: {{ reactiveProfile.state }}</p>
          <p>Pais: {{ reactiveProfile.country }}</p>
          <p>Time Favorito: {{ reactiveProfile.teamFavorite }}</p>
        </div>
      </div>

        <div class="modal-content">
          <input type="file" name="imgProfile" placeholder="imagem do perfil" id="imgProfile" accept="image/*"
            @change="reactiveProfile.uploadImage" />

          <InputGeneric inputType="text" label="Nome: " cssApply="input" v-model="reactiveProfile.name" />
          <InputGeneric inputType="text" label="E-mail: " cssApply="input" v-model="reactiveProfile.email" />
          <InputGeneric inputType="text" label="Número telefone: " cssApply="input" v-model="reactiveProfile.phone" />
          <InputGeneric inputType="text" label="Cidade: " cssApply="input" v-model="reactiveProfile.city" />
          <InputGeneric inputType="text" label="Estado: " cssApply="input" v-model="reactiveProfile.state" />
          <InputGeneric inputType="text" label="Pais: " cssApply="input" v-model="reactiveProfile.country" />
          <InputGeneric inputType="text" label="Time favorito: " cssApply="input"
            v-model="reactiveProfile.teamFavorite" />

          <button type="button" @click="reactiveProfile.save">Salvar</button>
        </div>

    </div>
  </main>
</template>


<style scoped>

.button {
  padding: 10px;
  border-radius: 7px;
  width: 30%;
  box-shadow: none;
  font-size: medium;
  background-color: #42b883;
  border: 2px solid #ffffff;
  color: white;
  margin: 20px;
  cursor: pointer;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #42b883;
  border-radius: 26px;
  padding: 20px;
  text-align: left;
  width: 70%;
  height: 90%;

  input {
    padding: 10px;
    border-radius: 7px;
    box-shadow: none;
    background-color: #1c1e21;
    border: 1px solid #42b883;
    color: white;
    margin: 10px;
  }

  button {
    padding: 10px;
    border-radius: 7px;
    width: 30%;
    box-shadow: none;
    font-size: medium;
    background-color: #42b883;
    border: 2px solid #ffffff;
    color: white;
    margin: 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #1c1e21;
    border: 2px solid #42b883;
    color: #ffffff;
  }
}

.button:hover {
  background-color: #1c1e21;
  border: 2px solid #42b883;
  color: #ffffff;
}

main {
  display: flex;
  background-color: #1c1e21;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90dvh;
}


.select {
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 40%;
  align-items: center;
  justify-content: space-between;

  select {
    background-color: #1c1e21;
    border: 1px solid #42b883;
    color: white;
    width: 190px;
  }
}

select {
  padding: 10px;
  border-radius: 7px;
  box-shadow: none;
}

.container {
  height: 100%;
  width: 100%;
  border-radius: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #42b883;
  border-radius: 26px;
  padding: 20px;
  text-align: left;
  width: 27%;
  height: 90%;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }



  img,
  h2,
  div {
    margin: 10px;
  }
}
</style>
