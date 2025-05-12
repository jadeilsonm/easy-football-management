<script setup>
import router from '@/router';
import { defineProps, ref } from 'vue';
// import { AuthService } from '@/services/AuthService';
import { PiniaStore } from '@/stores';

defineProps({
  buttonsValues: {
    type: Array,
    required: true
  }, imgProfile: {
    type: String,
    required: false
  }
});

const globalStore = PiniaStore();

// const auth = new AuthService();

const home = () => {
  router.push('/home/team/editteam');
}

const isMenuActive = ref(false);

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

const singup = async () => {
  // await auth.logout();
  globalStore.clearUserData();
  router.push('/login');
}

</script>

<template>
  <nav class="navBar">
    <button class="img-bt" @click="home">
      <img v-if="imgProfile" :src="imgProfile" alt="imagem de perfil do usuario" srcset="">
      <img v-else src="../assets/profil.png" alt="imagem de perfil do usuario">
    </button>
    <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    <ul :class="{ 'nav-active': isMenuActive }">
      <li v-for="item in buttonsValues" :key="item.value">
        <router-link class="menu-item" :to="item.path" v-if="item.value != 'Sair'">{{ item.value }}</router-link>
        <a class="menu-item" v-else @click="singup">{{ item.value }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a1a1a;
  padding: 15px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: 0 auto;
}

.img-bt {
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.img-bt img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.img-bt:hover img {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

ul {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.menu-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  padding: 5px 10px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.menu-item:hover {
  color: #42b883;
  transform: scale(1.1);
}

.menu-item::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #42b883;
  transition: width 0.3s ease, left 0.3s ease;
}

.menu-item:hover::after {
  width: 100%;
  left: 0;
}

.navBar ul li {
  list-style-type: none;
  padding: 5px 10px;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  height: 3px;
  width: 25px;
  background: #fff;
  margin: 4px 0;
  transition: 0.4s;
}

@media screen and (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-active {
    margin-top: 10px;
    background-color: #1a1a1a;
  }

  ul {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #333;
    padding: 10px 0;
  }

  ul.nav-active {
    display: flex;
  }

  li {
    text-align: center;
    padding: 10px 0;
  }

  .menu-item {
    font-size: 18px;
  }
}

@media screen and (max-width: 375px) {
  .navBar {
    padding: 10px;
  }

  .logo img {
    width: 40px;
    height: 40px;
  }

  .hamburger span {
    width: 20px;
  }

  .menu-item {
    font-size: 16px;
  }
}




</style>
