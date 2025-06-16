<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const isVisible = ref(false);

const hideNotification = () => {
  isVisible.value = false;
};

watchEffect(() => {
  if (props.message) {
    isVisible.value = true;
    const timer = setTimeout(() => {
      hideNotification();
    }, props.duration);

    return () => clearTimeout(timer);
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" :class="['notification', type]" @click="hideNotification">
      <p class="notification-message">{{ message }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  max-width: 400px;
}

.notification-message {
  margin: 0;
  font-size: 0.95rem;
}

.success {
  background-color: #42b883;
}

.error {
  background-color: #ff4757;
}

.info {
  background-color: #2196f3;
}

.warning {
  background-color: #ffa502;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>