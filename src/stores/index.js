// import { ref, computed } from 'vue'
// import { createStore } from 'vuex'

// export default createStore({
//     state: {
//         user: null
//     },
// })

import { createApp } from 'vue'
import { createStore } from 'vuex'

// Cria uma nova instância do store.
const store = createStore({
  state () {
    return {
      userId: null,
      teamId: null
    }
  }
})

const app = createApp({ /* seu componente raiz */ })

// Instale a instância do store como um plugin
app.use(store)