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

<template>
    <label :for="label" :class="cssApply">
      {{ label }}
      <input :type="inputType" :value="modelValue" :id="label" @input="updateInputValue" >
    </label>
</template>

<style scoped>
.input {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  align-items: flex-start;
  justify-content: center;
}

input {
  padding: 12px 15px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #1c1e21;
  border: 1px solid #2b2b2b;
  color: white;
  width: 100%;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #b3b3b3;
  outline: none;
}
</style>
