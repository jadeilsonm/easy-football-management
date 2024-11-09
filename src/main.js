import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { db } from './firebase'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp: db,
  modules: [VueFireFirestoreOptionsAPI]
});

app.use(createPinia())
app.use(router)

app.mount('#app')
