<script setup>
import NavBar from '@/components/NavBar.vue';
import { onMounted, reactive } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DAOService } from '@/services/DAOService';
import { uploadFile } from '@/services/S3Bucket';
import ModelEditProfile from '@/components/ModelEditProfile.vue';
import router from '@/router';
import LoadComponent from '@/components/LoadComponent.vue';

const auth = getAuth();

const dao = new DAOService('users');

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
  console.log('currentUser', userId);
  const resultUser = await dao.getByField('userId', userId);
  const user = resultUser[0];
  console.log('fecth result ',user);
  reactiveProfile.currentUser = user;
  reactiveProfile.name = user.name;
  reactiveProfile.email = user.email;
  reactiveProfile.imgProfile = user.imgProfile || '../assets/profil.png';
  reactiveProfile.phone = user.phone || '';
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
      <ModelEditProfile v-if="reactiveProfile.changeModal" :reactiveProfile="reactiveProfile" />
      <div class="container">
        <h2>Perfil</h2>
        <img :src="reactiveProfile.imgProfile" alt="" srcset="">
        <h3>{{ reactiveProfile.name }}</h3>
        <p>{{ reactiveProfile.email }}</p>
        <p>{{ reactiveProfile.phone }}</p>
        <p>{{ reactiveProfile.city }}</p>
        <p>{{ reactiveProfile.state }}</p>
        <p>{{ reactiveProfile.country }}</p>
        <p>{{ reactiveProfile.teamFavorite }}</p>

        <button type="button" @click="reactiveProfile.changeModal">Edite Perfil</button>
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

.button:hover {
  background-color: #1c1e21;
  border: 2px solid #42b883;
  color: #ffffff;
}

main {
  display: flex;
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
  border: 1px solid #42b883;
  padding: 80px;
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
}

</style>
