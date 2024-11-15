<template>
    <label :for="label" :class="cssApply">
      {{ label }}
      <input :type="inputType" :value="modelValue" :id="label" @input="updateInputValue" >
    </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  inputType: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  cssApply: {
    type: String,
    required: false
  }, selectValues: {
    type: Array,
    required: false
  }, modelValue: {
    type: String,
    default: '',
    required: true
  }
});

const emit = defineEmits(['update:modelValue'])

function updateInputValue(event) {
  emit('update:modelValue', event.target.value)
}

</script>

<style scoped>
.input {
  width: 40%;
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
}

input {
  padding: 10px;
  border-radius: 7px;
  box-shadow: none;
  background-color: #1c1e21;
  border: 1px solid #42b883;
  color: white;
  width: 190px;
}
</style>
