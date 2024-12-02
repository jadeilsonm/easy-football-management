<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  reactiveProfile: {
    type: Object,
    required: true
  }
});

const localProfile = ref({ ...props.reactiveProfile });

watch(() => props.reactiveProfile, (newProfile) => {
  localProfile.value = { ...newProfile };
});

</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <input type="file" name="imgProfile" id="imgProfile" accept="image/*" @change="localProfile.value.uploadImage"/>
      <input type="email" name="email" id="email" v-model="localProfile.value.email" />
      <input type="text" name="name" id="name" v-model="localProfile.value.name" />
      <input type="tel" name="phone" id="phone" v-model="localProfile.value.phone" />
      <input type="text" name="city" id="city" v-model="localProfile.value.city" />
      <input type="text" name="state" id="state" v-model="localProfile.value.state" />
      <input type="text" name="country" id="country" v-model="localProfile.value.country" />
      <input type="text" name="teamFavorite" id="teamFavorite" v-model="localProfile.value.teamFavorite" />

      <button type="button" @click="localProfile.value.save">Salvar</button>
    </div>
  </div>
</template>

<style scoped>

</style>
