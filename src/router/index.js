import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManagerCreated from '@/views/ManagerCreated.vue'
import LoginView from '../views/LoginView.vue'
import PlayersComponent from '../components/TeamComponent.vue'
import SubscribeComponent from '../components/SubscribeComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
import StatisticPlayersComponent from '@/components/StatisticPlayersComponent.vue'
import EditPlayersComponent from '@/components/EditPlayersComponent.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/manager/created',
      name: 'manager/created',
      component: ManagerCreated
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'team', name: 'team', component: PlayersComponent,
          children: [
            {
              path: 'editteam',
              component: EditPlayersComponent,
            },
            {
              path: 'statistics',
              component: StatisticPlayersComponent,
            }
          ]
        },
        { path: 'subscribe', name: 'subscribe', component: SubscribeComponent },
        { path: 'search', name: 'search', component: SearchComponent },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
