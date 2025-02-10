import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './firebase'
import piniaPersist from 'pinia-plugin-persistedstate'
// import store from './stores'

const app = createApp(App)


app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireFirestoreOptionsAPI,
    VueFireAuth(),
  ]
});

const pinia = createPinia();
pinia.use(piniaPersist)
app.use(pinia);

app.use(router);

app.mount('#app');
