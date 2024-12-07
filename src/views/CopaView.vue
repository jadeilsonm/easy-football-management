<script setup >
import router from '@/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';


const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push('/login');
    }
  });
})



</script>

<template>
  <div>

  </div>
  <!-- <TeamsSwitching /> -->
</template>

<style scoped>

</style>
